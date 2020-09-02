import { Markov } from "./structures/markov";
import fs from "fs";
import { Message } from "./modules/typings";
import { createRandomInterval } from "./structures/timing";
import { WebhookClient } from "discord.js";
import { join } from "path";
import _ from "lodash";
import { list } from "./list";
const auth: {
	webhook: {
		id: string;
		token: string;
	};
} = JSON.parse(fs.readFileSync(join(__dirname, "../auth.json"), { encoding: "utf8" })); /*
if (process.argv[2] === "zirqn") {
	for (let i = 0; i < 10; i++) console.log(zirqn.generate());
	process.exit(0);
} else if (process.argv[2] === "sel") {
	for (let i = 0; i < 10; i++) console.log(loadMarkov(`../data/${process.argv[3]}.json`).generate());
	process.exit(0);
} else if (process.argv[2] === "t") {
	const data = (JSON.parse(
		fs.readFileSync(join(__dirname, "../data/zirqn.json"), { encoding: "utf8" })
	) as Message[]).map(x => ({ bot: false, content: x.content.toLowerCase() }));
	const results: { bot: boolean; content: string }[] = _.sampleSize(
		data.filter(x => x.content.length > 15),
		5
	);
	while (true) {
		const found = zirqn.generate();
		if (found.length > 15 && !data.some(x => x.content === found)) results.push({ bot: true, content: found });
		if (results.length >= 10) break;
	}
	const shuffled = _.shuffle(results)
	for (const item of shuffled) console.log(`[${item.bot ? "BOT" : "REAL"}] ${item.content}`);
	console.log("====")
	for (const item of shuffled) console.log(`${item.content}\n-----`);
	process.exit(0);
}*/
const tags = {
	"624744152550342666": "axo#4475",
	"156922894415429632": "bowknee shape row#0389",
	"678405690464665631": "FloridaCan#9013",
	"437845189227446273": "furqn#0001",
	"630047851011112970": "Radeline#3362",
	"467383775165284373": "RCEckie#9304",
	"410571285148598282": "Ten#8881",
	"413143886702313472": "unexpected william ░#8124",
	"320591753956687882": "Findex_#5603"
}
const webhook = new WebhookClient(auth.webhook.id, auth.webhook.token, { disableMentions: "all" });
const createAutomate = (filename: string, username: string, avatarURL: string, min = 10000, max = 30000) =>
	{
		const arr = (JSON.parse(fs.readFileSync(join(__dirname, `../data/${filename}.json`), { encoding: "utf8" })) as Message[]);
		const atts = arr.map(x => x.attachments) as string[][];
		const markov = new Markov(
			arr.map(x => x.content)
				.filter(Boolean),
				"word", 2, false
		);
		createRandomInterval(
		async () => {
			const file = atts[Math.floor(Math.random() * atts.length)];
			const fli = file[Math.floor(Math.random() * file.length)];
			if (fli) console.log(fli
				)
			const generated = markov.generate();
			await webhook.send(generated.replace(/\<\@\!?(\d+)\>/g, (x, n: keyof typeof tags) => tags[n] ? `@${tags[n]}` : x).slice(0, 1999), {
				username,
				avatarURL,
				...(fli ? { files: [fli] } : {})
			});
		},
		min,
		max
	);}
for (const it of list) createAutomate(it.name, it.username ?? it.name, it.pfp, it.range && it.range[0], it.range && it.range[1]);