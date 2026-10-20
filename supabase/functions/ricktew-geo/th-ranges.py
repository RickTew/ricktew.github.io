"""Write th-ranges.ts: the IP blocks APNIC lists for Thailand.

The function cannot read the visit's country: Supabase logs Cloudflare's
cf-ipcountry at its gateway but passes only the address (cf-connecting-ip) to
the function (probed 20 Oct 2026). So ricktew-geo looks the address up in
Thailand's own blocks, taken from APNIC's public registry file, which is
"freely available for download and use". The list lives in the function: no
visitor's address goes to anyone else.

Run it now and then (blocks change slowly), then run geo_test.ts and deploy:
    python3 -I supabase/functions/ricktew-geo/th-ranges.py
"""
import ipaddress, os, urllib.request

URL = "https://ftp.apnic.net/stats/apnic/delegated-apnic-latest"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "th-ranges.ts")


def merge(spans):
    out = []
    for a, b in sorted(spans):
        if out and a <= out[-1][1] + 1:
            out[-1][1] = max(out[-1][1], b)
        else:
            out.append([a, b])
    return out


def main():
    text = urllib.request.urlopen(URL, timeout=60).read().decode("ascii", "replace")
    stamp, v4, v6 = "", [], []
    for line in text.splitlines():
        f = line.split("|")
        if len(f) >= 6 and f[0] == "2" and f[1] == "apnic":
            stamp = f[2]
        if len(f) < 7 or f[0] != "apnic" or f[1] != "TH" or f[6] not in ("allocated", "assigned"):
            continue
        if f[2] == "ipv4":
            a = int(ipaddress.IPv4Address(f[3]))
            v4.append((a, a + int(f[4]) - 1))
        elif f[2] == "ipv6":
            net = ipaddress.IPv6Network(f[3] + "/" + f[4])
            # The top 64 bits are enough: no Thai block is smaller than a /64.
            v6.append((int(net.network_address) >> 64, int(net.broadcast_address) >> 64))
    v4, v6 = merge(v4), merge(v6)
    if len(v4) < 200 or len(v6) < 50:
        raise SystemExit("too few Thai blocks (%d ipv4, %d ipv6): not writing" % (len(v4), len(v6)))
    with open(OUT, "w") as o:
        o.write("// Written by th-ranges.py from APNIC's delegated-apnic-latest (%s). Do not edit.\n" % stamp)
        o.write("// Thailand's IPv4 blocks as [first, last] pairs, merged and sorted.\n")
        o.write("export const TH_V4: number[] = [%s];\n" % ",".join("%d,%d" % (a, b) for a, b in v4))
        o.write("// Thailand's IPv6 blocks by their top 64 bits, as hex [first, last] pairs.\n")
        o.write("export const TH_V6: string[] = [%s];\n" % ",".join('"%x","%x"' % (a, b) for a, b in v6))
    print("wrote %s: %d ipv4 spans, %d ipv6 spans, APNIC %s" % (os.path.basename(OUT), len(v4), len(v6), stamp))


main()
