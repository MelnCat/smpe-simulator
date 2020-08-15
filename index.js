const fs = require("fs");
const loaded = JSON.parse(fs.readFileSync("./data/zirqn.json"));
const Markov = require("./markov.js")
const markov = new Markov(loaded.map(x => x.content).filter(Boolean));
for (let i = 0; i < 10; i++) console.log(markov.generate());