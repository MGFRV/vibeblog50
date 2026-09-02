#!/usr/bin/env node
/**
 * Telegram <-> GitHub PR approval bridge.
 *
 * Runs on a schedule inside GitHub Actions (which has full internet access
 * and a repo-scoped GITHUB_TOKEN — unlike the sandbox this file was written
 * in). No persistent state store is needed:
 *  - Telegram's own update `offset` clears its server-side queue, so we
 *    don't need to remember update ids between runs.
 *  - GitHub PR labels double as "have I already notified about this PR"
 *    state, so we don't need a state file either.
 *
 * Required env vars: GITHUB_TOKEN, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
 * GITHUB_REPOSITORY (the last one is set automatically by GitHub Actions).
 */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const REPO = process.env.GITHUB_REPOSITORY; // "owner/name"

if (!GITHUB_TOKEN || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || !REPO) {
  console.error(
    'Missing required env vars (GITHUB_TOKEN, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GITHUB_REPOSITORY)'
  );
  process.exit(1);
}

const GH_API = 'https://api.github.com';
const TG_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const NOTIFIED_LABEL = 'telegram-notified';

const LABEL_PREFIX = {
  'seo-content': '📝 SEO/контент',
  technical: '🔧 Техническая доработка'
};

async function gh(path, opts = {}) {
  const res = await fetch(`${GH_API}${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(opts.headers || {})
    }
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(data?.message || `GitHub API ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function tg(method, body) {
  const res = await fetch(`${TG_API}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!data.ok) {
    console.error(`Telegram ${method} failed:`, JSON.stringify(data));
  }
  return data;
}

function escapeHtml(str = '') {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function ensureLabelsExist() {
  const existing = await gh(`/repos/${REPO}/labels?per_page=100`);
  const names = new Set(existing.map((l) => l.name));
  const wanted = [
    { name: 'seo-content', color: '0e8a16', description: 'Новая статья / SEO-правка — предлагается агентом' },
    { name: 'technical', color: 'd93f0b', description: 'Техническая доработка сайта — предлагается агентом' },
    { name: NOTIFIED_LABEL, color: 'c5def5', description: 'Уведомление в Telegram уже отправлено' }
  ];
  for (const label of wanted) {
    if (!names.has(label.name)) {
      try {
        await gh(`/repos/${REPO}/labels`, { method: 'POST', body: JSON.stringify(label) });
      } catch (e) {
        console.error(`Could not create label ${label.name}:`, e.message);
      }
    }
  }
}

async function notifyNewPRs() {
  const prs = await gh(`/repos/${REPO}/pulls?state=open&per_page=100`);
  for (const pr of prs) {
    const labelNames = pr.labels.map((l) => l.name);
    const kind = labelNames.includes('technical')
      ? 'technical'
      : labelNames.includes('seo-content')
      ? 'seo-content'
      : null;
    if (!kind || labelNames.includes(NOTIFIED_LABEL)) continue;

    const prefix = LABEL_PREFIX[kind];
    const body = (pr.body || '').slice(0, 500);
    const text =
      `${prefix}\n\n` +
      `<b>${escapeHtml(pr.title)}</b>\n` +
      (body ? `${escapeHtml(body)}\n\n` : '\n') +
      `<a href="${pr.html_url}">Открыть diff на GitHub →</a>`;

    await tg('sendMessage', {
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Смержить', callback_data: `merge:${pr.number}` },
            { text: '❌ Закрыть', callback_data: `close:${pr.number}` }
          ]
        ]
      }
    });

    try {
      await gh(`/repos/${REPO}/issues/${pr.number}/labels`, {
        method: 'POST',
        body: JSON.stringify({ labels: [NOTIFIED_LABEL] })
      });
    } catch (e) {
      console.error(`Could not label PR #${pr.number} as notified:`, e.message);
    }
  }
}

async function handleCallback(update) {
  const cq = update.callback_query;
  const [action, prNumberStr] = (cq.data || '').split(':');
  const prNumber = Number(prNumberStr);
  let resultText = '';

  try {
    if (action === 'merge') {
      await gh(`/repos/${REPO}/pulls/${prNumber}/merge`, {
        method: 'PUT',
        body: JSON.stringify({ merge_method: 'squash' })
      });
      resultText = `✅ PR #${prNumber} смержен и уйдёт в деплой`;
    } else if (action === 'close') {
      await gh(`/repos/${REPO}/pulls/${prNumber}`, {
        method: 'PATCH',
        body: JSON.stringify({ state: 'closed' })
      });
      resultText = `❌ PR #${prNumber} закрыт без мержа`;
    } else {
      resultText = `Неизвестное действие: ${cq.data}`;
    }
  } catch (e) {
    resultText = `⚠️ PR #${prNumber}: ${e.data?.message || e.message}`;
  }

  await tg('answerCallbackQuery', { callback_query_id: cq.id, text: resultText, show_alert: false });

  if (cq.message) {
    // Remove the buttons so this PR can't be actioned twice from the same message.
    await tg('editMessageReplyMarkup', {
      chat_id: cq.message.chat.id,
      message_id: cq.message.message_id,
      reply_markup: { inline_keyboard: [] }
    });
    await tg('sendMessage', { chat_id: cq.message.chat.id, text: resultText });
  }
}

async function processTelegramUpdates() {
  const res = await tg('getUpdates', { timeout: 0 });
  const updates = res.result || [];
  let maxUpdateId = null;

  for (const update of updates) {
    maxUpdateId = update.update_id;
    if (update.callback_query) {
      await handleCallback(update);
    }
  }

  if (maxUpdateId !== null) {
    // Confirm receipt so Telegram drops these from the queue.
    await tg('getUpdates', { offset: maxUpdateId + 1, timeout: 0 });
  }
}

async function main() {
  await ensureLabelsExist();
  await processTelegramUpdates();
  await notifyNewPRs();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
