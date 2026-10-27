/* The Ninja Menu: the quiz at the top of the HI Ninja page (25 Oct 2026, Rick: "for our
   2 week ... program for hininja lets focus on the quiz funnel and make one at the top
   that will lead them to training: two week intro to martial arts by Rick Tew").

   The visitor picks an area, then the technique, and first builds a Ninja Week: 5 picks
   before any stay or Book shows (Rick, 25 Oct: "I only picked stance and it went here making
   me feel like it was too fast and must book. So let's have them build their Ninja Week
   (minimum 5 choices before this or they will not understand it)"). Up to 5 picks a week. Rick's clicks of 25 Oct: Body Movement as an 8th area; four stays, 2 weeks
   $2,222, 3 weeks $3,222 ("add another week for 1K"; "only" cut on his click after the
   reader round), the full month $3,997 and a
   belt, 2 months, $7,994 (the checkout sells the same four, ?weeks=2|3|4|8); WinJitsu
   coaching included ("as included like before"). Book saves the plan to the mailbox (subject "plan",
   Auto-Submitted, so the Ninja Agent does not answer while they pay) and goes straight
   to the checkout through /hininja/buy/. Rick builds the Sensei Seminar from the plans.

   The techniques and their lines come from Pocket Dojo's lessons (the RTMS book's levels,
   ~/Dev/Winjitsu/content/hsp), cut short. Ninja Tools uses the book's own names (Rick, 25 Oct:
   "tools is sword, nunchaku, stick, knife, tactical, rope, staff, etc"); /hsp/ keeps its own
   rule of no tool names, which is the app's.
   The plan is kept in this browser only (a convenience, so a reload keeps it). */
(function(){
  "use strict";
  var root=document.getElementById("menu");
  if(!root) return;

  /* [name, level, line]; level 0 = no level shown */
  var MENU=[
    {id:"st", name:"Stances", items:[
      ["Horse Stance",1,"Balance from the side. Builds focus, side vision and stamina in the legs."],
      ["Cat Stance",1,"A defensive retreat stance: most of your weight on the back leg, the front leg light and ready."],
      ["Defensive Stance",2,"Move back and adapt away from an attack."],
      ["Power Stance",2,"Maximum stability, with power for strikes drawn from the hips."],
      ["Fighting Stance",3,"The mobile, ready position: one fist guards the face, the other is set to strike."],
      ["Low Defensive Stance",3,"Lower your shape to sink into shadow and out of sight."],
      ["Open / Bow Stance",4,"Sweep the air with sensitivity, the way wind sweeps the earth."],
      ["Blade Stance",4,"Turn your body narrow to cover your vital side."],
      ["Reactive Stance",5,"An instant cover for when there is no time for any other move."],
      ["Combat Stance",5,"A mobile base, ready to strike, defend, move or drop into a roll."]]},
    {id:"ro", name:"Rolls", items:[
      ["Forward Roll",1,"Roll forward to close distance, break a fall or scoop something up."],
      ["Reverse Roll",1,"Roll backward out of a push or a trip and come up ready."],
      ["Side Roll",2,"Roll across the shoulders like a wheel, past or behind cover."],
      ["Diving Roll",2,"Dive over an object and land in a forward roll."],
      ["Dropping Roll",3,"Turn a drop from a height into a roll, so the impact flows away."],
      ["Superman Roll",3,"A diving roll that holds a flying pose through a narrow gap before you tuck."],
      ["Table Roll",4,"Roll over an obstacle and land on the far side, fast. Used in stunt training."],
      ["Rolling with Objects",4,"Carry a tool through the roll as part of your hand."],
      ["Rolling Attack",5,"Use any roll to set up, deliver or escape a move."],
      ["Rolls Form",5,"Every roll strung together until rolling comes naturally."]]},
    {id:"fa", name:"Falls", items:[
      ["Flat Fall Forward",1,"Fall forward without getting hurt, and land ready."],
      ["Flat Fall Back",1,"Fall backward without getting hurt, and turn the landing into a counter."],
      ["Flat Fall Side",2,"Drop sideways and land safely, ready for a side kick."],
      ["Rolling Fall",2,"A forward roll that opens into a side fall: the step before the Air Fall."],
      ["Air Fall",3,"A stunt fall that spreads the impact of height and speed across your side."],
      ["Offensive Falls",3,"A fall used on purpose to set up a move."],
      ["Defensive Falls",4,"Fall out of the line of attack, then get back in position."],
      ["Falling with Objects",4,"Fall safely with a tool in your hand, still free to use it."],
      ["Stunt Falls",5,"Advanced falls for the camera, built on how the fall looks."],
      ["Falls Form",5,"Every fall strung together until falling safely comes naturally."]]},
    {id:"sk", name:"Strikes", items:[
      ["Fist Strikes",1,"Make a safe fist first, then four fist strikes and where each one lands."],
      ["Palm Heel Strike",1,"A safe, powerful open-hand strike. Easy to learn, hard to hurt your own hand."],
      ["Knife Hand Strike",2,"A circular strike with the narrow outside edge of the hand."],
      ["Jab, Cross, Hook & Uppercut",2,"The four core boxing punches, adapted for Rick's system."],
      ["Finger Strikes",3,"Precise strikes to small, soft targets."],
      ["Bent Wrist",3,"A backup strike with the bent top of the wrist, for when the hand is hurt."],
      ["Forearm Strikes",4,"A wide, forceful striking surface: the forearm."],
      ["Elbow",4,"A hard, sharp strike for close range."],
      ["Ridge Hand",5,"A chopping strike with the ridge of the knuckles."],
      ["Knuckle Fist",5,"A deceptive straight and circular strike with folded knuckles."]]},
    {id:"ki", name:"Kicks", items:[
      ["Front Kicks",1,"Three forward kicks, each with its own striking surface and job."],
      ["Low Sweep Kick",1,"A quick, simple kick to low targets, standing or from the ground."],
      ["Back Kicks",2,"A powerful heel kick behind you, also called the Mule Kick."],
      ["Round Kicks",2,"Circular kicks that come around into the target."],
      ["Side Kicks",3,"A straight, precise kick with the edge of the foot and the heel."],
      ["Crescent Kicks",3,"The leg swings in a crescent arc onto the target."],
      ["Knee",4,"A rising close-range strike, and a block."],
      ["Reverse Heel Kick",4,"A spinning kick that drives the heel into the target."],
      ["Dropping Heel Kick",5,"The heel comes down from above onto the target."],
      ["Advanced Kicks",5,"The basic kicks combined and chained past their textbook form."]]},
    {id:"bm", name:"Body Movement", items:[
      ["Duck",1,"Drop under an attack or a moving object, head covered, and spring back."],
      ["Jump",1,"Leave the ground to clear a low attack or get on top of an obstacle."],
      ["Pivot, Shuffle, Shift & Step",2,"Four everyday leg movements that become martial arts footwork."],
      ["Cartwheel",2,"A sideways handspring to escape and evade."],
      ["Kip",3,"The kip-up: spring from lying down to your feet without pushing up with the hands."],
      ["Hand Springs",3,"Use your hands like a springboard to vault, flip and land on your feet."],
      ["Stealthing",4,"The art of invisibility, hidden in plain sight."],
      ["Climbing",4,"One of the most exciting parts of outdoor ninja training."],
      ["Strikes & Kicks Form",5,"A two-person drill that mixes every strike and kick."],
      ["1-40 Form",5,"A fun 40-count freestyle drill that works almost every basic."]]},
    {id:"nt", name:"Ninja Tools", note:"Taught after you sign a waiver.", items:[
      ["Stick / Tonfa",1,"The stick is the foundation of all weapons: the grips, the fourteen angles of attack and the checking hand."],
      ["Knife",1,"Defending against the most common real-world weapon. Mindset and survival come before any disarm."],
      ["Chain / Rope",2,"Flexible weapons worked through the fourteen angles of attack."],
      ["Staff",2,"The Bo staff: a long, two-handed weapon worked through the fourteen angles of attack."],
      ["Sword / Half Staff",3,"The blade in three stages, from a wooden trainer to the real sword."],
      ["Environmental Weapons",3,"Anything around you, used as a weapon or a shield."],
      ["Sai",4,"The traditional Okinawan weapon that traps and breaks an opponent's weapon."],
      ["Nunchaku",4,"Two sticks and a chain that become part of you in fluid motion."],
      ["Blinding Powder",5,"The ninja's metsubishi: fine powder thrown to the eyes to buy time."],
      ["Tactical Training",5,"The red belt's tactical training, set with Rick."]]},
    {id:"sd", name:"Self-defense", items:[
      ["Natural Reactions",1,"Train a move until it happens on its own, without thinking."],
      ["Combat Reality",1,"What actually works, stripped of the showmanship."],
      ["Triangulation",2,"An angled step that takes you out of the way while you counter."],
      ["Inside & Outside Defense",2,"Block and counter from the inside or the outside line."],
      ["Jam, Block & Run",3,"Step in, jam and block, then get away."],
      ["Phases of Combat",3,"Six phases of a hostile situation, before, during and after, so you can escape or defuse it."],
      ["Grappling",4,"Ground skills, knowing the street is not a cage."],
      ["Sparring",4,"Practice your defenses and timing with a partner."],
      ["Magnificent 7's",5,"The seven areas that organize all of self-defense."],
      ["Personal Security Course",5,"Real defense in real places."]]}
  ];

  /* Popular quick picks, one fills a whole week (Rick, 27 Oct 2026: "popular quick picks that easily last a
     week for those that don't want to choose"), his four names as he wrote them; ids q0 to q3, each with an
     icon from the same HSP sheet */
  var QUICK=["Mini-Martial Art System via Stances","PSC Self-Defense Program","Ninja Tools and tactics","Strikes and Kicks form"];

  var PER_WEEK=5, WEEK_MIN=5; /* single picks before the stays and Book show */
  /* weeks: the checkout's key; book: the Book button's words */
  var STAYS=[
    {weeks:2, name:"2 weeks", price:2222, book:"Book my two weeks"},
    {weeks:3, name:"3 weeks", price:3222, book:"Book my 3 weeks"},
    {weeks:4, name:"1 month", price:3997, book:"Book my month"},
    {weeks:8, name:"A belt, 2 months", price:7994, book:"Book my belt"}];
  function stay(){ for(var i=0;i<STAYS.length;i++) if(STAYS[i].weeks===plan.weeks) return STAYS[i]; return STAYS[0]; }
  function money(n){ return "$"+String(n).replace(/\B(?=(\d{3})+(?!\d))/g,","); }
  var KEY="hininja-plan-v1";
  var FN="https://qegfhbseccinnxnzfhxw.supabase.co/functions/v1/ricktew-contact";
  var shown=Date.now();

  var byId={};
  MENU.forEach(function(c){ c.items.forEach(function(it,i){ byId[c.id+i]={cat:c, name:it[0], level:it[1], line:it[2]}; }); });
  QUICK.forEach(function(n,i){ byId["q"+i]={cat:null, quick:true, name:n, level:0, line:""}; });
  function isQuick(id){ return byId[id].quick===true; }

  var plan={picks:[], weeks:2};
  /* the plan as weeks: a quick pick is a week of its own, single picks fill weeks 5 at a time,
     and a week still filling up comes last */
  function weeksOf(){
    var out=[], cur=null;
    plan.picks.forEach(function(id){
      if(isQuick(id)) out.push([id]);
      else { if(!cur||cur.length>=PER_WEEK){ cur=[]; out.push(cur); } cur.push(id); }
    });
    if(cur && cur.length<PER_WEEK){ out.splice(out.indexOf(cur),1); out.push(cur); }
    return out;
  }
  /* room for one more single pick, or (quick) for a whole week */
  function room(quick){
    var w=weeksOf(), last=w[w.length-1];
    if(!quick && last && !isQuick(last[0]) && last.length<PER_WEEK) return true;
    return w.length<plan.weeks;
  }
  try{
    var saved=JSON.parse(localStorage.getItem(KEY)||"null");
    if(saved && [2,3,4,8].indexOf(saved.weeks)>=0) plan.weeks=saved.weeks;
    if(saved && Array.isArray(saved.picks)) saved.picks.forEach(function(id){ if(byId[id] && plan.picks.indexOf(id)<0 && room(isQuick(id))) plan.picks.push(id); });
  }catch(e){}
  function keep(){ try{ localStorage.setItem(KEY,JSON.stringify(plan)); }catch(e){} }

  /* An ad click rides on to the checkout in the same src shape NerdHostel's GNS page
     makes (gns-gads-<campaign>-<g|b|w><click id>), which TEWBEDO counts; and into the
     plan mail as source "gads", as the ask box does. */
  var AD=null, SRC="direct";
  try{
    var q=new URLSearchParams(location.search);
    [["gclid","g"],["gbraid","b"],["wbraid","w"]].some(function(k){
      if(!q.has(k[0])) return false;
      var id=q.get(k[0])||"", cid=q.get("cid")||"";
      AD={campaign:/^[0-9]{1,20}$/.test(cid)?cid:"0", kind:k[0], letter:k[1], click:/^[A-Za-z0-9_-]{1,170}$/.test(id)?id:""};
      return true;
    });
    var s0=(q.get("src")||"").toLowerCase(); if(/^[a-z]{1,20}$/.test(s0)) SRC=s0;
  }catch(e){}
  function checkoutUrl(){
    /* a partner's or a post's ?src= rides on the order too (ricktew-plan-nerdhostel) */
    var src=AD&&AD.click ? "gns-gads-"+AD.campaign+"-"+AD.letter+AD.click : "ricktew-plan"+(SRC!=="direct"?"-"+SRC:"");
    return "/hininja/buy/?sku=HIN-GNS-2W&src="+encodeURIComponent(src)+"&weeks="+plan.weeks;
  }

  function el(tag,cls,text){ var n=document.createElement(tag); if(cls) n.className=cls; if(text!=null) n.textContent=text; return n; }
  function btn(cls,text,fn){ var b=el("button",cls,text); b.type="button"; b.addEventListener("click",fn); return b; }
  function has(id){ return plan.picks.indexOf(id)>=0; }
  function toggle(id){
    var i=plan.picks.indexOf(id);
    if(i>=0) plan.picks.splice(i,1);
    else if(room(isQuick(id))) plan.picks.push(id);
    keep();
  }
  /* a pick in the plan, tapped to take it out; a Ninja Week no longer complete goes back to the menu */
  function chip(id,where,focus){
    var c=btn("chip"+(isQuick(id)?" quick":""),byId[id].name,function(){ toggle(id); if(step==="ready" && !ready()) step="menu"; render(focus); });
    c.setAttribute("aria-label","Remove "+byId[id].name+" from your "+where);
    c.appendChild(el("span","x","×")).setAttribute("aria-hidden","true");
    return c;
  }
  var BELTS=["","Yellow belt","Orange belt","Green belt","Blue belt","Red belt"];
  function levelText(it){ return it.level ? BELTS[it.level] : ""; }

  var step="menu", openCat=null;
  var draft={name:"", email:""}; /* what was typed in the form survives a re-render (a week added on the form step) */
  function go(s,focus){ step=s; render(focus!==false); }

  /* the plan, week by week: picks fill the weeks in order, 5 a week */
  function tray(onBook){
    var t=el("div","tray");
    if(onBook){
      var sl=el("div","stay-line");
      sl.appendChild(el("span","stay-l","Your stay"));
      sl.appendChild(el("b",null,stay().name+", "+money(stay().price)));
      sl.appendChild(btn("mc-back","Change",function(){ go("ready"); }));
      t.appendChild(sl);
    } else {
    var st=el("div","stays"); st.setAttribute("role","group"); st.setAttribute("aria-label","Your stay");
    st.appendChild(el("span","stay-l","Your stay"));
    var used=weeksOf().length;
    STAYS.forEach(function(o){
      var b=btn("stay-o",null,function(){ plan.weeks=o.weeks; keep(); render(false); var f=root.querySelector('.stay-o[aria-pressed="true"]'); if(f) f.focus(); });
      b.setAttribute("aria-pressed",o.weeks===plan.weeks?"true":"false");
      b.disabled=used>o.weeks;
      b.appendChild(el("b",null,o.name)); b.appendChild(el("span",null,money(o.price)));
      st.appendChild(b);
    });
    t.appendChild(st);
    }
    if(plan.weeks===8) t.appendChild(el("p","tray-n","The belt program: yellow belt first. Your picks join the morning seminar too."));
    /* only the weeks that hold picks: an empty Week 2 under "ready" read as unfinished (25 Oct round) */
    var weeks=weeksOf(); if(!weeks.length) weeks=[[]];
    weeks.forEach(function(wk,w){
      var row=el("div","wk");
      row.appendChild(el("span","wk-l","Week "+(w+1)));
      var chips=el("div","wk-c");
      if(wk.length && isQuick(wk[0])) chips.appendChild(chip(wk[0],"plan",true));
      else for(var s=0; s<PER_WEEK; s++){
        if(wk[s]) chips.appendChild(chip(wk[s],"plan",true));
        else { var e=el("span","chip open"); e.setAttribute("aria-hidden","true"); chips.appendChild(e); }
      }
      row.appendChild(chips);
      t.appendChild(row);
    });
    t.appendChild(el("p","tray-n",!plan.picks.length?"No picks needed for the belt. Add some if you like.":room(false)?plan.picks.length+" picked. Add more for your other weeks if you like, up to "+PER_WEEK+" a week.":plan.picks.length+" picked. Your weeks are full."));
    return t;
  }

  /* the first week filling up, before the stays and Book show */
  function weekProgress(){
    var t=el("div","tray");
    var row=el("div","wk");
    row.appendChild(el("span","wk-l","Week 1"));
    var chips=el("div","wk-c");
    for(var s=0; s<WEEK_MIN; s++){
      var id=plan.picks[s];
      if(id) chips.appendChild(chip(id,"Ninja Week",false));
      else { var e=el("span","chip open"); e.setAttribute("aria-hidden","true"); chips.appendChild(e); }
    }
    row.appendChild(chips);
    var left=WEEK_MIN-plan.picks.length;
    var h=el("div","stay-l","Your Ninja Week");
    t.appendChild(h);
    t.appendChild(row);
    if(plan.picks.length) t.appendChild(el("p","tray-n",left+" more to go."));
    return t;
  }
  function ready(){ return plan.picks.length>=WEEK_MIN || plan.picks.some(isQuick); }
  var live=el("p","sr-only"); live.setAttribute("aria-live","polite"); root.parentNode.insertBefore(live,root.nextSibling);
  function say(m){ live.textContent=""; setTimeout(function(){ live.textContent=m; },60); }

  function head(kicker,title){
    var h=el("h2","mc-h",title); h.tabIndex=-1;
    var f=document.createDocumentFragment();
    f.appendChild(el("div","mc-k",kicker)); f.appendChild(h);
    return {frag:f, h:h};
  }

  function render(focus){
    root.textContent="";
    var hd;
    if(step==="menu"){
      hd=head("Personalize your martial arts camp","What do you want to learn?");
      root.appendChild(hd.frag);
      /* two sentences at most in this box (Rick, 27 Oct 2026: "Max of two sentences on the right"); the
         workshop line is the hero's, beside it; "Pick 5 Tactics" and the kicker are his, 27 Oct ("it is not a quiz") */
      root.appendChild(el("p","mc-p","Pick 5 tactics. Then you choose how long you stay."));
      /* no video here: Vid's explainer of how to pick was dropped (Rick's click, 27 Oct 2026, "Drop the video",
         after the menu got its icons and quick picks); its cuts stay on the Extreme Pro */
      var tiles=el("div","tiles");
      MENU.forEach(function(c){
        var picked=plan.picks.filter(function(id){ return byId[id].cat===c; }).length;
        /* an icon from the Home Study Program's yellow belt set (Level_1complete.ai) in place of the
           technique list, so the menu is shorter (Rick, 27 Oct 2026: "Is there a way to shorten the height of
           the ninja menu? Maybe don't list stances but show an image icon instead. We actually made a bunch
           for HSP a long time ago") */
        var b=btn("tile",null,function(){ openCat=c; go("pick"); });
        var im=el("img"); im.src="/hininja/img/menu/"+c.id+".webp"; im.alt=""; im.width=52; im.height=52;
        b.appendChild(im);
        b.appendChild(el("b",null,c.name));
        if(picked){ b.appendChild(el("span","tile-n",String(picked))).setAttribute("aria-hidden","true"); b.setAttribute("aria-label",c.name+", "+picked+" picked"); }
        tiles.appendChild(b);
      });
      root.appendChild(tiles);
      var ql=el("div","qp-l","Popular quick picks · a full week each"); ql.id="qpL";
      root.appendChild(ql);
      var qs=el("div","qps"); qs.setAttribute("role","group"); qs.setAttribute("aria-labelledby","qpL");
      QUICK.forEach(function(n,i){
        var id="q"+i, on=has(id);
        var b=btn("qp",null,function(){
          var wasReady=ready(); toggle(id);
          if(!on && !wasReady && ready()){ go("ready"); return; }
          render(false);
          var again=root.querySelectorAll(".qp")[i]; if(again) again.focus();
          say((on?"Removed ":"Added ")+n+".");
        });
        b.setAttribute("aria-pressed",on?"true":"false");
        if(!on && !room(true)) b.disabled=true;
        var im=el("img"); im.src="/hininja/img/menu/"+id+".webp"; im.alt=""; im.width=34; im.height=34;
        b.appendChild(im); b.appendChild(el("span",null,n));
        qs.appendChild(b);
      });
      root.appendChild(qs);
      if(!ready()) root.appendChild(weekProgress());
      else {
        root.appendChild(tray());
        root.appendChild(btn("btn btn-red mc-go",stay().book,function(){ go("book"); }));
      }
    }
    else if(step==="pick"){
      var c=openCat;
      root.appendChild(btn("mc-back","Back to the menu",function(){ go("menu"); }));
      hd=head("The Ninja Menu","Which "+(c.id==="nt"?"tool":c.id==="sd"?"one":c.id==="bm"?"move":c.name.toLowerCase().replace(/s$/,""))+"?");
      root.appendChild(hd.frag);
      if(c.note) root.appendChild(el("p","mc-p",c.note));
      root.appendChild(el("p","mc-any","Any level can pick any technique: every drill has an easier version."));
      var full=!room(false);
      var ul=el("ul","picks");
      c.items.forEach(function(it,i){
        var id=c.id+i, on=has(id);
        var li=el("li");
        var b=btn("pick",null,function(){
          var was=has(id), wasReady=ready(); toggle(id);
          if(!was && !wasReady && ready()){ go("ready"); return; }
          render(false);
          var again=root.querySelectorAll(".pick")[i]; if(again) again.focus();
          if(!was) say("Added "+it[0]+". "+(ready()?"":(WEEK_MIN-plan.picks.length)+" more to go."));
          else say("Removed "+it[0]+".");
        });
        b.setAttribute("aria-pressed",on?"true":"false");
        if(full && !on) b.disabled=true;
        var top=el("span","pick-t");
        top.appendChild(el("b",null,it[0]));
        top.appendChild(el("span","pick-l"+(on||!it[1]?"":" lv"+it[1]),on?"Added":levelText(byId[id])));
        b.appendChild(top);
        b.appendChild(el("span","pick-d",it[2]));
        li.appendChild(b); ul.appendChild(li);
      });
      root.appendChild(ul);
      if(full) root.appendChild(el("p","mc-p",plan.weeks<8?"Your weeks are full. Pick a longer stay in your plan, or tap a pick to swap it out.":"Your weeks are full. Tap a pick in your plan to swap it out."));
      var bar=el("div","mc-bar");
      bar.appendChild(el("span",null,ready()?"Your Ninja Week is ready":plan.picks.length+" of "+WEEK_MIN+" picked"));
      bar.appendChild(ready()?btn("btn btn-red","See my week",function(){ go("ready"); }):btn("btn btn-quiet","Other areas",function(){ go("menu"); }));
      root.appendChild(bar);
      if(!ready()){
        root.appendChild(weekProgress());
      } else {
        root.appendChild(tray());
        root.appendChild(btn("btn btn-red mc-go",stay().book,function(){ go("book"); }));
      }
    }
    else if(step==="ready"){
      hd=head("Your Ninja Week","Your Ninja Week is ready");
      root.appendChild(hd.frag);
      var get=el("ul","mc-get");
      /* short ticks, not sentences (Rick's pick "Short ticks", 27 Oct 2026); the times, who teaches
         and the dates are on the page below, in When and How */
      ["A private group workshop, built from everyone's picks",
       "An optional evening review class",
       "WinJitsu coaching",
       "A dorm bed if you need one",
       "Free pick-up from Samui Airport"].forEach(function(t){ get.appendChild(el("li",null,t)); });
      root.appendChild(get);
      root.appendChild(el("p","mc-p","Now pick how long you stay."));
      root.appendChild(tray());
      var row=el("div","mc-stack");
      row.appendChild(btn("btn btn-red",stay().book,function(){ go("book"); }));
      if(room(false)) row.appendChild(btn("btn btn-quiet","Add more picks",function(){ go("menu"); }));
      root.appendChild(row);
    }
    else if(step==="book"){
      root.appendChild(btn("mc-back","Back to the menu",function(){ go("menu"); }));
      hd=head("Your plan","Save your plan and book");
      root.appendChild(hd.frag);
      root.appendChild(tray(true));
      if(plan.weeks<4){
        var up=el("div","upsell");
        up.appendChild(el("p",null,plan.weeks===2?"Stay longer? Add a week for $1,000, or make it the full month for $3,997.":"Make it the full month for $3,997?"));
        if(plan.weeks===2) up.appendChild(btn("btn btn-quiet","3 weeks in all, $3,222",function(){ plan.weeks=3; keep(); render(false); }));
        up.appendChild(btn("btn btn-quiet","The full month, $3,997",function(){ plan.weeks=4; keep(); render(false); }));
        root.appendChild(up);
      }
      root.appendChild(bookForm());
    }
    /* a step can be much shorter than the last (a long list, then the form): bring the
       card's top back into view, then put focus on the step's heading */
    if(focus && hd){
      if(root.getBoundingClientRect().top<0) root.scrollIntoView({block:"start"});
      hd.h.focus({preventScroll:true});
    }
  }

  function planText(){
    var lines=["My plan, from the Ninja Menu on the HI Ninja page.","","Stay: "+stay().name+", "+money(stay().price)+(plan.weeks===8?" (the belt program, yellow belt first)":""),""];
    if(!plan.picks.length) lines.push("No picks yet.");
    weeksOf().forEach(function(wk,w){
      lines.push("Week "+(w+1)+": "+(isQuick(wk[0])?"Quick pick: "+byId[wk[0]].name:wk.map(function(id){ return byId[id].name+" ("+byId[id].cat.name+")"; }).join(", ")));
    });
    return lines.join("\n");
  }

  function bookForm(){
    var f=el("form","mc-form"); f.noValidate=true;
    var r2=el("div","row2");
    function fld(id,label,type,ac,max){
      var d=el("div","fld"); var l=el("label",null,label); l.htmlFor=id;
      var i=el("input"); i.id=id; i.type=type; i.autocomplete=ac; i.maxLength=max; i.required=true;
      d.appendChild(l); d.appendChild(i); return {d:d,i:i};
    }
    var nm=fld("planName","Your name","text","name",100), em=fld("planEmail","Your email","email","email",200);
    nm.i.value=draft.name; em.i.value=draft.email;
    nm.i.addEventListener("input",function(){ draft.name=nm.i.value; });
    em.i.addEventListener("input",function(){ draft.email=em.i.value; });
    r2.appendChild(nm.d); r2.appendChild(em.d); f.appendChild(r2);
    var send=el("button","btn btn-red","Save my plan and book, "+money(stay().price)); send.type="submit";
    f.appendChild(send);
    var err=el("p","err"); err.setAttribute("role","alert"); f.appendChild(err);
    f.appendChild(el("p","mc-small","Training and WinJitsu coaching; a dorm bed if you need one. Your plan goes to Rick, then the secure checkout, where you add your arrival date. All sales are final; your dates can move, within a year of buying."));
    var askA=el("a","mc-ask","Questions first? Ask Rick, with your picks"); askA.href="#ask";
    askA.addEventListener("click",function(){
      var m=document.getElementById("askMsg");
      if(m && !m.value.trim()) m.value="My picks so far: "+plan.picks.map(function(id){ return byId[id].name; }).join(", ")+"\n\n";
    });
    f.appendChild(askA);
    f.addEventListener("submit",function(e){
      e.preventDefault(); err.textContent=""; err.classList.remove("on");
      var name=nm.i.value.trim(), email=em.i.value.trim();
      function fail(m){ err.textContent=m; err.classList.add("on"); }
      if(!name||!email){ fail("Your name and an email for Rick to send your plan to."); return; }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){ fail("That email address does not look right."); return; }
      if(!ready() && plan.weeks!==8){ fail("Build your Ninja Week first: 5 picks from the menu."); return; }
      var trap=document.getElementById("askWebsite");
      var data={name:name, email:email, subject:"plan", message:planText(), website:trap?trap.value:"",
        elapsedMs:Date.now()-shown, source:AD?"gads":SRC};
      if(AD){ data.adCampaign=AD.campaign; if(AD.click) data.adClick=AD.kind+":"+AD.click; }
      send.disabled=true; send.textContent="Saving your plan...";
      /* the sale never waits on the mail: on an answer, an error or 6 seconds, on to the checkout */
      var left=false;
      function on(){ if(left) return; left=true; send.textContent="Taking you to the checkout..."; location.assign(checkoutUrl()); }
      setTimeout(on,6000);
      fetch(FN,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}).then(on,on);
    });
    return f;
  }

  [].forEach.call(document.querySelectorAll("a[data-stay]"),function(a){
    a.addEventListener("click",function(){
      var w=Number(a.getAttribute("data-stay"));
      if([2,3,4,8].indexOf(w)<0) return;
      plan.weeks=w; keep(); step="book"; render(false);
      setTimeout(function(){ var h=root.querySelector(".mc-h"); if(h) h.focus({preventScroll:true}); },400);
    });
  });
  render(false);
})();
