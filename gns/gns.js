/* Gooffy Ninja ShhT!! (/gns/): the page's behaviour, in plain JS.
   Ported 28 Sep 2026 from the NinjaGym Next.js components (GnsLanding,
   GnsVault, GnsQuiz, GnsMotion). The words are theirs, unchanged.
   There is no GNS checkout (NinjaGym removed it 28 Sep 2026): Enroll and
   contact go to the Letter Slot on /aininja/ with the request written in.
   No long dashes anywhere (GNS rule and site rule). */
(function () {
  "use strict";

  var ENROLL = "/aininja/?about=gns#opt-8c";
  var CONTACT = "/aininja/?about=gns-private#opt-8c";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp01 = function (n) { return n < 0 ? 0 : n > 1 ? 1 : n; };

  /* build an element: el("p", "cls", "text") or el("div", "cls", [children]) */
  function el(tag, cls, kids) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (kids == null) return n;
    if (!Array.isArray(kids)) kids = [kids];
    kids.forEach(function (k) {
      if (k == null || k === false) return;
      n.appendChild(typeof k === "string" ? document.createTextNode(k) : k);
    });
    return n;
  }
  function btn(cls, text, onClick) {
    var b = el("button", cls, text);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }

  /* ---------------- reveal on scroll ---------------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".gt-reveal"));
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (e) { e.classList.add("gt-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("gt-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (e) { io.observe(e); });
  }

  /* ---------------- belt selector ---------------- */
  var beltTabs = Array.prototype.slice.call(document.querySelectorAll("#gtBelts .gt-belt"));
  beltTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      beltTabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("gt-belt-on", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    });
  });

  /* ---------------- the vault: The Real ShhT ---------------- */
  var gv = document.getElementById("gv");
  var folder = document.getElementById("gvFolder");
  var file = document.getElementById("gvFile");
  var tapeTabs = Array.prototype.slice.call(file.querySelectorAll(".gv-tab"));
  var activeTape = "trms";

  function tapePanel(id) { return document.getElementById("tape-" + id); }
  function tapeVideo(id) { return tapePanel(id).querySelector("video"); }

  document.getElementById("gvDeclass").addEventListener("click", function () {
    folder.hidden = true;
    file.hidden = false;
    tapeVideo(activeTape).preload = "metadata";
    renderRegions(); // an open world file starts again on photo 1
    // bring the opened file to the top so the tapes are in view
    requestAnimationFrame(function () {
      gv.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  });
  document.getElementById("gvReseal").addEventListener("click", function () {
    tapeVideo(activeTape).pause();
    if (rotator) { clearInterval(rotator); rotator = null; }
    file.hidden = true;
    folder.hidden = false;
  });

  tapeTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-tape");
      tapeVideo(activeTape).pause(); // pause whatever was playing before switching
      activeTape = id;
      tapeTabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("gv-tab-on", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
        tapePanel(t.getAttribute("data-tape")).hidden = !on;
      });
      var v = tapeVideo(id);
      if (v.preload === "none") v.preload = "metadata";
    });
  });

  Array.prototype.slice.call(file.querySelectorAll(".gv-feature-lock")).forEach(function (lock) {
    lock.addEventListener("click", function () {
      var v = lock.parentNode.querySelector("video");
      lock.remove();
      v.controls = true;
      v.muted = false; // the click is a user gesture, so audio is allowed
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
  });

  /* the world files: three regional dossiers with rotating photo evidence */
  var WORLD = "/aininja/assets/story/ninja/world/";
  var REGIONS = [
    { id: "usa", code: "File 01", title: "United States", tag: "Camps in the mountains of California",
      text: [
        "This is where it started. First classes at 16, his own dojo at 19, and then the thing nobody in the industry had done before: live-in Ninja Training Camps. Rick founded the College of Martial Science (CMS) and ran camps in the mountains of California by Yosemite National Park, where students lived, trained and got thrown down hills full time.",
        "The C.A.N.U. tours took students from around the world across California: Yosemite, Joshua Tree, rock faces, rope work and the occasional flying kick over the Grand Canyon (documented, see photo)."
      ],
      photos: [
        ["us-early-years", "The early years. The training started in his teens and never stopped"],
        ["us-yosemite-rappel", "CMS camp life by Yosemite: ropes, granite and real heights"],
        ["us-camp-crew", "A CMS camp crew in the California mountains"],
        ["us-camp-spar", "Sparring on a mountaintop. The dojo is wherever you stand"],
        ["us-joshua-tree", "Rope work in the desert on a C.A.N.U. tour, Joshua Tree"],
        ["us-tour-yosemite", "C.A.N.U. tours: students from around the world, Yosemite included"],
        ["us-press-warrior", "Warrior Within: a flying kick over the Grand Canyon, in International Lifestyle Magazine"],
        ["us-press-blackbelt", "In print: Rick's warrior-of-life philosophy in the press"]
      ] },
    { id: "europe", code: "File 02", title: "Europe", tag: "Magazine covers, TV and universities",
      text: [
        "At 21 Rick moved to Holland and stayed for over 6 years: Amsterdam, Rotterdam, Delft and the Naarden-Bussum area he still calls a second home. He got quite popular there. Magazine covers, in the news, on TV, and he was even offered a role in a Dutch film (he declined, students come first).",
        "He lectured at universities like TU Delft and spoke at companies like HP. Holland is also where he first introduced level one of Winjitsu, the mental martial art that later became 5 books."
      ],
      photos: [
        ["eu-holland-banner", "NinjaGym Holland. A second home"],
        ["eu-speaking", "On stage in Holland: talks, demos and the TV years"],
        ["eu-lectures", "Public speaking and seminars, from universities to company events"],
        ["eu-press", "Magazine features from the European years"],
        ["winjitsu-books", "Winjitsu level one was born in Holland. It grew into 5 books"]
      ] },
    { id: "asia", code: "File 03", title: "Asia", tag: "NinjaGym: the center, the app, the island",
      text: [
        "Rick has lived in Singapore, the Philippines and Thailand. On Koh Samui he built NinjaGym from zero: the training center, the kids belt program, the island adventures, and the app that runs the whole thing (memberships, check-ins, the works).",
        "This is where the Gooffy Ninja ShhT lives today. Jungle training, beach kicks, and a founder who has done the moving-abroad thing enough times to teach it. Martial arts, self-help, travel, building a life in a new country: it is all in this file."
      ],
      photos: [
        ["asia-founder", "Founder of NinjaGym. Still does the splits, still shows off"],
        ["asia-ninjagym", "Inside NinjaGym on Koh Samui: red mats, real training"],
        ["asia-island", "Island mode: beach sparring, Muay Thai rings and jungle ropes"],
        ["asia-press-thailand", "Training in Thailand, featured in International Lifestyle Magazine"]
      ] }
  ];

  // Only one region is open at a time; opening one reseals the others, so a
  // reader clicks each file open again, like a proper classified archive.
  var regionsBox = document.getElementById("gvRegions");
  var openRegion = null, rotator = null;

  function renderRegions() {
    if (rotator) { clearInterval(rotator); rotator = null; }
    regionsBox.textContent = "";
    REGIONS.forEach(function (r) {
      if (openRegion !== r.id) {
        var sealed = btn("gv-region gv-region-sealed", [
          el("span", "gv-stamp gv-region-stamp", "Classified"),
          el("span", "gv-region-code", r.code),
          el("span", "gv-region-title", r.title),
          el("span", "gv-region-tag", r.tag),
          el("span", "gv-region-open", "Open file 📂")
        ], function () { openRegion = r.id; renderRegions(); });
        regionsBox.appendChild(sealed);
        return;
      }
      var idx = 0; // a fresh open always starts on photo 1
      var img = el("img");
      img.loading = "lazy";
      var cap = el("p", "gv-region-cap");
      var dots = el("div", "gv-region-dots");
      dots.setAttribute("role", "tablist");
      dots.setAttribute("aria-label", r.title + " photos");
      var dotBtns = r.photos.map(function (p, i) {
        var d = btn("gv-region-dot", null, function () { show(i); });
        d.setAttribute("role", "tab");
        d.setAttribute("aria-label", "Photo " + (i + 1) + " of " + r.photos.length);
        dots.appendChild(d);
        return d;
      });
      function show(i) {
        idx = i;
        img.src = WORLD + r.photos[i][0] + ".webp";
        img.alt = r.photos[i][1];
        cap.textContent = r.photos[i][1];
        dotBtns.forEach(function (d, j) {
          d.classList.toggle("gv-region-dot-on", j === i);
          d.setAttribute("aria-selected", j === i ? "true" : "false");
        });
      }
      show(0);
      var text = el("div", "gv-region-text", r.text.map(function (t) { return el("p", null, t); }));
      text.appendChild(btn("gv-reseal gv-region-reseal", "Reseal this file 🤐", function () { openRegion = null; renderRegions(); }));
      regionsBox.appendChild(el("div", "gv-region gv-region-open-file", [
        el("div", "gv-region-head", [el("span", "gv-region-code", r.code), el("span", "gv-region-title", r.title)]),
        el("div", "gv-region-body", [el("div", "gv-region-photo", [img, cap, dots]), text])
      ]));
      if (!reduced) rotator = setInterval(function () { show((idx + 1) % r.photos.length); }, 4200);
    });
  }
  renderRegions();

  /* ---------------- the quiz: Which Gooffy Ninja are you? ----------------
     A branching quiz, about 2 minutes: the first answer routes into a
     per-path question set, then everyone gets the personality block and the
     shared tail. No email capture (Rick, 6 Jul 2026: "we don't need to
     collect emails"). */
  function Q(key, q, sub, opts) { return { key: key, q: q, sub: sub, opts: opts }; }
  function O(em, t, d, v) { return { em: em, t: t, d: d, v: v }; }

  var Q_PULL = Q("pull", "What pulls you in most?", "One tap. The whole quiz reshapes itself around your answer.", [
    O("🥷", "Learning real ninja skills", null, "skills"),
    O("🧠", "Coaching for my life, not just kicks", null, "coach"),
    O("😂", "The fun, goofy vibe", null, "fun"),
    O("🎮", "Train by day, game by night", null, "gamer"),
    O("🏝️", "A reset in tropical paradise", null, "reset"),
    O("🛫", "Getting away from my life back home", null, "escape")]);

  var Q_FLAVOR = Q("flavor", "Ninja skills come in flavors. Pick yours.", "Yes, all of these exist here. That is kind of the point.", [
    O("🥷", "Old school ninja skills", "Rolls, falls, stealth, the classic art", "oldschool"),
    O("⚔️", "Ninja tools", "Nunchaku, bo, sword, the toolbox", "tools"),
    O("🛡️", "Self-defense", "Practical protection that actually works", "defense"),
    O("🌱", "An introduction to martial arts", "Never trained? Perfect starting line", "intro"),
    O("📜", "The Ninja Menu", "Choose what to learn, session by session", "menu"),
    O("🎈", "Just to play", "Games, obstacles, zero seriousness", "play")]);
  var Q_LEVEL = Q("level", "Your ninja level, honestly?", null, [
    O(null, "Total newbie (noodle arms)", null, "newbie"),
    O(null, "Dabbled in some training", null, "some"),
    O(null, "Trained for real before", null, "trained")]);

  var Q_CFORMAT = Q("cformat", "How do you like your coaching?", null, [
    O("🎯", "1-on-1 with Rick", "Full attention, nowhere to hide", "one"),
    O("🤝", "A small group of 2 to 6", "Intimate, but with witnesses", "small"),
    O("🔥", "Full group energy", "The room does half the work", "group")]);
  var Q_WAREA = Q("warea", "Winjitsu has 5 areas. Which one is calling?", "The mental martial art: 5 books, 20 chapters each. 100 skills, one finger at a time.", [
    O("🃏", "ACE", "Achieving Combined Excellence: positive thinking and synergy", "ace"),
    O("⚡", "MAK", "Motivation, Action, Knowledge: the engine of achievement", "mak"),
    O("☯️", "MBS", "Mind, Body, Spirit: get all three of you on one team", "mbs"),
    O("🧬", "NRG", "Neuro Reasons for Growth: energy, state and emotional mastery", "nrg"),
    O("🎨", "CMT", "Creative Mental Training: a daily practice for your imagination", "cmt")]);
  var WSUBS = {
    ace: Q("wsub", "Inside ACE, where do we start?", "Straight from the chapters of book one.", [
      O(null, "Deciding to be an ACE (choose your adventure)", null, "decide"),
      O(null, "A thumbs up attitude (live on the bright side)", null, "attitude"),
      O(null, "Design your destiny (values, direction, synergy)", null, "destiny")]),
    mak: Q("wsub", "Inside MAK, what needs the most work?", "Straight from the chapters of book two.", [
      O(null, "Motivation moves you (goals and the Big Boss)", null, "motivation"),
      O(null, "Lights, camera, action! (no one is coming)", null, "action"),
      O(null, "Knowledge is a key (fear, doubt and falling forward)", null, "knowledge")]),
    mbs: Q("wsub", "Inside MBS, which of the three is lagging?", "Straight from the chapters of book three.", [
      O(null, "Mind strategies (win without fighting)", null, "mind"),
      O(null, "Body strategies (air, water, food, rest)", null, "body"),
      O(null, "Spirit strategies (less stress is best)", null, "spirit")]),
    nrg: Q("wsub", "Inside NRG, what should we work on first?", "Straight from the chapters of book four.", [
      O(null, "My state of mind (change is a choice)", null, "state"),
      O(null, "Blow away my fear (pain-pleasure principle)", null, "fear"),
      O(null, "Picture perfect (mind movies and physiology)", null, "imagery")]),
    cmt: Q("wsub", "Inside CMT, what sounds most like you?", "Straight from the chapters of book five.", [
      O(null, "Daily CMT (the Two Minute Ninja)", null, "daily"),
      O(null, "Mental kata (thinking in pictures)", null, "kata"),
      O(null, "My Personal Achievement Map (purpose, goals, vision)", null, "map")])
  };

  var Q_FUNSTYLE = Q("funstyle", "What does the perfect goofy session look like?", null, [
    O("🥋", "Silly drills that sneak in real skills", null, "silly"),
    O("🏃", "Ninja games, obstacles and challenges", null, "games"),
    O("🎉", "Group chaos with my crew", null, "chaos"),
    O("🎁", "Surprise me, sensei", null, "surprise")]);
  var Q_GBALANCE = Q("gbalance", "Your day-night balance?", null, [
    O("💪", "Train hard, game hard", null, "hardcore"),
    O("😎", "Casual on both, heavy on fun", null, "casual"),
    O("🖥️", "Honestly, the game room is half the draw", null, "lan")]);
  var Q_RFOCUS = Q("rfocus", "What needs the reset most?", null, [
    O("🔋", "My body and energy", null, "bodyr"),
    O("🌪️", "My head: stress and noise", null, "mindr"),
    O("🧭", "My direction in life", null, "direction"),
    O("🫠", "Honestly, all of it", null, "all")]);
  var Q_EWHY = Q("ewhy", "What are you escaping?", "No judgment. Rick has started over on three continents.", [
    O("🔥", "Burnout. I am cooked", null, "burnout"),
    O("🔁", "The same week on repeat", null, "routine"),
    O("📕", "A chapter that just ended", null, "chapter"),
    O("🗺️", "Nothing dramatic, I just need distance", null, "distance")]);
  var Q_EPLAN = Q("eplan", "And the Thailand plan?", null, [
    O(null, "A 2-week taste of a different life", null, "taste"),
    O(null, "Scouting a real move abroad", null, "scout"),
    O(null, "Stay as long as it feels right", null, "long")]);

  var Q_BLEND = Q("blend", "What are we actually training?", "GNS runs both channels. You pick the mix.", [
    O("🦵", "Body first, kicks and skills", null, "body"),
    O("🧠", "Mind first, Winjitsu and coaching", null, "mind"),
    O("🥷", "Both. The full ninja", null, "both")]);
  var Q_SOCIAL = Q("social", "Introvert, extrovert, or somewhere in between?", "Ninjas come in all three. The training adjusts.", [
    O("🌑", "Introvert", "Recharge alone, small doses of people", "intro"),
    O("☀️", "Extrovert", "People ARE the recharge", "extro"),
    O("🌗", "A mix, depends on the day", null, "ambi")]);
  var Q_LEARN = Q("learn", "How do you actually learn best?", null, [
    O("👁️", "Show me", "Demos, pictures, watching it done", "visual"),
    O("👂", "Talk me through it", "Explanations, stories, the why", "audio"),
    O("✋", "Let me try it", "Hands on, fail forward, repeat", "hands")]);
  var Q_VIBE = Q("vibe", "Jokes and fun, or strictly serious?", "Honest answers only. This one actually matters.", [
    O("😂", "Jokes please, fun is the point", null, "goofy"),
    O("🎭", "Fun, with serious moments when it counts", null, "both"),
    O("🧊", "Strictly serious training", null, "serious")]);
  var Q_LIVE = Q("live", "Sleeping arrangements: how do you feel about sharing?", "GNS lodging is shared, ninja-dorm style. No wrong answer, but be honest.", [
    O("🛏️", "Bunking with fellow ninjas? Easy", null, "dorm"),
    O("🏠", "I need my own room or place", null, "own")]);
  var Q_WHO = Q("who", "Who is sneaking off to Koh Samui?", null, [
    O(null, "Just me", null, "self"),
    O(null, "Me plus my kids / family", null, "family"),
    O(null, "Me and some friends", null, "friends")]);
  var Q_STAY = Q("stay", "How long could you escape?", null, [
    O(null, "Maybe a week", null, "short"),
    O(null, "The full 2 weeks", null, "two"),
    O(null, "Longer if I love it", null, "long")]);
  var Q_READY = Q("ready", "How ready are you to book?", null, [
    O(null, "Just dreaming for now", null, "dream"),
    O(null, "Soon, if it is the right fit", null, "soon"),
    O(null, "I'm ready, sign me up", null, "now")]);

  /* the ordered question flow, branching on earlier answers */
  function buildFlow(a) {
    var flow = [Q_PULL];
    switch (a.pull) {
      case "skills": flow.push(Q_FLAVOR, Q_LEVEL, Q_BLEND); break;
      case "coach":
        flow.push(Q_CFORMAT, Q_WAREA);
        if (a.warea && WSUBS[a.warea]) flow.push(WSUBS[a.warea]);
        flow.push(Q_BLEND);
        break;
      case "fun": flow.push(Q_FUNSTYLE, Q_BLEND); break;
      case "gamer": flow.push(Q_GBALANCE, Q_FLAVOR, Q_BLEND); break;
      case "reset": flow.push(Q_RFOCUS, Q_BLEND); break;
      case "escape": flow.push(Q_EWHY, Q_EPLAN, Q_BLEND); break;
    }
    if (a.pull) flow.push(Q_SOCIAL, Q_LEARN, Q_VIBE, Q_LIVE, Q_WHO, Q_STAY, Q_READY);
    return flow;
  }

  /* result content */
  var PATHS = {
    skills: { noun: "Strategist", line: "You are here for the real deal. We build your skills level by level, no fluff." },
    coach: { noun: "Mind Ninja", line: "You want the Winjitsu side: mindset, life strategy and coaching from a certified Strategic Intervention coach (yes, the Tony Robbins school). The kicks are a bonus." },
    fun: { noun: "Grinner", line: "You want skills AND a laugh. Perfect, that is the whole point of Gooffy Ninja ShhT." },
    gamer: { noun: "Gamer Ninja", line: "Train by day, game by night. The mat and the game room are both calling your name." },
    reset: { noun: "Resetter", line: "Skills, sun, and a proper reset. Koh Samui plus ninja training is exactly your kind of escape." },
    escape: { noun: "Escaper", line: "New country, new rhythm, new you. GNS is a 2-week test drive of a life in Thailand." }
  };
  var SOCIAL_ADJ = { intro: "Shadow", extro: "Thunder", ambi: "Twilight" };

  function typeName(a) {
    var adj = SOCIAL_ADJ[a.social] || "Gooffy";
    var noun = (PATHS[a.pull] || {}).noun || "Ninja";
    return "The " + adj + " " + noun;
  }

  /* a compact four-letter tag, ninja edition: social / learning / vibe / blend */
  function ninjaCode(a) {
    var s = { intro: ["S", "Shadow"], extro: ["T", "Thunder"], ambi: ["W", "Twilight"] }[a.social];
    var l = { visual: ["V", "Visual"], audio: ["A", "Auditory"], hands: ["H", "Hands-on"] }[a.learn];
    var v = { goofy: ["G", "Goofy"], both: ["X", "Fun+serious"], serious: ["Z", "Serious"] }[a.vibe];
    var b = { body: ["B", "Body"], mind: ["M", "Mind"], both: ["F", "Full ninja"] }[a.blend];
    if (!s || !l || !v || !b) return null;
    return { code: s[0] + l[0] + v[0] + b[0], gloss: s[1] + " / " + l[1] + " / " + v[1] + " / " + b[1] };
  }

  var SOCIAL_TICK = {
    intro: "You recharge in the shadows, so your GNS has built-in escape hatches: solo beach time, quiet corners, and nobody dragging you into a group hug.",
    extro: "You charge off people, and a live-in program full of fellow ninjas is basically your natural habitat. The group IS the battery.",
    ambi: "You run both modes: social when it is good, solo when you need it. A small live-in crew with optional everything is exactly your shape."
  };
  var LEARN_TICK = {
    visual: "You learn with your eyes, so demos come first and words second. Bonus: Winjitsu's CMT book is literally built on thinking in pictures and mind movies. You will feel at home.",
    audio: "You learn through talk: the why before the what. Good news, Rick teaches through stories and never runs out of them. The evening reviews will be your favorite class.",
    hands: "You learn by doing and falling forward (which is a real MAK chapter, by the way). The mat does not judge; it just gives feedback."
  };
  var VIBE_TICK = {
    goofy: "You want the laughs, and GNS is engineered around them: the goofy is the delivery system for very real skills.",
    both: "You like fun with teeth: silly on the surface, serious underneath. That is exactly how the sessions are built, so you will calibrate instantly.",
    serious: "You train serious. Respect. Read the fit note below though, because the group sessions here are deliberately playful."
  };

  /* honest screening notes so nobody lands uncomfortable */
  function fitNotes(a) {
    var notes = [];
    if (a.vibe === "serious") notes.push({ tone: "warn", text: "Straight talk: GNS group sessions run on jokes, games and deliberate goofiness (it is in the name). If you want strictly serious training, private 1-on-1 sessions with Rick are a better fit. They are booked separately at their own rate, so reach out through the contact page before enrolling and we will point you right." });
    if (a.live === "own") notes.push({ tone: "warn", text: "Heads up on housing: the program includes shared, dorm-style ninja lodging, and it is basically thrown in free, so skipping it does not change the price. Needing your own room or villa is completely fine: you arrange and cover that yourself nearby and keep everything else in the program. To make up for it, you get a private 1-on-1 meetup and chat with Rick (think Coffee and no Kicks), and we will happily point you to good spots nearby. Message us via the contact page." });
    if (a.who === "family") notes.push({ tone: "info", text: "Bringing kids or family? The GNS program itself is built for the adult; the kids plug into NinjaGym's regular classes and camps. Tell us ages via the contact page and we will map it out." });
    return notes;
  }

  var FLAVOR_LABEL = { oldschool: "Old school ninja skills", tools: "Ninja tools", defense: "Self-defense", intro: "Intro to martial arts", menu: "The Ninja Menu", play: "Just to play" };
  var FLAVOR_MIX = {
    oldschool: "Your mix leans classic: rolls, falls, stances and stealth, the foundation Rick has taught for more than 25 years (it is called Rick Tew's Martial Science for a reason).",
    tools: "Your mix leans hardware: nunchaku, bo, sword and friends. The same tools from the vault tapes, in your hands, at a speed your shins can survive.",
    defense: "Your mix leans practical: real self-defense, awareness and escapes. Skills you hopefully never use, carried lightly.",
    intro: "Your mix starts at the true beginning: a proper introduction to martial arts, built for people who have never bowed onto a mat in their life.",
    menu: "You picked the secret weapon: the Ninja Menu. NinjaGym keeps a real technique menu for every belt, and at GNS you get to order from it session by session. Today rolls, tomorrow nunchaku. Chef Tew cooks to order.",
    play: "Your mix is pure play: ninja games, obstacles and challenges. Warning: skills tend to sneak in while you are laughing."
  };
  var FLAVOR_INSIGHT = {
    oldschool: "You respect the source material. You do not want a workout dressed as ninjutsu, you want the art.",
    tools: "You are a hands-on learner. Give you an object and a goal and you will figure out the rest.",
    defense: "You think in real-world terms. Confidence, for you, has to be usable on a Tuesday.",
    intro: "Starting something from zero as an adult takes more guts than most black belt tests. Noted.",
    menu: "You like agency. Set menus bore you; you want to choose your own adventure, daily.",
    play: "You already know the secret: play IS training. Most adults forgot that. You did not."
  };
  var LEVEL_MIX = {
    newbie: "Noodle arms are welcome. Day one is built for exactly you, and the noodles firm up fast.",
    some: "You have dabbled, so we skip the boring parts and build on what your body already half-remembers.",
    trained: "You have trained for real, so Rick will meet you at your level and then move it."
  };
  var CFORMAT_LABEL = { one: "1-on-1", small: "Small group (2 to 6)", group: "Full group" };
  var CFORMAT_MIX = {
    one: "You chose 1-on-1: full attention, custom pace, nowhere to hide. At GNS that looks like daily coaching conversations with Rick himself, not a junior facilitator.",
    small: "You chose the small group, 2 to 6 people: enough intimacy to go deep, enough witnesses to keep you honest. Bring your own 2 to 6, or join a cohort.",
    group: "You chose full group energy: the room does half the work, and someone else's breakthrough becomes yours."
  };
  var WAREA_LABEL = {
    ace: "ACE: Achieving Combined Excellence", mak: "MAK: Motivation, Action, Knowledge", mbs: "MBS: Mind, Body, Spirit",
    nrg: "NRG: Neuro Reasons for Growth", cmt: "CMT: Creative Mental Training"
  };
  // result lines built from the real chapter material of each book
  var WSUB_MIX = {
    decide: "Starting point: Deciding to Be an ACE. Calculated risk, stretch past your limits, choose your adventure. Excellence starts as a decision, not a talent.",
    attitude: "Starting point: the Thumbs Up Attitude. Be young, have fun, live on the bright side. Yes, those are real chapter titles, and yes, they are trainable.",
    destiny: "Starting point: Design Your Destiny. Determine your values, pick a direction of thought, and let synergy do the heavy lifting.",
    motivation: "Starting point: Motivation Moves You. Goals, perception, and a chapter called The Big Boss (spoiler: it is you).",
    action: "Starting point: Lights, Camera, Action! Rick's chapter Nine says it plainly: No One Is Coming. So we start moving.",
    knowledge: "Starting point: Knowledge Is a Key. Fear, doubt and Falling Forward, straight out of the MAK book, where fear gets filed under fiction.",
    mind: "Starting point: Mind Strategies. Phases of combat, focus, and the best trick in the book: Win Without Fighting.",
    body: "Starting point: Body Strategies. The air you breathe, the water you drink, the food you eat, and actual rest. Simple, not easy.",
    spirit: "Starting point: Spirit Strategies. Less is more, less stress is best, and a chapter that literally presents you as the gift.",
    state: "Starting point: your state of mind. Change Is a Choice, passion is energy, and how you feel right now is trainable.",
    fear: "Starting point: Blow Away Your Fear. The pain-pleasure principle plus a battle shout (Hyah! is chapter 18, we are not joking).",
    imagery: "Starting point: Picture Perfect. Mind movies, 3D memory, and physiology: stand this way and the mind follows.",
    daily: "Starting point: Daily CMT, featuring the Two Minute Ninja. A mental training practice small enough to survive real life.",
    kata: "Starting point: Mental Kata. Thinking in pictures, positive creativity, and rehearsing the win before you throw it.",
    map: "Starting point: your Personal Achievement Map. Purpose, goals, declaration, vision, plan, and your own motto at the bottom."
  };
  var FUN_MIX = {
    silly: "Your style: silly drills with a hidden payload. You will be mid-laugh when you realize you just did a proper breakfall.",
    games: "Your style: ninja games, obstacles and challenges. The gym turns into a playground with a syllabus.",
    chaos: "Your style: group chaos. Bring the crew; shared ridiculousness is the fastest bonding agent known to science.",
    surprise: "Your style: surprise me. Good news, unpredictability is literally in Rick's student testimonials."
  };
  var GBAL_MIX = {
    hardcore: "Your split: train hard, game hard. Sweat all morning, respawn all evening. Balanced, as all things should be.",
    casual: "Your split: casual everything, fun first. The program bends to that beautifully.",
    lan: "Your split: the game room is half the draw. Zero shame. Rick has been LAN partying with students since Half-Life 1."
  };
  var RFOCUS_MIX = {
    bodyr: "Reset target: the body. Two weeks of movement, sun and actual sleep will do things a spa weekend only promises.",
    mindr: "Reset target: the head. Winjitsu was built to throw down the five mental demons: fear, doubt, negativity, stress and laziness. Stress is demon number four; consider it booked for a match.",
    direction: "Reset target: direction. This is exactly what Strategic Intervention coaching is for, and the beach is a better office than your kitchen table.",
    all: "Reset target: everything. Good. The program was literally designed as a full mind-body-spirit reboot, so you are not overasking."
  };
  var EWHY_MIX = {
    burnout: "You are cooked, so the recipe changes: slow mornings, coffee and kicks, naps that nobody judges, and training that gives energy back instead of taking it.",
    routine: "The same week on repeat ends the moment you land. No two GNS days match, and the Ninja Menu means even the training refuses to repeat itself.",
    chapter: "A chapter ended. Rick has closed a few of his own (left the USA at 21, left Europe after 6 years, started over in Asia), so you will be plotting the next one with someone who has actually done it.",
    distance: "Distance is healthy. 9,000 kilometers, a beach, and a nunchaku have fixed more heads than most people admit."
  };
  var EPLAN_MIX = {
    taste: "Plan: a 2-week taste of a different life. That is exactly the size of the program. Suspiciously convenient.",
    scout: "Plan: scouting a real move. Rick has set up life in Holland, Singapore, the Philippines and Thailand. Ask him ANYTHING about visas, rent and reality. He will not shut up about it.",
    long: "Plan: stay as long as it feels right. The extension ladder exists for exactly this ($1,000 per extra week, and week 3 is when the island really gets you)."
  };
  var BLEND_LABEL = { body: "Body first", mind: "Mind first", both: "Mind + body" };
  var BLEND_MIX = {
    body: "Blend: body first. Mornings on the mat carry the program, and the mind training rides along quietly in the background.",
    mind: "Blend: mind first. Winjitsu sessions and coaching conversations lead; the kicks keep the blood moving between ideas.",
    both: "Blend: the full ninja. Body in the morning, mind in the evening review. This is the mix the program was actually designed around."
  };

  /* per-path "perks unlocked": teach them something real on the way out.
     The Winjitsu app perk is for everyone (GNS students get full app use
     for their whole stay). */
  function perks(a) {
    var out = ["Your GNS stay includes full use of the Winjitsu app (the 5 books, drills, quizzes and belt tests, gamified), plus a free month to take home after. Train the mind between kicks."];
    if (a.pull === "coach" || a.blend === "mind") out.push("Winjitsu is 5 books, 20 chapters each: 100 skills mapped like a martial art. You just previewed the syllabus.");
    if (a.warea || a.rfocus === "mindr") out.push("Winjitsu names 5 mental demons: fear, doubt, negativity, stress and laziness. Naming yours is step one.");
    if (a.flavor === "menu" || a.pull === "skills" || a.ewhy === "routine") out.push("The Ninja Menu is real: NinjaGym keeps a technique menu for every belt, and at GNS you can order from it session by session.");
    if (a.pull === "coach" || a.rfocus === "direction") out.push("Rick is a certified Strategic Intervention Coach (Robbins-Madanes Training, the Tony Robbins school). The coaching is not a side dish.");
    if (a.pull === "escape" || a.pull === "reset") out.push("Rick has built a life from zero in the USA, Holland, Singapore, the Philippines and Thailand. Living-abroad questions are very welcome.");
    out.push("Every GNS morning starts with Coffee and Kicks. That is a real thing, not a metaphor.");
    return out.slice(0, 3);
  }

  /* the tailored paragraphs under the profile name */
  function mixLines(a) {
    var out = [];
    switch (a.pull) {
      case "skills": out.push(FLAVOR_MIX[a.flavor], LEVEL_MIX[a.level]); break;
      case "coach": out.push(CFORMAT_MIX[a.cformat], WSUB_MIX[a.wsub]); break;
      case "fun": out.push(FUN_MIX[a.funstyle]); break;
      case "gamer": out.push(GBAL_MIX[a.gbalance], FLAVOR_MIX[a.flavor]); break;
      case "reset": out.push(RFOCUS_MIX[a.rfocus]); break;
      case "escape": out.push(EWHY_MIX[a.ewhy], EPLAN_MIX[a.eplan]); break;
    }
    out.push(BLEND_MIX[a.blend]);
    return out.filter(Boolean);
  }

  /* one short "what this says about you" line */
  function insight(a) {
    if (a.pull === "skills" && a.flavor) return FLAVOR_INSIGHT[a.flavor] || null;
    if (a.pull === "coach") {
      if (a.cformat === "one") return "You invest in yourself directly and you like accountability you cannot dodge. That is rare.";
      if (a.cformat === "small") return "You grow best with a few trusted people around. You build crews wherever you go.";
      return "You feed off shared energy. You probably leave rooms better than you found them.";
    }
    if (a.pull === "fun") return "You lead with joy, and joy is the most underrated training method on Earth.";
    if (a.pull === "gamer") return "You refuse to pick between worlds. Correct answer: the best players train, the best trainees play.";
    if (a.pull === "reset") return "You noticed the tank was empty BEFORE it stranded you. That self-awareness is half the reset already.";
    if (a.pull === "escape") return "Wanting out is not running away. Rick calls it starting over, and he has made a career of it.";
    return null;
  }

  function focusLabel(a) {
    if (a.pull === "skills" || a.pull === "gamer") return FLAVOR_LABEL[a.flavor] || "Ninja training";
    if (a.pull === "coach") return WAREA_LABEL[a.warea] || "Winjitsu coaching";
    if (a.pull === "fun") return "Goofy first, skills anyway";
    if (a.pull === "reset") return "The full reset";
    if (a.pull === "escape") return "A new chapter, tested live";
    return "-";
  }

  function qualify(a) {
    return a.ready === "now" || (a.ready === "soon" && (a.stay === "two" || a.stay === "long"));
  }

  function summary(a) {
    var rows = [["Your ninja type", typeName(a)], ["Your focus", focusLabel(a)]];
    var code = ninjaCode(a);
    if (code) rows.push(["Ninja code", code.code]);
    if (a.pull === "coach" && a.cformat) rows.push(["Coaching format", CFORMAT_LABEL[a.cformat]]);
    if (a.blend) rows.push(["Mind / body blend", BLEND_LABEL[a.blend]]);
    if (a.vibe) rows.push(["Session vibe", { goofy: "Goofy, please", both: "Fun + serious", serious: "Strictly serious" }[a.vibe]]);
    if (a.live) rows.push(["Lodging", { dorm: "Ninja dorm, easy", own: "Own place" }[a.live]]);
    rows.push(["Squad", { self: "Solo", family: "Family", friends: "With friends" }[a.who] || "-"]);
    rows.push(["Readiness", { dream: "Dreaming", soon: "Soon", now: "Ready now" }[a.ready] || "-"]);
    return rows;
  }

  var CALC_MSGS = ["Sizing up your ninja potential...", "Consulting the WinJitsu scrolls...", "Sharpening your shuriken..."];

  var qz = document.getElementById("qz");
  var phase = "hook", answers = {}, calcTimer = null;

  function has(k) { return Object.prototype.hasOwnProperty.call(answers, k); }
  function enroll() { window.location.href = ENROLL; }
  // "See the full program": back to the very top of the page, as on NinjaGym
  // (there the target id sat on the page root; the live page had lost it)
  function toTop() { window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); }
  function start() { phase = "quiz"; render(); }

  function pick(key, val) {
    answers[key] = val;
    var remaining = buildFlow(answers).some(function (q) { return !has(q.key); });
    if (!remaining) phase = "calc";
    render();
  }

  function goBack() {
    // remove the most recently answered question (in flow order)
    var answered = buildFlow(answers).filter(function (q) { return has(q.key); });
    var last = answered[answered.length - 1];
    if (!last) return;
    delete answers[last.key];
    if (last.key === "pull") answers = {}; // dropping "pull" orphans every branch answer
    if (last.key === "warea") delete answers.wsub;
    render();
  }

  function restart() { answers = {}; phase = "quiz"; render(); }

  function shuriken() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "-52 -52 104 104");
    svg.setAttribute("class", "qz-spin");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = '<path d="M0,-48 L12,-12 L48,0 L12,12 L0,48 L-12,12 L-48,0 L-12,-12 Z" fill="#ff7a1a" stroke="#1a1626" stroke-width="4" stroke-linejoin="round"/><circle r="9" fill="none" stroke="#ffd23f" stroke-width="4"/><circle r="3" fill="#e23b2e"/>';
    return svg;
  }

  function render() {
    if (calcTimer) { clearInterval(calcTimer); calcTimer = null; }
    qz.textContent = "";
    qz.appendChild(el("div", "qz-brand", [
      el("div", "qz-g", "G"),
      el("div", null, [el("p", "qz-name", "Gooffy Ninja ShhT!!"), el("p", "qz-tag", "train by day, game by night")])
    ]));

    var flow = buildFlow(answers);
    var current = null;
    for (var i = 0; i < flow.length; i++) if (!has(flow[i].key)) { current = flow[i]; break; }
    var answeredCount = flow.filter(function (q) { return has(q.key); }).length;

    if (phase === "hook") {
      qz.appendChild(el("div", "qz-step", [
        el("h3", "qz-h", "Which Gooffy Ninja are you? Take 2 minutes and find out."),
        el("p", "qz-p", "A few questions that reshape themselves around your answers. Get your ninja profile, your tailored mix, and (fair warning) you might learn something about yourself. Shh."),
        btn("qz-btn", "Yes, reveal my ninja", start),
        btn("qz-link", "I'm just being nosy", start)
      ]));
      return;
    }

    if (phase === "quiz" && current) {
      qz.appendChild(el("div", "qz-dots", flow.map(function (q, i) {
        return el("span", "qz-dot" + (i < answeredCount || q.key === current.key ? " qz-dot-on" : ""));
      })));
      var step = el("div", "qz-step", [
        el("p", "qz-q", current.q),
        current.sub ? el("p", "qz-sub", current.sub) : el("div", "qz-gap"),
        el("div", "qz-opts", current.opts.map(function (o) {
          return btn("qz-opt", [
            o.em ? el("span", "qz-em", o.em) : null,
            el("span", null, [el("span", "qz-t", o.t), o.d ? el("span", "qz-d", o.d) : null])
          ], function () { pick(current.key, o.v); });
        }))
      ]);
      if (answeredCount > 0) step.appendChild(btn("qz-back", "← Back", goBack));
      qz.appendChild(step);
      return;
    }

    if (phase === "calc") {
      var fill = el("div", "qz-bar-fill");
      fill.style.width = "0%";
      var msg = el("p", "qz-msg", CALC_MSGS[0]);
      qz.appendChild(el("div", "qz-step qz-calc", [
        shuriken(),
        el("p", "qz-q", "Calculating your results..."),
        el("div", "qz-bar", fill),
        msg
      ]));
      var p = 0, m = 0;
      calcTimer = setInterval(function () {
        p = Math.min(100, p + Math.random() * 16 + 8);
        fill.style.width = p + "%";
        if (p > 33 && m < 1) { m = 1; msg.textContent = CALC_MSGS[1]; }
        if (p > 72 && m < 2) { m = 2; msg.textContent = CALC_MSGS[2]; }
        if (p >= 100) {
          clearInterval(calcTimer); calcTimer = null;
          setTimeout(function () { if (phase === "calc") { phase = "results"; render(); } }, 350);
        }
      }, 300);
      return;
    }

    /* results */
    var a = answers, ok = qualify(a), path = PATHS[a.pull] || PATHS.skills;
    var lines = mixLines(a), say = insight(a), unlocked = perks(a), notes = fitNotes(a);
    var ticks = [SOCIAL_TICK[a.social], LEARN_TICK[a.learn], VIBE_TICK[a.vibe]].filter(Boolean);
    var res = el("div", "qz-step", [
      el("span", "qz-badge", ok ? "You're ready, ninja" : "Your ninja journey starts here"),
      el("p", "qz-type", typeName(a)),
      el("p", "qz-line", path.line)
    ]);
    if (lines.length) res.appendChild(el("div", "qz-mix", lines.map(function (l) { return el("p", null, l); })));
    if (say) res.appendChild(el("div", "qz-box", [el("p", "qz-label", "What this says about you"), el("div", "qz-box-txt", el("p", null, say))]));
    if (ticks.length) res.appendChild(el("div", "qz-box qz-box-ink", [el("p", "qz-label", "How you tick"), el("div", "qz-box-txt", ticks.map(function (t) { return el("p", null, t); }))]));

    var sum = el("div", "qz-sum", summary(a).map(function (r) { return el("div", "qz-row", [el("span", null, r[0]), el("b", null, r[1])]); }));
    var c = ninjaCode(a);
    if (c) sum.appendChild(el("p", "qz-code", c.code + " decoded: " + c.gloss + ". Your four letters, ninja edition."));
    res.appendChild(sum);

    if (unlocked.length) res.appendChild(el("div", "qz-perks", [el("p", "qz-label", "Perks unlocked on the way 🥷"), el("ul", null, unlocked.map(function (u) { return el("li", null, u); }))]));
    if (notes.length) res.appendChild(el("div", "qz-notes", [el("p", "qz-label", "Real talk, so you land comfy")].concat(notes.map(function (n) {
      return el("p", "qz-note" + (n.tone === "warn" ? " qz-note-warn" : ""), n.text);
    }))));

    if (a.vibe === "serious") {
      var ask = el("a", "qz-btn qz-btn-red", "Ask about private sessions");
      ask.href = CONTACT;
      res.appendChild(ask);
      res.appendChild(btn("qz-link", "See the full (goofy) program anyway", toTop));
      res.appendChild(btn("qz-link", "Enroll in GNS regardless, I can handle jokes", enroll));
    } else if (ok) {
      res.appendChild(btn("qz-btn qz-btn-red", "Claim your 2-week spot ($2,222)", enroll));
      res.appendChild(btn("qz-link", "See the full program", toTop));
    } else {
      res.appendChild(btn("qz-btn qz-btn-md", "See the full program", toTop));
      res.appendChild(btn("qz-link", "Or enroll when you're ready", enroll));
    }
    if (a.pull === "coach") {
      var wj = el("a", "qz-link", "Peek at Winjitsu, the mental martial art");
      wj.href = "https://www.winjitsu.com"; wj.target = "_blank"; wj.rel = "noopener noreferrer";
      res.appendChild(wj);
    }
    res.appendChild(btn("qz-link qz-link-sm", "Retake with different answers", restart));
    qz.appendChild(res);
  }
  render();

  /* ---------------- motion: chi bar, scroll ninja, day/night arc ---------------- */
  function onScrollRAF(update) {
    var ticking = false;
    function handler() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    update();
  }
  function pageProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? clamp01(window.scrollY / max) : 0;
  }
  function elementProgress(node) {
    var r = node.getBoundingClientRect(), vh = window.innerHeight;
    return clamp01((vh - r.top) / (r.height + vh));
  }

  var chi = document.getElementById("chiFill");
  onScrollRAF(function () { chi.style.setProperty("--p", pageProgress().toFixed(4)); });

  // the scroll ninja climbs the belt ranks as the page scrolls
  var mover = document.getElementById("njMover"), rig = document.getElementById("njRig");
  function poseFor(p) {
    if (p < 0.13) return "white";  // stance
    if (p < 0.28) return "yellow"; // punch
    if (p < 0.43) return "orange"; // kick
    if (p < 0.58) return "green";  // splits
    if (p < 0.72) return "blue";   // flying side kick
    if (p < 0.87) return "red";    // cartwheel
    return "throw";                // shuriken finale
  }
  if (!reduced) {
    onScrollRAF(function () {
      var p = pageProgress();
      mover.style.setProperty("--p", p.toFixed(4));
      var pose = poseFor(p);
      if (rig.getAttribute("data-pose") !== pose) rig.setAttribute("data-pose", pose);
    });
  }

  // Koh Samui sunset: the sun arcs and sets into a moon as the band passes.
  // The fades are worked out here rather than with CSS abs(), which older
  // browsers do not have.
  var dn = document.getElementById("dnArc");
  function setArc(p) {
    var toNight = Math.max(0, (p - 0.5) * 2.4);
    dn.style.setProperty("--p", p.toFixed(4));
    dn.style.setProperty("--glow", (1 - Math.min(1, Math.abs(p - 0.5) * 2.2)).toFixed(3));
    dn.style.setProperty("--sunA", (1 - Math.min(1, toNight)).toFixed(3));
    dn.style.setProperty("--moonA", Math.min(1, toNight).toFixed(3));
    dn.style.setProperty("--starsA", Math.min(1, Math.max(0, (p - 0.56) * 2.8)).toFixed(3));
  }
  if (reduced) setArc(0.5);
  else onScrollRAF(function () { setArc(elementProgress(dn)); });
})();
