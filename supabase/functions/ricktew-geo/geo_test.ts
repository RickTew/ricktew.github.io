// deno test supabase/functions/ricktew-geo/geo_test.ts
// Thai addresses say yes, everyone else and anything malformed says no.
import { isThai } from './th.ts';
import { TH_V4, TH_V6 } from './th-ranges.ts';

function eq(name: string, got: boolean, want: boolean) {
  if (got !== want) throw new Error(`${name}: got ${got}, want ${want}`);
}

Deno.test('Thai addresses', () => {
  eq('first Thai block, start', isThai('1.0.128.0'), true); // apnic|TH|ipv4|1.0.128.0|32768
  eq('first Thai block, end', isThai('1.0.255.255'), true);
  eq('mapped', isThai('::ffff:1.0.200.7'), true);
  eq('padded', isThai(' 1.0.128.9 '), true);
  eq('IPv6 block', isThai('2001:3c8::1'), true); // apnic|TH|ipv6|2001:3c8::|35
  eq('IPv6 block, full form', isThai('2001:03c8:ffff:ffff:0:0:0:1'), true);
});

Deno.test('everyone else', () => {
  eq('just before the block', isThai('1.0.127.255'), false);
  eq('Google US', isThai('8.8.8.8'), false);
  eq('Cloudflare', isThai('1.1.1.1'), false);
  eq('Japan', isThai('133.0.0.1'), false);
  eq('IPv6 just past the Thai /32', isThai('2001:3c9::1'), false);
  eq('Japan IPv6, next block', isThai('2001:3d0::1'), false);
  eq('Google IPv6', isThai('2001:4860:4860::8888'), false);
});

Deno.test('malformed says no', () => {
  for (const bad of [null, '', 'TH', '1.0.128', '1.0.128.256', '1.0.128.0.1', '2001:3c8::1::2', '2001:3c8:zz::1', '1:2:3:4:5:6:7:8:9'])
    eq(String(bad), isThai(bad), false);
});

Deno.test('the list is sorted and merged', () => {
  for (const list of [TH_V4.map(BigInt), TH_V6.map((h) => BigInt('0x' + h))])
    for (let i = 0; i < list.length; i++)
      if (i % 2 ? list[i] < list[i - 1] : i && list[i] <= list[i - 1] + 1n) throw new Error('out of order at ' + i);
});
