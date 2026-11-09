/* ASK THE NINJA on the ricktew.com home page (Rick, 9 Nov 2026: "when someone types here it is going to email and not
   answering. I want this to actually answer the question. Similar to how we have it on tewbedo ... like a chat option
   that hovers").

   The word engine is tewbedo.com's ask.js (kata ~/Dev/digitaldojo/packs/retrieval-brain.md, the word half), fitted to
   this page. NOT an AI: a library of answers built only from what this home page already says, matched by the words
   in the question, with the kata's one rule kept: return nothing rather than guess. A question it cannot place gets an
   honest "I do not have that one", the closest topics on the page, and "Send it to Rick", which posts to the mailbox
   (ricktew-contact) with the same first line the ask box always used, so TEWBEDO's Ninja Agent leaves it for Rick.

   No storage, no model call, no address. If the page changes a fact, change it here too. The file runs in the browser
   (window.rtHomeAsk) and in node (module.exports) so tests/ask-home-golden.js runs without loading the page. */
(function(root){
  "use strict";

  /* ---------- the word engine (tewbedo.com ask.js, with this site's stopwords) ---------- */
  var STOP = {};
  ("a an the and or but if then so of to in on at for from by with about as into over under is are was were be been being am do does did doing have has had having can could would should will shall may might must it its this that these those there here what which who whom whose how why when where i me my mine we us our you your yours he she they them their his her hers one ones some any all each every much many more most other another such than too very just also really actually only even still yet again ever never not no nor don dont doesn doesnt didn didnt isn isnt aren arent won wont cant cannot couldn couldnt wouldn wouldnt shouldn shouldnt let lets get got give go going want wants wanted like need needs needed know think thing things stuff kind sort way ways please thanks thank ok okay yes yeah yep nope hmm um well right tell rick tew ricktew ricks mr sensei site page website").split(" ").forEach(function(w){ STOP[w]=1; });

  function norm(s){
    return String(s||"").toLowerCase()
      .replace(/[‘’']/g,"")
      .replace(/[^a-z0-9$]+/g," ")
      .replace(/\s+/g," ").trim()
      .replace(/(^| )co working( |$)/g,"$1coworking$2");
  }
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
  var BUILT=null;
  var GREET={hi:1, hello:1, hey:1, hola:1, sawasdee:1, good:1, morn:1, morning:1, afternoon:1, evening:1, there:1};
  /* The gate (tewbedo.com's): a whole phrase from the entry is in the question, or two real words match and they are
     more than half the question's real words, or the question is ONE real word and only a few entries carry it. */
  function search(question, lib){
    var built = lib ? build(lib) : (BUILT || (BUILT=build(LIBRARY)));
    var nq=norm(question), q=tokens(question), hits=[], near=[];
    /* "hi, do you teach kids?" is a question about kids: greeting words only count in a bare greeting */
    var rest=q.filter(function(t){ return !GREET[t]; }); if(rest.length) q=rest;
    built.forEach(function(b){
      var m=0;
      q.forEach(function(t){ if(b.keys[t]) m++; });
      var phrase=0;
      for(var i=0;i<b.alts.length&&phrase<2;i++){ if(b.alts[i].test(nq)) phrase++; }
      var ok = phrase || (m>=2 && m*2>q.length) || (m===1 && q.length===1 && built.df[q[0]]<=4);
      /* a greeting only answers a bare greeting: "hi, do you teach kids?" is about kids */
      if(ok && b.e.id==="hello") ok = q.every(function(t){ return b.keys[t]; });
      if(ok) hits.push({entry:b.e, score:m+phrase*3, matched:m});
      else if(m) near.push({entry:b.e, score:m});
    });
    /* ties go to the bigger doors first (pri), so "martial arts" offers the course before a side story */
    function rank(a,b){ return (b.score-a.score) || ((b.entry.pri||0)-(a.entry.pri||0)); }
    hits.sort(rank); near.sort(rank);
    return {hits:hits, near:near, q:q, empty:q.length===0};
  }
  /* answer {entry, also} | choose {entries} | miss {near} | empty */
  function answer(question, lib){
    var r=search(question, lib);
    if(!r.hits.length) return r.empty ? {kind:"empty"} : {kind:"miss", near:r.near.slice(0,3).map(function(h){ return h.entry; })};
    var top=r.hits[0], second=r.hits[1];
    if(second && second.score===top.score){
      return {kind:"choose", entries:r.hits.filter(function(h){ return h.score===top.score; }).slice(0,3).map(function(h){ return h.entry; })};
    }
    var also=r.hits.slice(1,3).filter(function(h){ return h.score>=2 && h.score>=top.score-1; }).map(function(h){ return h.entry; });
    return {kind:"answer", entry:top.entry, also:also};
  }

  /* ---------- the answer library: only what the home page says ----------
     id; q, the question as the chat shows it; alt, other ways of asking it (whole phrases); keys, extra words;
     a, the answer (HTML, first person, the page's words); l, links [label, href, off-site]; send, a question only a
     person can answer, so "Send it to Rick" is the main button. */
  var X=true;
  var LIBRARY=[
    /* ---- Rick ---- */
    {id:"about", pri:1, q:"Who is Rick Tew?",
     alt:["who are you","who is rick","who is rick tew","about rick","about you","tell me about yourself","what do you do","what does rick do","bio","biography","who is this","split personality"],
     keys:"who about bio biography yourself background instructor coach speaker",
     a:"<p>Hi, I'm Rick Tew: instructor, coach, speaker. My passion is helping people find their key strengths and put them together, so they get more out of life. It started on the mat. Today it also means building the systems a business runs on, and training the people who run it.</p><p>I only teach from experience, and I learn by doing. The martial arts, the camps, the books, the gyms and the apps: this page is all of it, in the order it happened.</p>",
     l:[["Read my story","#p-story"],["About Rick Tew","#p-about"]]},
    {id:"roots", q:"Where are you from?",
     alt:["where are you from","where did you grow up","where were you born","growing up","childhood","boy scouts","scouts","indiana","ran away"],
     keys:"from grow grew born childhood boy indiana california scouts scout dad father american",
     a:"<p>As a boy I ran away from home in Indiana to be in California. It worked, and a new journey began. As a young teen I joined the Boy Scouts: trips into the outdoors and a system for setting goals, and it is why I have taken students to places like Yosemite.</p>",
     l:[["It is in the doing","#p-roots"]]},
    {id:"started", q:"How did you get into martial arts?",
     alt:["how did you start","how did you get into","how did it start","why ninja","why the ninja","first martial art","get into martial arts","started martial arts","start martial arts","backyard","godzilla"],
     keys:"start started begin began first backyard godzilla underdog teen teens ninjitsu plum tree obstacle",
     a:"<p>Shows like Godzilla, where the one everybody saw as the bad guy was often the good guy. That is how I saw the ninja, and it pulled me into the martial arts. In my teens I fell in love with the ninja art of ninjitsu.</p><p>My first training center was the backyard, with carpet wrapped around a plum tree for a striking dummy. A TV crew filmed me there throwing stars, climbing ropes and running my obstacle course. My goals were simple: get the splits, earn a black belt, open my own dojo. Done, done and done.</p>",
     l:[["It is in the doing","#p-roots"]]},
    {id:"black-belt", q:"Are you a black belt?",
     alt:["are you a black belt","black belt","what belt are you","what rank are you","your rank","are you a master","master instructor"],
     keys:"black belt rank master grandmaster splits",
     a:"<p>Yes. My goals as a teen were simple: get the splits, earn a black belt, open my own dojo. Done, done and done. Today I teach my own system, Rick Tew's Martial Science.</p>",
     l:[["It is in the doing","#p-roots"],["Rick Tew's Martial Science","#p-rtms"]]},
    {id:"teaching", q:"When did you start teaching?",
     alt:["when did you start teaching","how long have you been teaching","how long have you taught","first dojo","own dojo","your dojo","stunt school","stunts","how it started"],
     keys:"teach teaches teaching taught instructor students dojo school stunt stunts sixteen nineteen years long",
     a:"<p>By 16 I was already teaching. At 19 I opened my own dojo, a martial arts training school. Then I took a break to study more martial arts and join stunt school, and my goals grew into a new dream: to move and live in Europe.</p><p>Since then I have taught all over the world: martial art schools, seminars, and live-in ninja camps, from California to Holland, the Philippines and now Thailand.</p>",
     l:[["I was a teenage ninja","#p-first-dojo"]]},
    {id:"holland", q:"Did you teach in Holland?",
     alt:["did rick teach in holland","did you teach in holland","in holland","the netherlands","in the netherlands","dutch film","naarden"],
     keys:"holland netherlands dutch europe european amsterdam rotterdam delft naarden bussum vesting fortress spain film films movie movies teach taught seminars",
     a:"<p>Yes. I spent more than six years in and out of the Netherlands, mostly in the Naarden Bussum area. I was in magazines and on TV, taught seminars across the country, and trained students outdoors at Naarden Vesting, an old war fortress with a lot of grass and places to jump around.</p><p>I was even offered a part in a popular Dutch film. I turned it down to spend time with students in Spain. My tour idea was born in Holland too: the first group on my California tour was Dutch.</p>",
     l:[["A ninja in the Netherlands","#p-holland"]]},
    {id:"where-now", q:"Where are you based now?",
     alt:["where are you based","where are you now","where do you live","where is rick now","where are you located","do you live in thailand","koh samui","in thailand","philippines"],
     keys:"based live living located location now today thailand samui koh philippines asia",
     a:"<p>Thailand. I founded NinjaGym on Koh Samui, and the Ninja Course runs there too. On the way: California, more than six years in and out of Holland, and the Philippines.</p>",
     l:[["NinjaGym","#p-ninjagym"],["The Ninja Course","#p-ninja-course"]]},
    {id:"certified", q:"Are you a certified coach?",
     alt:["are you certified","certified coach","certification","credentials","qualifications","tony robbins","strategic intervention","robbins madanes"],
     keys:"certified certificate certification credential credentials qualified qualifications tony robbins anthony madanes strategic intervention",
     a:"<p>Yes. I am a Tony Robbins Certified Strategic Intervention Coach, trained at the Robbins-Madanes Training Center.</p>",
     l:[["Speaking and press","#p-speaking"]]},
    {id:"press", q:"Have you been on TV or in magazines?",
     alt:["on tv","on television","in magazines","in the press","black belt magazine","interviews","famous"],
     keys:"tv television magazine magazines press interview interviews media newspaper newspapers famous film filmed",
     a:"<p>Yes. My work has been in Black Belt magazine, and on TV in the US and Holland. At 15 a TV crew filmed me training in my backyard.</p>",
     l:[["Speaking and press","#p-speaking"]]},
    {id:"speaking", q:"Can I book Rick to speak?",
     alt:["book rick","book you","book rick tew","hire rick","hire you","keynote","speak at","speaking fee","speaker for","for our event","for my event","seminar","workshop","corporate event"],
     keys:"speak speaker speaking keynote talk talks event events conference seminar seminars workshop workshops company corporate university stage hire book booking hp delft",
     a:"<p>Yes. I have spoken at HP, TU Delft and the University of Rotterdam, and I am a Tony Robbins Certified Strategic Intervention Coach. For your event at your company, university or organization, send it to Rick with your name and email.</p>",
     l:[["Speaking and press","#p-speaking"]], send:true},
    {id:"martialartsupply", q:"What was MartialArtSupply.com?",
     alt:["martialartsupply","martial art supply","martial arts supply","your businesses","other businesses","business ventures"],
     keys:"martialartsupply supply store shop business businesses ventures copied",
     a:"<p>Business isn't usual. I built martialartsupply.com from the ground up, into a business many people copied, in the same years as CMS.</p>",
     l:[["MartialArtSupply.com","#p-martialartsupply"]]},

    /* ---- Martial Arts as Therapy and coaching ---- */
    {id:"therapy", q:"What is martial arts as therapy?",
     alt:["martial arts as therapy","martial arts therapy","martial arts therapist","therapy","ptsd","trauma","post traumatic"],
     keys:"therapy therapist therapeutic trauma traumatic ptsd stress fear fears pain confidence aggression anger anxiety heal healing",
     a:"<p>Martial arts as therapy means using the training to work on what is going on inside you: fear, pain, confidence, aggression. To a group or an individual: training that supports moving on from a traumatic event, more self-confidence, pain and fear management, training that supports people living with post traumatic stress, and redirecting aggression.</p>",
     l:[["Martial Arts as Therapy","#p-therapy"]]},
    {id:"coaching", q:"Do you offer coaching?",
     alt:["do you offer coaching","life coach","life coaching","coach me","help me","one on one","private coaching","mentor me","mentoring"],
     keys:"coach coaching mentor mentoring life private personal goals motivation stuck",
     a:"<p>Yes. I am a Certified Strategic Intervention Coach, and I combine the mind and the martial arts: helping people find their key strengths and put them together. For coaching, send it to Rick with your name and email and what you want to work on.</p>",
     l:[["Martial Arts as Therapy","#p-therapy"]], send:true},
    {id:"happiness", q:"Why train martial arts at all?",
     alt:["why martial arts","why train","why should i train","why train martial arts","benefits of martial arts","is it good for you","happiness","be happy","worth it"],
     keys:"why benefit benefits happy happiness worth good health fitness mind body spirit",
     a:"<p>Research explains that happiness comes when we focus intensely on an activity of our choice that is challenging, with clear objectives and immediate feedback. Martial arts training asks for exactly that: in-the-now focus, a challenge, clear goals and results you see right away. Happiness is never about being lazy.</p>",
     l:[["Martial Arts as Therapy","#p-therapy"]]},

    /* ---- RTMS and the belts ---- */
    {id:"rtms", pri:2, q:"What is Rick Tew's Martial Science?",
     alt:["what is rtms","rtms","rick tews martial science","martial science","what style","which style","what martial art","what do you teach","is it mma","modern american ninjitsu","ninja mma","become an instructor","instructor training"],
     keys:"rtms martial science style system art mma ninjitsu ninjutsu modern american movement moves outside outdoors",
     a:"<p>A martial science, not a style: Modern American Ninjitsu crossed with MMA, built to teach movement, not moves. Five ranking levels, beginner to instructor. Nine areas in every level: stances, rolls, falls, strikes, kicks, body movement, knowledge, combat and weapons. The mental training is its own system, and we do most of our training outside.</p>",
     l:[["Rick Tew's Martial Science","#p-rtms"]]},
    {id:"belts", q:"What are the belts?",
     alt:["what are the belts","belt colors","belt colours","belt system","how many belts","the five belts","ranks","levels"],
     keys:"belt belts rank ranks level levels yellow orange green blue red color colour colors colours grade",
     a:"<p>Five belts: Yellow, Orange, Green, Blue and Red. Nine areas in each: Stance, Roll, Fall, Strike, Kick, Body Movement, Knowledge, Combat and Ninja Tools, with two lessons in every area. 90 lessons in all, at your own pace.</p>",
     l:[["See the five belts","#belts"]]},
    {id:"weapons", q:"Do you teach weapons?",
     alt:["weapons","ninja tools","ninja weapons","swords","throwing stars","nunchaku","waiver"],
     keys:"weapon weapons tool tools sword swords stars shuriken nunchaku nunchucks staff waiver",
     a:"<p>Yes. Weapons are one of the nine areas in every level of Rick Tew's Martial Science. In the Home Study Program they are the Ninja Tools lessons, the ninth area of every belt, and they open after you accept a waiver.</p>",
     l:[["See the five belts","#belts"]]},
    {id:"self-defense", q:"Will I learn self-defense?",
     alt:["self defense","self defence","defend myself","street fighting","real fighting"],
     keys:"self defense defence defend protect fight fighting street combat sparring grappling security",
     a:"<p>Yes. Combat is one of the nine areas in every belt: Natural Reactions and Combat Reality at Yellow, up to Grappling and Sparring at Blue, and Magnificent 7's and a Personal Security Course at Red.</p>",
     l:[["See the five belts","#belts"],["The Ninja Course","#p-ninja-course"]]},

    /* ---- WinJitsu and learning from home ---- */
    {id:"winjitsu", pri:1, q:"What is WinJitsu?",
     alt:["what is winjitsu","winjitsu","win jitsu","pocket dojo","your pocket dojo","the app","mental martial art","mind martial arts","what does win stand for","what does win mean","win stand for","true art of winning","what does winjitsu mean"],
     keys:"winjitsu jitsu pocket app mental mind mindset wisdom inspiration spirit",
     a:"<p>Win plus Jitsu: the True Art of Winning. What I learned on the way became a system, and five books. Today it is one app, your pocket dojo for Mind, Body and Spirit: Wisdom for the mind (Mind Martial Arts), Inspiration for the spirit (friends in the dojo, Ask Sensei Tew, Direct Connect and the Ninja Course) and Ninja for the body (the martial arts, Yellow to Red belt).</p>",
     l:[["Go to the WinJitsu app","https://winjitsu.com/",X],["WinJitsu on this page","#p-winjitsu"]]},
    {id:"books", q:"What books did you write?",
     alt:["your books","books","did you write","author","be a black belt in what you do","five books","the mental martial art","ace mak mbs nrg cmt"],
     keys:"book books wrote write written author read reading ace mak mbs nrg cmt finger fingers hand",
     a:"<p>Five books: The Mental Martial Art: Be a Black Belt in What You Do. One book per finger of the hand: ACE, MAK, MBS, NRG and CMT. Today they are taught in the WinJitsu app, and as workbooks on Tewtors.</p>",
     l:[["WinJitsu","#p-winjitsu"],["Tewtors workbooks","https://tewtors.com/",X]]},
    {id:"from-home", pri:2, q:"Can I learn from home?",
     alt:["learn from home","train from home","at home","from home","online","online classes","online course","learn online","distance","home study","remote"],
     keys:"home online remote distance phone month monthly virtual internet",
     a:"<p>Yes. The WinJitsu app is your pocket dojo: everything you would learn at my dojo, in your pocket. Every lesson in all five belts, with the WinJitsu books, is $22 for one month, paid once. It does not renew.</p><p>Four lessons are open free: Horse Stance, Cat Stance, Forward Roll and Reverse Roll.</p>",
     l:[["Train from home for a month","/winjitsu/#from-home"],["Start free","https://winjitsu.com/hsp",X]]},
    {id:"hsp", q:"What is the Home Study Program?",
     alt:["home study program","the home study program","hsp","personal feedback","feedback on my technique","own the whole dojo"],
     keys:"hsp study program feedback personal video audio technique own whole lifetime",
     a:"<p>The complete martial arts home study, belt by belt, in the WinJitsu app: $2,222 once. It adds personal feedback from Rick on every technique (text, audio, and video), and Ask Sensei Tew on any lesson.</p>",
     l:[["The Home Study Program","#p-pocket-dojo"],["Three ways in","#ways"]]},
    {id:"free", pri:1, q:"Is anything free?",
     alt:["is it free","anything free","free lessons","free trial","try it first","what can i see before i pay","before i pay","where do i start","how do i start","how do i begin","get started","sign up","how do i sign up","how do i join"],
     keys:"free trial try sample before pay demo",
     a:"<p>Yes. Four lessons are open free in the WinJitsu app: Horse Stance, Cat Stance, Forward Roll and Reverse Roll. Every other lesson is listed, so you see the whole path.</p>",
     l:[["Start free","https://winjitsu.com/hsp",X]]},
    {id:"video", q:"Are the lessons on video?",
     alt:["video lessons","on video","videos","youtube","watch"],
     keys:"video videos youtube watch film clips",
     a:"<p>Not today. Each lesson is the written method, the applications and the steps, with a step-by-step guide; the stances come with footprint diagrams.</p>",
     l:[["How a lesson works","#p-pocket-dojo"]]},
    {id:"ask-sensei", q:"How do I ask Rick about a technique?",
     alt:["ask sensei tew","ask rick a question","question about a technique","stuck on a technique","direct connect"],
     keys:"ask sensei question technique stuck direct connect answer",
     a:"<p>With the Home Study Program, press Ask Sensei Tew on any lesson. The answer comes back right there on the lesson. Direct Connect with me is paid per answer in the app.</p>",
     l:[["The Home Study Program","#p-pocket-dojo"]]},
    {id:"renew", q:"Does the month renew?",
     alt:["does it renew","is it a subscription","subscription","auto renew","cancel","recurring"],
     keys:"renew renews subscription subscribe recurring cancel cancellation automatic",
     a:"<p>No. The $22 month is one month, paid once. It does not renew, so there is nothing to cancel. Pay with the email you sign in to WinJitsu with; your full access opens when that email is added to the app.</p>",
     l:[["The WinJitsu month","/winjitsu/#from-home"]]},
    {id:"refund", q:"Can I get a refund?",
     alt:["refund","refunds","money back","double charge","charged twice"],
     keys:"refund refunds money back charge charged twice double",
     a:"<p>All sales are final. If a charge went wrong, for example a double charge, or you paid and your access never opened, write through the mailbox within 14 days and it is put right, including a refund where that is the fair outcome.</p>",
     l:[["Terms","/aininja/legal/terms.html"]], send:true},
    {id:"kids-app", q:"Can my kids use the app?",
     alt:["can my kids use it","can my kids use the app","kids use the app","child use the app","app for kids","age limit"],
     keys:"app age eighteen adult adults",
     a:"<p>Sign-up is for adults, 18 and over. It is built for training with a parent, never for kids alone. For kids in person, there is NinjaGym on Koh Samui.</p>",
     l:[["NinjaGym","#p-ninjagym"]]},
    {id:"tewtors", q:"What is Tewtors?",
     alt:["tewtors","workbooks","worksheets","for teachers","for parents","for teens"],
     keys:"tewtors workbook workbooks worksheet worksheets teacher teachers parent parents teen teens grown ups self help",
     a:"<p>My five methods for grown-ups, teens, parents and teachers. The Tewtors app and the workbooks: learn it for yourself, then share it with the kids in your life.</p>",
     l:[["Go to Tewtors","https://tewtors.com/",X]]},

    /* ---- In person ---- */
    {id:"course", pri:3, q:"Can I train with Rick in person?",
     alt:["train in person","in person","train with you","train with rick","the ninja course","ninja course","martial arts vacation","martial arts holiday","learn martial arts in thailand","ninja menu","do you have classes"],
     keys:"course person train training class classes lesson lessons learn vacation holiday travel travelers beginner beginners small group menu workshop visit thailand samui ninja",
     a:"<p>Yes: the Ninja Course on Koh Samui, for travelers who want to learn real martial arts on vacation, in a small group. Beginners welcome. Pick your tactics on the Ninja Menu, choose how long you stay, and train in a small-group workshop built from everyone's picks. The rest of the day is yours.</p><p>Coming to the Ninja Course? The WinJitsu app is included.</p>",
     l:[["Go to the Ninja Course","https://martialartcamp.com/ninja",X]]},
    {id:"camps", q:"Do you run live-in ninja camps?",
     alt:["ninja camp","ninja camps","live in camp","live-in camp","training camp","cms","college of martial science","yosemite camp"],
     keys:"camp camps live residential cms college yosemite multi first industry",
     a:"<p>I created CMS, the College of Martial Science, near Yosemite National Park: a live-in, multi martial arts ninja training camp. I was the first in the martial arts industry to run live-in Ninja Training Camps. After that dream came true in the States, I set a new goal: a program in Asia, and I picked Thailand. Today that is the Ninja Course on Koh Samui.</p>",
     l:[["Ninja Camps","#p-camps"],["Go to the Ninja Course","https://martialartcamp.com/ninja",X]]},
    {id:"tours", q:"What are BLAST Tours?",
     alt:["blast tours","blast","tours","travel and training","yosemite","joshua tree","grand canyon","adventure"],
     keys:"tour tours travel traveling travelling trip trips yosemite joshua grand canyon blast adventure continents",
     a:"<p>Travel and training: camps and tours on four continents, with Yosemite, Joshua Tree and the Grand Canyon among them. I have brought students from the US to Europe, and from Europe to the US. We call it BLAST: Breathing, Laughing, Adventuring, Stretching and Thinking.</p>",
     l:[["BLAST Tours","#p-tours"]], send:true},
    {id:"ninjagym", pri:1, q:"What is NinjaGym?",
     alt:["ninjagym","ninja gym","for kids","kids classes","kids class","classes for kids","my kids","my son","my daughter","birthday party","birthday parties","drop off","day camp","playground"],
     keys:"ninjagym gym kid kids child children son daughter toddler teach class classes playground parkour climbing birthday party parties drop off day camp guides",
     a:"<p>I founded NinjaGym on Koh Samui: an indoor ninja playground for kids, with climbing, parkour and ninja games with our Guides. Drop-off sessions, day camps and birthday parties. It runs on an app I built: check-ins, memberships, bookings and the shop.</p>",
     l:[["Go to NinjaGym","https://ninjagym.com/",X]]},
    {id:"nerdhostel", q:"What is NerdHostel?",
     alt:["nerdhostel","nerd hostel","hostel","place to stay","where to stay","where can i stay","accommodation","coworking","digital nomad"],
     keys:"hostel nerdhostel nerd koh samui stay staying room rooms bed beds accommodation sleep coworking nomad nomads guild hall gamer gamers",
     a:"<p>A gamer hostel with Guild Hall co-working for digital nomads on Koh Samui, across the street from NinjaGym.</p>",
     l:[["Go to NerdHostel","https://www.nerdhostel.com/",X]]},

    /* ---- The rest of the wheel ---- */
    {id:"ai", q:"Can you build an app or website for my business?",
     alt:["ai ninja","build me an app","build an app","build a website","build my website","for my business","done for you ai","automation","chatbot","booking system"],
     keys:"ai app apps make made website websites site software business businesses automate automation chatbot bot agent agents build builds developer tech booking sabaisen evercool samuikids",
     a:"<p>Yes, through AI Ninja: done-for-you AI for small business, managed by a real person. For owners who hate tech or have no time for it: we build it, host it and run the AI behind it. Three of them: SabaiSen, a spa on Koh Samui; EverCool, an air conditioning firm's site and back office; and SamuiKids, the drop-off guide for kid activities on Koh Samui.</p>",
     l:[["Go to AI Ninja","https://tewbedo.com/",X]]},
    {id:"games", q:"What games have you made?",
     alt:["games","your games","video games","board game","dungeon hole","tewgo","astrohold","astro hold","arena rpg","tewbit","ninja ninja defense"],
     keys:"game games gaming play board dungeon hole tewgo astrohold arena rpg tewbit tower defense strategy iphone",
     a:"<p>Games are my hobby, under my TewBit Games brand: Dungeon Hole (1v1 dungeon strategy), TEWGO (a strategy board game for iPhone and iPad), AstroHold (turn-based space strategy in your browser), and Arena RPG, the board game I drew on paper as a kid, which I am building for real now.</p>",
     l:[["See the games","#p-games"]]},

    /* ---- Practical ---- */
    {id:"price", q:"How much does it cost?",
     alt:["how much","price","prices","cost","costs","fees","rates"],
     keys:"price prices pricing cost costs much fee fees rate rates baht dollar dollars pay paying",
     a:"<p>Each place keeps its own prices on its own page. Learning from home: $22 for one month of the WinJitsu app, or $2,222 once for the Home Study Program with my personal feedback.</p>",
     l:[["Ninja Course","https://martialartcamp.com/ninja",X],["NinjaGym","https://ninjagym.com/",X],["WinJitsu","/winjitsu/#from-home"]]},
    {id:"contact", q:"How do I reach Rick?",
     alt:["contact","contact you","reach you","reach rick","email you","email rick","phone number","call you","whatsapp","talk to rick","talk to you","speak to rick","message rick"],
     keys:"contact reach email mail phone call whatsapp line message talk",
     a:"<p>Everything goes in writing, so it is on the record. Send it to Rick with your name and email, and the reply comes to your inbox.</p>",
     l:[["The Contact form","#contact"]], send:true},
    {id:"hello", q:"Hi",
     alt:["hi","hello","hey","hola","sawasdee","good morning","good afternoon","good evening","whats up"],
     keys:"hi hello hey hola sawasdee",
     a:"<p>Hi! Ask about the Ninja Course, learning from home, WinJitsu, NinjaGym, speaking, coaching, or anything on the wheel.</p>",
     l:[["Read my story","#p-story"]]}
  ];
  var STARTERS=["about","from-home","course","ninjagym","speaking","winjitsu"];

  var api={answer:answer, search:search, tokens:tokens, norm:norm, LIBRARY:LIBRARY, STARTERS:STARTERS};
  if(typeof module!=="undefined" && module.exports){ module.exports=api; return; }
  root.rtHomeAsk=api;

  /* ---------- browser: the floating chat ---------- */
  var doc=root.document;
  if(!doc) return;
  var MAILBOX="https://qegfhbseccinnxnzfhxw.supabase.co/functions/v1/ricktew-contact";
  /* the first line TEWBEDO's guard knows (ends ", from the Contact page on ricktew.com."): never change it alone */
  var FIRST="About: The ask box under the wheel, from the Contact page on ricktew.com.";

  function byId(id){ return doc.getElementById(id); }
  function el(tag, cls, text){ var n=doc.createElement(tag); if(cls) n.className=cls; if(text!=null) n.textContent=text; return n; }
  function find(id){ for(var i=0;i<LIBRARY.length;i++) if(LIBRARY[i].id===id) return LIBRARY[i]; return null; }

  function boot(){
    var panel=byId("chatPanel"), launch=byId("chatLaunch"), log=byId("chatLog"), form=byId("chatForm"), input=byId("chatIn"), x=byId("chatX");
    if(!panel||!log||!form||!input) return;
    var asked=[], shown=[], misses=[], opened=Date.now(), lastFocus=null, src="direct", greeted=false;
    root.rtAskMisses=misses;
    try{ var s0=(new URLSearchParams(location.search).get("src")||"").toLowerCase(); if(/^[a-z]{1,20}$/.test(s0)) src=s0; }catch(e){}

    function open(q){
      lastFocus=doc.activeElement;
      panel.hidden=false; if(launch) launch.hidden=true;
      doc.body.classList.add("ask-open");
      if(!greeted){ greeted=true; welcome(); }
      if(q) ask(q);
      if(!q || root.matchMedia && matchMedia("(min-width: 640px)").matches){ try{ input.focus({preventScroll:true}); }catch(e){ input.focus(); } }
    }
    function close(){
      panel.hidden=true; if(launch) launch.hidden=false;
      doc.body.classList.remove("ask-open");
      if(lastFocus&&lastFocus.focus&&lastFocus!==doc.body){ try{ lastFocus.focus({preventScroll:true}); }catch(e){} }
    }
    root.rtAskOpen=open; root.rtAskClose=close;
    if(launch) launch.addEventListener("click", function(){ open(); });
    if(x) x.addEventListener("click", close);
    doc.addEventListener("keydown", function(e){ if(e.key==="Escape"&&!panel.hidden) close(); });

    function bubble(who){ var b=el("div","ask-b ask-"+who); log.appendChild(b); return b; }
    function down(node){ requestAnimationFrame(function(){ if(node && node.offsetTop) log.scrollTop=Math.max(0,node.offsetTop-8); else log.scrollTop=log.scrollHeight; }); }
    function chips(list, into){
      var row=el("div","ask-chips");
      list.forEach(function(entry){ if(!entry) return; var c=el("button","ask-chip",entry.q); c.type="button"; c.addEventListener("click", function(){ ask(entry.q, entry); }); row.appendChild(c); });
      into.appendChild(row);
    }
    function go(href){
      /* a section of this page: close the chat and let the page turn the wheel to it */
      close();
      if(location.hash===href){ root.dispatchEvent(new HashChangeEvent("hashchange")); }
      else location.hash=href;
    }
    function links(entry, into){
      if(!entry.l||!entry.l.length) return;
      var row=el("div","ask-links");
      entry.l.forEach(function(l){
        var a=el("a","ask-link",l[0]); a.href=l[1];
        if(l[2]){ a.target="_blank"; a.rel="noopener"; }
        else if(l[1].charAt(0)==="#"){ a.addEventListener("click", function(e){ e.preventDefault(); go(l[1]); }); }
        row.appendChild(a);
      });
      into.appendChild(row);
    }
    function sendBtn(label, main){
      var b=el("button", main?"ask-send":"ask-send ghost", label); b.type="button";
      b.addEventListener("click", function(){ b.disabled=true; sendForm(); });
      return b;
    }
    function show(entry, also){
      shown.push(entry.q);
      var b=bubble("n");
      b.appendChild(el("div","ask-q",entry.q));
      var a=el("div","ask-a"); a.innerHTML=entry.a; b.appendChild(a);
      links(entry, b);
      var row=el("div","ask-act");
      if(entry.send) row.appendChild(sendBtn("Send it to Rick", true));
      else { row.appendChild(doc.createTextNode("Not what you needed? ")); row.appendChild(sendBtn("Send it to Rick", false)); }
      b.appendChild(row);
      if(also&&also.length){ var w=el("div","ask-also"); w.appendChild(el("span",null,"Also close:")); chips(also, w); b.appendChild(w); }
      return b;
    }
    function showMiss(q, near){
      misses.push(q);
      var b=bubble("n");
      var a=el("div","ask-a"); a.innerHTML="<p>I do not have that one on this page, and I would rather say so than guess. Send it to Rick, and the reply comes to your inbox.</p>"; b.appendChild(a);
      var row=el("div","ask-act"); row.appendChild(sendBtn("Send it to Rick", true)); b.appendChild(row);
      var more=el("div","ask-also"); more.appendChild(el("span",null,near&&near.length?"Closest on this page:":"Or one of these:"));
      chips(near&&near.length?near:STARTERS.slice(0,3).map(find), more); b.appendChild(more);
      return b;
    }
    function showChoose(entries){
      var b=bubble("n");
      var a=el("div","ask-a"); a.innerHTML="<p>More than one answer fits that. Which one did you mean?</p>"; b.appendChild(a);
      chips(entries, b);
      var row=el("div","ask-act"); row.appendChild(doc.createTextNode("Neither? ")); row.appendChild(sendBtn("Send it to Rick", false)); b.appendChild(row);
      return b;
    }
    function showEmpty(){
      var b=bubble("n");
      var a=el("div","ask-a"); a.innerHTML="<p>Give me a few more words, or tap one of these.</p>"; b.appendChild(a);
      chips(STARTERS.map(find), b);
      return b;
    }
    function welcome(){
      var b=bubble("n");
      var a=el("div","ask-a"); a.innerHTML="<p>How can I help you? Ask about Rick, the Ninja Course, learning from home, NinjaGym, speaking or coaching. Answers come from this page; anything else goes to Rick.</p>"; b.appendChild(a);
      chips(STARTERS.map(find), b);
    }
    function ask(q, entry){
      q=String(q||"").trim(); if(!q) return;
      asked.push(q);
      var u=bubble("u"); u.textContent=q;
      var r= entry ? {kind:"answer", entry:entry, also:[]} : answer(q), b;
      if(r.kind==="answer") b=show(r.entry, r.also);
      else if(r.kind==="choose") b=showChoose(r.entries);
      else if(r.kind==="empty") b=showEmpty();
      else b=showMiss(q, r.near);
      down(u);
    }
    root.rtAskQuestion=ask;

    /* ---- Send it to Rick: name and email in the chat, posted to the mailbox like the Contact form ---- */
    function sendForm(){
      var b=bubble("n ask-mail");
      var f=el("form","ask-mailform"); f.noValidate=true;
      f.appendChild(el("p","ask-a-line","Where should the reply go?"));
      var lm=el("label","vh","Your message for Rick"); lm.htmlFor="chatMailMsg"; f.appendChild(lm);
      var msg=el("textarea"); msg.id="chatMailMsg"; msg.rows=3; msg.maxLength=4800;
      msg.value=asked.length ? asked[asked.length-1] : ""; f.appendChild(msg);
      var ln=el("label","vh","Your name"); ln.htmlFor="chatMailName"; f.appendChild(ln);
      var nm=el("input"); nm.id="chatMailName"; nm.type="text"; nm.autocomplete="name"; nm.maxLength=100; nm.placeholder="Your name"; f.appendChild(nm);
      var le=el("label","vh","Your email"); le.htmlFor="chatMailEmail"; f.appendChild(le);
      var em=el("input"); em.id="chatMailEmail"; em.type="email"; em.autocomplete="email"; em.maxLength=200; em.placeholder="Your email"; f.appendChild(em);
      var trap=el("div","trap"); trap.setAttribute("aria-hidden","true");
      var tw=el("input"); tw.type="text"; tw.tabIndex=-1; tw.autocomplete="off"; tw.name="website"; trap.appendChild(tw); f.appendChild(trap);
      var err=el("p","ask-err"); err.setAttribute("role","alert"); f.appendChild(err);
      var btn=el("button","ask-send","Send"); btn.type="submit"; f.appendChild(btn);
      b.appendChild(f);
      down(b);
      try{ nm.focus({preventScroll:true}); }catch(e){}
      f.addEventListener("submit", function(e){
        e.preventDefault(); err.textContent="";
        var text=msg.value.trim(), n=nm.value.trim(), m=em.value.trim();
        if(!text){ err.textContent="Type your question first."; msg.focus(); return; }
        if(!n||!m){ err.textContent="Your name, and an email for the reply."; (n?em:nm).focus(); return; }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m)){ err.textContent="That email address does not look right. The reply goes there."; em.focus(); return; }
        var others=asked.filter(function(q){ return q!==text; }).slice(-8);
        var data={name:n, email:m, subject:"hininja",
          message:FIRST+"\n\n"+text+(others.length?"\n\n(Also asked in the chat: "+others.join("; ")+".)":"")+(shown.length?"\n\n(The chat showed them: "+shown.slice(-6).join("; ")+".)":""),
          website:tw.value, elapsedMs:Date.now()-opened, source:src};
        btn.disabled=true; btn.textContent="Sending...";
        fetch(MAILBOX,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
        .then(function(res){ if(!res.ok) throw new Error(String(res.status)); return res.json(); })
        .then(function(){ f.remove(); var p=el("div","ask-a"); p.innerHTML="<p><b>Posted.</b> Check your inbox for the reply.</p>"; b.appendChild(p); down(b); })
        .catch(function(){ btn.disabled=false; btn.textContent="Send"; err.textContent="That did not go through. Check your connection and press Send again."; });
      });
    }

    form.addEventListener("submit", function(e){
      e.preventDefault();
      var q=input.value; input.value="";
      ask(q);
      try{ input.focus({preventScroll:true}); }catch(err){}
    });

    /* the box under the wheel opens the chat with its question (it never posts by itself) */
    var quick=byId("quickAsk"), qmsg=byId("quickMsg");
    /* while that box is on screen it is the way in, so the floating button steps aside */
    if(quick&&launch&&"IntersectionObserver" in root){
      new IntersectionObserver(function(es){ launch.classList.toggle("near", es[0].isIntersecting); }).observe(quick);
    }
    if(quick&&qmsg){
      var grow=function(){ qmsg.style.height=""; qmsg.style.height=Math.min(qmsg.scrollHeight, qmsg.offsetHeight*4)+"px"; };
      qmsg.addEventListener("input", grow);
      qmsg.addEventListener("keydown", function(e){
        if(e.key==="Enter" && !e.shiftKey && !e.isComposing){ e.preventDefault(); quick.requestSubmit ? quick.requestSubmit() : quick.dispatchEvent(new Event("submit",{cancelable:true})); }
      });
      quick.addEventListener("submit", function(e){
        e.preventDefault();
        var t=qmsg.value.trim();
        if(!t){ qmsg.focus(); return; }
        qmsg.value=""; grow(); qmsg.blur();
        open(t);
      });
    }
  }
  if(doc.readyState==="loading") doc.addEventListener("DOMContentLoaded", boot); else boot();
})(typeof window!=="undefined"?window:this);
