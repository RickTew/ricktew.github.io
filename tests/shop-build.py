#!/usr/bin/env python3
"""Rewrite the Shop's "Coming soon" lists from the Digital Dojo's catalogue.

  python3 tests/shop-build.py

The Dojo owns the products: every WinJitsu workbook has a catalogue entry
with its title and SKU in ~/Dev/digitaldojo/private/products/catalogue/wj/.
This script reads those entries and rewrites the block between the
SHOP-SOON markers in aininja/shop/index.html. It groups the workbooks by
area and leaves out any SKU that already has a "Ready now" tile
(data-sku="..."). Bundles and the everything pack wait for their final names.
Run it whenever the Dojo adds, renames or retires a workbook, and whenever a
product moves up to "Ready now". Never hand-edit the block. tests/ is
excluded from the Pages build.
"""
import html, os, re, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
page = os.path.join(root, "aininja", "shop", "index.html")
cat = os.path.expanduser("~/Dev/digitaldojo/private/products/catalogue/wj")
if not os.path.isdir(cat):
    sys.exit("no Dojo catalogue at " + cat)

s = open(page, encoding="utf-8").read()
ready = set(re.findall(r'class="tile" data-sku="([A-Z0-9-]+)"', s))

areas = {}
for f in sorted(os.listdir(cat)):
    if not f.endswith(".md"):
        continue
    m = re.match(r"---\n(.*?)\n---", open(os.path.join(cat, f), encoding="utf-8").read(), re.S)
    if not m:
        continue
    h = {k: v.strip().strip('"') for k, v in re.findall(r"^(\w+):\s*(.*)$", m.group(1), re.M)}
    sku, title, kind = h.get("sku", ""), h.get("title", ""), h.get("kind", "")
    status = h.get("status", "")
    if kind != "workbook" or not sku or not title or sku in ready:
        continue
    if not (status.startswith("built") or status.startswith("listed")):
        continue
    fam = re.search(r"WinJitsu, (\w+) \((.+)\)$", h.get("family", ""))
    if not fam:
        sys.exit("unexpected family in %s: %r" % (f, h.get("family")))
    areas.setdefault((fam.group(2), fam.group(1)), []).append((title, sku))

if not areas:
    sys.exit("catalogue read gave no workbooks; the Dojo's format may have changed")

total = sum(len(v) for v in areas.values())
out = ['<!-- SHOP-SOON:START (written by tests/shop-build.py from the Dojo\'s catalogue; do not hand-edit) -->',
       '    <p class="sub">%d more WinJitsu workbooks, by area. Tap an area to see them.</p>' % total]
for (name, code), items in sorted(areas.items()):
    word = "workbook" if len(items) == 1 else "workbooks"
    out.append('    <details><summary>%s <span>&middot; %d %s</span></summary><ul>' % (html.escape(name), len(items), word))
    for title, sku in items:
        out.append('      <li>%s<small>%s</small></li>' % (html.escape(title), html.escape(sku)))
    out.append('    </ul></details>')
out.append('<!-- SHOP-SOON:END -->')

new, n = re.subn(r"<!-- SHOP-SOON:START.*?<!-- SHOP-SOON:END -->", lambda _: "\n".join(out), s, flags=re.S)
if n != 1:
    sys.exit("SHOP-SOON markers not found exactly once")
open(page, "w", encoding="utf-8").write(new)
print("coming soon: %d workbooks in %d areas; ready now: %s" % (total, len(areas), ", ".join(sorted(ready))))
