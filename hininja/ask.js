/* ASK THE NINJA on /hininja/, with Kuno (Rick, 28 Oct 2026: "We need a functional chat bot
   and plug it in to answer questions with the system ... We just want them to be able to ask
   questions live and get a reply in that box and if not later ... Ask the Ninja. Maybe a cute
   Kuno image from Canva (Kuno is short for Kunoichi a female Ninja and Rick's assistant)").

   The engine is /aininja/ask.js's word half of the Retrieval Brain kata, copied as it stands
   (same tokens, same stemmer, same gate): a library of answers quoted from this page, matched
   by the words in the question, and the kata's one rule kept whole: return nothing rather
   than guess. A miss offers "Ask Kuno": a small form that posts to the mailbox the same way
   the page's own ask box does (subject hininja, the trap field outside the form, the fill
   time), so the reply comes later by email. No address is written anywhere here.

   Every sentence in the library is a sentence on this page or in menu.js, or one of the few
   labelled rewordings in tests/ask-hininja-golden.js. If the page changes a fact, change it
   here too: the golden test fails, naming the sentence, when they drift.

   Runs in the browser (window.rtHiAsk) and in node (module.exports) for the golden test. */
(function(root){
  "use strict";

  /* ---------- the word engine (as /aininja/ask.js) ---------- */

  /* The program's own names are stopwords: they are in nearly every question and prove
     nothing. "come" too: "can I come for ..." is how half the questions start. */
  var STOP = {};
  ("a an the and or but if then so of to in on at for from by with about as into over under is are was were be been being am do does did doing have has had having can could would should will shall may might must it its this that these those there here what which who whom whose how why when where i me my mine we us our you your yours he she they them their his her hers one ones some any all each every much many more most other another such than too very just also really actually only even still yet again ever never not no nor don dont doesn doesnt didn didnt isn isnt aren arent won wont cant cannot couldn couldnt wouldn wouldnt shouldn shouldnt let lets get got give go going want wants wanted like need needs needed know think thing things stuff kind sort way ways please thanks thank hi hello hey ok okay yes yeah yep nope hmm um well right time tell rick tew ricktew dojo ninja ninjas hininja kuno come coming").split(" ").forEach(function(w){ STOP[w]=1; });

  function norm(s){
    return String(s||"").toLowerCase()
      .replace(/[‘’']/g,"")
      .replace(/[^a-z0-9$]+/g," ")
      .replace(/\s+/g," ").trim();
  }
  /* A blunt stemmer: both sides of every match go through it, so it only has to agree with itself. */
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
  /* An entry with "until" (an ISO time) stops answering after it, like the page's dated promo lines. */
  function live(e){ return !e.until || Date.now()<Date.parse(e.until); }
  function build(lib){
    var df={};
    var built=lib.filter(live).map(function(e){
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

  /* The gate: a whole phrase from the entry is in the question, or two real words match and
     they are more than half the question's real words, or the question was ONE real word and
     it is a distinctive one (in four entries or fewer). Anything weaker is a miss. */
  function search(question, lib){
    var built = lib ? build(lib) : (BUILT || (BUILT=build(LIBRARY)));
    var nq=norm(question), q=tokens(question);
    var hits=[];
    built.forEach(function(b){
      var m=0;
      q.forEach(function(t){ if(b.keys[t]) m++; });
      var phrase=0;
      for(var i=0;i<b.alts.length&&phrase<2;i++){ if(b.alts[i].test(nq)) phrase++; }
      var ok = phrase || (m>=2 && m*2>q.length) || (m===1 && q.length===1 && built.df[q[0]]<=4);
      if(!ok) return;
      hits.push({entry:b.e, score:m+phrase*3, matched:m});
    });
    hits.sort(function(a,b){ return b.score-a.score; });
    return {hits:hits, q:q, empty:q.length===0};
  }

  /* answer {kind:"answer", entry, also} | choose {kind:"choose", entries} | miss | empty */
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

  /* Every entry: id; q, the question as the box shows it; alt, other ways of asking it,
     matched as whole phrases; keys, extra words that find it; a, the answer (HTML, this
     page's own sentences); next, the one next step: a place on the page, or "ask" (the
     Ask Kuno form, with its first line). */
  var MENU={href:"#menu", label:"Build your Ninja Week"};
  var STAYS={href:"#price", label:"Pick your stay"};
  function ASK(label, line){ return {ask:true, label:label, line:line}; }

  var LIBRARY=[
    {id:"what-is", q:"What is this program?",
     alt:["what is this","what is it","what is hi ninja","what is the program","whats this","tell me about it","what do you offer","martial arts introduction","is this a retreat"],
     keys:"program introduction intro overview workshop retreat",
     a:"<p>Pick your tactics and Rick builds a private group workshop for everyone: a go-at-your-own-pace program on Koh Samui Island, Thailand.</p><p>Always wanted to know what ninja martial arts is like? This is a great introduction, with plenty of time for the island.</p>",
     next:MENU},

    {id:"price", q:"How much does it cost?",
     alt:["how much is","how much are","how much does","how much do","how much for","how much will","how much is it","what currency","which currency","us dollars","australian dollars","in usd","what does it cost","what is the price","whats the price","the prices","prices","price","price list","how much money"],
     keys:"cost costs price prices pricing fee fees expensive cheap usd dollar dollars rate rates package packages afford budget",
     a:"<p>Prices in US dollars. 2 weeks: $2,222. 3 weeks? Add a week to the two weeks for $1,000: $3,222.</p><p>A belt in the belt program is $3,997 for 2 months. Instructor is all five belts in 1 year, and learning to teach, $8,994: reserve a spot. Moving here? Mastery is all five belts over 2 years, $15,988.</p><p>Every stay: training and WinJitsu coaching, and a dorm bed if you need one.</p><p>$555 down holds your spot and is non-refundable; the rest is due 2 weeks before you arrive. Pay in full now and save $222.</p>",
     next:STAYS},

    {id:"deposit", q:"Can I pay a deposit?",
     alt:["deposit","a deposit","pay a deposit","the deposit","hold my spot","hold a spot","hold my place","pay later","pay the rest later","pay the rest","the balance","the rest","installments","pay in installments","pay in parts","pay in full","full payment","pay up front","pay upfront","pay it all"],
     keys:"deposit deposits installment installments balance later upfront",
     a:"<p>$555 down holds your spot and is non-refundable; the rest is due 2 weeks before you arrive. Pay in full now and save $222.</p><p>Ill, or your flights change? Your dates can move, within a year of buying. All sales are final.</p>",
     next:STAYS},

    {id:"one-week", q:"Can I come for just one week?",
     alt:["one week","1 week","for a week","a week only","just a week","only a week","single week","shorter stay","less than two weeks","a few days","few days","3 days","three days","something shorter","anything shorter"],
     keys:"shorter 1111",
     a:"<p>One week is half the price, $1,111: book one week.</p>",
     next:ASK("Ask Kuno about one week","I would like to come for one week.")},

    /* Rick's click "One class, booked ahead", 29 Oct 2026 */
    {id:"try-class", q:"Already on Samui? Can I try one class first?",
     alt:["try one class","try a class","one class first","a trial class","trial class","trial lesson","a single class","single class","one class","drop in","drop-in","drop in for a class","taster class","test class","before i book","before booking"],
     keys:"trial try taster dropin",
     a:"<p>Yes: one class, booked ahead.</p>",
     next:ASK("Book one class","I am already on Samui and want to try one class first.")},

    {id:"longer", q:"Can I stay longer than two weeks?",
     alt:["stay longer","longer stay","three weeks","3 weeks","extra week","add a week","more than two weeks","a month","one month","1 month"],
     keys:"longer extend extension extra month",
     a:"<p>3 weeks? Add a week to the two weeks for $1,000: $3,222.</p><p>A belt in the belt program is $3,997 for 2 months. Instructor is all five belts in 1 year, and learning to teach, $8,994: reserve a spot. Moving here? Mastery is all five belts over 2 years, $15,988.</p>",
     next:STAYS},

    {id:"start", q:"When can I start?",
     alt:["when can i start","when can i arrive","start date","start dates","when does it start","next group","when is the next","the dates","what dates","which dates","any day","start next week","start tomorrow","start before january","already on samui","already on koh samui","already here"],
     keys:"start starting begin dates date arrive arrival january 2027 group open available availability opening",
     a:"<p>Any day from 15 January 2027: classes run all year, Monday to Friday. The next group starts 22 January 2027. At checkout you add your arrival date.</p>",
     next:MENU},

    {id:"schedule", q:"What does a day look like?",
     alt:["a typical day","what does a day look like","daily schedule","the schedule","what time","class times","how many classes","only the evening","only evenings","evening only","evenings only","only the evening class"],
     keys:"schedule day daily routine timetable hours morning mornings evening evenings weekend weekends class classes week weekly times typical seminar",
     a:"<p>The Sensei Seminar: a private group workshop Rick builds from the group's picks, 8 to 10 in the morning, Monday to Friday. An optional review class, 8 to 10 in the evening, to practice the morning. Not a morning person? Come to this one instead.</p><p>Class, then the day is yours: game, train, read, or go see the island. Weekends: no classes. Go see more of Samui, or stay in and play games.</p>",
     next:MENU},

    {id:"learn", q:"What will I learn?",
     alt:["what will i learn","what do i learn","what can i learn","what do you teach","what is taught","what kind of martial art","which martial art","what style","ninjutsu","ninjitsu","modern american ninjitsu"],
     keys:"learn learning taught style styles art system ninjutsu ninjitsu stances rolls falls strikes kicks techniques technique skills curriculum",
     a:"<p>Pick your tactics and Rick builds a private group workshop for everyone: a go-at-your-own-pace program on Koh Samui Island, Thailand. The Ninja Menu has eight areas: Stances, Rolls, Falls, Strikes, Kicks, Body Movement, Ninja Tools and Self-defense.</p><p>The art is Rick's own system, Modern American Ninjitsu (most people spell it ninjutsu).</p>",
     next:{href:"#menu", label:"Pick your 5 tactics"}},

    {id:"menu", q:"How does the Ninja Menu work?",
     alt:["ninja menu","the menu","how do i pick","how do i choose","pick 5","5 tactics","five tactics","quick picks","quick pick","build my week","ninja week"],
     keys:"menu pick picks picking tactic tactics choose choice choices quick plan",
     a:"<p>Pick 5 tactics. Then you choose how long you stay.</p><p>Rick combines what the group picked from the Ninja Menu, so you also learn what the others chose.</p>",
     next:{href:"#menu", label:"Pick your 5 tactics"}},

    {id:"pace", q:"If I pick 5, do I only learn one tactic a day?",
     alt:["one tactic a day","one technique a day","one a day","one per day","only one a day","only learn one","one thing a day","how many tactics a day","how many techniques a day","how many a day","how much a day","how fast will i learn","how fast do we learn","5 things","five things"],
     keys:"pace fast faster speed daily per day only",
     a:"<p>No. It depends on the students, so you can get more than one, or just more focus on your own choices.</p><p>Rick combines what the group picked from the Ninja Menu, so you also learn what the others chose.</p>",
     next:{href:"#menu", label:"Pick your 5 tactics"}},

    {id:"experience", q:"Do I need experience?",
     alt:["need experience","never trained","no experience","complete beginner","total beginner","first time","never done martial arts","im a beginner","i am a beginner","trained before"],
     keys:"experience experienced beginner beginners trained novice level levels advanced",
     a:"<p>No. It is built for beginners. Trained before? Welcome too. Everyone trains at their level.</p><p>Unlike most martial arts that expect you to conform to them, our system is built around you.</p>",
     next:MENU},

    {id:"age", q:"Am I too old?",
     alt:["too old","am i too old","age limit","how old","over 40","over 50","over 60","older people","my age","what ages","ages of the other","how old are the other"],
     keys:"old older age ages aged limit senior seniors 40 50 60 70 retired",
     a:"<p>No. There is no upper age limit: the relaxed plan is for everyone, and every drill has an easier version. Tell me about an old injury before you come. Students come from 16 to their 60s.</p><p>The great thing about the martial science is that it is built around your own strengths and weaknesses.</p>",
     next:MENU},

    /* Rick, 29 Oct 2026: "usually around 6 up to 12", "16 to 60s" */
    {id:"group", q:"How big are the groups?",
     alt:["how big are the groups","how big is the group","group size","class size","size of the group","how many people","how many students","how many in a class","how many in the group","how many per class","how many others","how small","how crowded","big groups","small groups"],
     keys:"size crowded crowd people students others",
     a:"<p>Usually around 6, up to 12. Students come from 16 to their 60s.</p>",
     next:MENU},

    {id:"teens", q:"I am 16 or 17. Can I come on my own?",
     alt:["16 or 17","i am 16","i am 17","im 16","im 17","under 18","teenager","teenagers","teens","minimum age","how young"],
     keys:"16 17 teen teens teenager teenagers minor minors parent parents consent young younger youth",
     a:"<p>Yes, with a parent's signature on the papers: the enrolment, a travel consent letter and a medical consent. Ask about the papers in the question form before you book.</p>",
     next:ASK("Ask Kuno first","I am 16 or 17 and would like to come.")},

    {id:"injury", q:"Got an injury, or not very fit?",
     alt:["bad knee","bad back","not fit","not very fit","out of shape","an injury","old injury","overweight","unfit","health problem","my knee","my back","my shoulder","knee injury","back injury","shoulder injury","injured"],
     keys:"injury injuries injured knee knees back shoulder fit fitness unfit shape health medical condition overweight weight hurt pain",
     a:"<p>Tell me before you come. Every drill has an easier version.</p><p>The great thing about the martial science is that it is built around your own strengths and weaknesses.</p>",
     next:ASK("Tell Kuno about it","About an injury or my fitness: ")},

    {id:"sparring", q:"Is it a fight camp? Is there sparring?",
     alt:["fight camp","boot camp","bootcamp","hard core","hardcore","is it intense","is it hard","is it tough","do we spar","sparring","full contact","get hit"],
     keys:"sparring spar fight fights fighting camp bootcamp intense hard tough contact hit hitting rough military strict",
     a:"<p>Not a fight camp. No sparring unless you ask. Not a boot camp. Every drill has an easier version.</p><p>The old camps were hard core: outdoors, full time, full speed. That is the record. This intro is not that.</p>",
     next:MENU},

    {id:"women", q:"Is it good for women?",
     alt:["for women","as a woman","female","solo female","women only","womens dorm","women's dorm","girls","for a woman"],
     keys:"women woman female females girl girls lady ladies solo womens",
     a:"<p>Self-defense is on the Ninja Menu, and there is a women's dorm.</p><p>No private rooms. The stay is a shared men's or women's dorm.</p>",
     next:MENU},

    {id:"self-defense", q:"Can I learn self-defense?",
     alt:["self defense","self defence","selfdefense","defend myself","protect myself","street fight","real situations"],
     keys:"defense defence defend protect protection street attack attacker",
     a:"<p>Self-defense is on the Ninja Menu, and there is a women's dorm.</p><p>The first two picks: Natural Reactions: train a move until it happens on its own, without thinking. Combat Reality: what actually works, stripped of the showmanship.</p>",
     next:{href:"#menu", label:"Pick your 5 tactics"}},

    {id:"weapons", q:"Do you teach weapons?",
     alt:["ninja tools","weapons","weapon training","sword","nunchaku","nunchucks","bo staff"],
     keys:"weapon weapons tools tool sword swords knife knives stick sticks staff bo nunchaku nunchucks sai tonfa chain rope blade waiver",
     a:"<p>Ninja Tools is one of the eight areas on the Ninja Menu: Stick / Tonfa, Knife, Chain / Rope, Staff, Sword / Half Staff, Sai, Nunchaku and more.</p><p>Taught after you sign a waiver.</p>",
     next:{href:"#menu", label:"Pick your 5 tactics"}},

    {id:"dorm", q:"Where do I sleep?",
     alt:["where do i sleep","where do i stay","place to stay","accommodation","is housing included","a bed","dorm bed","the dorm","the dorms","hostel"],
     keys:"sleep sleeping stay staying bed beds dorm dorms housing accommodation accommodations hostel lodging nerdhostel bunk bunks room rooms",
     a:"<p>You pay for the training. If you need a bed, there is basic housing nearby at no added cost: a shared men's or women's dorm, with simple meals if you need a little boost.</p><p>The dorms are at NerdHostel, a gamer hostel and co-working space across the street from NinjaGym.</p>",
     next:STAYS},

    {id:"private-room", q:"Is there a private room, or a room for two?",
     alt:["private room","own room","room for two","single room","couple","couples","my partner","my girlfriend","my boyfriend","share a room"],
     keys:"private single couple couples partner girlfriend boyfriend together",
     a:"<p>No private rooms. The stay is a shared men's or women's dorm. Want your own room? Book one nearby; the price stays the same.</p>",
     next:STAYS},

    {id:"own-place", q:"I already have a place. Is it cheaper?",
     alt:["already have a place","have my own place","own place","live on samui","live here","staying elsewhere","without the dorm","without accommodation","discount without","cheaper without"],
     keys:"already apartment villa hotel airbnb condo elsewhere cheaper discount without",
     a:"<p>That is fine. The price is the same: you pay for the training.</p>",
     next:STAYS},

    {id:"meals", q:"Are meals included?",
     alt:["meals included","is food included","what about food","breakfast","lunch","dinner"],
     keys:"meals meal food foods eat eating breakfast lunch dinner",
     a:"<p>If you need a bed, there is basic housing nearby at no added cost: a shared men's or women's dorm, with simple meals if you need a little boost.</p>",
     next:STAYS},

    {id:"airport", q:"Do you pick me up from the airport?",
     alt:["airport","pick me up","pick up","pickup","from the airport","how do i get there","getting there","transfer"],
     keys:"airport pickup transfer transfers flight flights fly flying taxi arriving",
     a:"<p>Free pick-up from Samui Airport.</p><p>Free airport pick-up, and a dorm bed if you need one.</p>",
     next:STAYS},

    {id:"where", q:"Where is it?",
     alt:["where is it","where are you","where is this","koh samui","samui","thailand","which island","the location","what country"],
     keys:"location located samui koh thailand thai island country gulf",
     a:"<p>Koh Samui, Thailand. An island in the Gulf of Thailand, where Rick runs NinjaGym.</p>",
     next:STAYS},

    {id:"center", q:"What is at the center where I train?",
     alt:["the center","the gym","game room","gaming","video games","facilities","equipment","climbing wall","cafe","co-working","coworking","work remotely","laptop"],
     keys:"center centre gym facilities facility equipment game games gaming gamer gamers xbox switch nintendo simulator cafe coffee drinks snacks cowork coworking parkour climbing bags nerd nerds nerdy",
     a:"<p>Martial arts zone: punching bags, kicking pads, a climbing wall traverse and ninja parkour gear. Gaming zone: a race car simulator, Nintendo Switch on 75-inch screens, and Xbox with Game Pass. Café zone: drinks and snacks to buy, and room to work or chill between sessions.</p><p>Nerdy ninja conversations and a game room.</p>",
     next:STAYS},

    {id:"who-teaches", q:"Who teaches the classes?",
     alt:["who teaches","who is teaching","does rick teach","is rick there","taught by","morning or evening","rick teach the morning","rick teach the evening","morning sessions","evening sessions","which sessions"],
     keys:"teaches teacher teachers guide guides personally coaches",
     a:"<p>Rick often rotates between the morning and evening sessions, to help students at both: some are morning people, some are night people, and not everyone does both sessions (though we recommend it).</p><p>Rick shows you, you practice.</p>",
     next:MENU},

    {id:"rick", q:"Who is Rick Tew?",
     alt:["who is rick","who is rick tew","about rick","ricks background","his background","is rick legit","is he legit","is this legit","credentials","qualifications","how long has rick","lineage","his lineage","who taught rick","who trained rick","ricks teacher","ricks teachers","his teacher","his teachers","trained under","learn from","learned from"],
     keys:"background credentials qualification qualifications legit press magazine magazines record history founder lineage",
     a:"<p>More than 25 years of ninja martial arts, taught around the world, and the man behind WinJitsu. This intro is the easy-going version.</p><p>The first in the martial arts industry to run live-in Ninja Training Camps. In the press: Black Belt, KO Karate, Fighting Spirit Zendokan, Fighting Sports and International Lifestyle Magazine.</p>",
     next:MENU},

    {id:"belts", q:"How do the belts work?",
     alt:["the belts","belt program","earn a belt","get a belt","yellow belt","black belt","belt test","grading","2 months","two months"],
     keys:"belt belts rank ranks grade grading test tests exam yellow orange green blue red black certificate",
     a:"<p>For the serious: 2 months per belt, yellow belt first, up to 5 belts in a year. You earn each belt in a test with Rick at the end of its 2 months. The art is Rick's own system, Modern American Ninjitsu (most people spell it ninjutsu).</p><p>$3,997 a belt, 2 months. Training and WinJitsu coaching. A dorm bed if you need one. Your Ninja Menu picks join the morning seminar too.</p>",
     next:STAYS},

    {id:"mastery", q:"What is Mastery?",
     alt:["mastery","the mastery program","move to thailand","moving to thailand","live in thailand","relocate","long term","two years","2 years","sensei"],
     keys:"mastery master relocate relocating longterm sensei",
     a:"<p>Most people come for two weeks. Mastery is for the ones who stay: all five belts, yellow to red, over 2 years, with Rick.</p><p>Rick shows you a tactic or technique, in a private or small-group session. You practice on your own and in the group classes, until you master it. Each belt ends in a test with Rick.</p><p>$15,988. $2,222 down reserves your spot, and spots are held in the order the deposits arrive. Then pay the rest all at once, or in five parts, one before each belt. Next group starts 22 January 2027.</p>",
     next:ASK("Reserve my spot","I want to reserve a Mastery spot for 2027 with $2,222 down (Mastery: all five belts over 2 years, $15,988).")},

    {id:"rick-time", q:"How much time with Rick do I get in Mastery?",
     alt:["time with rick","hours with rick","200 hours","private lessons","one on one","1 on 1","privates","private sessions"],
     keys:"privates lessons session sessions personal individual 200",
     a:"<p>200 hours a year, guaranteed: private and small-group sessions, booked when his time is free. In between, you practice what he showed you, and you can join every group class.</p><p>It is not daily private lessons, which run $222 an hour or more.</p>",
     next:ASK("Ask Kuno about Mastery","I am interested in Mastery: all five belts over 2 years ($15,988).")},

    {id:"instructor", q:"What is the Instructor year?",
     alt:["instructor","become an instructor","become a teacher","learn to teach","teach martial arts","instructor program","instructor course","be a guide","become a guide","certified instructor","teacher training"],
     keys:"instructor instructors certify certified certification lead leading",
     a:"<p>1 year. All five belts, yellow to red, the fast way. Train to teach: learn to lead practice as a Guide.</p><p>Instructor is all five belts in 1 year, and learning to teach, $8,994: reserve a spot.</p>",
     next:ASK("Ask Kuno about Instructor","I am interested in Instructor: all five belts in 1 year, and learning to teach ($8,994).")},

    {id:"winjitsu", q:"What is WinJitsu?",
     alt:["winjitsu","win jitsu","life coaching","the coaching","mental martial art","the books","winjitsu books","the app","winjitsu com"],
     keys:"winjitsu coaching coach coached mental mind mindset goals goal focus confidence app life",
     a:"<p>Kicks train the body. WinJitsu trains the mind behind them: Rick's mental martial art for focus, goals and life. It comes with every stay.</p><p>In the martial arts, we have learned that there is a mind-body connection. It is why Rick wrote the book series WinJitsu, The Mental Martial Art.</p><p>Also included: a month of the WinJitsu.com app and a Rick Tew ninja T-shirt.</p>",
     next:STAYS},

    {id:"pocket-dojo", q:"What is Pocket Dojo?",
     alt:["pocket dojo","home study","home study program","the home study program","hsp","train at home","learn from home","train from home","online course","online training","train online","cant travel","can't travel","cannot travel"],
     keys:"pocket dojo home study online remote travel distance",
     a:"<p>Bonus: Pocket Dojo, with every stay.</p><p>Pocket Dojo is the Home Study Program on your phone: Rick Tew's Martial Science, belt by belt. Keep training what you learned in class, long after you fly home.</p><p>Want to train with Rick but can't travel? Join the Home Study Program and train at home, belt by belt.</p>",
     next:{href:"/hsp/", label:"See the Home Study Program"}},

    {id:"friend", q:"Can a friend come for free?", until:"2026-11-30T17:00:00Z",
     alt:["bring a friend","with a friend","a friend","my friend","friend for free","friend free","free friend","come free","comes free","come for free","comes for free","friend offer","friend deal","november offer","november deal","book in november"],
     keys:"friend friends free november promo promotion offer deal boyfriend girlfriend partner",
     a:"<p>Attend with a friend for free if you book in November.</p><p>Your friend comes with you, on the same dates, for the same stay, and gets everything you get: the training, the WinJitsu bonus and a dorm bed if they need one. Add their name when you book.</p>",
     next:STAYS},

    {id:"kids", q:"Can I bring my family or kids?",
     alt:["bring my kids","bring my family","with my kids","with my family","my children","my son","my daughter","for kids","kids class","family"],
     keys:"kids kid children child family families son sons daughter daughters",
     a:"<p>The dorms are not set up for families to stay together. Book your own place nearby, and the kids can train at NinjaGym Kids while you are in the program.</p>",
     next:ASK("Ask Kuno about it","About bringing my family: ")},

    {id:"refunds", q:"Can I get a refund, or move my dates?",
     alt:["refund","refunds","money back","cancel","cancellation","change my dates","move my dates","reschedule","postpone","cant make it","cant come","flights change","flight changes","my flight","my flights","cant come on my dates","miss my dates"],
     keys:"refund refunds refundable cancel cancellation cancelled reschedule postpone final flight flights",
     a:"<p>Ill, or your flights change? Your dates can move, within a year of buying. All sales are final.</p><p>$555 down holds your spot and is non-refundable; the rest is due 2 weeks before you arrive. Pay in full now and save $222.</p>",
     next:STAYS},

    {id:"book", q:"How do I book?",
     alt:["how do i book","how to book","book now","sign up","signup","how do i sign up","enroll","enrol","register","reserve a spot","how do i pay","payment","pay by card"],
     keys:"book booking reserve reservation signup enroll enrol register registration pay paying payment checkout card spot",
     a:"<p>Pick what you want to learn. Choose how long you stay, and book. At checkout you add your arrival date.</p><p>$555 down holds your spot and is non-refundable; the rest is due 2 weeks before you arrive. Pay in full now and save $222.</p>",
     next:MENU},

    {id:"included", q:"What is included?",
     alt:["what is included","whats included","what do i get","included in the price","all inclusive","t shirt","tshirt"],
     keys:"included include includes inclusive tshirt shirt extras",
     a:"<p>Every stay: training and WinJitsu coaching, and a dorm bed if you need one.</p><p>Free pick-up from Samui Airport. Also included: a month of the WinJitsu.com app and a Rick Tew ninja T-shirt. Pocket Dojo, the Home Study Program app.</p>",
     next:STAYS}
  ];

  var STARTERS=["price","start","experience","dorm"];

  var api={answer:answer, search:search, tokens:tokens, norm:norm, LIBRARY:LIBRARY, STARTERS:STARTERS};

  /* ---------- node: the golden test imports the engine and stops here ---------- */
  if(typeof module!=="undefined" && module.exports){ module.exports=api; return; }
  root.rtHiAsk=api;

  /* ---------- browser: the box ---------- */
  var doc=root.document;
  if(!doc) return;

  /* askLive(q): the seam for a live answer later (Rick, 28 Oct 2026: "we might connect the
     api ... and our sub later after we stress test asking the questions most people would
     ask"). Today it returns null and nothing leaves the page. Later it may return a Promise
     of {html} for a question the library misses; the box shows that before the miss. */
  function askLive(q){ return null; }

  var FN="https://qegfhbseccinnxnzfhxw.supabase.co/functions/v1/ricktew-contact";
  var shown=Date.now();
  /* the same source rules as the page's ask box: an ad click is "gads" with its campaign and
     click id, a post's ?src= rides along, anything else is direct */
  var AD=null, SRC="direct";
  try{
    var sp=new URLSearchParams(location.search);
    [["gclid","g"],["gbraid","b"],["wbraid","w"]].some(function(k){
      if(!sp.has(k[0])) return false;
      var id=sp.get(k[0])||"", cid=sp.get("cid")||"";
      AD={campaign:/^[0-9]{1,20}$/.test(cid)?cid:"0", kind:k[0], click:/^[A-Za-z0-9_-]{1,190}$/.test(id)?id:""};
      return true;
    });
    var s0=(sp.get("src")||"").toLowerCase(); if(/^[a-z]{1,20}$/.test(s0)) SRC=s0;
  }catch(e){}

  function byId(id){ return doc.getElementById(id); }
  function el(tag, cls, text){ var n=doc.createElement(tag); if(cls) n.className=cls; if(text!=null) n.textContent=text; return n; }
  function find(id){ for(var i=0;i<LIBRARY.length;i++) if(LIBRARY[i].id===id) return LIBRARY[i]; return null; }

  function boot(){
    var panel=byId("kunoPanel"), launch=byId("kunoLaunch"), log=byId("kunoLog"),
        form=byId("kunoForm"), input=byId("kunoIn"), x=byId("kunoX");
    if(!panel||!log||!form||!input) return;

    var asked=[];      /* every question typed or tapped, in order, for Ask Kuno */
    var misses=[];     /* the gap list; a playtest reads window.rtHiAskMisses */
    root.rtHiAskMisses=misses;
    var lastFocus=null;

    function open(q){
      lastFocus=doc.activeElement;
      panel.hidden=false;
      if(launch) launch.hidden=true;
      if(q){ ask(q); } else { try{ input.focus({preventScroll:true}); }catch(e){ input.focus(); } }
    }
    function close(){
      panel.hidden=true;
      if(launch) launch.hidden=false;
      if(lastFocus&&lastFocus.focus){ try{ lastFocus.focus({preventScroll:true}); }catch(e){} }
    }
    root.rtHiAskOpen=open;
    root.rtHiAskClose=close;
    if(launch) launch.addEventListener("click", function(){ open(); });
    if(x) x.addEventListener("click", close);
    doc.addEventListener("keydown", function(e){ if(e.key==="Escape"&&!panel.hidden) close(); });

    /* The pill steps aside wherever it would sit on anything in the Ninja Menu you can press
       (the tiles, the picks, the sticky "ready" bar, the stays and Book), on a phone or a laptop,
       and since 28 Oct 2026 on any button or form field on the page (2 of 4 readers found it
       over the 2 weeks "Pick and book"). On a phone it also steps aside over any line of text
       (Rick's click, 28 Oct 2026, after 8 of 11 readers found it over the ends of lines): it comes
       back over pictures and gaps. The laptop pill keeps to the buttons rule. */
    if(launch){
      var tick=false, PHONE=root.matchMedia?root.matchMedia("(max-width:700px)"):null;
      var overText=function(r){
        if(!PHONE||!PHONE.matches||!doc.elementsFromPoint||!doc.createRange) return false;
        var xs=[r.left+3,(r.left+r.right)/2,r.right-3], ys=[r.top-4,r.top+3,(r.top+r.bottom)/2,r.bottom-3], rg=doc.createRange(), pad=2, seen=[];
        for(var i=0;i<xs.length;i++) for(var j=0;j<ys.length;j++){
          var st=doc.elementsFromPoint(xs[i],ys[j]), el=null;
          for(var k=0;k<st.length;k++){ if(st[k]!==launch&&!launch.contains(st[k])){ el=st[k]; break; } }
          /* the block the point is in, read whole (a section's padding sits right under its last
             line), so a link or a line beside the point counts too; only a block as long as the
             whole page is read for its own text alone */
          while(el&&el.parentElement&&el.parentElement!==doc.body&&(el.textContent||"").length<40&&(el.parentElement.textContent||"").length<=4000) el=el.parentElement;
          if(!el||seen.indexOf(el)>-1) continue;
          seen.push(el);
          var w=(el.textContent||"").length<=4000 ? doc.createTreeWalker(el,4) : null, c=w?w.nextNode():el.firstChild;
          for(;c;c=w?w.nextNode():c.nextSibling){
            if(c.nodeType!==3||!/\S/.test(c.nodeValue)) continue;
            /* the answer inside a closed question is not on screen, though it still has a place */
            var pe=c.parentElement, cd=pe&&pe.closest?pe.closest("details:not([open])"):null;
            if(cd&&!pe.closest("summary")) continue;
            rg.selectNodeContents(c);
            var qs=rg.getClientRects();
            for(var q=0;q<qs.length;q++){ var b=qs[q]; if(b.width&&b.right>r.left-pad&&b.left<r.right+pad&&b.bottom>r.top-pad&&b.top<r.bottom+pad) return true; }
          }
        }
        return false;
      };
      var clash=function(){
        tick=false;
        if(launch.hidden) return;
        launch.classList.remove("kuno-away");
        /* where the pill rests, from its own right and bottom: getBoundingClientRect would catch it
           mid-slide (the away state moves it 12px down), and miss the lines at its top edge */
        var cs=root.getComputedStyle(launch), de=doc.documentElement;
        var rr=de.clientWidth-parseFloat(cs.right), rb=de.clientHeight-parseFloat(cs.bottom);
        var r={left:rr-launch.offsetWidth, top:rb-launch.offsetHeight, right:rr, bottom:rb}, pad=8, hit=false;
        [].forEach.call(doc.querySelectorAll("#menu .mc-bar, #menu button, #menu a, #menu input, main a.btn, main button, main input, main select, main textarea, .sys-book"), function(n){
          if(hit) return;
          var b=n.getBoundingClientRect();
          if(!b.width||!b.height) return;
          if(b.right>r.left-pad && b.left<r.right+pad && b.bottom>r.top-pad && b.top<r.bottom+pad) hit=true;
        });
        if(!hit) hit=overText(r);
        if(hit) launch.classList.add("kuno-away");
      };
      var later=function(){ if(!tick){ tick=true; (root.requestAnimationFrame||setTimeout)(clash); } };
      root.addEventListener("scroll", later, {passive:true});
      root.addEventListener("resize", later);
      /* a picture that finishes loading above moves the text under a pill that has not scrolled */
      doc.addEventListener("load", later, true);
      doc.addEventListener("click", function(){ setTimeout(clash, 60); });
      clash();
    }

    function bubble(who){ var b=el("div","kuno-b kuno-"+who); log.appendChild(b); return b; }
    function scrollDown(){ log.scrollTop=log.scrollHeight; }
    function chips(list, into){
      var row=el("div","kuno-chips");
      list.forEach(function(entry){
        if(!entry) return;
        var c=el("button","kuno-chip",entry.q); c.type="button";
        c.addEventListener("click", function(){ ask(entry.q, entry); });
        row.appendChild(c);
      });
      into.appendChild(row);
    }
    function nextBtn(next){
      if(next.ask){
        var b=el("button","kuno-go",next.label); b.type="button";
        b.addEventListener("click", function(){ mailForm(next.line); });
        return b;
      }
      var a=el("a","kuno-go",next.label); a.href=next.href;
      a.addEventListener("click", function(){ close(); });
      return a;
    }

    function show(entry, also){
      var b=bubble("n");
      b.appendChild(el("div","kuno-q",entry.q));
      var a=el("div","kuno-a"); a.innerHTML=entry.a; b.appendChild(a);
      var row=el("div","kuno-act"); row.appendChild(nextBtn(entry.next||MENU)); b.appendChild(row);
      if(also&&also.length){
        var w=el("div","kuno-also"); w.appendChild(el("span",null,"Also close:")); chips(also, w); b.appendChild(w);
      }
    }
    function showMiss(q){
      misses.push(q);
      var b=bubble("n");
      var a=el("div","kuno-a");
      a.innerHTML="<p>I do not have that one written down, and I would rather say so than guess. Send it to me, then check your inbox for the reply.</p>";
      b.appendChild(a);
      var row=el("div","kuno-act");
      var btn=el("button","kuno-go","Ask Kuno"); btn.type="button";
      btn.addEventListener("click", function(){ mailForm(q); });
      row.appendChild(btn); b.appendChild(row);
      var more=el("div","kuno-also"); more.appendChild(el("span",null,"Or one of these:"));
      chips(STARTERS.slice(0,3).map(find), more); b.appendChild(more);
    }
    function showChoose(entries, q){
      var b=bubble("n");
      var a=el("div","kuno-a"); a.innerHTML="<p>More than one answer fits that. Which one did you mean?</p>"; b.appendChild(a);
      chips(entries, b);
      var row=el("div","kuno-act");
      var btn=el("button","kuno-go kuno-quiet","Neither. Ask Kuno"); btn.type="button";
      btn.addEventListener("click", function(){ misses.push(q); mailForm(q); });
      row.appendChild(btn); b.appendChild(row);
    }
    function showEmpty(){
      var b=bubble("n");
      var a=el("div","kuno-a"); a.innerHTML="<p>Give me a few more words, or tap one of these.</p>"; b.appendChild(a);
      chips(STARTERS.map(find), b);
    }
    function welcome(){
      var b=bubble("n");
      var a=el("div","kuno-a");
      a.innerHTML="<p>Hi, I'm Kuno, Rick's assistant. Ask me about the training, the stays or the island, and I answer in Rick's words. If it is not here, send me your question and check your inbox for the reply.</p>";
      b.appendChild(a);
      chips(STARTERS.map(find), b);
    }

    /* Ask Kuno: the question goes to the mailbox like the page's own ask box (subject
       hininja, the trap field outside every form, the fill time). The reply comes by email. */
    var mailOpen=null;
    function mailForm(line){
      if(mailOpen&&mailOpen.parentNode){ mailOpen.parentNode.removeChild(mailOpen); }
      var b=bubble("n kuno-mail"); mailOpen=b;
      b.appendChild(el("div","kuno-q","Ask Kuno"));
      var f=el("form"); f.noValidate=true;
      var uid=String(Date.now());
      function fld(lbl, tag, type, name, max, auto){
        var w=el("div","kuno-fld"), id="kuno-"+name+"-"+uid;
        var l=el("label",null,lbl); l.htmlFor=id; w.appendChild(l);
        var i=el(tag); i.id=id; i.name=name; i.maxLength=max; if(type) i.type=type; if(auto) i.autocomplete=auto;
        w.appendChild(i); f.appendChild(w); return i;
      }
      var nm=fld("Your name","input","text","name",100,"name");
      var em=fld("Your email","input","email","email",200,"email");
      var tx=fld("Your question","textarea",null,"message",4000,null);
      tx.value=line||"";
      var send=el("button","kuno-go","Send it to Kuno"); send.type="submit"; f.appendChild(send);
      var err=el("p","kuno-err"); err.setAttribute("role","alert"); f.appendChild(err);
      /* a warning goes as soon as they type again, so a filled form never shows one */
      f.addEventListener("input", function(){ if(err.textContent) err.textContent=""; });
      b.appendChild(f);
      f.addEventListener("submit", function(e){
        e.preventDefault(); err.textContent="";
        var name=nm.value.trim(), email=em.value.trim(), text=tx.value.trim();
        if(!name||!email||!text){ err.textContent="Name, an address to reply to, and your question. That is all of it."; return; }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){ err.textContent="That email address does not look right. The reply goes there."; return; }
        var others=asked.filter(function(q){ return q!==text; });
        var message="From the Ask the Ninja box on /hininja/:\n\n"+text+(others.length?"\n\nAlso asked in the box:\n"+others.slice(-12).map(function(q){ return "- "+q; }).join("\n"):"");
        var trap=byId("askWebsite");
        var data={name:name, email:email, subject:"hininja", message:message,
          website:trap?trap.value:"", elapsedMs:Date.now()-shown, source:AD?"gads":SRC};
        if(AD){ data.adCampaign=AD.campaign; if(AD.click) data.adClick=AD.kind+":"+AD.click; }
        send.disabled=true; send.textContent="Sending...";
        fetch(FN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
        .then(function(res){ if(!res.ok) throw new Error(String(res.status)); return res.json(); })
        .then(function(){
          f.parentNode.removeChild(f);
          var d=el("div","kuno-a"); d.innerHTML="<p>Sent. Check your inbox for Kuno's reply.</p>"; d.tabIndex=-1;
          b.appendChild(d); try{ d.focus({preventScroll:true}); }catch(e2){}
          scrollDown();
        })
        .catch(function(){ send.disabled=false; send.textContent="Send it to Kuno"; err.textContent="That did not go through. Check your connection and press send again."; });
      });
      scrollDown();
      try{ (line?nm:tx).focus({preventScroll:true}); }catch(e){}
    }

    function ask(q, entry){
      q=String(q||"").trim();
      if(!q) return;
      asked.push(q);
      var u=bubble("u"); u.textContent=q;
      var r= entry ? {kind:"answer", entry:entry, also:[]} : answer(q);
      if(r.kind==="answer") show(r.entry, r.also);
      else if(r.kind==="choose") showChoose(r.entries, q);
      else if(r.kind==="empty") showEmpty();
      else {
        var live=askLive(q);
        if(live&&typeof live.then==="function"){
          live.then(function(res){
            if(res&&res.html){ var b=bubble("n"); var a=el("div","kuno-a"); a.innerHTML=res.html; b.appendChild(a); }
            else showMiss(q);
            scrollDown();
          },function(){ showMiss(q); scrollDown(); });
        } else showMiss(q);
      }
      scrollDown();
    }
    root.rtHiAskQuestion=ask;

    /* two lines tall (Rick, 28 Oct 2026: "the question box should be two line height or longer quests
       dissapear"); Enter sends, Shift+Enter adds a line */
    input.addEventListener("keydown", function(e){
      if(e.key==="Enter" && !e.shiftKey && !e.isComposing){
        e.preventDefault();
        if(form.requestSubmit) form.requestSubmit(); else form.dispatchEvent(new Event("submit",{cancelable:true}));
      }
    });
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var q=input.value; input.value="";
      ask(q);
      try{ input.focus({preventScroll:true}); }catch(err){}
    });

    welcome();
  }

  if(doc.readyState==="loading") doc.addEventListener("DOMContentLoaded", boot); else boot();
})(typeof window!=="undefined"?window:this);
