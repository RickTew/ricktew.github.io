/* ============================================================================
   RickQuiz - self-contained "Find your path with Rick" quiz.
   Opens as an inline modal ON the current page (never navigates away).
   Adapted from a quiz-engine pattern, rewritten for Rick Tew:
   a "What kind of warrior are you" quiz that maps to RTMS, Winjitsu, a live-in
   camp, or coaching.

   USAGE on a host page:
     <script src="js/rick-quiz.js"></script>
     <button onclick="RickQuiz.open()">Find your path with Rick</button>

   THEMING: the modal reads CSS custom properties off :root, all optional.
     --rq-bg, --rq-card, --rq-ink, --rq-muted, --rq-line, --rq-optbg,
     --rq-accent, --rq-on-accent, --rq-accent2, --rq-on-accent2,
     --rq-badge-bg, --rq-panel, --rq-radius, --rq-font
   Rick's gold fallbacks are used when a variable is absent, so the quiz always
   looks intentional even on a page that sets nothing.
   ========================================================================== */
(function () {
  "use strict";
  if (window.RickQuiz) return;

  // Where the result CTAs point. Real Rick destinations on this same site.
  var LINKS = {
    rtms: "/rtms/",
    winjitsu: "/winjitsu/",
    camp: "/camps/",
    coaching: "/solutions/",
    ninjagym: "https://ninjagym.com",
    contact: "/aininja/#opt-8c",
  };

  var QUIZ = {
    brand: { initial: "RT", name: "Rick Tew", tag: "find your path" },
    hook: {
      h1: "What kind of warrior are you?",
      sub: "Four quick taps. No wrong answers. Rick trains people for the body, the mind, or both. This points you at the right one.",
      primary: "Start",
      ghost: "Maybe later",
    },
    questions: [
      { key: "goal", q: "What are you really here to level up?", sub: "One tap to begin.",
        opts: [
          { em: "🥷", t: "My body. Real skill, real movement", v: "rtms" },
          { em: "🧠", t: "My mind. Focus, confidence, drive", v: "winjitsu" },
          { em: "🔥", t: "Everything. I want a full reset", v: "camp" },
          { em: "🎯", t: "My results. Execute on what I already know", v: "coaching" },
        ] },
      { key: "tried", q: "Where are you starting from?",
        opts: [
          { t: "Total beginner, and proud of it", v: "new" },
          { t: "I have trained before", v: "some" },
          { t: "I am serious. I want the real thing", v: "lots" },
        ] },
      { key: "timeline", q: "When do you want to feel the change?",
        opts: [
          { t: "Someday", v: "someday" },
          { t: "This year", v: "year" },
          { t: "As soon as possible", v: "asap" },
        ] },
      { key: "invest", q: "Real training is a real commitment. Where are you?",
        opts: [
          { t: "Just scouting for now", v: "explore" },
          { t: "Open if it is the right fit", v: "open" },
          { t: "Ready to go all in", v: "ready" },
        ] },
    ],
    paths: {
      rtms: { name: "RTMS, the Martial Science", line: "Rick Tew's Martial Science. Movement, not moves. A self-powered, five-level ninja-MMA system you make your own." },
      winjitsu: { name: "Winjitsu, the mental martial art", line: "The True Art of Winning. Train the mind to beat the negative Ninja: fear, doubt, stress, and the voice that says quit." },
      camp: { name: "the Camp of Martial Science", line: "Live in, train hard, come out different. Ninja-MMA, self-defense, adventure, and Winjitsu in one immersion." },
      coaching: { name: "coaching with Rick", line: "Get a Black Belt in what you DO. Strategy, action, and the BLAST workshop to turn what you know into what you ship." },
    },
    pathKey: function (a) { return a.goal; },
    qualify: function (a) { return a.invest === "ready" || (a.timeline === "asap" && a.invest !== "explore"); },
    calcMsgs: ["Reading your answers...", "Mapping your path...", "Almost there..."],
    contact: {
      h: "Your path is locked in.",
      sub: "Where should Rick send it, with your suggested first step?",
      button: "Show my path",
      fine: "Private. Rick or his team reply personally, and you can opt out any time.",
    },
    summary: function (a) {
      return [
        ["Focus", { rtms: "Body / martial skill", winjitsu: "Mind / mental game", camp: "Full reset", coaching: "Results / execution" }[a.goal] || "-"],
        ["Timeline", { someday: "Someday", year: "This year", asap: "As soon as possible" }[a.timeline] || "-"],
        ["Readiness", { explore: "Scouting", open: "Open if right", ready: "All in" }[a.invest] || "-"],
      ];
    },
    // CTA links vary by which path they landed on.
    ctaFor: function (pathKey, qualified) {
      var go = LINKS[pathKey] || LINKS.coaching;
      if (qualified) {
        return {
          badge: "You are ready. Let's train.",
          ctas: [
            { label: "See how to start", go: go },
            { label: "Or message Rick directly", go: LINKS.contact },
          ],
        };
      }
      return {
        badge: "Good place to start",
        ctas: [
          { label: "Explore this path first", go: go },
        ],
      };
    },
  };

  // -- injected styles (scoped under .rq-root, theme via CSS vars on :root) ----
  var CSS = `
  .rq-root{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;
    justify-content:center;padding:18px;
    background:rgba(6,9,15,.66);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
    font-family:var(--rq-font,-apple-system,"Segoe UI","Helvetica Neue",Arial,sans-serif);
    opacity:0;transition:opacity .28s ease}
  .rq-root.rq-in{opacity:1}
  .rq-card{position:relative;width:100%;max-width:440px;max-height:calc(100dvh - 36px);overflow:auto;
    background:var(--rq-card,#0f1622);color:var(--rq-ink,#e8eaf4);
    border:1px solid var(--rq-line,#1f2d45);
    border-radius:var(--rq-radius,20px);box-shadow:0 30px 80px rgba(0,0,0,.55);
    transform:translateY(14px) scale(.985);transition:transform .3s cubic-bezier(.2,.8,.2,1)}
  .rq-root.rq-in .rq-card{transform:none}
  .rq-close{position:absolute;top:12px;right:12px;width:34px;height:34px;border:none;cursor:pointer;
    border-radius:50%;background:var(--rq-panel,#162030);color:var(--rq-muted,#6a6d8a);
    font-size:18px;line-height:1;display:flex;align-items:center;justify-content:center;z-index:3}
  .rq-close:hover{filter:brightness(1.25)}
  .rq-close:focus-visible{outline:2px solid var(--rq-accent,#f5a100);outline-offset:2px}
  .rq-pad{padding:34px 28px 30px}
  .rq-brand{display:flex;align-items:center;gap:10px;margin-bottom:6px}
  .rq-logo{width:36px;height:36px;border-radius:10px;background:var(--rq-accent,#f5a100);
    color:var(--rq-on-accent,#090d15);font-weight:800;display:flex;align-items:center;
    justify-content:center;font-size:15px;letter-spacing:.02em}
  .rq-brand b{font-size:15px;color:var(--rq-ink,#e8eaf4);display:block;line-height:1.2}
  .rq-brand span{font-size:11.5px;color:var(--rq-muted,#6a6d8a);text-transform:lowercase;letter-spacing:.02em}
  .rq-prog{display:flex;gap:6px;margin:18px 0 22px}
  .rq-dot{height:5px;flex:1;border-radius:3px;background:var(--rq-line,#1f2d45);transition:.3s}
  .rq-dot.on{background:var(--rq-accent,#f5a100)}
  .rq-h1{font-size:24px;line-height:1.2;font-weight:800;margin:2px 0 8px}
  .rq-q{font-size:21px;line-height:1.24;font-weight:800;margin-bottom:4px}
  .rq-sub{color:var(--rq-muted,#6a6d8a);font-size:14.5px;line-height:1.5;margin-bottom:20px}
  .rq-opt{display:flex;align-items:center;gap:10px;width:100%;text-align:left;
    border:1.5px solid var(--rq-line,#1f2d45);background:var(--rq-optbg,#162030);
    border-radius:14px;padding:15px 16px;font-size:16px;font-weight:600;
    color:var(--rq-ink,#e8eaf4);margin-bottom:11px;cursor:pointer;transition:.14s;font-family:inherit}
  .rq-opt:hover{border-color:var(--rq-accent,#f5a100);transform:translateY(-1px)}
  .rq-opt:focus-visible{outline:2px solid var(--rq-accent,#f5a100);outline-offset:2px}
  .rq-opt:active{transform:scale(.99)}
  .rq-em{font-size:19px}
  .rq-cta{display:block;width:100%;border:none;border-radius:14px;padding:16px;font-size:16.5px;
    font-weight:800;color:var(--rq-on-accent,#090d15);background:var(--rq-accent,#f5a100);
    cursor:pointer;margin-top:6px;font-family:inherit;transition:.14s}
  .rq-cta:hover{filter:brightness(1.06)}
  .rq-cta:focus-visible{outline:2px solid var(--rq-ink,#e8eaf4);outline-offset:2px}
  .rq-cta:active{transform:scale(.99)}
  .rq-cta.alt{background:var(--rq-accent2,#f5a100);color:var(--rq-on-accent2,#090d15)}
  .rq-ghost{display:block;width:100%;text-align:center;background:none;border:none;
    color:var(--rq-muted,#6a6d8a);font-size:14px;font-weight:600;margin-top:13px;
    cursor:pointer;text-decoration:underline;font-family:inherit}
  .rq-ghost:focus-visible{outline:2px solid var(--rq-accent,#f5a100);outline-offset:2px;border-radius:6px}
  .rq-field{width:100%;border:1.5px solid var(--rq-line,#1f2d45);border-radius:12px;padding:14px;
    font-size:16px;margin-bottom:11px;font-family:inherit;background:var(--rq-optbg,#162030);
    color:var(--rq-ink,#e8eaf4)}
  .rq-field::placeholder{color:var(--rq-muted,#6a6d8a)}
  .rq-field:focus{outline:none;border-color:var(--rq-accent,#f5a100)}
  .rq-tiny{font-size:11.5px;color:var(--rq-muted,#6a6d8a);text-align:center;margin-top:12px;line-height:1.5}
  .rq-calc{text-align:center;padding:52px 28px 56px}
  .rq-ring{width:60px;height:60px;border:6px solid var(--rq-line,#1f2d45);
    border-top-color:var(--rq-accent,#f5a100);border-radius:50%;margin:0 auto 22px;
    animation:rq-spin .9s linear infinite}
  @keyframes rq-spin{to{transform:rotate(360deg)}}
  .rq-bar{height:8px;background:var(--rq-line,#1f2d45);border-radius:5px;overflow:hidden;margin:22px 0 10px}
  .rq-bar i{display:block;height:100%;width:0;border-radius:5px;
    background:linear-gradient(90deg,var(--rq-accent,#f5a100),var(--rq-accent2,#f5a100));transition:width .25s}
  .rq-badge{display:inline-block;font-size:11.5px;font-weight:800;letter-spacing:.09em;
    text-transform:uppercase;color:var(--rq-accent,#f5a100);background:var(--rq-badge-bg,rgba(245,161,0,.14));
    padding:6px 13px;border-radius:999px;margin-bottom:12px}
  .rq-path{font-size:26px;font-weight:800;line-height:1.14;margin-bottom:8px}
  .rq-answers{background:var(--rq-panel,#162030);border-radius:14px;padding:14px 16px;margin:18px 0;font-size:13.5px}
  .rq-answers div{display:flex;justify-content:space-between;gap:12px;padding:5px 0;color:var(--rq-muted,#6a6d8a)}
  .rq-answers b{color:var(--rq-ink,#e8eaf4);text-align:right}
  .rq-fade{animation:rq-fade .35s ease}
  @keyframes rq-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    .rq-root,.rq-card,.rq-fade{transition:none;animation:none}
    .rq-ring{animation:rq-spin 1.6s linear infinite}
  }`;

  var root = null, card = null, state = null, lastFocus = null, styleEl = null;

  function ensureStyle() {
    if (styleEl) return;
    styleEl = document.createElement("style");
    styleEl.setAttribute("data-rickquiz", "");
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);
  }

  function esc(s) { return String(s == null ? "" : s); }

  function brandHTML() {
    return '<div class="rq-brand"><div class="rq-logo">' + esc(QUIZ.brand.initial) +
      '</div><div><b>' + esc(QUIZ.brand.name) + '</b><span>' + esc(QUIZ.brand.tag) + '</span></div></div>';
  }
  function dotsHTML() {
    return '<div class="rq-prog">' + QUIZ.questions.map(function (_, i) {
      return '<span class="rq-dot ' + (i <= state.step ? "on" : "") + '"></span>';
    }).join("") + '</div>';
  }
  function shell(inner, withProgress) {
    card.innerHTML = '<button class="rq-close" aria-label="Close quiz" onclick="RickQuiz.close()">✕</button>' +
      '<div class="rq-pad rq-fade">' + brandHTML() + (withProgress ? dotsHTML() : "") + inner + '</div>';
    focusFirst();
  }

  function focusFirst() {
    var el = card.querySelector(".rq-opt, .rq-cta, .rq-field");
    if (el) try { el.focus(); } catch (e) {}
  }

  function showHook() {
    shell('<div class="rq-h1">' + esc(QUIZ.hook.h1) + '</div><p class="rq-sub">' + esc(QUIZ.hook.sub) + '</p>' +
      '<button class="rq-cta" onclick="RickQuiz._next()">' + esc(QUIZ.hook.primary) + '</button>' +
      (QUIZ.hook.ghost ? '<button class="rq-ghost" onclick="RickQuiz.close()">' + esc(QUIZ.hook.ghost) + '</button>' : ""), false);
  }

  function showQuestion() {
    var q = QUIZ.questions[state.step];
    shell('<div class="rq-q">' + esc(q.q) + '</div>' +
      (q.sub ? '<p class="rq-sub">' + esc(q.sub) + '</p>' : '<div style="height:14px"></div>') +
      q.opts.map(function (o) {
        return '<button class="rq-opt" onclick="RickQuiz._pick(\'' + q.key + '\',\'' + o.v + '\')">' +
          (o.em ? '<span class="rq-em">' + o.em + '</span>' : "") + '<span>' + esc(o.t) + '</span></button>';
      }).join(""), true);
  }

  function showCalc() {
    card.innerHTML = '<button class="rq-close" aria-label="Close quiz" onclick="RickQuiz.close()">✕</button>' +
      '<div class="rq-calc rq-fade"><div class="rq-ring"></div>' +
      '<div class="rq-q" style="font-size:20px">Reading your path...</div>' +
      '<div class="rq-bar"><i id="rq-pbar"></i></div>' +
      '<p class="rq-sub" id="rq-pmsg" style="margin-top:8px">' + esc(QUIZ.calcMsgs[0]) + '</p></div>';
    var p = 0, m = 0;
    var bar = document.getElementById("rq-pbar"), msg = document.getElementById("rq-pmsg");
    var t = setInterval(function () {
      p += Math.random() * 16 + 8; if (p > 100) p = 100; bar.style.width = p + "%";
      if (p > 33 && m < 1) { m = 1; msg.textContent = QUIZ.calcMsgs[1]; }
      if (p > 72 && m < 2) { m = 2; msg.textContent = QUIZ.calcMsgs[2]; }
      if (p >= 100) { clearInterval(t); setTimeout(showContact, 360); }
    }, 300);
  }

  function showContact() {
    var c = QUIZ.contact;
    shell('<div class="rq-q">' + esc(c.h) + '</div><p class="rq-sub">' + esc(c.sub) + '</p>' +
      '<input class="rq-field" id="rq-nm" placeholder="First name" autocomplete="given-name">' +
      '<input class="rq-field" id="rq-em" type="email" placeholder="Email address" autocomplete="email">' +
      '<button class="rq-cta alt" onclick="RickQuiz._finish()">' + esc(c.button) + '</button>' +
      '<p class="rq-tiny">' + esc(c.fine) + '</p>', false);
  }

  function showResults() {
    var a = state.answers;
    var key = QUIZ.pathKey(a);
    var path = QUIZ.paths[key] || QUIZ.paths[Object.keys(QUIZ.paths)[0]];
    var ok = QUIZ.qualify(a);
    var res = QUIZ.ctaFor(key, ok);
    var rows = QUIZ.summary(a);
    shell('<div class="rq-badge">' + esc(res.badge) + '</div>' +
      '<div class="rq-path">' + (state.name ? esc(state.name) + ", " : "") + esc(path.name) + '</div>' +
      '<p class="rq-sub">' + esc(path.line) + '</p>' +
      '<div class="rq-answers">' + rows.map(function (r) {
        return '<div><span>' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></div>';
      }).join("") + '</div>' +
      res.ctas.map(function (c, i) {
        return i === 0
          ? '<button class="rq-cta ' + (ok ? "alt" : "") + '" onclick="RickQuiz._go(\'' + c.go + '\')">' + esc(c.label) + '</button>'
          : '<button class="rq-ghost" onclick="RickQuiz._go(\'' + c.go + '\')">' + esc(c.label) + '</button>';
      }).join(""), false);
  }

  function onKey(e) { if (e.key === "Escape") RickQuiz.close(); }

  var RickQuiz = {
    open: function () {
      ensureStyle();
      lastFocus = document.activeElement;
      state = { step: 0, answers: {}, phase: undefined, name: "" };
      root = document.createElement("div");
      root.className = "rq-root";
      root.setAttribute("role", "dialog");
      root.setAttribute("aria-modal", "true");
      root.setAttribute("aria-label", "Find your path with Rick quiz");
      card = document.createElement("div");
      card.className = "rq-card";
      root.appendChild(card);
      root.addEventListener("mousedown", function (e) { if (e.target === root) RickQuiz.close(); });
      document.addEventListener("keydown", onKey);
      document.body.appendChild(root);
      document.body.style.overflow = "hidden";
      showHook();
      requestAnimationFrame(function () { root.classList.add("rq-in"); });
    },
    close: function () {
      if (!root) return;
      var r = root; root = null; card = null;
      r.classList.remove("rq-in");
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      setTimeout(function () { if (r && r.parentNode) r.parentNode.removeChild(r); }, 300);
      if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
    },
    _pick: function (key, val) { state.answers[key] = val; RickQuiz._next(); },
    _next: function () {
      if (state.phase === undefined) { state.phase = "quiz"; state.step = 0; return showQuestion(); }
      state.step++;
      if (state.step < QUIZ.questions.length) return showQuestion();
      state.phase = "calc"; return showCalc();
    },
    _finish: function () {
      var nm = document.getElementById("rq-nm");
      state.name = (nm && nm.value ? nm.value.trim() : "");
      showResults();
    },
    _go: function (go) {
      if (/^https?:/.test(go)) window.open(go, "_blank", "noopener");
      else window.location.href = go; // relative page or mailto:
    },
    config: QUIZ,
  };

  window.RickQuiz = RickQuiz;
})();
