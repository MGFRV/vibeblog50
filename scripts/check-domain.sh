#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-podbor-oborudovaniya.ru}"
VERCEL_HOST="${2:-vibeblog50.vercel.app}"

echo "[info] Checking DNS for ${DOMAIN}"
DOMAIN_A="$(dig +short "${DOMAIN}" A | tr '\n' ' ' | xargs || true)"
WWW_A="$(dig +short "www.${DOMAIN}" A | tr '\n' ' ' | xargs || true)"


echo "  ${DOMAIN} A: ${DOMAIN_A:-<none>}"
echo "  www.${DOMAIN} A: ${WWW_A:-<none>}"

echo "[info] Checking DNS for ${VERCEL_HOST}"
VERCEL_A="$(dig +short "${VERCEL_HOST}" A | tr '\n' ' ' | xargs || true)"
echo "  ${VERCEL_HOST} A: ${VERCEL_A:-<none>}"

echo
if [[ -z "${DOMAIN_A}" ]]; then
  echo "[warn] ${DOMAIN} has no A record."
  exit 1
fi

if [[ "${DOMAIN_A}" == *"76.76.21.21"* ]]; then
  echo "[ok] ${DOMAIN} apex points to Vercel-recommended A record (76.76.21.21)."
  exit 0
fi

echo "[warn] ${DOMAIN} apex does not point to Vercel-recommended 76.76.21.21."
echo "       Expected for Vercel custom domain: A 76.76.21.21"
exit 2
