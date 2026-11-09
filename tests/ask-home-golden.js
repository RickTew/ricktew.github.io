/* The home page chat's golden set (js/ask-home.js). Each question must land on the entry named, or on "miss".
   Run: node tests/ask-home-golden.js */
const ask = require("../js/ask-home.js");
const G = {
  about: ["who is rick tew?", "who are you", "tell me about yourself", "what does rick do"],
  roots: ["where are you from?", "where did you grow up"],
  started: ["how did you get into martial arts?", "why the ninja?"],
  "black-belt": ["are you a black belt?", "what rank are you"],
  teaching: ["when did you start teaching?", "how long have you been teaching martial arts", "did you go to stunt school"],
  holland: ["did rick teach in holland?", "have you lived in the netherlands", "what was the dutch film"],
  "where-now": ["where are you based?", "where do you live now", "do you live in thailand"],
  certified: ["are you certified?", "do you have any certification", "tony robbins"],
  press: ["have you been on tv?", "were you in black belt magazine"],
  speaking: ["can I book rick to speak at our conference?", "do you do keynotes", "hire rick for a corporate event"],
  therapy: ["what is martial arts as therapy?", "can martial arts help with ptsd", "help with fear and anxiety"],
  coaching: ["do you offer life coaching?", "can you coach me"],
  happiness: ["why should i train martial arts", "what are the benefits of martial arts"],
  rtms: ["what is rtms?", "what style do you teach", "is it mma"],
  belts: ["what are the belt colors?", "how many belts are there"],
  weapons: ["do you teach weapons?", "can i learn nunchaku", "what are ninja tools"],
  "self-defense": ["will i learn self defense?", "is it good for self defence"],
  winjitsu: ["what is winjitsu?", "what is the pocket dojo"],
  books: ["what books did you write?", "are you an author"],
  "from-home": ["can i learn from home?", "do you have online classes", "can i train online"],
  hsp: ["what is the home study program?", "do i get personal feedback"],
  free: ["is anything free?", "can i try it first"],
  video: ["are the lessons on video?"],
  "ask-sensei": ["how do i ask rick about a technique?", "what is direct connect"],
  renew: ["does the month renew?", "is it a subscription"],
  refund: ["can i get a refund?", "i was charged twice"],
  "kids-app": ["can my kids use the app?"],
  tewtors: ["what is tewtors?", "do you have workbooks for teachers"],
  course: ["can i train with rick in person?", "do you have classes in thailand", "tell me about the ninja course", "i want a martial arts vacation"],
  camps: ["do you run live in ninja camps?", "what is cms"],
  tours: ["what are blast tours?", "do you do trips to yosemite"],
  ninjagym: ["what is ninjagym?", "do you have classes for kids", "can i book a birthday party", "hi, do you teach kids?"],
  nerdhostel: ["is there a hostel?", "where can i stay on koh samui"],
  ai: ["can you build an app for my business?", "can you make me a website", "what is ai ninja"],
  games: ["what games have you made?", "what is dungeon hole"],
  price: ["how much does it cost?", "what are your prices"],
  contact: ["how do i contact rick?", "what is your email", "can i call you"],
  hello: ["hi", "hello there", "good morning"],
  miss: ["what is the capital of france", "tell me a joke", "how old are you"]
};
let bad = 0, n = 0;
for (const [want, qs] of Object.entries(G)) for (const q of qs) {
  n++;
  const r = ask.answer(q);
  const got = r.kind === "answer" ? r.entry.id : r.kind === "choose" ? "choose:" + r.entries.map(e => e.id).join("/") : r.kind;
  if (got !== want) { bad++; console.log("FAIL", JSON.stringify(q), "want", want, "got", got, r.kind === "miss" ? "near " + r.near.map(e => e.id).join(",") : ""); }
}
console.log(`${n - bad} of ${n} pass`);
process.exit(bad ? 1 : 0);
