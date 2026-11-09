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
  /* "still" and "much" are real words here ("does Rick still speak?", "how much for a website?"); "website" too. */
  var STOP = {};
  ("a an the and or but if then so of to in on at for from by with about as into over under is are was were be been being am do does did doing have has had having can could would should will shall may might must it its this that these those there here what which who whom whose how why when where i me my mine we us our you your yours he she they them their his her hers one ones some any all each every many more most other another such than too very just also really actually only even yet again ever never not no nor don dont doesn doesnt didn didnt isn isnt aren arent won wont cant cannot couldn couldnt wouldn wouldnt shouldn shouldnt let lets get got give go going want wants wanted like need needs needed know think thing things stuff kind sort way ways please thanks thank ok okay yes yeah yep nope hmm um well right tell rick tew ricktew ricks rik ric mr sensei page whats hows whos wheres im ive id lol pretty u r ur pls plz").split(" ").forEach(function(w){ STOP[w]=1; });

  function norm(s){
    return String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()
      .replace(/[‘’']/g,"")
      .replace(/[^a-z0-9$]+/g," ")
      .replace(/\s+/g," ").trim()
      .replace(/(^| )co working( |$)/g,"$1coworking$2")
      .replace(/(^| )ninja gym( |$)/g,"$1ninjagym$2")
      .replace(/(^| )win jitsu( |$)/g,"$1winjitsu$2");
  }
  /* "books" (what he wrote) must not meet "book" (to reserve), or every booking question finds the books */
  function stem(w){
    if(w==="books") return "bookz";
    if(w.length<=3) return w;
    w=w.replace(/ies$/,"y").replace(/(ing|ed|es|s)$/,"");
    if(w.length>4) w=w.replace(/e$/,"");
    return w;
  }
  function tokens(s){
    var out={}, list=[];
    norm(s).split(" ").forEach(function(w){
      if(!w||STOP[w]||/^\d+$/.test(w)) return;
      var t=stem(w);
      if(t.length<2||out[t]) return;
      out[t]=1; list.push(t);
    });
    return list;
  }
  /* A typo of a word the library knows ("winjitzu", "ninjagim", "accomodation") is read as that word: one letter off
     for words of 5 to 7 letters, two for longer ones, and only when exactly one known word is that close. */
  function dist(a,b,max){
    if(Math.abs(a.length-b.length)>max) return max+1;
    var prev=[], cur, i, j;
    for(j=0;j<=b.length;j++) prev[j]=j;
    for(i=1;i<=a.length;i++){
      cur=[i]; var low=i;
      for(j=1;j<=b.length;j++){
        cur[j]=Math.min(prev[j]+1, cur[j-1]+1, prev[j-1]+(a[i-1]===b[j-1]?0:1));
        if(cur[j]<low) low=cur[j];
      }
      if(low>max) return max+1;
      prev=cur;
    }
    return prev[b.length];
  }
  function build(lib){
    var df={}, vocab={};
    var built=lib.map(function(e){
      var keys={}, exact=[];
      tokens(e.q).concat(tokens(e.keys||"")).forEach(function(t){ keys[t]=1; });
      var alts=[];
      (e.alt||[]).forEach(function(p){
        /* "=word": only the whole question, so "ninjagym" alone finds NinjaGym without pulling every NinjaGym question */
        if(p.charAt(0)==="="){ var n=norm(p.slice(1)); if(n) exact.push(n); return; }
        /* "~words": a phrase only; its words never become keys ("~pay by visa" must not catch "do i need a visa") */
        if(p.charAt(0)==="~") p=p.slice(1); else tokens(p).forEach(function(t){ keys[t]=1; });
        var np=norm(p); if(np) alts.push(np);
      });
      /* a one-word title ("Hi", "Thanks") is not a phrase: it would catch every question that starts with it */
      if(norm(e.q).indexOf(" ")>0) alts.push(norm(e.q));
      Object.keys(keys).forEach(function(t){ df[t]=(df[t]||0)+1; vocab[t]=1; });
      return {e:e, keys:keys, exact:exact, alts:alts.map(function(p){ return new RegExp("(^| )"+p.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"( |$)"); })};
    });
    built.df=df; built.vocab=Object.keys(vocab);
    return built;
  }
  function fix(t, built){
    if(built.df[t]||t.length<5) return t;
    var max=t.length>=8?2:1, best=null, n=0;
    built.vocab.forEach(function(v){ if(v.length<4) return; var d=dist(t,v,max); if(d<=max){ if(!best||d<best.d){ best={v:v,d:d}; n=1; } else if(d===best.d) n++; } });
    return best&&n===1 ? best.v : t;
  }
  var BUILT=null;
  var GREET={hi:1, hello:1, hallo:1, hey:1, hola:1, yo:1, sup:1, sawasdee:1, good:1, morn:1, morning:1, afternoon:1, evening:1};
  /* The gate (tewbedo.com's): a whole phrase from the entry is in the question, or two real words match and they are
     more than half the question's real words, or the question is ONE real word and only a few entries carry it. */
  function search(question, lib){
    var built = lib ? build(lib) : (BUILT || (BUILT=build(LIBRARY)));
    var nq=norm(question), q=tokens(question).map(function(t){ return fix(t, built); }), hits=[], near=[];
    /* "hi, do you teach kids?" is a question about kids: greeting words only count in a bare greeting */
    var rest=q.filter(function(t){ return !GREET[t]; }); if(rest.length) q=rest;
    built.forEach(function(b){
      var m=0;
      q.forEach(function(t){ if(b.keys[t]) m++; });
      var phrase=0;
      if(b.exact.indexOf(nq)>=0) phrase=2;
      for(var i=0;i<b.alts.length&&phrase<2;i++){ if(b.alts[i].test(nq)) phrase++; }
      var ok = phrase || (m>=2 && m*2>q.length) || (m===1 && q.length===1 && built.df[q[0]]<=4);
      /* a greeting or a thank-you only answers itself */
      if(ok && !phrase && (b.e.id==="hello"||b.e.id==="thanks")) ok = q.every(function(t){ return b.keys[t]; });
      if(ok) hits.push({entry:b.e, score:m+phrase*3, matched:m});
      else if(m && !b.e.quiet) near.push({entry:b.e, score:m});
    });
    /* one real word that many answers share ("ninjagym", "winjitsu"): the answer whose own title is that word */
    if(!hits.length && q.length===1){
      var best=null, tie=false;
      built.forEach(function(b){ if(b.e.quiet) return; var tt=tokens(b.e.q); if(tt.indexOf(q[0])<0) return;
        var p=b.e.pri||0;
        if(!best||tt.length<best.n||(tt.length===best.n&&p>best.p)){ best={e:b.e,n:tt.length,p:p}; tie=false; } else if(tt.length===best.n&&p===best.p) tie=true; });
      if(best&&!tie) hits.push({entry:best.e, score:1, matched:1});
    }
    /* ties go to the bigger doors first (pri), so "martial arts" offers the course before a side story */
    function rank(a,b){ return (b.score-a.score) || ((b.entry.pri||0)-(a.entry.pri||0)); }
    hits.sort(rank); near.sort(rank);
    return {hits:hits, near:near, q:q, empty:q.length===0};
  }
  /* answer {entry, also} | choose {entries} | miss {near} | empty | thai */
  function answer(question, lib){
    if(/[฀-๿]/.test(question||"")) return {kind:"thai"};
    var r=search(question, lib);
    if(!r.hits.length) return r.empty ? {kind:"empty"} : {kind:"miss", near:r.near.slice(0,3).map(function(h){ return h.entry; })};
    var top=r.hits[0], second=r.hits[1];
    /* a dead heat asks which one, unless one of them is the bigger door (pri) */
    if(second && second.score===top.score && (top.entry.pri||0)===(second.entry.pri||0)){
      return {kind:"choose", entries:r.hits.filter(function(h){ return h.score===top.score; }).slice(0,3).map(function(h){ return h.entry; })};
    }
    var also=r.hits.slice(1,3).filter(function(h){ return h.score>=2 && h.score>=top.score-1 && !h.entry.quiet; }).map(function(h){ return h.entry; });
    return {kind:"answer", entry:top.entry, also:also};
  }

  /* ---------- the answer library: only what the home page says ----------
     id; q, the question as the chat shows it; alt, other ways of asking it (whole phrases; "=..." only as the whole
     question); keys, extra words; a, the answer (HTML, first person, the page's words); l, links [label, href,
     off-site]; send, only a person can answer it, so "Send it to Rick" is the main button; pri, wins a tie; quiet,
     never offered as a "closest" chip. Persona round of 9 Nov 2026 (635 questions) shaped most of these. */
  var X=true;
  var LIBRARY=[
    /* ---- Rick ---- */
    {id:"about", pri:1, q:"Who is Rick Tew?",
     alt:["who is rick","who is rick tew","about rick","tell me about yourself","tell me about rick","what does rick do","bio","biography","read my story","my story","=rick","=rick tew","=who is he","who is he","rik tew","whats his background","background"],
     keys:"bio biography yourself background instructor coach speaker",
     a:"<p>Hi, I'm Rick Tew: instructor, coach, speaker. My passion is helping people find their key strengths and put them together, so they get more out of life. It started on the mat. Today it also means building the systems a business runs on, and training the people who run it.</p><p>I only teach from experience, and I learn by doing. The martial arts, the camps, the books, the gyms and the apps: this page is all of it, in the order it happened.</p>",
     l:[["Read my story","#p-story"],["About Rick Tew","#p-about"]]},
    {id:"now", pri:2, q:"What is Rick doing now?",
     alt:["what is he doing now","what are you doing now","what is rick doing now","what is rick doing","what do you do now","what does he do now","doing now","these days","nowadays","currently","what is he up to","what are you up to","whats new","what is new","focused on","focus now","main focus","working on","is he retired","are you retired","still active","whats he doing","he does so much","what does rick do now","main thing","main thing now","right now"],
     keys:"now today current currently days nowadays focus focused working retired retire latest new active lately",
     a:"<p>It started on the mat. Today it also means building the systems a business runs on, and training the people who run it.</p><p>Right now: WinJitsu, my pocket dojo app with the Home Study Program; the Ninja Course on Koh Samui; NinjaGym for kids; AI Ninja, apps built for small businesses; and games, my hobby. Turn the wheel at the top to see each one.</p>",
     l:[["WinJitsu","#p-winjitsu"],["The Ninja Course","#p-ninja-course"],["AI Ninja","#p-ai-ninja"]]},
    {id:"still-teach", pri:1, q:"Does Rick still teach?",
     alt:["still teach","still teaching","does he still teach","is rick still teaching","still giving trainings","still give trainings","still training","still give lessons","still give classes","still doing martial arts","still do martial arts"],
     keys:"still teach teaching trainings lessons classes",
     a:"<p>Yes. From 16 on I have been teaching, sharing and living the martial arts. Today you can learn it at home in the WinJitsu app, with my personal feedback in the Home Study Program. For training in person, there is the Ninja Course on Koh Samui.</p>",
     l:[["Train from home","/winjitsu/#from-home"],["The Ninja Course","https://martialartcamp.com/ninja",X]]},
    {id:"roots", q:"Where are you from?",
     alt:["where are you from","where is rick from","where is he from","where are you originally from","originally from","where did you grow up","where did he grow up","where were you born","is rick from thailand","is he from thailand","is he thai","is rick thai","are you thai","is he american","is rick american","are you american","nationality","growing up","childhood","boy scouts","scouts","indiana","ran away"],
     keys:"from originally grow grew born childhood boy indiana california scouts scout dad father american nationality",
     a:"<p>I grew up in the US. As a boy I ran away from home in Indiana to be in California. It worked, and a new journey began. As a young teen I joined the Boy Scouts: trips into the outdoors and a system for setting goals, and it is why I have taken students to places like Yosemite. Today I live and work in Thailand.</p>",
     l:[["It is in the doing","#p-roots"]]},
    {id:"where-now", q:"Where are you based now?",
     alt:["where are you based","where is he based","where are you now","where is rick now","where is he now","where do you live","where does he live","where are you located","do you live in thailand","does he live in thailand","live in thailand","philippines","where does rick live","where does he live now","still in america"],
     keys:"based live living located location thailand samui koh philippines asia",
     a:"<p>I live and work in Thailand now: I founded NinjaGym on Koh Samui, and the Ninja Course runs there too. I grew up in Indiana and California, and on the way spent more than six years in and out of Holland, and time in the Philippines.</p>",
     l:[["NinjaGym","#p-ninjagym"],["The Ninja Course","#p-ninja-course"]]},
    {id:"age", q:"How old is Rick?",
     alt:["how old is rick","how old are you","how old is he","rick age","ricks age","his age","your age","what age is rick","=how old","=age"],
     keys:"",
     a:"<p>Old enough to have taught for more than 25 years. I fell in love with the martial arts at 13, was on TV at 15, was teaching at 16, opened my own dojo at 19 and moved to Europe at 21.</p>",
     l:[["Read my story","#p-story"]]},
    {id:"split", q:"What is the split personality line?",
     alt:["split personality","two sides","only one of me","which is the real rick","tew of me","last name"],
     keys:"split personality sides",
     a:"<p>Even though my last name says otherwise, there is only one of me. But I do have a split personality. I believe we all do, and the mix of those traits is what makes us who we are.</p>",
     l:[["Read my story","#p-story"]]},
    {id:"started", q:"How did you get into martial arts?",
     alt:["how did you start","how did you get into","how did it start","why ninja","why the ninja","first martial art","get into martial arts","started martial arts","start martial arts","backyard","godzilla","real ninja","are you a real ninja","is he a real ninja","is rick a real ninja","ninjitsu or ninjutsu","ninjutsu"],
     keys:"start started begin began first backyard godzilla underdog teen teens ninjitsu ninjutsu plum tree obstacle real",
     a:"<p>Shows like Godzilla, where the one everybody saw as the bad guy was often the good guy. That is how I saw the ninja, and it pulled me into the martial arts. In my teens I fell in love with the ninja art of ninjitsu.</p><p>My first training center was the backyard, with carpet wrapped around a plum tree for a striking dummy. A TV crew filmed me there throwing stars, climbing ropes and running my obstacle course. My goals were simple: get the splits, earn a black belt, open my own dojo. Done, done and done. Today my system is Modern American Ninjitsu crossed with MMA.</p>",
     l:[["It is in the doing","#p-roots"],["Rick Tew's Martial Science","#p-rtms"]]},
    {id:"black-belt", q:"Are you a black belt?",
     alt:["are you a black belt","what belt are you","what rank are you","your rank","are you a master","master instructor","=black belt","is he a black belt","is rick a black belt","what belt is rick","what belt is he","what belt does rick have","what belt rick have","how many black belts","what black belt"],
     keys:"black belt rank master grandmaster splits",
     a:"<p>Yes. My goals as a teen were simple: get the splits, earn a black belt, open my own dojo. Done, done and done. Today I teach my own system, Rick Tew's Martial Science.</p>",
     l:[["It is in the doing","#p-roots"],["Rick Tew's Martial Science","#p-rtms"]]},
    {id:"teaching", q:"When did you start teaching?",
     alt:["when did you start teaching","how long have you been teaching","how long have you taught","first dojo","own dojo","your dojo","stunt school","stunts","how it started","where have you taught","where did you teach","teenage ninja","move to europe","moved to europe","why europe"],
     keys:"teach teaches teaching taught instructor students dojo school stunt stunts sixteen nineteen years long",
     a:"<p>By 16 I was already teaching. At 19 I opened my own dojo, a martial arts training school. Then I took a break to study more martial arts and join stunt school, and my goals grew into a new dream: to move and live in Europe.</p><p>I have run martial art schools, seminars, Ninja camps and live-in martial arts programs for more than 25 years in the US, Latin America, Europe and Asia.</p>",
     l:[["I was a teenage ninja","#p-first-dojo"]]},
    {id:"holland", q:"Did you teach in Holland?",
     alt:["did rick teach in holland","did you teach in holland","in holland","the netherlands","in the netherlands","dutch film","naarden","still come to holland","come back to holland","visit holland"],
     keys:"holland netherlands dutch europe european amsterdam rotterdam delft naarden bussum vesting fortress spain film films movie movies teach taught seminars come visit return",
     a:"<p>I spent more than six years in and out of the Netherlands, mostly in the Naarden Bussum area. I was in magazines and on TV, taught seminars across the country, and trained students outdoors at Naarden Vesting, an old war fortress with a lot of grass and places to jump around. I was even offered a part in a popular Dutch film, and turned it down to spend time with students in Spain.</p><p>Holland has been a second home ever since: it is where I first started to preach the WinJitsu way of life, and the first group on my California tour was Dutch. Trained with me there? Send it to Rick.</p>",
     l:[["A ninja in the Netherlands","#p-holland"]]},
    {id:"certified", q:"Are you a certified coach?",
     alt:["are you certified","certified coach","certification","credentials","qualifications","tony robbins","strategic intervention","robbins madanes"],
     keys:"certified certificate certification credential credentials qualified qualifications tony robbins anthony madanes strategic intervention",
     a:"<p>Yes. I am a Tony Robbins Certified Strategic Intervention Coach, trained at the Robbins-Madanes Training Center.</p>",
     l:[["Speaking and press","#p-speaking"]]},
    {id:"press", q:"Have you been on TV or in magazines?",
     alt:["on tv","on television","in magazines","in the press","black belt magazine","interviews","famous","in movies","in a movie","in films","on tv in holland","in the news","tv show"],
     keys:"tv television magazine magazines press interview interviews media newspaper newspapers famous filmed",
     a:"<p>Yes. My work has been in Black Belt magazine, and on TV in the US and Holland. At 15 a TV crew filmed me training in my backyard, and in Holland I was offered a part in a popular Dutch film.</p>",
     l:[["Speaking and press","#p-speaking"]]},
    {id:"social", q:"Is Rick on YouTube or social media?",
     alt:["youtube","youtube channel","on youtube","videos of rick","video of rick","video of him","videos of him","video of him speaking","watch him","facebook","instagram","twitter","social media","follow him","follow you","old photos","photos of the old days","pictures"],
     keys:"youtube facebook instagram twitter social media follow channel clip clips photos pictures",
     a:"<p>Yes. My skills and programs are on video on YouTube, and I am on Facebook, Instagram and X. Photos show me training in countries all over the world, and this page is full of them.</p>",
     l:[["YouTube","https://www.youtube.com/ricktew",X],["Facebook","https://www.facebook.com/rick.tew",X],["Instagram","https://instagram.com/ricktew",X],["X","https://x.com/ricktew",X]]},
    {id:"martialartsupply", q:"What was MartialArtSupply.com?",
     alt:["martialartsupply","martial art supply","martial arts supply","your businesses","other businesses","business ventures","do you sell gear","sell equipment"],
     keys:"martialartsupply supply store business businesses ventures copied gear equipment",
     a:"<p>Business isn't usual. I built martialartsupply.com from the ground up, into a business many people copied, in the same years as CMS.</p>",
     l:[["MartialArtSupply.com","#p-martialartsupply"]]},

    /* ---- old students and reviews ---- */
    {id:"quote", pri:1, q:"I'm an old student. Can I give a quote?",
     alt:["old student","former student","give a quote","give a testimonial","leave a testimonial","write a testimonial","write a review","leave a review","share my story","i trained with rick","i trained with you","i trained with him","used to train with","remember me","does he remember","does rick remember","reconnect","get in touch again","old students"],
     keys:"quote quotes former old student alumni remember reconnect trained",
     a:"<p>Yes, please. Almost every student has a story to share, and this page is full of them. Send your quote to Rick with your name, and where and when you trained.</p>",
     l:[["Student stories","#p-tours-page"]], send:true},
    {id:"reviews", q:"What do students say?",
     alt:["what do students say","what do past students say","reviews","any reviews","testimonials","is it legit","is this legit","is he legit","is this real","is it worth it","student stories"],
     keys:"review reviews testimonial testimonials legit trust real worth say said experiences",
     a:"<p>This page is full of their words. One of them: \"I experienced both sides of almost every emotion and learned more about who I am and what I want in two months than I had in 21 years.\" (Craig Peterson, Cedar Rapids, Iowa)</p><p>I have taught for more than 25 years, and my work has been in Black Belt magazine and on TV in the US and Holland.</p>",
     l:[["Student stories","#p-tours-page"],["Students on the CMS program","#p-camp-training"]]},

    /* ---- speaking ---- */
    {id:"speaking", pri:1, q:"Can I book Rick to speak?",
     alt:["book rick to speak","book you to speak","hire rick","hire you","hire him","keynote","speak at","speaker for","for our event","for my event","corporate event","still speak","still speaking","does he still speak","does rick still speak","do you still speak","still give talks","still do talks","is he a speaker","motivational speaker","=speaking","=speaker","speaking and press","peak performance","does he travel","will he travel","can he travel","come to our office","come to our company","~international speaking","~speak internationally","~speak overseas","media kit","speaker kit","press kit","one sheet","session for staff","for employees","for our team","for staff","zoom talk","zoom call","virtual talk","virtual keynote","online talk","online keynote","webinar","availability","is he available","is he free in","references","clients","corporate clients","which companies","companies he worked with","spoken at","conferences","tedx","how long is a talk","how long is the keynote","workshop for","what does a workshop include","half day workshop","full day workshop","multi day seminar","tailor the talk","customize the talk","custom talk","motivation talks","seminars for companies"],
     keys:"clients client companies conference conferences references tedx available availability zoom virtual webinar staff employees managers speak speaker speaking keynote talk talks event events conference seminar seminars corporate company university stage hire hp delft",
     a:"<p>Yes: as a keynote speaker, in one to multi-day interactive seminars, and in private group intensive workshops. I have spoken at companies and universities like HP, Dutch Art &amp; Design, Humaniversity, TU Delft and the University of Rotterdam, for Fortune 500 companies, higher education and charities.</p><p>For your event, send it to Rick with the date, the place and the audience.</p>",
     l:[["Speaking and press","#p-speaking"]], send:true},
    {id:"topics", q:"What does Rick speak about?",
     alt:["speaking topics","keynote topics","seminar topics","talk topics","what does he speak about","what does rick speak about","what does he talk about","what does rick talk about","what do you speak about","topics","subjects","blast experience","blast workshop","team building","leadership","goal setting","motivation talk","workshop topics","=workshop","=workshops","signature talk","team bonding","stress management","resilience"],
     keys:"topic topics subject subjects motivation motivational goal goals leadership confidence fears strengths talents balance energy team building workshop workshops content",
     a:"<p>Dynamic principles based on my 5 Level System for Life Balance, with real life experience and stories: Using Strengths, Leading with Talents, Organizing motivation, Taking Action, Balancing Life, Mind, Body and Spirit, Constant Energy, Overcoming limitations, Crushing Fears and Building Confidence.</p><p>The BLAST experience workshop sums up my system of WinJitsu: target your strengths and combine your unique abilities, to BE more so you can DO more.</p>",
     l:[["Speaking and press","#p-speaking"]], send:true},
    {id:"speak-fee", q:"What is Rick's speaking fee?",
     alt:["speaking fee","speaker fee","speaker rates","speaking rates","keynote fee","how much does he charge","how much to book rick","how much for a keynote","how much for rick to speak","fee to speak","cost to book rick","ballpark","fee range","cost of a workshop","workshop cost","corporate workshop cost","travel costs","who pays travel","invoice","price for a group"],
     keys:"workshop invoice deposit travel ballpark range group fee fees rate rates charge cost costs price much speak speaker speaking keynote booking",
     a:"<p>The fee is not on this page. Send it to Rick with the date, the place and the audience, and the reply comes to your inbox.</p>",
     l:[], send:true},
    {id:"private", q:"Does Rick give private lessons?",
     alt:["private lessons","private lesson","private training","one on one training","private classes","group leadership training"],
     keys:"private lesson lessons leadership",
     a:"<p>Private lessons, speaking events and group leadership training are a question for Rick: send it to him with where you are and what you want to learn. To learn at home with my personal feedback, there is the Home Study Program.</p>",
     l:[["The Home Study Program","#p-pocket-dojo"]], send:true},

    /* ---- Martial Arts as Therapy and coaching ---- */
    {id:"therapy", q:"What is martial arts as therapy?",
     alt:["martial arts as therapy","martial arts therapy","martial arts therapist","therapy","ptsd","trauma","post traumatic"],
     keys:"therapy therapist therapeutic trauma traumatic ptsd stress fear fears pain confidence aggression anger anxiety heal healing",
     a:"<p>Martial arts as therapy means using the training to work on what is going on inside you: fear, pain, confidence, aggression. To a group or an individual: training that supports moving on from a traumatic event, more self-confidence, pain and fear management, training that supports people living with post traumatic stress, and redirecting aggression.</p>",
     l:[["Martial Arts as Therapy","#p-therapy"]]},
    {id:"coaching", q:"Do you offer coaching?",
     alt:["do you offer coaching","life coach","life coaching","coach me","help me","one on one","private coaching","mentor me","mentoring","coaching session","executive coaching","business coaching","still do coaching","still coach","still coaching","mindset coaching","ninja mindset"],
     keys:"coach coaching mentor mentoring life personal goals motivation stuck session",
     a:"<p>Yes. I am a Certified Strategic Intervention Coach, and I combine the mind and the martial arts: helping people find their key strengths and put them together. For coaching, send it to Rick with your name and email and what you want to work on.</p>",
     l:[["Martial Arts as Therapy","#p-therapy"]], send:true},
    {id:"happiness", q:"Why train martial arts at all?",
     alt:["why martial arts","why train","why should i train","why train martial arts","benefits of martial arts","is it good for you","happiness","be happy"],
     keys:"why benefit benefits happy happiness good health fitness mind body spirit",
     a:"<p>Research explains that happiness comes when we focus intensely on an activity of our choice that is challenging, with clear objectives and immediate feedback. Martial arts training asks for exactly that: in-the-now focus, a challenge, clear goals and results you see right away. Happiness is never about being lazy.</p>",
     l:[["Martial Arts as Therapy","#p-therapy"]]},

    /* ---- RTMS and the belts ---- */
    {id:"rtms", pri:2, q:"What is Rick Tew's Martial Science?",
     alt:["what is rtms","rtms","rick tews martial science","martial science","what style","which style","what martial art","what do you teach","what does he teach","is it mma","is it muay thai","muay thai","karate","kung fu","bjj","jiu jitsu","modern american ninjitsu","ninja mma","become an instructor","instructor training"],
     keys:"rtms martial science style system art mma ninjitsu modern american movement moves outside outdoors muay thai karate kung bjj jiu instructor",
     a:"<p>A martial science, not a style: Modern American Ninjitsu crossed with MMA, built to teach movement, not moves. Five ranking levels, beginner to instructor. Nine areas in every level: stances, rolls, falls, strikes, kicks, body movement, knowledge, combat and weapons. The mental training is its own system, and we do most of our training outside.</p>",
     l:[["Rick Tew's Martial Science","#p-rtms"]]},
    {id:"belts", q:"What are the belts?",
     alt:["what are the belts","belt colors","belt colours","belt system","how many belts","the five belts","ranks","levels","certificate","do i get a belt"],
     keys:"belt belts rank ranks level levels yellow orange green blue red color colour colors colours grade certificate meditation",
     a:"<p>Five belts: Yellow, Orange, Green, Blue and Red. Nine areas in each: Stance, Roll, Fall, Strike, Kick, Body Movement, Knowledge, Combat and Ninja Tools, with two lessons in every area. 90 lessons in all, at your own pace: every person earns at different speeds.</p>",
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
     alt:["what is winjitsu","pocket dojo","your pocket dojo","mental martial art","mind martial arts","what does win stand for","what does win mean","win stand for","true art of winning","what does winjitsu mean","=winjitsu","=the app"],
     keys:"winjitsu jitsu pocket app mental mind mindset wisdom inspiration spirit",
     a:"<p>Win plus Jitsu: the True Art of Winning. What I learned on the way became a system, and five books. Today it is one app, your pocket dojo for Mind, Body and Spirit: Wisdom for the mind (Mind Martial Arts), Inspiration for the spirit (friends in the dojo, Ask Sensei Tew, Direct Connect and the Ninja Course) and Ninja for the body (the martial arts, Yellow to Red belt).</p>",
     l:[["Go to the WinJitsu app","https://winjitsu.com/",X],["WinJitsu on this page","#p-winjitsu"]]},
    {id:"books", q:"What books did you write?",
     alt:["your books","his books","books","did you write","author","be a black belt in what you do","five books","the mental martial art","ace mak mbs nrg cmt","your book","his book","where to buy the books","buy his books","stand for","what does ace stand for","what does mak stand for","what is ace","what is mak","what is mbs","what is nrg","what is cmt"],
     keys:"bookz wrote write written author read reading ace mak mbs nrg cmt",
     a:"<p>Five books: The Mental Martial Art: Be a Black Belt in What You Do. One book per finger of the hand: ACE (Achieving Combined Excellence), MAK (Motivation, Action, Knowledge), MBS (Mind, Body, and Spirit), NRG (Neuro Reasons for Growth) and CMT (Creative Mental Training). Today they are taught in the WinJitsu app, and as workbooks on Tewtors.</p>",
     l:[["WinJitsu","#p-winjitsu"],["Tewtors workbooks","https://tewtors.com/",X]]},
    {id:"from-home", pri:2, q:"Can I learn from home?",
     alt:["learn from home","train from home","at home","from home","online","online classes","online course","learn online","train online","distance","home study","remote","keep training at home","after i leave","~winjitsu cost","~how much is winjitsu","~how much does winjitsu cost","~winjitsu price","~winjitsu app price","~how much is the winjitsu app","~how much is the app","~app price"],
     keys:"much price cost home online remote distance phone month monthly virtual internet",
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
     alt:["video lessons","lesson videos","are the lessons on video","lessons on video","video in the app"],
     keys:"video videos lesson lessons",
     a:"<p>Not today. Each lesson is the written method, the applications and the steps, with a step-by-step guide; the stances come with footprint diagrams. My own videos are on YouTube.</p>",
     l:[["How a lesson works","#p-pocket-dojo"],["YouTube","https://www.youtube.com/ricktew",X]]},
    {id:"ask-sensei", q:"How do I ask Rick about a technique?",
     alt:["ask sensei tew","ask rick a question","question about a technique","stuck on a technique","direct connect"],
     keys:"ask question technique stuck direct connect answer",
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
     alt:["can my kids use it","can my kids use the app","kids use the app","child use the app","app for kids","age limit for the app","~app ok for kids","~ok for kids"],
     keys:"app age eighteen adult adults",
     a:"<p>Sign-up is for adults, 18 and over. It is built for training with a parent, never for kids alone. For kids in person, there is NinjaGym on Koh Samui.</p>",
     l:[["NinjaGym","#p-ninjagym"]]},
    {id:"tewtors", q:"What is Tewtors?",
     alt:["tewtors","workbooks","worksheets"],
     keys:"tewtors workbook workbooks worksheet worksheets teacher teachers parent parents teen teens grown ups self help",
     a:"<p>My five methods for grown-ups, teens, parents and teachers. The Tewtors app and the workbooks: learn it for yourself, then share it with the kids in your life.</p>",
     l:[["Go to Tewtors","https://tewtors.com/",X]]},

    /* ---- The Ninja Course (never who teaches or how often) ---- */
    {id:"course", pri:3, q:"Can I train with Rick in person?",
     alt:["train in person","train with you","train with rick","the ninja course","ninja course","martial arts vacation","martial arts holiday","learn martial arts in thailand","ninja menu","=do you have classes","book the ninja course","book ninja course","book a spot","reserve a spot","what island","app included","app come free","free with the course","whats the schedule","schedule like","typical day","what time does training start","how many hours a day","rest of the day","~price for 2 weeks","~price for a week","~price for a month"],
     keys:"price prices cost costs much fee island schedule course person train training class classes lesson lessons learn vacation holiday travel travelers small group menu workshop visit thailand samui ninja",
     a:"<p>Yes: the Ninja Course on Koh Samui, for travelers who want to learn real martial arts on vacation, in a small group. Beginners welcome. Pick your tactics on the Ninja Menu, choose how long you stay, and train in a small-group workshop built from everyone's picks. The rest of the day is yours.</p><p>Prices and booking are on the Ninja Course page. Coming to the Ninja Course? The WinJitsu app is included.</p>",
     l:[["Go to the Ninja Course","https://martialartcamp.com/ninja",X]]},
    {id:"course-stay", q:"How long can I stay on the Ninja Course?",
     alt:["how long can i stay","how long is the course","how long is the ninja course","can i come for one day","just one day","one day only","can i stay 3 weeks","can i stay a week","how many days","is accommodation included","where do i sleep","where will i sleep","dorm","is a bed included","ninja course","the ninja course","can i stay for","stay for"],
     keys:"ninja course stay long length day days week weeks month months dorm bed beds accommodation sleep room included",
     a:"<p>Stay a day, a week, a month, or 2 months in the belt program, a dorm bed included if you need one. Pick your tactics on the Ninja Menu and choose how long you stay.</p>",
     l:[["Go to the Ninja Course","https://martialartcamp.com/ninja",X]]},
    {id:"course-beginner", q:"Do I need experience, or to be fit?",
     alt:["beginner friendly","for beginners","is it for beginners","no experience","do i need experience","any experience","need to be fit","do i need to be fit","im unfit","not fit","out of shape","how hard","is it hard","how hard is the training","hardcore","fitness level","never done martial arts","ninja course","the ninja course","not so fit","not fit anymore","can i still train","overweight"],
     keys:"ninja course fat overweight weight beginner beginners experience fit fitness unfit shape hard hardcore difficult tough level never",
     a:"<p>Beginners welcome: martial arts experience is not required. Some want to push their limits, others want self-defense and a healthier routine. You pick your tactics on the Ninja Menu, and the small-group workshop is built from everyone's picks.</p>",
     l:[["Go to the Ninja Course","https://martialartcamp.com/ninja",X]]},
    {id:"course-kids", q:"Can kids do the Ninja Course?",
     alt:["kids on the ninja course","can my kid do the ninja course","can my kids do the ninja course","children on the course","with my kids","family course","is the ninja course for adults","ninja course","the ninja course","difference between ninjagym","ninjagym or the ninja course","ninjagym vs","ninjagym and ninja course","teens do the ninja course","what age for ninja course","age for the ninja course"],
     keys:"age kid kids child children family year old course ninja adults",
     a:"<p>The Ninja Course is for travelers who want to learn real martial arts on vacation. For kids on Koh Samui there is NinjaGym: kids aged 3 to 9 drop in any time it is open, and older and bigger kids are welcome too.</p>",
     l:[["Go to the Ninja Course","https://martialartcamp.com/ninja",X],["NinjaGym","#p-ninjagym"]]},
    {id:"camps", q:"Do you run live-in ninja camps?",
     alt:["ninja camp","ninja camps","live in camp","live-in camp","training camp","cms","college of martial science","yosemite camp"],
     keys:"camp camps live residential cms college yosemite multi first industry",
     a:"<p>I created CMS, the College of Martial Science, near Yosemite National Park: a live-in, multi martial arts ninja training camp. I was the first in the martial arts industry to run live-in Ninja Training Camps. After that dream came true in the States, I set a new goal: a program in Asia, and I picked Thailand. Today that is the Ninja Course on Koh Samui.</p>",
     l:[["Ninja Camps","#p-camps"],["Go to the Ninja Course","https://martialartcamp.com/ninja",X]]},
    {id:"tours", q:"What are BLAST Tours?",
     alt:["blast tours","what is blast","=blast","tours","travel and training","yosemite","joshua tree","grand canyon","adventure tours","next blast tour","next tour","still a tour","tour still running"],
     keys:"california next tour tours travel traveling travelling trip trips yosemite joshua grand canyon blast adventure continents",
     a:"<p>Travel and training: camps and tours on four continents, with Yosemite, Joshua Tree and the Grand Canyon among them. I have brought students from the US to Europe, and from Europe to the US. We call it BLAST: Breathing, Laughing, Adventuring, Stretching and Thinking.</p>",
     l:[["BLAST Tours","#p-tours"]], send:true},

    /* ---- NinjaGym (link the prices, never repeat them; Guides, not coaches) ---- */
    {id:"ninjagym", pri:1, q:"What is NinjaGym?",
     alt:["what is ninjagym","=ninjagym","=kids","playground","parkour","is it a martial arts school","is there a ninjagym","ninjagym website","what is ninja gym"],
     keys:"ninjagym gym kid kids child children toddler teach class classes playground parkour climbing guides",
     a:"<p>I founded NinjaGym on Koh Samui: an indoor ninja playground for kids, with climbing, parkour and ninja games with our Guides. Drop-off sessions, day camps and birthday parties. It runs on an app I built: check-ins, memberships, bookings and the shop.</p>",
     l:[["Go to NinjaGym","https://ninjagym.com/",X],["NinjaGym on this page","#p-ninjagym-page"]]},
    {id:"ng-hours", q:"What are NinjaGym's hours?",
     alt:["opening hours","open hours","what time does it open","what time does ninjagym open","what time do you open","when is it open","when are you open","is it open today","open on sunday","open on weekends","what time does it close","ninjagym hours","gym hours","=hours","open every day","what time do classes start","what time do kids classes start","is it open every day"],
     keys:"hour hours time open opening close closing today sunday weekend weekends ninjagym gym",
     a:"<p>Open every day, 10am to 7pm, weekends too. Book ahead and we can open from 9am and stay open until 9pm.</p>",
     l:[["NinjaGym, hours and questions","#p-ninjagym-page"],["ninjagym.com","https://ninjagym.com/",X]]},
    {id:"ng-where", q:"Where is NinjaGym?",
     alt:["where is ninjagym","where is the gym","where exactly","location of the gym","big c","directions","how do i find it","chaweng","lamai","google maps","maps","google map","ninjagym address"],
     keys:"where address location big directions map ring road starbucks chaweng lamai find ninjagym gym mall",
     a:"<p>On the Ring road (near Starbucks), inside the Big C mall on the ground floor, right next to the entrance.</p>",
     l:[["NinjaGym, hours and questions","#p-ninjagym-page"]]},
    {id:"ng-ages", q:"What ages is NinjaGym for?",
     alt:["what ages","what age","how old does my kid need to be","how old do kids need to be","age range","age limit","toddler","how long is a session","how long is a class","what do kids do","what do they learn","what will my kid learn","how long is a kids class","kids class how long","how old my son"],
     keys:"long age ages old year years toddler session minutes zone zones son daughter kid kids child",
     a:"<p>Kids aged 3 to 9 drop in any time we are open, and a session is 55 minutes. Older and bigger kids are welcome too. Kids are guided through 3 zones (Climbing, Ninja and Martial Arts) and learn by doing to climb, jump, roll, kick, punch, balance, and move like a Ninja.</p>",
     l:[["NinjaGym, hours and questions","#p-ninjagym-page"]]},
    {id:"ng-camps", q:"Does NinjaGym have day camps?",
     alt:["day camp","day camps","summer camp","holiday camp","half day","full day","drop off","drop-off","stay and wait","can parents stay","game and train"],
     keys:"camp camps half full day drop holiday summer game games video wait",
     a:"<p>Yes. The Half Day runs 10am to 2pm and the Full Day is any 6 hours, usually 10am to 4pm, every day, weekends too: training (climbing, parkour and obstacle courses with the Guides) and game time. Both camps are drop-off only: you check your kids in and do not stay. The camps are for kids aged 3 to 9. Today's prices are on the Half Day page.</p>",
     l:[["Half Day details","https://ninjagym.com/",X],["NinjaGym on this page","#p-ninjagym-page"]]},
    {id:"ng-price", q:"How much is NinjaGym?",
     alt:["how much is ninjagym","ninjagym price","ninjagym prices","gym price","price for kids","how much for kids","kids price","first class free","membership price","price for kids class","kids class price"],
     keys:"class kid kids month price prices cost costs fee fees much rate ninjagym gym membership",
     a:"<p>Today's prices, and the answer to almost anything a parent asks, are on ninjagym.com/faq.</p>",
     l:[["ninjagym.com/faq","https://ninjagym.com/faq",X]]},
    {id:"ng-pay", q:"How do I pay at NinjaGym?",
     alt:["promptpay","pay by promptpay","can i pay by promptpay","cash","pay cash","cash ok","credit card","how do i pay","payment","apple pay","google pay","~visa card","~pay by visa","~pay with visa","pay with card"],
     keys:"pay payment promptpay cash card mastercard apple",
     a:"<p>At NinjaGym you pay in the app with PromptPay, Visa or Mastercard, Apple Pay or Google Pay. For the Half Day camp: PromptPay or card in the app, or cash at the gym.</p>",
     l:[["NinjaGym on this page","#p-ninjagym-page"]]},
    {id:"ng-adults", q:"Can adults train at NinjaGym?",
     alt:["can adults","can adults train","adult classes","adults train","can parents train","parents train too","for adults","can i train too","can adult play","~train same time as my kids","~train with my kids","~train at the same time"],
     keys:"adult adults parent parents grown",
     a:"<p>Adult programs are 8am or 8pm, by advance booking only. On vacation and want more? The Ninja Course on Koh Samui is for grown-ups who want to learn real martial arts.</p>",
     l:[["NinjaGym","https://ninjagym.com/",X],["The Ninja Course","https://martialartcamp.com/ninja",X]]},
    {id:"ng-birthday", q:"Can I book a birthday party at NinjaGym?",
     alt:["birthday","birthday party","birthday parties","kids party","group event","school outing","private event"],
     keys:"birthday birthdays party parties group outing school deposit",
     a:"<p>Yes. Parties and group events start at 2pm or later, any day, and run 1 to 4 hours, for up to 20 guests. Book a birthday at ninjagym.com/birthdays or a group event at ninjagym.com/private. Both pages show today's hourly rates and the refundable deposit.</p>",
     l:[["Birthdays","https://ninjagym.com/birthdays",X],["Group events","https://ninjagym.com/private",X]]},
    {id:"ng-signup", q:"How do I sign up for NinjaGym?",
     alt:["sign up for ninjagym","~join ninjagym","ninjagym app","ninjagym membership","check in","walk in","can i just walk in","book or walk in","do i need to book","~book a kids class","~book a class at ninjagym"],
     keys:"sign join membership member pin check walk app ninjagym",
     a:"<p>Sign up in the app before you come, so check-in at the desk is quick. It takes about 2 minutes. One account covers the whole family, and you get your NinjaGym membership and a 4-digit PIN to check in.</p>",
     l:[["Sign up at ninjagym.com/join","https://ninjagym.com/join",X]]},
    {id:"nerdhostel", q:"What is NerdHostel?",
     alt:["nerdhostel","nerd hostel","hostel","place to stay","where to stay","where can i stay","coworking","digital nomad"],
     keys:"hostel nerdhostel nerd koh samui stay staying rooms coworking nomad nomads guild hall gamer gamers",
     a:"<p>A gamer hostel with Guild Hall co-working for digital nomads on Koh Samui, across the street from NinjaGym.</p>",
     l:[["Go to NerdHostel","https://www.nerdhostel.com/",X]]},

    /* ---- The rest of the wheel ---- */
    {id:"ai", q:"Can you build an app or website for my business?",
     alt:["ai ninja","build me an app","build an app","build a website","build my website","make me a website","for my business","done for you ai","automation","booking system","how much for a website","website cost","app cost"],
     keys:"much cost price restaurant shop ai app apps make made website websites software business businesses automate automation agent agents build builds developer tech booking sabaisen evercool samuikids",
     a:"<p>Yes, through AI Ninja: done-for-you AI for small business, managed by a real person. For owners who hate tech or have no time for it: we build it, host it and run the AI behind it. Three of them: SabaiSen, a spa on Koh Samui; EverCool, an air conditioning firm's site and back office; and SamuiKids, the drop-off guide for kid activities on Koh Samui.</p>",
     l:[["Go to AI Ninja","https://tewbedo.com/",X]]},
    {id:"games", q:"What games have you made?",
     alt:["games","your games","video games","board game","dungeon hole","tewgo","astrohold","astro hold","arena rpg","tewbit","ninja ryu","ninja village","ninja ninja defense"],
     keys:"game games gaming play board dungeon hole tewgo astrohold arena rpg tewbit tower defense strategy iphone ryu",
     a:"<p>Games are my hobby, under my TewBit Games brand: Dungeon Hole (1v1 dungeon strategy), TEWGO (a strategy board game for iPhone and iPad), AstroHold (turn-based space strategy in your browser), Arena RPG (the board game I drew on paper as a kid, built for real now), Ninja Ryū (building a legendary ninja clan from a raided village) and Ninja Ninja Defense (a story-driven tower defense game, a private build for now).</p>",
     l:[["See the games","#p-games"]]},

    /* ---- practical ---- */
    {id:"send-what", q:"What happens when I send it to Rick?",
     alt:["what happens after i send","after i send it","what happens when i send","how fast does he reply","how long to reply","how long until he replies","when will he reply","will he reply","does he answer","does he reply","who reads the message","who reads it","who answers"],
     keys:"reply replies answer answers reads happens fast",
     a:"<p>It lands in Rick's mailbox with your question and what this chat showed you. The reply comes to your inbox, in writing, so it is on the record.</p>",
     l:[], send:true},
    {id:"teacher", q:"Who teaches the classes?",
     alt:["who is the teacher","who teaches","who are the teachers","who will teach me","who is teaching","is rick going to be teaching me","is rick there teaching","does rick teach the ninja course himself","who are the instructors","who is the instructor"],
     keys:"teacher teachers instructor instructors",
     a:"<p>Each place has its own page: the Ninja Course for travelers, NinjaGym for kids (with our Guides), and the WinJitsu app at home, where the Home Study Program adds my personal feedback.</p>",
     l:[["The Ninja Course","https://martialartcamp.com/ninja",X],["NinjaGym","#p-ninjagym"],["The Home Study Program","#p-pocket-dojo"]]},
    {id:"book-what", quiet:true, q:"What would you like to book?",
     alt:["=how do i book","=how to book","=book","=booking","=i want to book","=can i book","=book now","=reserve","=make a booking"],
     keys:"",
     a:"<p>Pick the one you mean:</p>",
     l:[["The Ninja Course","https://martialartcamp.com/ninja",X],["NinjaGym","https://ninjagym.com/join",X],["A birthday at NinjaGym","https://ninjagym.com/birthdays",X],["Rick for an event","#contact"]]},
    {id:"price", quiet:true, q:"How much does it cost?",
     alt:["=how much","=price","=prices","=cost","=costs","=pricing","=fees","=rates","=how much is it","=how much does it cost","what are your prices"],
     keys:"price prices pricing cost costs fee fees rate rates baht dollar dollars",
     a:"<p>Each place keeps its own prices on its own page. Learning from home: $22 for one month of the WinJitsu app, or $2,222 once for the Home Study Program with my personal feedback.</p>",
     l:[["Ninja Course","https://martialartcamp.com/ninja",X],["NinjaGym","https://ninjagym.com/faq",X],["WinJitsu","/winjitsu/#from-home"]]},
    {id:"contact", q:"How do I reach Rick?",
     alt:["contact","contact you","contact rick","reach you","reach rick","email you","email rick","phone number","call you","call rick","whatsapp","line id","talk to rick","talk to you","speak to rick","message rick","message him","=email","email address","=email address","send rick a message","send him a message","message to rick","say hello to rick","meet rick","meet him","can i meet","send it to rick","send to rick","contact number"],
     keys:"meet send contact reach email mail phone whatsapp line message",
     a:"<p>Everything goes in writing, so it is on the record. Send it to Rick with your name and email, and the reply comes to your inbox.</p>",
     l:[["The Contact form","#contact"]], send:true},
    {id:"bot", quiet:true, q:"Are you a bot?",
     alt:["are you a bot","are you a robot","is this a bot","is this ai","is this an ai","are you ai","are you an ai","are you real","are you human","are you a person","are you rick","is this rick","am i talking to rick","talk to a human","real person","=who are you","=what are you","is this chatgpt"],
     keys:"bot robot human",
     a:"<p>I am this page's question box, not Rick, and not an AI: I match your words to answers taken from this page. Anything I do not have, send it to Rick, and the reply comes to your inbox.</p>",
     l:[["About Rick Tew","#p-about"]]},
    {id:"hello", quiet:true, q:"Hi",
     alt:["=hi","=hello","=hallo","=hey","=hola","=yo","=sup","=sawasdee","=good morning","=good afternoon","=good evening","=whats up","=whats good","=yo whats good","=hi there","=hello there","=hey there","=help","=help me"],
     keys:"hi hello hallo hey hola sawasdee yo sup",
     a:"<p>Hi! Ask about Rick, the Ninja Course, learning from home, NinjaGym, speaking, coaching, or anything on the wheel.</p>",
     l:[["Read my story","#p-story"]]},
    {id:"thanks", quiet:true, q:"Thanks",
     alt:["=thanks","=thank you","=thanks a lot","=thank you so much","=thx","=ty","=ok","=okay","=ok thanks","=okay thanks","=cool","=great","=nice","=perfect","=awesome","=bye","=goodbye","=got it"],
     keys:"thx ty bye goodbye",
     a:"<p>You're welcome. Anything else, ask here, or send it to Rick.</p>",
     l:[]}
  ];
  var STARTERS=["about","now","from-home","course","ninjagym","speaking"];

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
    function showThai(){
      var b=bubble("n");
      var a=el("div","ask-a"); a.innerHTML="<p>I only read English. Send it to Rick, in Thai or English, and the reply comes to your inbox.</p>"; b.appendChild(a);
      var row=el("div","ask-act"); row.appendChild(sendBtn("Send it to Rick", true)); b.appendChild(row);
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
      else if(r.kind==="thai") b=showThai();
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
