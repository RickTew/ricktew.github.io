/* The Ninja Menu: the quiz at the top of the HI Ninja page (25 Oct 2026, Rick: "for our
   2 week ... program for hininja lets focus on the quiz funnel and make one at the top
   that will lead them to training: two week intro to martial arts by Rick Tew").

   The visitor picks an area, then the technique, up to 5 a week (10 for the two weeks);
   every pick shows the Book button. Book saves the plan to the mailbox (subject "plan",
   Auto-Submitted, so the Ninja Agent does not answer while they pay) and goes straight
   to the checkout through /hininja/buy/. Rick builds the Sensei Seminar from the plans.

   The techniques and their lines come from Pocket Dojo's lessons (the RTMS book's levels,
   ~/Dev/Winjitsu/content/hsp), cut short. Ninja Tools shows four kinds of tool, never a
   lesson title: weapon words stay off public pages (the same rule as /hsp/).
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
      ["Jab, Cross, Hook & Uppercut",2,"The four core boxing punches, adapted for RTMS."],
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
    {id:"nt", name:"Ninja Tools", note:"Taught after you sign a waiver.", items:[
      ["Short tools",0,"One-hand tools: grips, angles and footwork."],
      ["Long tools",0,"Two-hand long tools: reach, balance and flow."],
      ["Flexible tools",0,"Rope and other flexible tools, in fluid motion."],
      ["Everyday objects",0,"What is around you, used to protect yourself."]]},
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

  var PER_WEEK=5, WEEKS=2, MAX=PER_WEEK*WEEKS;
  var KEY="hininja-plan-v1";
  var FN="https://qegfhbseccinnxnzfhxw.supabase.co/functions/v1/ricktew-contact";
  var shown=Date.now();

  var byId={};
  MENU.forEach(function(c){ c.items.forEach(function(it,i){ byId[c.id+i]={cat:c, name:it[0], level:it[1], line:it[2]}; }); });

  var plan={picks:[], wj:false};
  try{
    var saved=JSON.parse(localStorage.getItem(KEY)||"null");
    if(saved && Array.isArray(saved.picks)) plan.picks=saved.picks.filter(function(id){ return byId[id]; }).slice(0,MAX);
    if(saved && saved.wj===true) plan.wj=true;
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
    var src=AD&&AD.click ? "gns-gads-"+AD.campaign+"-"+AD.letter+AD.click : "ricktew-plan";
    return "/hininja/buy/?sku=HIN-GNS-2W&src="+encodeURIComponent(src);
  }

  function el(tag,cls,text){ var n=document.createElement(tag); if(cls) n.className=cls; if(text!=null) n.textContent=text; return n; }
  function btn(cls,text,fn){ var b=el("button",cls,text); b.type="button"; b.addEventListener("click",fn); return b; }
  function has(id){ return plan.picks.indexOf(id)>=0; }
  function toggle(id){
    var i=plan.picks.indexOf(id);
    if(i>=0) plan.picks.splice(i,1);
    else if(plan.picks.length<MAX) plan.picks.push(id);
    keep();
  }
  function levelText(it){ return it.level ? "Level "+it.level : ""; }

  var step="menu", openCat=null, lastAdded=null;
  function go(s,focus){ step=s; render(focus!==false); }

  /* the plan, week by week: picks fill the weeks in order, 5 a week */
  function tray(){
    var t=el("div","tray");
    for(var w=0; w<WEEKS; w++){
      var row=el("div","wk");
      row.appendChild(el("span","wk-l","Week "+(w+1)));
      var chips=el("div","wk-c");
      for(var s=0; s<PER_WEEK; s++){
        var id=plan.picks[w*PER_WEEK+s];
        if(id){
          (function(id){
            var c=btn("chip",byId[id].name,function(){ toggle(id); render(true); });
            c.setAttribute("aria-label","Remove "+byId[id].name+" from your plan");
            c.appendChild(el("span","x","×")).setAttribute("aria-hidden","true");
            chips.appendChild(c);
          })(id);
        } else {
          var e=el("span","chip open"); e.setAttribute("aria-hidden","true"); chips.appendChild(e);
        }
      }
      row.appendChild(chips);
      t.appendChild(row);
    }
    var n=plan.picks.length;
    t.appendChild(el("p","tray-n",n+" of "+MAX+" picked. Up to "+PER_WEEK+" a week."));
    return t;
  }

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
      hd=head("The Ninja Menu","What do you want to learn?");
      root.appendChild(hd.frag);
      root.appendChild(el("p","mc-p","Pick an area, then the technique. Rick builds your two weeks around it."));
      var tiles=el("div","tiles");
      MENU.forEach(function(c){
        var picked=plan.picks.filter(function(id){ return byId[id].cat===c; }).length;
        var b=btn("tile",null,function(){ openCat=c; go("pick"); });
        b.appendChild(el("b",null,c.name));
        b.appendChild(el("small",null,c.id==="nt" ? "After a waiver" : c.items.slice(0,2).map(function(it){ return it[0]; }).join(", ")+" ..."));
        if(picked) b.appendChild(el("span","tile-n",picked+" picked"));
        tiles.appendChild(b);
      });
      root.appendChild(tiles);
      if(plan.picks.length){
        root.appendChild(tray());
        root.appendChild(btn("btn btn-red mc-go","Book my two weeks",function(){ go("book"); }));
      }
    }
    else if(step==="pick"){
      var c=openCat;
      root.appendChild(btn("mc-back","Back to the menu",function(){ go("menu"); }));
      hd=head("The Ninja Menu","Which "+(c.id==="nt"?"tool":c.id==="sd"?"one":c.name.toLowerCase().replace(/s$/,""))+"?");
      root.appendChild(hd.frag);
      if(c.note) root.appendChild(el("p","mc-p",c.note));
      var full=plan.picks.length>=MAX;
      var ul=el("ul","picks");
      c.items.forEach(function(it,i){
        var id=c.id+i, on=has(id);
        var li=el("li");
        var b=btn("pick",null,function(){
          var was=has(id); toggle(id);
          if(!was){ lastAdded=id; go("added"); } else render(false);
        });
        b.setAttribute("aria-pressed",on?"true":"false");
        if(full && !on) b.disabled=true;
        var top=el("span","pick-t");
        top.appendChild(el("b",null,it[0]));
        top.appendChild(el("span","pick-l",on?"Added":levelText(byId[id])));
        b.appendChild(top);
        b.appendChild(el("span","pick-d",it[2]));
        li.appendChild(b); ul.appendChild(li);
      });
      root.appendChild(ul);
      if(full) root.appendChild(el("p","mc-p","Your two weeks are full. Tap a pick in your plan to swap it out."));
      if(plan.picks.length){
        root.appendChild(tray());
        root.appendChild(btn("btn btn-red mc-go","Book my two weeks",function(){ go("book"); }));
      }
    }
    else if(step==="added"){
      hd=head("Your two weeks",has(lastAdded)?"Added: "+byId[lastAdded].name:"Your plan so far");
      root.appendChild(hd.frag);
      root.appendChild(tray());
      root.appendChild(el("p","mc-p","Every morning is a Sensei Seminar of up to two hours: Rick combines the group's picks, so you also learn what the others chose. The review class is where you practice it."));
      var row=el("div","mc-row");
      row.appendChild(btn("btn btn-red","Book my two weeks",function(){ go("book"); }));
      row.appendChild(btn("btn btn-quiet",plan.picks.length<MAX?"Pick another":"Swap a pick",function(){ go("menu"); }));
      root.appendChild(row);
    }
    else if(step==="book"){
      root.appendChild(btn("mc-back","Back to the menu",function(){ go("menu"); }));
      hd=head("Your two weeks","Save your plan and book");
      root.appendChild(hd.frag);
      root.appendChild(tray());
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
    var lines=["My two weeks, from the Ninja Menu on the HI Ninja page.",""];
    for(var w=0; w<WEEKS; w++){
      var wk=plan.picks.slice(w*PER_WEEK,(w+1)*PER_WEEK);
      if(wk.length) lines.push("Week "+(w+1)+": "+wk.map(function(id){ return byId[id].name+" ("+byId[id].cat.name+")"; }).join(", "));
    }
    lines.push("");
    lines.push("WinJitsu coaching add-on: "+(plan.wj?"yes, interested":"not ticked"));
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
    r2.appendChild(nm.d); r2.appendChild(em.d); f.appendChild(r2);
    var wl=el("label","wj"); var wc=el("input"); wc.type="checkbox"; wc.checked=plan.wj;
    wc.addEventListener("change",function(){ plan.wj=wc.checked; keep(); });
    wl.appendChild(wc); wl.appendChild(el("span",null,"Add WinJitsu coaching too: Rick's mental martial art, outside class. An add-on, priced on its own."));
    f.appendChild(wl);
    var send=el("button","btn btn-red","Save my plan and book, $2,222"); send.type="submit";
    f.appendChild(send);
    var err=el("p","err"); err.setAttribute("role","alert"); f.appendChild(err);
    f.appendChild(el("p","mc-small","Your plan goes to Rick, then the secure checkout for 2 weeks. At checkout you add your arrival date. All sales are final; your dates can move to another two weeks, within a year of buying."));
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
      if(!plan.picks.length){ fail("Pick at least one thing to learn first."); return; }
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

  render(false);
})();
