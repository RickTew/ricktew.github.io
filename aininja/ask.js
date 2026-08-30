/* ASK THE NINJA. Kata: ~/Dev/digitaldojo/packs/retrieval-brain.md, the word
   half only, fitted to a static page.

   This is NOT an AI and the page says so. It is a library of answers Rick
   wrote, matched to the visitor's question by the words in it, with the
   kata's one rule kept whole: return nothing rather than guess. A question
   the library does not cover gets an honest "I do not have that one" and a
   button that carries the question into The Letter Slot, where a person
   answers. Every answer ends in the same want button as the top of the
   page, so a lead that starts in this box lands in the mailbox with the
   questions asked riding along in the message.

   No server, no storage, no model call, no address. The library is the only
   thing shown to a visitor, and every line in it is quoted from this page
   or written by Rick. If the page changes a fact, change it here too:
   tests/ask-golden.js checks the solution rows against the page and fails
   when they drift.

   The file runs in the browser (window.rtAsk) and in node (module.exports)
   so the golden set can be run without loading the page. */
(function(root){
  "use strict";

  /* ---------- the word engine ---------- */

  /* The business's own name is a stopword: it is in nearly every question
     and nearly every entry, so it matches everything and proves nothing.
     "ai" goes the same way; the entries about AI carry their real words. */
  var STOP = {};
  ("a an the and or but if then so of to in on at for from by with about as into over under is are was were be been being am do does did doing have has had having can could would should will shall may might must it its this that these those there here what which who whom whose how why when where i me my mine we us our you your yours he she they them their his her hers one ones some any all each every much many more most other another such than too very just also really actually only even still yet again ever never not no nor don dont doesn doesnt didn didnt isn isnt aren arent won wont cant cannot couldn couldnt wouldn wouldnt shouldn shouldnt let lets get got give go going want wants wanted like need needs needed know think thing things stuff kind sort way ways please thanks thank hi hello hey ok okay yes yeah yep nope hmm um well right time tell ai a.i artificial intelligence rick tew ricktew dojo ninja ninjas digital tews").split(" ").forEach(function(w){ STOP[w]=1; });

  function norm(s){
    return String(s||"").toLowerCase()
      .replace(/[‘’']/g,"")
      .replace(/[^a-z0-9$]+/g," ")
      .replace(/\s+/g," ").trim();
  }
  /* A blunt stemmer. It only has to agree with itself: both sides of every
     match go through it, so "prices", "pricing" and "price" all land on
     "pric" and nobody cares that "pric" is not a word. */
  function stem(w){
    if(w.length<=3) return w;
    w=w.replace(/ies$/,"y").replace(/(ing|ed|es|s)$/,"");
    if(w.length>4) w=w.replace(/e$/,"");
    return w;
  }
  function tokens(s){
    var out={}, list=[];
    norm(s).split(" ").forEach(function(w){
      if(!w||STOP[w]) return;
      var t=stem(w);
      if(t.length<2||out[t]) return;
      out[t]=1; list.push(t);
    });
    return list;
  }

  var BUILT=null;
  function build(lib){
    var df={};
    var built=lib.map(function(e){
      var keys={};
      tokens(e.q).concat(tokens(e.keys||"")).forEach(function(t){ keys[t]=1; });
      (e.alt||[]).forEach(function(p){ tokens(p).forEach(function(t){ keys[t]=1; }); });
      var alts=(e.alt||[]).map(function(p){ return norm(p); }).filter(Boolean);
      alts.push(norm(e.q));
      Object.keys(keys).forEach(function(t){ df[t]=(df[t]||0)+1; });
      return {e:e, keys:keys, alts:alts.map(function(p){ return new RegExp("(^| )"+p.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"( |$)"); })};
    });
    built.df=df;
    return built;
  }

  /* Returns {hits:[{entry,score,matched}], q:tokens}. Empty hits is the
     honest miss. The gate: a whole phrase from the entry appears in the
     question, or two distinct real words match, or the question was ONE
     real word and it is a distinctive one (in four entries or fewer).
     One word out of five matching is a weak win, and a weak win is a
     gap, not coverage: "tell me a joke" must not find the bio because
     the bio says "tell me about yourself". */
  function search(question, lib){
    var built = lib ? build(lib) : (BUILT || (BUILT=build(LIBRARY)));
    var nq=norm(question), q=tokens(question);
    var hits=[];
    built.forEach(function(b){
      var m=0;
      q.forEach(function(t){ if(b.keys[t]) m++; });
      /* Whole phrases from the entry found in the question, counted (up to
         two), so "a box like this on my site" outranks an entry that only
         shares "chat box" with it. */
      var phrase=0;
      for(var i=0;i<b.alts.length&&phrase<2;i++){ if(b.alts[i].test(nq)) phrase++; }
      var ok = phrase || m>=2 || (m===1 && q.length===1 && built.df[q[0]]<=4);
      if(!ok) return;
      hits.push({entry:b.e, score:m+phrase*3, matched:m});
    });
    hits.sort(function(a,b){ return b.score-a.score; });
    return {hits:hits, q:q, empty:q.length===0};
  }

  /* What the box shows for a question: one of
     answer   {kind:"answer", entry, also:[entries]}   a clear winner
     choose   {kind:"choose", entries:[...]}           a dead heat, ask which
     miss     {kind:"miss"}                            nothing passed the gate
     empty    {kind:"empty"}                           no real words at all */
  function answer(question, lib){
    var r=search(question, lib);
    if(!r.hits.length) return r.empty ? {kind:"empty"} : {kind:"miss"};
    var top=r.hits[0], second=r.hits[1];
    if(second && second.score===top.score){
      return {kind:"choose", entries:r.hits.filter(function(h){ return h.score===top.score; }).slice(0,3).map(function(h){ return h.entry; })};
    }
    var also=r.hits.slice(1,3).filter(function(h){ return h.score>=2 && h.score>=top.score-1; }).map(function(h){ return h.entry; });
    return {kind:"answer", entry:top.entry, also:also};
  }

  /* ---------- the answer library ---------- */

  /* Every entry: id; q, the question as the box shows it; alt, other ways of
     asking it, matched as whole phrases; keys, extra words that should find
     it; a, the answer, HTML, Rick's words; cta, which want button ends it
     (default: the top button, "my hours back"); link, a place to go instead.
     The solution and seat entries quote the page's own rows word for word:
     the golden test holds them to that. */
  var HOURS={what:"my hours back", kind:"hours"};
  var LIBRARY=[

    /* ---- AI, plainly ---- */
    {id:"what-is-ai", q:"What is AI, in one line?",
     alt:["what is ai","whats ai","explain ai","define ai","shortest explanation","in one line","one sentence"],
     keys:"explain explanation definition define short simple prediction predict predicts model llm language model machine learning guess guesses",
     a:"<p>A prediction model, and the predictions are pretty good.</p><p>The AI everyone is talking about is a machine trained to guess the next word so well that the guesses turn into useful answers, working code and drafted replies. The \"intelligence\" is a side effect of being extremely good at that one guess. That is the whole trick, and it is enough to draft your inbox: at my gym it drafts every reply from answers I wrote, and I teach the classes while it does.</p>"},

    {id:"nobody-understands", q:"Nobody knows how AI works. Isn't that a risk?",
     alt:["nobody knows how","no one knows how","no one understands","nobody understands","black box","how does it work","how does ai work","how it works"],
     keys:"understand understands understanding knows know works work risk risky dangerous danger afraid scared fear fears scary opaque mystery magic alien force control",
     a:"<p>The fear is fair, and the sentence is true in one narrow sense. We know exactly how it was built and what job it was trained to do. What nobody has yet is a full wiring diagram of why it gave one particular answer. That is a real research problem, but it is closer to \"we do not model every eddy in a jet engine\" than \"an alien intelligence is loose\".</p><p>We fly the jet anyway: understand the principles, test the behaviour, add margins. Same here. I do not trust the AI's inner life; I test what comes out. Every ninja proposes, a human presses, and the Answer Engine says \"I don't know\" instead of guessing. You never hand it unsupervised control of anything that matters, and in my Dojo you cannot.</p>"},

    {id:"is-ai-safe", q:"Is AI safe to use in my business?",
     alt:["is ai safe","is it safe","safe to use","make things up","makes things up"],
     keys:"safe safety secure security harm mistake mistakes hallucinate hallucination hallucinates invent invents made up lie lies lying trust trusted",
     a:"<p>Safe the way a power tool is safe: with the guards on. The real risks are not a hidden mind. They are over-trust, bad data, and letting it make a high-stakes decision with nobody checking.</p><p>So the Dojo removes exactly those. Every ninja starts at white belt and only proposes; a human presses every send, pay and post. Answers come only from facts you verified, and a question outside them gets \"I don't know\" rather than an invention. One switch pauses every metered AI call. Your accounts stay in your name.</p><p>How I run it myself: the desk at my gym drafts every reply from answers I wrote, a person presses send, and my spa's desk agent has two off switches the owner can flip without calling me. Guards first, then the speed.</p>"},

    {id:"safer-ai", q:"Is one AI safer than another?",
     alt:["safer than","which ai is safer","which ai is safest","safest ai","which is safer","is one ai safer","any one ai safer","grok","anthropic","xai","differences between","compare the ais","which ai is best","which is the best ai","most cautious"],
     keys:"safer safest safe compare comparison versus vs difference differences between grok anthropic claude chatgpt openai gemini google xai meta llama cautious careful direct blunt filter filters refuse refuses refusing lecture lectures warnings brand brands company companies best better worse open constrained",
     a:"<p>Some are more cautious than others, and that is a design choice by the company, not a secret personality. One AI company builds careful first: it refuses more, adds more warnings, and is slower on edgy questions. Another builds direct first: it answers more and lets you decide. Under the hood they are the same kind of machine, a next-word predictor with extra training on top, and the extra training is simply pointed at different priorities. All of them draw the same hard lines.</p><p>So \"safer\" depends on your fear. Afraid it will say something ugly? The cautious one is the more constrained product. Afraid it will lecture you instead of answering? The direct one is the more open product. Afraid a company will release more than it can control? Read what each one publishes about its safety process and what independent scorecards say, as of your last look at their own sites, not the tone of the chat window.</p><p>The part that should actually calm you: everyday risk is mostly about the user, not the logo. Do not paste private medical or legal files into any of them. Do not treat any answer as a finished decision. Do not give any of them unsupervised control of money, accounts or machines. That is exactly how my Dojo is built: nothing sends, pays or posts without a person pressing, whichever AI is underneath.</p>"},

    {id:"answer-my-emails", q:"Can I use it to answer my emails?",
     alt:["answer my emails","answer my email","reply to my emails","reply to my email","do my emails","my emails","handle my inbox","handle my email","use it to answer","deal with my inbox","drowning in email","too many emails"],
     keys:"answer answers answering emails email mail inbox replies reply respond drafts draft drowning",
     a:"<p>Yes. \"It\" ends up specific to your business, and I have built it several ways. At my gym, the desk reads every mail and drafts the reply from answers I wrote; a person presses send. At my spa, SabaiSen, the desk agent answers guests on the site in English and Thai from a written studio guide, turns a plain \"book me Tuesday at two\" email into a real booking, and replies in the owner's own wording, with two off switches the owner can flip. In my console, TewBeDo, I added a simple CRM, a few helper systems and an AI assistant I can ask questions. A coaching team's desk runs the same shape for one human press.</p><p>The rule is the same in every one: the AI drafts from what you wrote, it never sends on its own, and the hours come back anyway. Tell me what your inbox looks like and I will tell you which shape fits.</p>",
     cta:{what:"The Front Desk", kind:"build", note:"Support replies drafted on auto. You press send."}},

    {id:"how-rick-uses", q:"How do you use AI yourself?",
     alt:["how do you use ai","how do you use it","how you use it","how you use ai","what do you use it for","use it yourself","in your own business","your own businesses"],
     keys:"yourself own daily day every practice examples example use uses using",
     a:"<p>Every day, and always on my own shop first. The app that runs my gym was built in a chat window; its desk drafts the replies. My spa app, SabaiSen, has a desk agent that answers guests and books them from a plain email, and one price table that drives the website, the booking page and both tills. TewBeDo, my console, runs my whole working life from my phone: a simple CRM, my AI staff at their desks, a news radar, and an assistant I can ask \"is everything running?\" The flyers, the signs, the gym's own songs, the characters in my games: made with AI too.</p><p>The time it gives back is the point. I teach the classes while the machine keeps the books. Everything on this page ran on me before I offered it to anyone.</p>"},

    {id:"replace-staff", q:"Will AI replace my staff, or me?",
     alt:["replace me","replace my staff","replace people","take my job","lose their jobs","take jobs","take our jobs"],
     keys:"replace replaces replacing staff team employees people jobs job fire humans workers redundant",
     a:"<p>No. It takes the grunt work: the same questions answered again, the scheduling ping-pong, the filing, the chasing. That is the part that never needed your judgment, only your hours.</p><p>The judgment, the room, the handshakes, the classes, the customers: that is Human Interaction and it stays human. I call the whole thing AI to HI. I run the AI so you and your people get your time back for the part only you can do.</p>"},

    {id:"talks-to-customers", q:"Will an AI talk to my customers without me knowing?",
     alt:["without me knowing","talk to my customers","answer my customers","email my customers","send emails for me","send email","sends email","on its own","by itself"],
     keys:"customers customer talk talks reply replies answers send sends sending email emails post posts pay pays automatic automatically autopilot unsupervised approve approval",
     a:"<p>Never. Every ninja starts at white belt: propose only. Drafts and filings pile up for your review, and a human presses every send, pay and post. That rule does not bend at any belt or any price.</p><p>One exception, and it is mine: the mailbox on this page is answered first by my Ninja Agent, signed as the AI, from answers I wrote. That is the demo. In your Dojo nothing sends without your press unless you choose the same for a lane of your own.</p>"},

    {id:"which-ai", q:"Which AI do you use?",
     alt:["which ai","what ai do you use","do you use","which model","what model","which llm","which company","which companies"],
     keys:"chatgpt claude gemini openai anthropic google copilot grok model models tool tools brand vendor company companies",
     a:"<p>The AI companies' models, and the tools change every month, so I do not carve a name into this page. What does not change: the AI account is yours, in your name, and your way of working is written down properly and handed to every ninja, so a change of model takes nothing with it. Which one I would put under your Dojo, and why, is a straight answer in the mailbox.</p>"},

    {id:"data-privacy", q:"Is my data safe? Who sees my customer information?",
     alt:["my data","customer data","our data","privacy","private","gdpr","confidential","confidentiality"],
     keys:"data privacy private confidential information info sees access secure secret records leak leaks",
     a:"<p>Everything I build runs in your own accounts, in your name: your AI account, your software, your mail. The ninjas' entire world is what you wrote down and verified. No agent touches money or the outside world without your press, and nothing sends itself. Every agent has a lane and never widens it on its own.</p><p>If your industry has a specific rule it must meet, say so in the mailbox and I will tell you straight whether the Dojo meets it.</p>"},

    {id:"need-to-understand", q:"Do I need to understand AI to use this?",
     alt:["understand ai","do i need to understand","need to be technical","not technical","hate computers","do not like computers","dont like computers","bad with computers","computer person","learn to code"],
     keys:"understand learn learning technical tech nerd computers computer knowledge skill skills required prompt prompts prompting code coding",
     a:"<p>No, and that is the point. Only a tiny slice of people using AI will ever touch the builder tools. I build and train the Dojo; you run your business. If you ever want to learn what is under the hood, I will show you, but it is never required. The staff at my gym and my spa never touch the builder tools: they see a draft, a booking, a payment to confirm, and press.</p>"},

    {id:"what-is-agent", q:"What is an AI agent, and why call them ninjas?",
     alt:["what is an agent","what is a ninja","what are ninjas","what are the ninjas","what is an ai agent","agent vs chatbot","difference between a chatbot","why ninjas","why call them"],
     keys:"agent agents chatbot bot bots workforce worker workers assistant assistants employee difference call called name names",
     a:"<p>A chatbot answers when you type at it, then forgets. An agent has a job: it reads what arrives, does the repeatable part, and files the result, whether you are watching or not.</p><p>I call mine ninjas because every one starts at white belt and earns trust the way my gym kids do: show up, prove it, then a wider lane. A ninja drafts, files, proposes. It never sends, pays or posts on its own.</p>"},

    {id:"belts", q:"Why the belts?",
     alt:["white belt","the belts","why belts","black belt","earn a belt","earn belts","belt system"],
     keys:"belt belts white black green rank ranks grade grades trust earn earned earns prove proven proves propose promotion",
     a:"<p>Because trust is earned by showing up and proving it, which is exactly how I grade kids at the gym. A ninja that has proven its lane gets a wider one. One that has not, does not. It keeps the honest order: propose, prove, then earn.</p>"},

    {id:"masters", q:"What is an Agentic CMO, and what are the Masters?",
     alt:["agentic cmo","what is a master","what are the masters","the masters","six seats","fractional cto","fractional cmo","fractional"],
     keys:"agentic cmo cfo cto master masters seat seats general generals fractional executive executives director head heads chief officer",
     a:"<p>The same idea as a fractional CTO, with the work done by trained AI ninjas instead of a person on a day rate. A Master is a seat: a job title a payroll would recognize, one number it is judged on, and the solutions on this page working under it. Six seats exist, and all six have run my own businesses and are for sale. A Master never widens a ninja's lane. Every send, pay and post still waits for your press.</p>",
     cta:{what:"The Agentic CMO seat", kind:"dojo"}},

    {id:"human-press", q:"What does \"a human presses every send\" mean?",
     alt:["human press","presses every send","human presses","press send","press every","approve everything","approve every","final say","in control","stay in control"],
     keys:"press presses pressed send sends approve approval approves review reviewed sign off signoff signs control final say decide decides decision decisions",
     a:"<p>Exactly what it says. A ninja can read, draft, file and propose all day, but the moment something would leave the building, a reply, a payment, a post, it waits for a person to press. That press is yours, or your team's, or mine if you chose Sensei runs it. It is the rule that makes the rest safe, and it does not bend at any belt or any price.</p>"},

    {id:"agent-ready", q:"What does \"agent-ready\" mean? Can my website be?",
     alt:["agent-ready","agent ready","webmcp","ai agents visit","assistant visit","my website ready","agents are customers","agents as customers","agent is the customer","assistant deal with you","pricing an agent can read","readable to an agent","support desk an agent can call","desk that agents call","receipts for the work","audit trail"],
     keys:"webmcp ready website websites site web visitor visitors assistant assistants visit visits browser chrome standard tool tools call",
     a:"<p>The next visitor to a website may not be a person. It may be somebody's assistant, sent to find out what you do and get in touch. Most websites make an agent guess its way through the screen. This one tells it, in a form it can use: the solutions list answers as one, the mailbox is written as a tool an agent can call, and so is this box.</p><p>Early days, honestly: the standard is in the browser makers' trial and the big assistants are still learning to use it. Being ready before they arrive is the whole point, and your page can be.</p>",
     cta:{what:"An agent-ready web presence", kind:"build", note:"My website ready for AI agents: the tools they can call, the answers they can read."}},

    {id:"inbox-security", q:"Is it safe to let an AI read my inbox?",
     alt:["read my inbox","reads my inbox","reading my inbox","read my email","read my emails","reads my email","reading my email","let an ai read","access to my inbox","access to my email","access my inbox","inbox safe","inbox security","secure inbox","security for the agent"],
     keys:"inbox safe safety secure security read reads reading access permission permissions",
     a:"<p>Safe the way I build it. The desk reads every message, sorts it, drafts the reply in your voice, and stops there. Nothing leaves without a human press. It ignores bounces and machine mail, it cannot touch money, and every draft it ever made stays on file, so you can always see what it did and why. Whatever the AI companies change tomorrow, the press is still yours.</p>",
     cta:{what:"The Front Desk", kind:"build", note:"Support replies drafted on auto. You press send."}},

    {id:"tested-first", q:"Does anyone test it before my customers see it?",
     alt:["test it before","tested before","before my customers","who tests it","is it tested","do you test","sandbox","simulated players","simulated users","playtest","play test","agents test"],
     keys:"test tests tested testing tester sandbox simulated simulation players rounds routes bugs bug broken breaks break crash crashes qa",
     a:"<p>Yes, and not by me clicking around. Simulated players go first: hundreds of rounds, every route walked, every button pressed, looking for stalls, dead ends and bad sums. Then a second pass in character, people of different ages and patience, reporting where they got lost. It began on WinJitsu, it runs on the games, and it walked this page before the chat box shipped.</p>"},

    {id:"answer-box", q:"I want an answer box like this, but not an AI. Can you build that?",
     alt:["answer box","a box like this","box like this","like this one","not an ai","without ai","no ai","are you an ai","are you a bot","are you a robot","are you human","are you a human","is this an ai","is this a bot","is this chat","who am i talking to","are you real","are you rick","is this rick","am i talking to","can you build this","build me this","on my site","on my page","for my site","for my page"],
     keys:"box answer answers bot robot human real person chat chatbot talking build this one site website page mine own",
     a:"<p>Yes. This box is Rick's: every answer in it is his, in his words, and nothing in it is guessed. If a question is not covered, it says so and hands you to him. Yours would work the same way, in your words, about your business, with your button at the end of every answer.</p><p>It comes in two sizes. The one you are typing into now runs on a plain web page with nothing behind it, and it took an afternoon. The Answer Engine in the solutions list is the grown-up version: the same rule, verified facts only, reading the whole question and logging every miss so the library grows.</p>",
     cta:{what:"An answer box like this one", kind:"build", note:"Answers in my words, on my page, with my button at the end."}},

    {id:"what-can-ai-do", q:"What can AI actually do for a business like mine?",
     alt:["what can ai do","what can it do","what does it do","use ai in my business","how can ai help","how could ai help","what would you build","where would you start","what do you do","what do you offer","what do you sell","your services","list of services"],
     keys:"help helps offer offers sell sells services service solutions automate automation tasks admin paperwork repetitive repeatable boring",
     a:"<p>The repeatable work: the same questions answered, bookings kept, payment mail filed, campaigns drafted in your voice, the long things written with you. Everything on this page has run on my own gym, spa, hostel or a client's desk first.</p><p>The solutions list is what I actually sell: The Front Desk, The Booking Desk, The Money Desk, The Marketing Room and the rest. Ask me about any one by name, or take the quiz and it works out where I would start.</p>"},

    {id:"using-vs-operating", q:"We already use AI. Why would we need this?",
     alt:["already use chatgpt","already use ai","we use ai","we already use","why would we need","why do i need","why do we need"],
     keys:"already using operate operating own owns consistent consistency everyone team",
     a:"<p>Almost every business that says it uses AI means this: a few people type questions into a chat box, each in their own way, and whatever they work out stays in their own head. It helps a bit. It is not something the business owns. The one person who got good at it is the only one who got good at it, and when they leave, it leaves with them.</p><p>Operating with AI is one way of working, written down once, handed to every worker you have, kept current, and it belongs to you. That is what I set up: your best way of doing a thing, sharpened by one person, and everyone has the sharper one the next morning.</p>"},

    {id:"learns", q:"Does the AI learn my business over time?",
     alt:["does it learn","learn my business","gets smarter","get smarter","does it remember","will it remember"],
     keys:"learn learns learning smarter improve improves memory remember remembers forget forgets adapt adapts train trained training teach",
     a:"<p>Yes, and only with your veto. A ninja gets smarter by proposing notes you approve, and nothing is ever deleted, so you always know what it knows. The answer library grows the same way: every question it could not answer is logged, and answering one adds a verified entry. That is The Notebook and The Answer Engine, both switched on in my own agents today.</p>",
     cta:{what:"The Notebook", kind:"build", note:"Your AI learns. You hold the veto."}},

    {id:"mistakes", q:"What happens when it gets something wrong?",
     alt:["gets it wrong","gets something wrong","get it wrong","makes a mistake","make a mistake","when it fails","goes wrong","if it breaks","what if it"],
     keys:"wrong mistake mistakes fail fails failure error errors broken breaks break fix fixes undo bad outage down",
     a:"<p>It gets caught before it leaves the building, because nothing leaves without a press. A wrong draft is a draft you do not send. A question the library cannot answer becomes \"I don't know\" and a row in the missed-questions list, and answering that row is how the library grows.</p><p>A change that makes things worse gets put back in a minute, because the way of working is kept like code with every version saved. And an alarm tells me when the mail stops, because an outage once went unnoticed for days.</p>"},

    /* ---- the service ---- */
    {id:"cost", q:"What does it cost?",
     alt:["how much","what does it cost","what does this cost","what do you charge","your prices","your pricing","the price","pricing","cost"],
     keys:"cost costs price prices pricing charge charges fee fees month monthly dollar dollars usd expensive cheap afford affordable budget rate rates 4444 2222",
     a:"<p>Sensei runs it is $4,444 a month: I build it and I run the daily work too. Your Dojo is $2,222 a month: I build it, you run it. Both are monthly, cancel anytime, effective at the end of the paid month. Start with the quiz: it tells you which one fits.</p><p>Two things are true whichever you pick. Building a product you sell, an app, a site, a backend, is separate work, scoped and agreed in writing before the clock starts. And third-party costs are always yours: your AI, software and ad accounts stay in your name.</p>",
     link:{href:"#quiz", label:"Start with the quiz"}},

    {id:"build-cost", q:"How much does a build cost, like a chat box or an app?",
     alt:["cost to make","cost to build","cost to have","much to build","much to make","much for a","much would a","much does a","much is a","price of a","cost of a","price for a","quote","estimate","how much for","app cost","website cost","site cost","form cost","box cost","like that cost","would an app","would a website","would a chat"],
     keys:"cost costs price prices quote quotes estimate charge make build built chat box app site website form feature bot",
     a:"<p>Straight answer: it depends on the size, and I will tell you the number before the clock starts. A build is scoped and agreed in writing first, and it sits outside the two monthly Dojo offers. The first conversation is free.</p><p>For scale, from my own shop: the box you are typing into and the mailbox at the bottom of this page each took an afternoon. The Answer Engine behind my spa's site, answering in two languages from a written guide and taking bookings from a plain email, was a bigger build over a few weeks. Tell me what you want it to answer and where it should live, and you get a real number, not a range.</p>",
     cta:{what:"a quote for a build", kind:"build", note:"A chat box, a form or an app: tell me what it must do and I will price it.", label:"Get the number"}},

    {id:"tiers", q:"What is the difference between Sensei runs it and Your Dojo?",
     alt:["difference between","sensei runs it","your dojo","which tier","which plan","which one","two options","two offers","the two"],
     keys:"difference tier tiers plan plans option options sensei runs run compare comparison versus vs choose pick between package packages",
     a:"<p>Both are me doing the building, because that is the product. The difference is who runs the daily work once the Dojo stands.</p><p>Your Dojo, $2,222 a month: the audit, the command center, the trained ninjas, the factories behind your repeated work, and me on call as your sensei. Your team runs the daily DO. Sensei runs it, $4,444 a month: everything in Your Dojo, and I run the daily work too, the newsletters go out, the inbox gets drafted, the reports land, without your team touching it. You keep the judgment calls and the final press either way.</p>",
     link:{href:"#offers", label:"See the two offers"}},

    {id:"cancel", q:"Can I cancel?",
     alt:["cancel","contract","lock in","locked in","lock-in","commitment","minimum term","tied in","how long am i"],
     keys:"cancel cancelling cancellation contract contracts lock locked commit commitment minimum term terms subscription quit stop leave leaving refund refunds notice",
     a:"<p>Anytime. It is a monthly subscription, and cancelling takes effect at the end of the paid month. The Dojo and everything built in your accounts stays yours; it was always in your name.</p>"},

    {id:"first-month", q:"What happens in the first month?",
     alt:["first month","how do we start","how do i start","where do we start","where do i start","get started","getting started","what happens first","onboarding","how does it start","the first step"],
     keys:"start starts starting begin begins beginning first month audit onboarding kickoff step steps process happens order",
     a:"<p>The audit first: we map where your hours actually go, together. Then your first ninja takes the one task that eats the most, usually the inbox, at white belt. It proves itself before anything widens.</p><p>That is the order it happened in for me: the gym's inbox first, then bookings, then the books, each one earning the next.</p>"},

    {id:"how-long", q:"How long does it take?",
     alt:["how long","how fast","how quickly","how soon","timeline","time frame","timeframe","when will it","up and running"],
     keys:"long fast quick quickly timeline weeks week days months soon deliver delivery ready running live",
     a:"<p>The audit is the first thing, and your first ninja takes the biggest task in month one, at white belt. It widens once it has proven itself, not on a calendar.</p><p>For scale: the mailbox at the bottom of this page took an afternoon. The whole Dojo behind my own businesses took five months, and it is a practice, not a delivery, which is why it is a subscription and not a project.</p>"},

    {id:"build-app", q:"Do you build apps and websites too?",
     alt:["build an app","build me an app","build my app","build a website","build my website","build me a website","make an app","make me an app","custom software","product development","need a developer","need an app","new website"],
     keys:"app apps website websites site sites software build builds building custom product products feature features developer development code game games backend",
     a:"<p>Yes, and it is separate work. I have built the app that runs my gym, a spa app, a hostel app, my own POS backend, the console that runs everything and a game on the Apple App Store, all higher up this page.</p><p>Building a product you sell is scoped and agreed in writing before the clock starts; it is not inside the two monthly Dojo offers. Tell me what you want built and I will tell you straight what it would take.</p>",
     cta:{what:"Something built", kind:"build", note:"An app, a site or a feature, scoped in writing first."}},

    {id:"who-for", q:"Who is this for? What kind of business?",
     alt:["who is this for","is this for me","is it for me","kind of business","type of business","right for me","too small","one person","just me","solo","freelancer","big enough"],
     keys:"business businesses small solo freelancer sole owner owners person company companies industry industries fit fits size gym clinic studio shop consultant coach agency restaurant salon spa hotel hostel school factory practice dentist lawyer",
     a:"<p>The owner whose strength is the room, not the screen: the sensei, the clinician, the shop keeper, the consultant whose week disappears into the same questions, the same scheduling, the same chasing.</p><p>It has run for a kids' gym, a spa, a hostel, a publishing house, a coaching team's desk and a 1998 factory. One person or a team, either works; the quiz does not even assume you have a company.</p>"},

    {id:"quiz", q:"What is the quiz, and does it ask for my email?",
     alt:["the quiz","take the quiz","what is the quiz","quiz"],
     keys:"quiz questions twelve 12 result results minutes assessment self-audit email address",
     a:"<p>Twelve questions. It asks what you are trying to move, where the hours really go, what runs the work today and how you honestly feel about computers. The result is computed from your answers alone and shown without asking for an email. It tells you which of the two ways in fits, and where I would start.</p>",
     link:{href:"#quiz", label:"Take the quiz"}},

    {id:"testimonials", q:"Do you have testimonials or references?",
     alt:["testimonials","testimonial","reviews","references","case studies","case study","any proof","social proof","who have you worked with","other clients"],
     keys:"testimonials review reviews reference references case studies study proof clients client results evidence worked track record",
     a:"<p>No testimonials yet, on purpose. Client names stay out of it, and I will not invent a quote to fill a box. What I can show is what was asked for and what shipped: the gym app with 1,000+ members, a client's support desk that drafts every reply for one human press, my own POS backend, and the whole front and back office of a 1998 factory. The proof wall on this page lists them.</p><p>When client quotes appear, they will be real, attributed with permission, and boring compared to the builds. That is how you will know they are true.</p>",
     link:{href:"#opt-8b", label:"See the proof wall"}},

    {id:"contact", q:"How do I contact you? Can we talk on the phone?",
     alt:["contact you","mailbox","the mailbox","email address","your email","phone number","your phone","call you","a call","zoom","book a call","talk to you","get in touch","reach you","whatsapp","line id","speak to you","speak with you","talk to rick","free consultation"],
     keys:"contact email phone call calls zoom meeting meet talk chat reach whatsapp telegram number address consultation consult conversation",
     a:"<p>Through my mailbox at the bottom of this page. My address is not written anywhere here for the crawlers to eat, and the mailbox does not open your mail app. Your message lands with my Ninja Agent, which writes back within a minute from what I wrote; I read every message and follow up myself, usually within a day. Or email it straight: aininja@ricktew.com.</p><p>A first conversation costs nothing. If you want a call, say so in the message and I will set one up from my side.</p>",
     cta:{what:"a conversation", kind:"other", note:"Tell me what to call you about and when.", label:"Write to Rick"}},

    {id:"reply-time", q:"How fast do you reply?",
     alt:["how fast do you reply","reply time","response time","when will you reply","hear back","how soon will i hear","will you reply","do you reply"],
     keys:"reply replies respond response answer back hear wait waiting soon",
     a:"<p>The ninja, within a minute; me, usually within a day. Your message lands with my Ninja Agent, an AI I built and trained in my Digital Dojo. It writes back from the answers I wrote, signed as the AI, and I read every message and follow up myself.</p>"},

    {id:"email-the-ninja", q:"Can I just email the ninja and see?",
     alt:["email the ninja","email your ninja","email aininja","aininja","try it out","try the ninja","test the ninja","test it out","see what comes back","talk to the ninja"],
     keys:"email mail ninja agent try test demo see comes back write aininja",
     a:"<p>Yes. Write to aininja@ricktew.com and see what comes back. My Ninja Agent answers within a minute, from the same answers this box uses, signed as the AI, and it says so when it does not have one. I read every message and follow up myself.</p>",
     cta:{what:"a conversation", kind:"other", note:"Or use the mailbox below.", label:"Write to Rick"}},

    {id:"who-is-rick", q:"Who is Rick Tew?",
     alt:["who is rick","who are you","about you","about rick","your background","your story","where are you from","where are you based","where are you located","are you american","tell me about yourself"],
     keys:"who background story experience sensei martial arts gym nerd builder california american thailand samui based located live lives lived years old",
     a:"<p>An American martial arts sensei and a lifelong nerd. I opened my first dojo at 19, taught my own system in Europe, wrote WinJitsu in Pai, and today I run NinjaGym on Koh Samui, Thailand: martial arts for kids, seven days a week, 1,000+ members.</p><p>Games and computers since I was a kid, a word processor I begged my parents for, then teaching companies Microsoft Word one day and martial arts the next. Since March I have built the app that runs my gym, my own POS backend, the console that runs everything and a game on the Apple App Store. Now I build Dojos for other owners.</p>"},

    {id:"ownership", q:"Who owns what gets built?",
     alt:["who owns","do i own","own the code","own it","if i leave","what happens if i cancel","what happens if i stop","take it with me"],
     keys:"own owns ownership owner keep keeps code accounts leave leaving stays yours mine belong belongs ip intellectual property hostage",
     a:"<p>You do. Everything is built in your accounts, in your name: the Dojo, the ninjas, the written way of working. If you cancel, it stays where it is, because it was always yours. Nothing is held hostage for a renewal.</p>"},

    {id:"third-party", q:"Are there other costs? AI subscriptions, software?",
     alt:["other costs","extra costs","hidden costs","hidden fees","third party","third-party","ai subscription","ai subscriptions","api costs","token costs","on top of"],
     keys:"extra hidden other third party costs subscriptions software tools accounts api tokens usage bills bill top",
     a:"<p>Third-party costs are always yours, and they stay in your name: your AI account, your software, your ad accounts. I do not resell them and I do not mark them up. One switch in the Dojo pauses every metered AI call, and a weekly line tells you what the agents cost.</p>"},

    {id:"helpings", q:"Can you just do one small thing for me?",
     alt:["one small thing","small job","small task","just one thing","a quick fix","quick fix","a flyer","flyers","business cards","a logo","the helpings","a helping","small request"],
     keys:"small quick little task job fix fixes flyer flyers cards sign signs logo poster print design tweak tweaks favour favor request",
     a:"<p>Yes. Most of what I build is not a whole app; it is the smaller thing somebody asked for on a Tuesday: a price editor, a flyer set that reads from the live catalog, a mail persona, a workflow fix. The helpings row in the solutions list is a long list of them, every one running today. Say what your Tuesday looks like in the mailbox.</p>",
     cta:{what:"One of the helpings", kind:"build", note:"The smaller thing I asked for on a Tuesday."},
     link:{href:"#helpings", label:"See the helpings"}},

    {id:"hininja", q:"What about the martial arts, camps and coaching?",
     alt:["martial arts","hi ninja","the camps","ninja camp","coaching","winjitsu","train with you","mat time","ninjagym","the gym","kids classes","life coaching","speaking"],
     keys:"martial arts camp camps coaching coach winjitsu train training lessons classes mat gym kids karate ninjutsu seminar speaking speaker retreat",
     a:"<p>That is the other door of this site. Thirty years of teaching, the camps, the coaching and WinJitsu live behind the HI Ninja door, and NinjaGym on Koh Samui is open seven days a week. If it is mat time or coaching you want, pick the HI Ninja subject in the mailbox, or walk through the door.</p>",
     cta:{what:"The HI Ninja side", kind:"hininja", note:"Camps, coaching, mat time.", label:"Write about the HI side"},
     link:{href:"/hininja/", label:"Take the HI Ninja door"}},

    {id:"marketing", q:"Can you run my ads or marketing?",
     alt:["run my ads","google ads","facebook ads","meta ads","instagram ads","my marketing","social media","more customers","get more customers","more leads","more clients"],
     keys:"ads ad advertising google facebook meta instagram tiktok social media marketing campaign campaigns newsletter newsletters seo content posts leads customers growth grow promote promotion",
     a:"<p>The Agentic CMO seat does the planning: the campaign, three angles in your voice, the ad math before a cent moves, and the numbers read back to you daily. The Marketing Room drafts, The Ad Room does the math and the copy, and neither spends a cent itself: you hold the wallet and press every post. It has already run on three of my own businesses: plans on the table, nothing spent.</p>",
     cta:{what:"The Agentic CMO seat", kind:"dojo"}},

    {id:"languages", q:"Does it work in other languages?",
     alt:["other languages","in thai","speak thai","multilingual","bilingual","in german","in dutch","in spanish","in french","in english","not english"],
     keys:"language languages thai english german dutch spanish french italian multilingual bilingual translate translation translations speak speaks",
     a:"<p>Yes. My gym app speaks every language its families speak, the desk answers Thai guests in Thai, and the answer library that grows from missed questions runs in two languages at one client. A guest who writes at midnight has a draft waiting by morning, in their own language. At my spa the booking-by-email reader understands a request in nine languages besides English and Thai.</p>"},

    {id:"tewbedo", q:"What is TewBeDo, the console?",
     alt:["tewbedo","the console","command center","command centre","control panel"],
     keys:"tewbedo console command center centre overseer dashboard screen view panel",
     a:"<p>One dark screen that runs my whole working life, from my phone, my iPad or the couch. Nobody sold a console like it, so I built my own: VIEW answers \"is everything running?\" honestly, including \"no\"; BE is every project as a card; DO is today's missions; AGENTS is my AI staff at their desks; INTEL is a news radar scouted against my own projects.</p><p>Of everything I have built, it is the one I use most, and it is the part of the Dojo every client ends up asking about. Your Dojo comes with a command center of its own.</p>"},

    {id:"availability", q:"Do you have room for new clients right now?",
     alt:["room for","taking clients","taking on","taking new","are you available","waiting list","waitlist","seats left","how many clients","how many seats","fully booked"],
     keys:"room available availability taking clients client capacity seats seat waiting waitlist list full busy booked spots spot",
     a:"<p>Seats are capped, because a sensei who takes every student teaches none of them. Whether one is open right now is a straight answer I give in the mailbox. Post the message and you will hear from me, usually within a day.</p>"},

    {id:"remote", q:"Do you work with businesses outside Thailand?",
     alt:["outside thailand","work remotely","remotely","remote","in europe","in the us","in the uk","in america","in australia","in canada","my country","time zone","timezone","time zones","other countries","overseas"],
     keys:"remote remotely outside thailand europe america usa canada australia country countries abroad international timezone zone zones location anywhere overseas worldwide",
     a:"<p>The work happens in your own online accounts, which do not care where you are, and I have lived and taught all over the world. Say where you are and what you run in the mailbox and I will tell you straight whether I can take it on, time zones included.</p>"},

    {id:"teach-me", q:"Can you teach me to do this myself?",
     alt:["teach me","teach us","learn to do it myself","do it myself","train my team","train me","workshop","course on ai","learn ai"],
     keys:"teach teaches teaching taught learn learning myself ourselves course courses workshop workshops lesson lessons training train mentor mentoring",
     a:"<p>Yes, and I like it when it happens. I teach it the way I taught the memory program: hands on, on your own business, until you can run it without me. It is rare: one friend asked for exactly this, and six-plus hours of teaching later the request quietly changed to \"could you just do it for us?\" That is fine too. Say which one you are in the mailbox.</p>",
     cta:{what:"to learn to build with AI myself", kind:"other", note:"Hands on, on my own business.", label:"Ask about teaching"}},

    /* ---- the solutions, quoting the page's own rows ---- */
    {id:"front-desk", q:"What is The Front Desk?", sol:"The Front Desk",
     alt:["front desk","support desk","support inbox","help desk","helpdesk","customer service","customer support","my inbox","the inbox","answer emails","answering emails","reply to emails","crm"],
     keys:"support inbox email emails mail mails replies reply customer service helpdesk tickets ticket crm drafts drafted answering answers questions",
     a:"<p><b>Support replies drafted on auto. You press send.</b> An AI agent reads every support mail, day and night, and drafts the reply from your own written answers. Hours back every week, zero robot answers. Runs live in my business today.</p><p>Where it runs: my gym's desk, my spa's desk agent, and a coaching team's inbox, each one drafting from that business's own written answers.</p>",
     cta:{what:"The Front Desk", kind:"build", note:"Support replies drafted on auto. You press send."}},

    {id:"money-desk", q:"What is The Money Desk?", sol:"The Money Desk",
     alt:["money desk","payment mail","payment emails","did that payment","the books","bookkeeping","reconciliation","reconcile payments"],
     keys:"payment payments paid money received books bookkeeping reconcile reconciliation match matching invoices invoice accounting accounts file files filing bank",
     a:"<p><b>Payment mail books itself. One press, done.</b> \"Money received\" mails auto-file and auto-match against what is owed; one press confirms and writes the books. No more \"did that payment come in?\". Live on real payment mail today.</p>",
     cta:{what:"The Money Desk", kind:"build", note:"Payment mail books itself. One press, done."}},

    {id:"booking-desk", q:"What is The Booking Desk?", sol:"The Booking Desk",
     alt:["booking desk","online booking","online bookings","take bookings","bookings","appointments","scheduling","book a session"],
     keys:"booking bookings book books appointment appointments schedule scheduling calendar reminders reminder reschedule reschedules cancels slots slot availability",
     a:"<p><b>Bookings on autopilot. No back and forth.</b> People book you without an account or email ping-pong; reminders, reschedules and cancels handle themselves. This system ran my own gym while I taught the classes.</p><p>At my spa it also knows the furniture: three foot chairs, two beds, one mat, and each therapist's call-in notice, so it only offers a slot the room can actually hold.</p>",
     cta:{what:"The Booking Desk", kind:"build", note:"Bookings on autopilot. No back and forth."}},

    {id:"colleagues", q:"What is Colleagues by Email?", sol:"Colleagues by Email",
     alt:["colleagues by email","colleagues by mail","agents you mail","email an agent","mail an agent","numbers desk","ask by mail"],
     keys:"mailbox mailboxes colleagues colleague numbers desk mail email ask question phone",
     a:"<p><b>AI agents you mail like staff.</b> Named AI agents with their own mailboxes: ask the numbers desk a question from your phone, the answer comes back by mail. No agent touches money or the outside world. Mine work this way today.</p>",
     cta:{what:"Colleagues by Email", kind:"build", note:"AI agents you mail like staff."}},

    {id:"marketing-room", q:"What is The Marketing Room?", sol:"The Marketing Room",
     alt:["marketing room","campaigns drafted","in my voice","in your voice","house voice"],
     keys:"marketing room campaign campaigns drafts draft voice brief briefs approve ships numbers",
     a:"<p><b>Campaigns drafted in your voice, on auto.</b> A brief goes in, three drafts come out in your voice; only the one you approve ships, and the day's numbers land in one glance. A marketing department's output, minus the payroll. Live in daily use.</p>",
     cta:{what:"The Marketing Room", kind:"build", note:"Campaigns drafted in your voice, on auto."}},

    {id:"ad-room", q:"What is The Ad Room?", sol:"The Ad Room",
     alt:["ad room","ad copy","ad math","ad spend","ad budget","before you spend"],
     keys:"ad ads copy math spend spends spending budget budgets wallet discipline plans",
     a:"<p><b>Ad math and ad copy before you spend.</b> The system plans exactly what your ads must deliver, drafts the copy for your approval, and never spends a cent itself. You hold the wallet; it holds the discipline.</p>",
     cta:{what:"The Ad Room", kind:"build", note:"Ad math and ad copy before you spend."}},

    {id:"publishing-house", q:"What is The Publishing House?", sol:"The Publishing House",
     alt:["publishing house","write a book","writing a book","my book","a course","the manual","members into authors","author workbook"],
     keys:"book books author authors publishing publish workbook course courses manual editorial writing write written pipeline coach ghostwrite",
     a:"<p><b>A system that turns members into authors.</b> A guided workbook, an editorial pipeline, and an AI coach that asks better questions but never writes for them. Running in a real publishing house today.</p>",
     cta:{what:"The Publishing House", kind:"build", note:"A system that turns members into authors."}},

    {id:"answer-engine", q:"What is The Answer Engine?", sol:"The Answer Engine",
     alt:["answer engine","knowledge base","chat box","chatbot for my","bot for my website","faq bot","ai chat on my site","i don't know"],
     keys:"knowledge base kb faq faqs answers answer chat chatbot bot library search verified facts guessing guess",
     a:"<p><b>Your knowledge base, answering 24/7.</b> The brain behind the chat box and the drafted replies: it answers only from facts you verified and says \"I don't know\" instead of guessing. Every miss it logs makes your library smarter.</p><p>Where it runs: the chat on my spa's site, in English and Thai, answering from a written studio guide, and the box you are typing into now is its simplest form.</p>",
     cta:{what:"The Answer Engine", kind:"build", note:"Your knowledge base, answering 24/7."}},

    {id:"notebook", q:"What is The Notebook?", sol:"The Notebook",
     alt:["the notebook","hold the veto","the veto"],
     keys:"notebook notes note veto approve learns learn memory deleted",
     a:"<p><b>Your AI learns. You hold the veto.</b> AI agents get smarter only by proposing notes you approve, and nothing is ever deleted, so you always know what they know. Switched on in my own agents today.</p>",
     cta:{what:"The Notebook", kind:"build", note:"Your AI learns. You hold the veto."}},

    {id:"quiz-funnel", q:"What is The Quiz Funnel?", sol:"The Quiz Funnel",
     alt:["quiz funnel","lead magnet","quiz on my page","quiz for my site","visitors into leads","lead capture"],
     keys:"quiz funnel lead leads magnet visitors visitor capture self-audit audit page",
     a:"<p><b>A quiz that turns visitors into leads.</b> A self-audit on your page: visitors bring their own numbers, the math tells the truth, and the answer is never held hostage for an email. The quiz further down this page is it, live.</p>",
     cta:{what:"The Quiz Funnel", kind:"build", note:"A quiz that turns visitors into leads."}},

    {id:"video-room", q:"What is The Video Room?", sol:"The Video Room",
     alt:["video room","video calls","voice calls","calls inside","paid room","paid rooms","no-show","no show"],
     keys:"video calls call voice zoom rooms room paid refund refunds no-show noshow dial",
     a:"<p><b>Calls inside your own app.</b> Voice and video built into your own app: staff dial a member, a paid room opens the moment payment lands, no-shows end in an automatic refund. Built, in human testing now.</p>",
     cta:{what:"The Video Room", kind:"build", note:"Calls inside your own app."}},

    /* ---- the seats ---- */
    {id:"seat-cmo", q:"What does the Agentic CMO do?",
     alt:["agentic cmo do","cmo seat","the cmo","marketing seat"],
     keys:"cmo marketing seat owns customers campaign angles wallet",
     a:"<p><b>Agentic CMO. Owns: more customers.</b> Plans the campaign, drafts three angles in your voice, does the ad math before a cent moves, and reads the numbers back to you every day. You approve, you press, you hold the wallet. It has already run on three of my own businesses: plans on the table, nothing spent. Runs The Marketing Room, The Ad Room, The Quiz Funnel and The Letter Slot.</p>",
     cta:{what:"The Agentic CMO seat", kind:"dojo"}},

    {id:"seat-care", q:"What does the Agentic Head of Customer Care do?",
     alt:["customer care","head of customer care","care seat","customer care seat"],
     keys:"customer care head seat owns question answered booking kept",
     a:"<p><b>Agentic Head of Customer Care. Owns: every question answered, every booking kept.</b> Reads every mail, drafts the reply from your own written answers, keeps bookings from turning into ping-pong, and says \"I don't know\" instead of guessing. You press every send. The Front Desk under this seat runs live in my gym today. Runs The Front Desk, The Booking Desk, The Answer Engine, The Notebook and Colleagues by Email.</p>",
     cta:{what:"The Agentic Head of Customer Care seat", kind:"dojo"}},

    {id:"seat-chief", q:"What does the Agentic Chief of Staff do?",
     alt:["chief of staff","is everything running","everything running"],
     keys:"chief staff seat owns running routes reports overseer view",
     a:"<p><b>Agentic Chief of Staff. Owns: is everything running, and who is doing what.</b> One view over every desk you have, and a truthful answer to \"is everything running?\", including \"no\". It routes the work and reports to you in one place. It never does a department's job itself, and it never widens anyone's lane. Runs my own shop today.</p>",
     cta:{what:"The Agentic Chief of Staff seat", kind:"dojo"}},

    {id:"seat-content", q:"What does the Agentic Head of Content do?",
     alt:["head of content","content seat","the long things"],
     keys:"content head seat owns long things book course manual newsletter taste",
     a:"<p><b>Agentic Head of Content. Owns: the long things, written in your voice.</b> The book, the course, the manual, the newsletter that actually goes out. It asks better questions and drafts; the taste pass stays human. Runs The Publishing House, and The Video Room (in testing).</p>",
     cta:{what:"The Agentic Head of Content seat", kind:"dojo"}},

    {id:"seat-cfo", q:"What does the Agentic CFO do?",
     alt:["agentic cfo","the cfo","cfo seat","finance seat","money is right"],
     keys:"cfo finance seat owns money right time month owed late",
     a:"<p><b>Agentic CFO. Owns: the money is right and on time.</b> The Money Desk files and matches payment mail on one press. The seat above it watches the whole month: what came in, what is owed, what is late, and says so before you have to ask. Every payment still waits for your press. Runs today: The Money Desk.</p>",
     cta:{what:"The Agentic CFO seat", kind:"dojo", note:"The money is right and on time."}},

    {id:"seat-cto", q:"What does the Agentic CTO do?",
     alt:["agentic cto","the cto","cto seat","tech seat","apps stay up"],
     keys:"cto tech seat owns apps up gear current builds drifted stale tools",
     a:"<p><b>Agentic CTO. Owns: the apps stay up, the gear stays current.</b> It watches your builds, flags what has drifted before you notice, and keeps the tools you run on from going stale. Behind it stands me, with my own Dojo, which is exactly the service this page is selling.</p>",
     cta:{what:"The Agentic CTO seat", kind:"dojo", note:"The apps stay up, the gear stays current."}}
  ];

  /* The chips the box opens with. Six questions a reader of this page
     actually has, three about AI and three about the service. */
  var STARTERS=["is-ai-safe","nobody-understands","what-is-ai","cost","answer-my-emails","first-month","answer-box"];

  /* Tew Tips: one leading line per answer, Rick's, that points the reader at
     the next move. Kept apart from the answers so they can be edited as a
     set. An entry without a tip simply shows none. */
  var TIPS={
    "what-is-ai":"If a prediction machine can draft your inbox, the question is not whether it is clever. It is which of your tasks it takes first. The quiz finds that.",
    "nobody-understands":"You do not need to understand the engine to drive the car. You need a builder who tests the behaviour and keeps a hand on the brake. That is the whole Dojo.",
    "is-ai-safe":"Ask any AI vendor one question: what happens before a message goes out? If the answer is not \"a person presses\", keep walking.",
    "safer-ai":"Pick the task before the brand. A cautious AI drafting your inbox with a person pressing send is safer than a bold one with nobody watching, and the other way round.",
    "replace-staff":"List the tasks your team does that need no judgment, only hours. That list is your first ninja's job description, and the quiz writes it with you.",
    "talks-to-customers":"A drafted reply you read before sending is faster than writing it and safer than a bot sending it. You get both.",
    "which-ai":"The model is the least important choice you will make. The written way of working is the asset, and that is what the Dojo builds.",
    "data-privacy":"Keep every account in your own name from day one. If a vendor wants your customers inside their account, ask why.",
    "need-to-understand":"The best owners I work with never open the tools. They approve drafts on their phone between customers.",
    "what-is-agent":"A chatbot saves you a search. An agent saves you a Tuesday.",
    "belts":"Start every AI worker at white belt, even one you built yourself. Trust it has not earned is a risk you are carrying for it.",
    "masters":"Hire the seat that owns the number you most want moved: more customers, money on time, every question answered.",
    "human-press":"The press is a feature, not a bottleneck. Reading ten drafts takes minutes; writing ten replies took your evening.",
    "agent-ready":"The visitor who cannot use your site tomorrow may be a customer's assistant. Being readable to it costs an afternoon.",
    "inbox-security":"Give the AI the reading and the drafting. Keep the sending. That split is the whole safety model.",
    "tested-first":"Let a hundred fake customers break it before one real one does.",
    "answer-box":"Start with the twenty questions your customers actually ask. Written once, answered every time after.",
    "what-can-ai-do":"The task that annoys you most is usually the one that pays back fastest. Say it in the mailbox.",
    "using-vs-operating":"Write your best way of doing one thing down today. That single page is worth more than any AI subscription.",
    "learns":"\"I don't know\" is the most valuable answer an AI can give you. It shows you exactly what to write next.",
    "mistakes":"Measure what comes out, not what the vendor promises. A decision register keeps anyone from quietly undoing what you decided.",
    "cost":"Count the hours first. The quiz turns the hours you report into a monthly number before you look at either price.",
    "build-cost":"Write down the three things it must do and the one it must never do. That is nine tenths of a quote.",
    "tiers":"If nobody on your team has the spare capacity to press, choose Sensei runs it. If someone does, Your Dojo is enough.",
    "cancel":"The exit is the honest test of any service. Everything built stays in your accounts, so leaving costs you nothing but the machine.",
    "first-month":"Pick the task you would hand an intern on day one. That is the audit's first answer nine times out of ten.",
    "how-long":"The first draft waiting in your inbox is the milestone that matters. Everything after it is widening.",
    "build-app":"Describe the job, not the app. \"Bookings without the back and forth\" is a better brief than \"a booking app\".",
    "who-for":"If the same question reached you three times this week, you are who this is for.",
    "quiz":"Answer the computer question honestly. It only changes who ends up driving.",
    "testimonials":"Ask any vendor for something you can open. A live app beats a quote.",
    "contact":"One line about where your hours go is a better first message than a polite hello.",
    "email-the-ninja":"Ask it the question you would ask me. The answer you get is the answer your customers would get from yours.",
    "who-is-rick":"A sensei's job is taking you from white belt to black without skipping the proving part. Same job here.",
    "ownership":"Whoever builds for you, insist every account is created in your name before the first login.",
    "third-party":"Ask any builder for a weekly line on what the agents cost. If they cannot show it, they are not measuring it.",
    "helpings":"The small thing you have wanted for a year is usually an afternoon. Name it.",
    "marketing":"Do the ad math before the ad account. If the numbers do not work on paper, no budget fixes them.",
    "languages":"A guest answered in their own language books. One who waits for a translation calls the shop next door.",
    "tewbedo":"One screen that says \"everything is running\" is the difference between a business you own and one that owns you.",
    "availability":"Write now anyway. A seat that opens next month goes to the message already on my desk.",
    "remote":"Put your time zone in the message. The drafts wait for your morning, not mine.",
    "teach-me":"Learn it on your own inbox, not a demo. The first real draft teaches more than a course.",
    "answer-my-emails":"Collect the ten replies you send most. That is the training set, and it is already written.",
    "how-rick-uses":"Start with the one thing you did by hand twice this week.",
    "front-desk":"The ten replies you send most are the whole first week of this build.",
    "money-desk":"If \"did that payment come in?\" is a question you ask, this is your first ninja.",
    "booking-desk":"Count the messages it takes to book one slot today. That number is what disappears.",
    "colleagues":"Try the numbers desk first. \"How did this March compare to last?\" is the mail you will send most.",
    "marketing-room":"Write one page on how you talk to customers. Every draft after that sounds like you.",
    "ad-room":"No money moves until the math says what each booking is allowed to cost.",
    "publishing-house":"A coach that asks is worth more than one that writes. The book is only yours if you wrote it.",
    "answer-engine":"Twenty verified answers beat two hundred guessed ones.",
    "notebook":"An AI that learns without your veto learns your worst day too.",
    "quiz-funnel":"Never hold the result hostage for an email. People can tell.",
    "video-room":"In testing means I will tell you when it is ready, not before."
  };

  var api={answer:answer, search:search, tokens:tokens, norm:norm, LIBRARY:LIBRARY, STARTERS:STARTERS, HOURS:HOURS, TIPS:TIPS};

  /* ---------- node: the golden test imports the engine and stops here ---------- */
  if(typeof module!=="undefined" && module.exports){ module.exports=api; return; }
  root.rtAsk=api;

  /* ---------- browser: the box ---------- */
  var doc=root.document;
  if(!doc) return;

  function byId(id){ return doc.getElementById(id); }
  function el(tag, cls, text){ var n=doc.createElement(tag); if(cls) n.className=cls; if(text!=null) n.textContent=text; return n; }
  function find(id){ for(var i=0;i<LIBRARY.length;i++) if(LIBRARY[i].id===id) return LIBRARY[i]; return null; }
  function plain(html){ return String(html).replace(/<\/p>\s*<p>/g," ").replace(/<[^>]+>/g,""); }

  function boot(){
    var panel=byId("askPanel"), launch=byId("askLaunch"), log=byId("askLog"),
        form=byId("askForm"), input=byId("askIn"), x=byId("askX"), cta=byId("askCta");
    if(!panel||!log||!form||!input) return;

    var asked=[];      /* every question typed or tapped, in order, for the hand-off */
    var misses=[];     /* the gap list; a playtest reads window.rtAskMisses */
    root.rtAskMisses=misses;
    var lastFocus=null;

    /* ---- open and close ---- */
    function open(q){
      lastFocus=doc.activeElement;
      panel.hidden=false;
      if(launch) launch.hidden=true;
      doc.body.classList.add("ask-open");
      if(q){ ask(q); } else { try{ input.focus({preventScroll:true}); }catch(e){ input.focus(); } }
    }
    function close(){
      panel.hidden=true;
      if(launch) launch.hidden=false;
      doc.body.classList.remove("ask-open");
      if(lastFocus&&lastFocus.focus){ try{ lastFocus.focus({preventScroll:true}); }catch(e){} }
    }
    root.rtAskOpen=open;
    root.rtAskClose=close;

    if(launch) launch.addEventListener("click", function(){ open(); });
    if(x) x.addEventListener("click", close);
    doc.addEventListener("keydown", function(e){ if(e.key==="Escape"&&!panel.hidden) close(); });
    [].forEach.call(doc.querySelectorAll("[data-ask-open]"), function(a){
      a.addEventListener("click", function(e){ e.preventDefault(); open(a.getAttribute("data-ask-q")||""); });
    });
    if(location.hash==="#ask") open();
    root.addEventListener("hashchange", function(){ if(location.hash==="#ask") open(); });

    /* ---- the hand-off: the same want button as the top of the page, with
       the questions asked riding in the message. Nothing is sent from here;
       the visitor reads the slot and presses post. ---- */
    function handoff(want){
      want=want||HOURS;
      var body="I want this Tew: "+want.what+"."+(want.note?"\n"+want.note:"");
      if(asked.length) body+="\n\nI asked your ninja on the page:\n"+asked.slice(-6).map(function(q){ return "- "+q; }).join("\n");
      body+="\n\nWhat I do:\nWhat eats the hours right now:\nWhen I would like it running:\n";
      close();
      if(typeof root.rtSlotFill==="function") root.rtSlotFill(body, want.kind||"hours");
      else location.hash="#opt-8c";
    }
    function askRick(q){
      var body="Your ninja on the page did not have this one:\n\""+q+"\"\n\nWhat I do:\nWhere this question comes from:\n";
      close();
      if(typeof root.rtSlotFill==="function") root.rtSlotFill(body, "dojo");
      else location.hash="#opt-8c";
    }
    if(cta) cta.addEventListener("click", function(e){ e.preventDefault(); handoff(HOURS); });

    /* ---- rendering ---- */
    function bubble(who){ var b=el("div","ask-b ask-"+who); log.appendChild(b); return b; }
    function scrollDown(){ log.scrollTop=log.scrollHeight; }
    function chips(list, into){
      var row=el("div","ask-chips");
      list.forEach(function(entry){
        var c=el("button","ask-chip",entry.q); c.type="button";
        c.addEventListener("click", function(){ ask(entry.q, entry); });
        row.appendChild(c);
      });
      into.appendChild(row);
    }
    function wantBtn(want, label){
      var b=el("button","ask-want"); b.type="button";
      b.innerHTML='<span class="g" aria-hidden="true">&#129399;</span>'+(label||(want===HOURS?"I want this Tew!!":"I want this Tew"));
      b.addEventListener("click", function(){ handoff(want); });
      return b;
    }
    function linkBtn(link){
      var a=el("a","ask-link",link.label); a.href=link.href;
      a.addEventListener("click", function(){ close(); });
      return a;
    }
    function show(entry, also){
      var b=bubble("n");
      var q=el("div","ask-q",entry.q); b.appendChild(q);
      var a=el("div","ask-a"); a.innerHTML=entry.a; b.appendChild(a);
      if(TIPS[entry.id]){
        var t=el("div","ask-tip"); t.appendChild(el("b",null,"Tew Tip")); t.appendChild(doc.createTextNode(TIPS[entry.id])); b.appendChild(t);
      }
      var row=el("div","ask-act");
      row.appendChild(wantBtn(entry.cta||HOURS, entry.cta&&entry.cta.label));
      if(entry.link) row.appendChild(linkBtn(entry.link));
      b.appendChild(row);
      if(also&&also.length){
        var alsoWrap=el("div","ask-also");
        alsoWrap.appendChild(el("span",null,"Also close:"));
        chips(also, alsoWrap);
        b.appendChild(alsoWrap);
      }
    }
    function showMiss(q){
      misses.push(q);
      var b=bubble("n");
      var a=el("div","ask-a");
      a.innerHTML="<p>I do not have that one, and I would rather say so than guess. Rick does: ask him directly. It lands with his Ninja Agent, and he replies himself, usually within a day.</p>";
      b.appendChild(a);
      var row=el("div","ask-act");
      var btn=el("button","ask-want"); btn.type="button";
      btn.innerHTML='<span class="g" aria-hidden="true">&#129399;</span>Ask Rick this';
      btn.addEventListener("click", function(){ askRick(q); });
      row.appendChild(btn);
      b.appendChild(row);
      var more=el("div","ask-also"); more.appendChild(el("span",null,"Or one of these:"));
      chips(STARTERS.slice(0,3).map(find), more); b.appendChild(more);
    }
    function showChoose(entries){
      var b=bubble("n");
      var a=el("div","ask-a"); a.innerHTML="<p>Two answers fit that. Which one did you mean?</p>"; b.appendChild(a);
      chips(entries, b);
    }
    function showEmpty(){
      var b=bubble("n");
      var a=el("div","ask-a"); a.innerHTML="<p>Give me a few more words, or tap one of these.</p>"; b.appendChild(a);
      chips(STARTERS.map(find), b);
    }
    function welcome(){
      var b=bubble("n");
      var a=el("div","ask-a");
      a.innerHTML="<p>Ask me about AI, or about what Rick does. Short answers in his words, and if I do not have one, I hand you to him.</p>";
      b.appendChild(a);
      chips(STARTERS.map(find), b);
    }

    function ask(q, entry){
      q=String(q||"").trim();
      if(!q) return;
      asked.push(q);
      var u=bubble("u"); u.textContent=q;
      var r= entry ? {kind:"answer", entry:entry, also:[]} : answer(q);
      if(r.kind==="answer") show(r.entry, r.also);
      else if(r.kind==="choose") showChoose(r.entries);
      else if(r.kind==="empty") showEmpty();
      else showMiss(q);
      scrollDown();
    }
    root.rtAskQuestion=ask;

    form.addEventListener("submit", function(e){
      e.preventDefault();
      var q=input.value; input.value="";
      ask(q);
      try{ input.focus({preventScroll:true}); }catch(err){}
    });

    welcome();

    /* The read-only tool for an agent: same library, same honest miss.
       Registers only where the browser has the WebMCP API. */
    (function(){
      var mc=doc.modelContext||root.navigator.modelContext;
      if(!mc||typeof mc.registerTool!=="function") return;
      try{
        mc.registerTool({
          name:"ask_rick_tew",
          description:"Ask Rick Tew's page a question about AI or about the Digital Dojo service (cost, how it starts, what a solution does). Answers only from a library Rick wrote; returns found:false when it has no answer, in which case use post_letter_to_rick.",
          inputSchema:{type:"object",properties:{question:{type:"string",description:"The question, in plain words."}},required:["question"]},
          execute:function(args){
            var r=answer((args&&args.question)||"");
            if(r.kind==="answer") return Promise.resolve(JSON.stringify({found:true, question:r.entry.q, answer:plain(r.entry.a), tip:TIPS[r.entry.id]||""}));
            if(r.kind==="choose") return Promise.resolve(JSON.stringify({found:false, choose:r.entries.map(function(e){ return e.q; })}));
            return Promise.resolve(JSON.stringify({found:false, handoff:"Rick does not have that one written down. Use post_letter_to_rick and a person answers."}));
          }
        });
      }catch(err){}
    })();
  }

  if(doc.readyState==="loading") doc.addEventListener("DOMContentLoaded", boot); else boot();
})(typeof window!=="undefined"?window:this);
