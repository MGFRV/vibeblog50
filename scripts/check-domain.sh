#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${1:-podbor-oborudovaniya.ru}"
EXPECTED_APEX_A="${2:-91.210.106.182}"
HEALTH_PATH="${3:-/health.txt}"

join_records() {
  xargs | tr ' ' ',' | sed 's/,/, /g'
}

resolve_records() {
  local host="$1"
  local type="$2"
  dig +short "${host}" "${type}" | join_records || true
}

contains_record() {
  local records="$1"
  local expected="$2"
  [[ " ${records}," == *" ${expected},"* || " ${records} " == *" ${expected} "* || "${records}" == "${expected}" ]]
}

probe_tcp() {
  local host="$1"
  local port="$2"
  local timeout_seconds="${3:-5}"

  if timeout "${timeout_seconds}" bash -c "</dev/tcp/${host}/${port}" 2>/dev/null; then
    echo "  [ok] TCP ${host}:${port} accepts connections"
    return 0
  fi

  echo "  [fail] TCP ${host}:${port} does not accept connections"
  return 1
}

probe_url() {
  local url="$1"

  if curl --noproxy '*' -fsSIL --connect-timeout 10 --max-time 20 \
    -w '  HEAD http_code=%{http_code} remote_ip=%{remote_ip} total_time=%{time_total}s\n' \
    -o /dev/null "${url}"; then
    echo "  [ok] HEAD succeeded for ${url}"
    return 0
  fi

  echo "  [warn] HEAD failed, trying GET for ${url}"
  if curl --noproxy '*' -fsSL --connect-timeout 10 --max-time 20 \
    -w '  GET http_code=%{http_code} remote_ip=%{remote_ip} total_time=%{time_total}s\n' \
    -o /dev/null "${url}"; then
    echo "  [ok] GET succeeded for ${url}"
    return 0
  fi

  return 1
}

DOMAIN_A="$(resolve_records "${DOMAIN}" A)"
DOMAIN_AAAA="$(resolve_records "${DOMAIN}" AAAA)"
WWW_A="$(resolve_records "www.${DOMAIN}" A)"
WWW_AAAA="$(resolve_records "www.${DOMAIN}" AAAA)"
WWW_CNAME="$(resolve_records "www.${DOMAIN}" CNAME)"

STATUS=0

echo "[info] DNS records"
echo "  ${DOMAIN} A: ${DOMAIN_A:-<none>}"
echo "  ${DOMAIN} AAAA: ${DOMAIN_AAAA:-<none>}"
echo "  www.${DOMAIN} CNAME: ${WWW_CNAME:-<none>}"
echo "  www.${DOMAIN} A: ${WWW_A:-<none>}"
echo "  www.${DOMAIN} AAAA: ${WWW_AAAA:-<none>}"
echo

if [[ -z "${DOMAIN_A}" ]]; then
  echo "[fail] ${DOMAIN} has no A record. Expected A ${EXPECTED_APEX_A}."
  STATUS=1
elif contains_record "${DOMAIN_A}" "${EXPECTED_APEX_A}"; then
  echo "[ok] ${DOMAIN} apex points to expected server IP (${EXPECTED_APEX_A})."
else
  echo "[fail] ${DOMAIN} apex does not point to expected server IP ${EXPECTED_APEX_A}."
  echo "       Current A: ${DOMAIN_A}"
  STATUS=2
fi

if [[ -n "${DOMAIN_AAAA}" ]]; then
  echo "[warn] ${DOMAIN} has AAAA record(s): ${DOMAIN_AAAA}. If IPv6 is not configured on the server, UptimeRobot may see intermittent failures."
  STATUS=$(( STATUS == 0 ? 2 : STATUS ))
fi

if [[ -n "${WWW_A}" ]]; then
  if contains_record "${WWW_A}" "${EXPECTED_APEX_A}"; then
    echo "[ok] www.${DOMAIN} points to expected server IP (${EXPECTED_APEX_A})."
  else
    echo "[fail] www.${DOMAIN} A record does not point to expected server IP ${EXPECTED_APEX_A}."
    echo "       Current A: ${WWW_A}"
    STATUS=2
  fi
elif [[ -n "${WWW_CNAME}" ]]; then
  echo "[ok] www.${DOMAIN} is configured via CNAME: ${WWW_CNAME}."
else
  echo "[warn] www.${DOMAIN} has neither A nor CNAME records."
  STATUS=$(( STATUS == 0 ? 2 : STATUS ))
fi

if [[ -n "${WWW_AAAA}" ]]; then
  echo "[warn] www.${DOMAIN} has AAAA record(s): ${WWW_AAAA}. If IPv6 is not configured on the server, UptimeRobot may see intermittent failures."
  STATUS=$(( STATUS == 0 ? 2 : STATUS ))
fi

echo
echo "[info] TCP probes against expected server IP"
for port in 22 80 443; do
  if ! probe_tcp "${EXPECTED_APEX_A}" "${port}"; then
    [[ "${port}" == "22" ]] || STATUS=$(( STATUS == 0 ? 2 : STATUS ))
  fi
done

echo
echo "[info] HTTP probes"
for url in "https://${DOMAIN}/" "https://${DOMAIN}${HEALTH_PATH}" "https://www.${DOMAIN}/"; do
  echo "  ${url}"
  if ! probe_url "${url}"; then
    echo "  [fail] Probe failed for ${url}"
    STATUS=$(( STATUS == 0 ? 2 : STATUS ))
  fi
done

exit "${STATUS}"
