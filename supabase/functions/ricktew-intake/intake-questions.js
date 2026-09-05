/* THE INTAKE: the question catalog. ONE file, read by two things:
   the page (aininja/start/index.html builds its form from it) and the
   endpoint (supabase/functions/ricktew-intake/ carries a copy, made by its
   deploy.sh; tests/intake-sweep.js fails if the two copies differ).
   The endpoint accepts ONLY the ids and option values written here, so a
   stranger can never choose a field name that reaches Rick's mail.

   Shape: SECTIONS[] -> qs[] -> {id, label, hint, type, options, essential, ask}
     type: single | multi | text | long | email | tel | url
     essential: true means the receipt lists it as a missed question when
       the client leaves it blank; `ask` is the plain question the receipt
       prints for it.
     options[].more: true means the option opens a small "which one?" box
       whose text is stored as answers[id + "_more"].
   No long dashes anywhere in here: the sweep greps for them. */
(function (root, factory) {
  /* both, always: the browser and Deno read root.RT_INTAKE, Node reads module.exports */
  var api = factory();
  root.RT_INTAKE = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : (typeof self !== "undefined" ? self : this), function () {
  "use strict";

  var SEATS = ["The Agentic Chief of Staff", "The Agentic CTO", "The Agentic CMO",
               "The Agentic CFO", "The Agentic Head of Content", "The Agentic Head of Customer Care"];

  var SECTIONS = [
    {
      id: "who", title: "Who you are", k: "1 of 9",
      intro: "So I know who I am building for and how to reach you.",
      qs: [
        { id: "name", label: "Your name", type: "text", required: true },
        { id: "business", label: "Your business", hint: "The name people know it by.", type: "text", essential: true,
          ask: "What is the business called?" },
        { id: "email", label: "Your email", hint: "Where the plan and the receipt go.", type: "email", required: true },
        { id: "phone", label: "WhatsApp or phone", hint: "With the country code.", type: "tel" },
        { id: "website", label: "Your website or main social page", hint: "Paste the link.", type: "url" },
        { id: "where", label: "Where you are", hint: "City, country, and your time zone.", type: "text", essential: true,
          ask: "Where are you based, and what time zone are you in?" },
        { id: "role", label: "Your role", type: "single", options: [
          { v: "owner", label: "I own the business" },
          { v: "manager", label: "I manage it for the owner" },
          { v: "staff", label: "I work here and I am filling this in for the boss" },
          { v: "consultant", label: "I advise this business from outside" } ] },
        { id: "reach", label: "How you like to be reached", type: "multi", options: [
          { v: "email", label: "Email" }, { v: "whatsapp", label: "WhatsApp" }, { v: "line", label: "LINE" },
          { v: "call", label: "A phone call" }, { v: "video", label: "A video call" } ] },
        { id: "best_time", label: "Best days and hours for a call", hint: "In your time zone.", type: "text" }
      ]
    },
    {
      id: "shape", title: "The shape of your business", k: "2 of 9",
      intro: "Nothing here is a trick. It decides which ninjas fit and how big the job is.",
      qs: [
        { id: "profile", label: "Which is closest?", type: "single", essential: true,
          ask: "Is this a business with staff, a one-person operation, a department inside a company, or a personal project?", options: [
          { v: "staff", label: "A business with staff" },
          { v: "solo", label: "A one-person operation" },
          { v: "inside", label: "A department or role inside somebody else's company" },
          { v: "personal", label: "A personal project" } ] },
        { id: "trade", label: "What is the work, mostly?", type: "single", options: [
          { v: "inperson", label: "People come to me in person", note: "gym, clinic, studio, shop, hotel, school" },
          { v: "goods", label: "I sell goods", note: "online or in a shop" },
          { v: "expertise", label: "I sell expertise or a service", note: "coaching, consulting, agency, trades" },
          { v: "makes", label: "I make things", note: "software, content, products" },
          { v: "mix", label: "A mix of these" } ] },
        { id: "team_size", label: "How many people work in it, you included?", type: "single", options: [
          { v: "1", label: "Just me" }, { v: "2-5", label: "2 to 5" }, { v: "6-15", label: "6 to 15" },
          { v: "16-50", label: "16 to 50" }, { v: "50+", label: "More than 50" } ] },
        { id: "customers_week", label: "People you deal with in a normal week", hint: "Customers, members, patients, clients, guests.", type: "single", options: [
          { v: "<10", label: "Under 10" }, { v: "10-50", label: "10 to 50" }, { v: "50-200", label: "50 to 200" },
          { v: "200+", label: "More than 200" }, { v: "unsure", label: "Not sure" } ] },
        { id: "languages", label: "Languages your customers write to you in", type: "multi", options: [
          { v: "en", label: "English" }, { v: "th", label: "Thai" }, { v: "nl", label: "Dutch" }, { v: "de", label: "German" },
          { v: "es", label: "Spanish" }, { v: "fr", label: "French" }, { v: "ru", label: "Russian" }, { v: "he", label: "Hebrew" },
          { v: "other", label: "Other", more: true } ] }
      ]
    },
    {
      id: "want", title: "What you want built", k: "3 of 9",
      intro: "One job, a few connected jobs, or the whole command center. Tap everything that applies.",
      qs: [
        { id: "scope", label: "How big is this?", type: "single", essential: true,
          ask: "Do you want one job fixed, a few connected jobs, or the whole command center with a dashboard?", options: [
          { v: "one", label: "One job fixed", note: "the inbox, or the bookings, or the invoices" },
          { v: "few", label: "A few connected jobs" },
          { v: "all", label: "The whole thing: a command center with a dashboard" },
          { v: "unsure", label: "Not sure. Show me what fits after you have read this" } ] },
        { id: "jobs", label: "Which jobs eat the time?", hint: "Tap every one that applies.", type: "multi", essential: true,
          ask: "Which jobs eat your time: the inbox, bookings, customer records, invoices, the books, marketing, ads, a website, an app, a knowledge base, reports?", options: [
          { v: "inbox", label: "The inbox and customer replies" },
          { v: "bookings", label: "Bookings and appointments" },
          { v: "crm", label: "Customer records and follow-ups (a CRM)" },
          { v: "invoices", label: "Invoices and getting paid" },
          { v: "books", label: "Bookkeeping, receipts and tax paperwork" },
          { v: "marketing", label: "Marketing: posts, newsletters, campaigns" },
          { v: "ads", label: "Paid ads" },
          { v: "website", label: "The website" },
          { v: "app", label: "An app for customers or staff" },
          { v: "answers", label: "A knowledge base or an answer box that replies 24/7" },
          { v: "reports", label: "Reports and a dashboard: what happened this week" },
          { v: "quiz", label: "A quiz or lead form that qualifies visitors" },
          { v: "video", label: "Video calls inside my own app" },
          { v: "other", label: "Something else", more: true } ] },
        { id: "front", label: "Do you need a public side, or only the back office?", type: "single", essential: true,
          ask: "Do you need a website or public side built, or only the back office?", options: [
          { v: "keep", label: "I have a website and it stays as it is" },
          { v: "rebuild", label: "I have one but it needs rebuilding" },
          { v: "none", label: "I have none and need one" },
          { v: "backend", label: "Only the back office. No public side" } ] },
        { id: "customer_side", label: "What should customers be able to do without you touching it?", type: "multi", options: [
          { v: "book", label: "Book a slot" }, { v: "forms", label: "Fill in a form or an intake like this one" },
          { v: "chat", label: "Ask a chat or answer box" }, { v: "members", label: "Log in to a members area" },
          { v: "pay", label: "Pay online" }, { v: "shop", label: "Buy from an online store" },
          { v: "none", label: "Nothing yet" } ] },
        { id: "money_scope", label: "How far into the money should this go?", type: "single", essential: true,
          ask: "How far into the money should this go: nothing, invoices only, invoices plus payments, or the full books including tax reports?", options: [
          { v: "none", label: "Stay out of the money" },
          { v: "invoices", label: "Invoices only" },
          { v: "payments", label: "Invoices and payments: who paid, who has not" },
          { v: "books", label: "The full books: receipts, reconciliation, the tax reports" },
          { v: "connect", label: "I have an accountant and a tool. Connect to it", more: true } ] },
        { id: "agents", label: "Do you want an agent team with job titles?", hint: "Each seat is a trained AI ninja with one lane and one number it is judged on. Tap the ones you want.", type: "multi",
          explain: { title: "What these seats are", items: [
            ["The Agentic Chief of Staff", "One view over every desk and a truthful answer to \"is everything running?\", including no. Routes the work, reports to you in one place."],
            ["The Agentic CTO", "Keeps the apps up and the gear current: watches your builds, flags drift before you notice, keeps your tools from going stale."],
            ["The Agentic CMO", "Owns more customers. Plans the campaign, drafts in your voice, does the ad math before a cent moves, reads the numbers back daily. You press, you hold the wallet."],
            ["The Agentic CFO", "Owns the money being right and on time. Files and matches payment mail on one press, watches the month, says what is late before you ask."],
            ["The Agentic Head of Content", "Owns the long things in your voice: the book, the course, the manual, the newsletter that actually goes out. The taste pass stays human."],
            ["The Agentic Head of Customer Care", "Owns every question answered and every booking kept. Drafts the reply from your own answers, says \"I don't know\" instead of guessing. You press every send."]
          ] }, options:
          SEATS.map(function (s) { return { v: s.replace(/^The Agentic /, "").toLowerCase().replace(/[^a-z]+/g, "-"), label: s }; }).concat([
          { v: "none", label: "None yet" },
          { v: "explain", label: "Not sure what these are. Explain them to me" } ]) },
        { id: "auto_send", label: "What may go out WITHOUT a human pressing send?", hint: "My default is nothing. Every send, pay and post waits for your press. Tell me where you want it faster.", type: "multi", essential: true,
          ask: "What, if anything, may go out without a human pressing send?", options: [
          { v: "nothing", label: "Nothing. A human presses every send" },
          { v: "faq", label: "Answers to common customer questions" },
          { v: "booking", label: "Booking confirmations and reminders" },
          { v: "receipts", label: "Payment receipts" },
          { v: "posts", label: "Social posts and newsletters" },
          { v: "unsure", label: "Not sure. Recommend something" } ] },
        { id: "voice", label: "How should it sound when it writes as you?", type: "single", options: [
          { v: "formal", label: "Formal" }, { v: "warm", label: "Friendly and warm" },
          { v: "direct", label: "Direct, a little irreverent" },
          { v: "match", label: "Match what I already write. I will send samples" } ] }
      ]
    },
    {
      id: "people", title: "Who uses it, who runs it", k: "4 of 9",
      intro: "The login question decides half the design.",
      qs: [
        { id: "operator", label: "Once it stands, who runs the daily work?", type: "single", essential: true,
          ask: "Once it is built, who runs the daily work: you, your staff, or Rick's team (Sensei runs it)?", options: [
          { v: "me", label: "I do (Your Dojo)" },
          { v: "rick", label: "Rick's team does (Sensei runs it)" },
          { v: "staff", label: "A member of my staff does" },
          { v: "undecided", label: "Not decided. Help me choose" } ] },
        { id: "users", label: "Who logs in?", type: "single", essential: true,
          ask: "Who will log in: only you, you and your team, one employee, or an outside person like an accountant?", options: [
          { v: "me", label: "Only me" },
          { v: "team", label: "Me and my team" },
          { v: "employee", label: "One employee I hand the login to" },
          { v: "outside", label: "Me plus an outside person", note: "accountant, assistant, agency" } ] },
        { id: "seats", label: "How many people need their own login?", type: "single", options: [
          { v: "1", label: "1" }, { v: "2-3", label: "2 to 3" }, { v: "4-10", label: "4 to 10" }, { v: "10+", label: "More than 10" } ] },
        { id: "roles", label: "Who may see what?", type: "multi", options: [
          { v: "all", label: "Everyone sees everything" },
          { v: "staff-no-money", label: "Staff see customers, not the money" },
          { v: "accountant-money", label: "The accountant sees the money only" },
          { v: "define", label: "I want to define this myself", more: true } ] },
        { id: "access", label: "Setting up needs access to your accounts. Which suits you?", type: "single", essential: true,
          explain: { title: "What each of these means", items: [
            ["Give me access", "You share the logins (email, domain, the tools) for the setup and change the passwords after. Fastest. Everything stays in your name."],
            ["Be in the room", "We set it up together, on a call or in person. You type the passwords, I never see them. Slower, and fine."],
            ["Fresh accounts", "I open new accounts in your name and build on those. Nothing of yours is shared. Good when the old accounts are a mess or belong to somebody else."],
            ["Or: I host it (R2S Hosting)", "I build it, host it and manage it on my own stack, and you pay one hosting fee that includes the management. No accounts to share at all. Pick it under the offers, further down."]
          ] },
          ask: "How do you want to handle access to your accounts during setup: hand it over, be in the room, or start on fresh accounts in your name?", options: [
          { v: "handover", label: "I can give you access to my accounts", note: "email, domain, tools; changed after" },
          { v: "room", label: "I want to be in the room when you set things up" },
          { v: "fresh", label: "No shared logins. Build on new accounts in my name" } ] },
        { id: "owns", label: "Who owns these today?", hint: "Tap what is in YOUR name.", type: "multi", options: [
          { v: "domain", label: "The domain name" }, { v: "hosting", label: "The website hosting" },
          { v: "email", label: "The business email" }, { v: "socials", label: "The social accounts" },
          { v: "payments", label: "The payment account" }, { v: "unsure", label: "Not sure who owns what", more: true } ] }
      ]
    },
    {
      id: "today", title: "What runs it today", k: "5 of 9",
      intro: "The honest picture. Paper and memory is a real answer.",
      qs: [
        { id: "tools", label: "What do you use now?", hint: "Tap all, and name the tool where it asks.", type: "multi", essential: true,
          ask: "What runs the work today: which mail, chat, booking, accounting, POS or CRM tools, or spreadsheets and paper?", options: [
          { v: "gmail", label: "Gmail or Google Workspace" }, { v: "outlook", label: "Outlook or Microsoft 365" },
          { v: "whatsapp", label: "WhatsApp" }, { v: "line", label: "LINE" }, { v: "dm", label: "Facebook or Instagram messages" },
          { v: "sheets", label: "Spreadsheets" }, { v: "paper", label: "Paper and memory" },
          { v: "booking", label: "A booking tool", more: true }, { v: "accounting", label: "Accounting software", more: true },
          { v: "pos", label: "A POS or till", more: true }, { v: "crm", label: "A CRM", more: true },
          { v: "builder", label: "A website builder", more: true }, { v: "other", label: "Other", more: true } ] },
        { id: "devices", label: "What do you work on?", type: "multi", options: [
          { v: "iphone", label: "iPhone" }, { v: "android", label: "Android phone" }, { v: "mac", label: "Mac" },
          { v: "windows", label: "Windows PC" }, { v: "tablet", label: "iPad or tablet" }, { v: "phone-mostly", label: "Mostly the phone, honestly" } ] },
        { id: "comfort", label: "How do you feel about the technical side?", hint: "There is no wrong answer. It changes how I hand things over.", type: "single", essential: true,
          ask: "How comfortable are you with the technical side?", options: [
          { v: "avoid", label: "I avoid computers where I can" }, { v: "manage", label: "I manage" },
          { v: "fine", label: "Comfortable" }, { v: "techie", label: "I am the tech person here" } ] },
        { id: "data_where", label: "Where is your customer data right now?", type: "single", options: [
          { v: "one", label: "In one system" }, { v: "several", label: "Spread over several" },
          { v: "head", label: "In my head and on paper" }, { v: "someone", label: "With somebody else", note: "accountant, agency, old developer" } ] },
        { id: "data_export", label: "Can you get that data out as a file?", type: "single", options: [
          { v: "yes", label: "Yes, I can export it" }, { v: "help", label: "Probably, with help" }, { v: "no", label: "No idea" } ] },
        { id: "messages_week", label: "Customer messages in a week", hint: "Email, chat, DMs, all of it.", type: "single", options: [
          { v: "<20", label: "Under 20" }, { v: "20-100", label: "20 to 100" }, { v: "100-500", label: "100 to 500" }, { v: "500+", label: "More than 500" } ] },
        { id: "bookings_week", label: "Bookings or appointments in a week", type: "single", options: [
          { v: "0", label: "None, I do not take bookings" }, { v: "<10", label: "Under 10" }, { v: "10-50", label: "10 to 50" }, { v: "50+", label: "More than 50" } ] },
        { id: "invoices_month", label: "Invoices or payments in a month", type: "single", options: [
          { v: "<10", label: "Under 10" }, { v: "10-50", label: "10 to 50" }, { v: "50-200", label: "50 to 200" }, { v: "200+", label: "More than 200" } ] },
        { id: "hours_lost", label: "Hours a week that go to this admin", hint: "You and your staff together. A rough guess is fine.", type: "single", essential: true,
          ask: "Roughly how many hours a week go to this admin, you and your staff together?", options: [
          { v: "<5", label: "Under 5" }, { v: "5-10", label: "5 to 10" }, { v: "10-20", label: "10 to 20" },
          { v: "20+", label: "More than 20" }, { v: "unsure", label: "Not sure" } ] }
      ]
    },
    {
      id: "timing", title: "Timing, budget and limits", k: "6 of 9",
      intro: "When, which offer, and the lines I must not cross.",
      qs: [
        { id: "when", label: "When do you want it running?", type: "single", essential: true,
          ask: "When do you want it running?", options: [
          { v: "month", label: "This month" }, { v: "1-3", label: "In one to three months" },
          { v: "after", label: "After a date or an event", more: true }, { v: "norush", label: "No rush. I am exploring" } ] },
        { id: "tier", label: "Which offer are you leaning towards?", type: "single", essential: true,
          ask: "Which offer are you leaning towards: Sensei runs it, Your Dojo, or a one-off build?", options: [
          { v: "sensei", label: "Sensei runs it, $4,444 a month", note: "I build it, I run it too" },
          { v: "dojo", label: "Your Dojo, $2,222 a month", note: "I build it, you run it" },
          { v: "build", label: "A one-off build, scoped in writing first" },
          { v: "r2s", label: "R2S Hosting: $222 to build, then $99 a month or $999 a year", note: "I build it, host it and manage the hosting on my stack" },
          { v: "unsure", label: "Not sure yet" } ] },
        { id: "first", label: "What should be built first?", type: "single", options: [
          { v: "hurts", label: "The thing that hurts most", more: true },
          { v: "recommend", label: "Whatever you recommend after reading this" } ] },
        { id: "constraints", label: "Anything sensitive in the work?", type: "multi", options: [
          { v: "medical", label: "Patient or medical information" }, { v: "minors", label: "Children or minors" },
          { v: "money", label: "Moving money" }, { v: "regulated", label: "A regulated industry", more: true },
          { v: "contracts", label: "Contracts or tools I am locked into", more: true }, { v: "nothing", label: "Nothing special" } ] },
        { id: "tax_where", label: "Where the business is registered for tax, and what tax you charge", hint: "Country, and VAT or sales tax if any.", type: "text" },
        { id: "never", label: "What must I never do or touch?", hint: "A tool that stays, a customer list that never leaves, a person who must approve things.", type: "long" }
      ]
    },
    {
      id: "success", title: "What done looks like", k: "7 of 9",
      intro: "So we both know when to celebrate.",
      qs: [
        { id: "done_90", label: "Ninety days from now, what is different?", hint: "Picture a normal Tuesday. What is no longer on your plate?", type: "long", essential: true,
          ask: "Ninety days from now, what should be different? What is no longer on your plate?" },
        { id: "metric", label: "Which number would prove it worked?", type: "single", options: [
          { v: "hours", label: "Hours back in my week" }, { v: "customers", label: "More customers" },
          { v: "speed", label: "Faster replies" }, { v: "mistakes", label: "Fewer mistakes" },
          { v: "cash", label: "Money in on time" }, { v: "other", label: "Something else", more: true } ] }
      ]
    },
    {
      id: "words", title: "In your own words", k: "8 of 9",
      intro: "The buttons gave me the skeleton. This is the flesh. Write as you would talk. Spelling does not matter.",
      qs: [
        { id: "workflow", label: "Walk me through a normal day", hint: "Start to finish: what comes in, who touches it, where it goes, what gets forgotten.", type: "long", essential: true,
          ask: "Walk me through a normal day: what comes in, who touches it, where it goes." },
        { id: "challenges", label: "What goes wrong, and how often?", hint: "The double booking, the unpaid invoice nobody chased, the message answered three days late.", type: "long" },
        { id: "time", label: "Where do the hours go, and what would you do with them back?", type: "long" },
        { id: "goals", label: "Goals: ninety days, and a year", type: "long" },
        { id: "pain", label: "The thing you dread. The complaint you hear most.", type: "long" },
        { id: "tried", label: "What have you tried before, and why did it not stick?", hint: "Software you bought and abandoned. A person you hired. A system that lasted a month.", type: "long" },
        { id: "anything", label: "Anything else that would help me", type: "long" }
      ]
    },
    {
      id: "missed", title: "What I may have missed", k: "9 of 9",
      intro: "Links, people, worries. Then the recordings below, which are the best part.",
      qs: [
        { id: "links", label: "Links to the tools and pages you use", hint: "One per line. Your booking page, your invoicing tool, the spreadsheet, the Facebook page.", type: "long" },
        { id: "people", label: "Who else should I talk to?", hint: "The person who really runs the front desk. The accountant. Names and how to reach them, if they agree.", type: "long" },
        { id: "worries", label: "What worries you about handing this to AI?", hint: "Say it straight. It shapes what I build and what stays behind your press.", type: "long" },
        { id: "samples", label: "Where can I see how you write to customers?", hint: "A page, a few emails you can forward, or upload them below.", type: "text" }
      ]
    }
  ];

  /* Recording kinds the page offers and the endpoint accepts. */
  var MEDIA = {
    audio:  { label: "Voice note", accept: "audio/*" },
    video:  { label: "Video", accept: "video/*" },
    screen: { label: "Screen recording", accept: "video/*" },
    file:   { label: "File", accept: "image/*,video/*,audio/*,.pdf,.csv,.xls,.xlsx,.doc,.docx,.txt,.md,.json,.numbers,.pages,.key,.ppt,.pptx" }
  };

  var LIMITS = { text: 300, long: 5000, fileBytes: 500 * 1024 * 1024, files: 24 };

  function allQuestions() {
    var out = [];
    SECTIONS.forEach(function (s) { s.qs.forEach(function (q) { out.push(q); }); });
    return out;
  }

  return { SECTIONS: SECTIONS, SEATS: SEATS, MEDIA: MEDIA, LIMITS: LIMITS, allQuestions: allQuestions };
});
