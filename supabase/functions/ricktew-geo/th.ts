// Is this address in one of Thailand's blocks? (th-ranges.ts, from APNIC.)
import { TH_V4, TH_V6 } from './th-ranges.ts';

const V6 = TH_V6.map((h) => BigInt('0x' + h));

// Is x inside one of the sorted [first, last] pairs?
function inPairs<T extends number | bigint>(pairs: T[], x: T): boolean {
  let lo = 0, hi = pairs.length / 2 - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (x < pairs[2 * mid]) hi = mid - 1;
    else if (x > pairs[2 * mid + 1]) lo = mid + 1;
    else return true;
  }
  return false;
}

function v4(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p) || Number(p) > 255) return null;
    n = n * 256 + Number(p);
  }
  return n;
}

// The top 64 bits of an IPv6 address.
function v6(ip: string): bigint | null {
  const halves = ip.split('::');
  if (halves.length > 2) return null;
  const side = (s: string) => (s === '' ? [] : s.split(':'));
  const head = side(halves[0]), tail = halves.length === 2 ? side(halves[1]) : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 2 ? missing < 1 : missing !== 0) return null;
  const groups = [...head, ...Array(halves.length === 2 ? missing : 0).fill('0'), ...tail];
  if (!groups.every((g) => /^[0-9a-f]{1,4}$/i.test(g))) return null;
  return groups.slice(0, 4).reduce((n, g) => (n << 16n) | BigInt('0x' + g), 0n);
}

export function isThai(ip: string | null): boolean {
  if (!ip) return false;
  ip = ip.trim().replace(/^::ffff:(?=\d+\.\d+\.\d+\.\d+$)/i, '');
  if (!ip.includes(':')) {
    const n = v4(ip);
    return n !== null && inPairs(TH_V4, n);
  }
  const top = v6(ip);
  return top !== null && inPairs(V6, top);
}
