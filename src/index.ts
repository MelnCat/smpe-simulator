import { Markov } from "./structures/markov";
import fs from "fs";
import { Message } from "./modules/typings";
import { createRandomInterval } from "./structures/timing";
import { WebhookClient } from "discord.js";
import { join } from "path";
import _ from "lodash";
const loadMarkov = (url: string) =>
	new Markov(
		(JSON.parse(fs.readFileSync(join(__dirname, url), { encoding: "utf8" })) as Message[])
			.map(x => x.content)
			.filter(Boolean)
	);
const auth: {
	webhook: {
		id: string;
		token: string;
	};
} = JSON.parse(fs.readFileSync(join(__dirname, "../auth.json"), { encoding: "utf8" }));
const zirqn = loadMarkov("../data/zirqn.json");
const bow = loadMarkov("../data/bow.json");
const florida = loadMarkov("../data/florida.json");
const rceckie = loadMarkov("../data/rceckie.json");
const rad = loadMarkov("../data/rad.json");
const zef = loadMarkov("../data/zef.json");
if (process.argv[2] === "zirqn") {
	for (let i = 0; i < 10; i++) console.log(zirqn.generate());
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
}
const webhook = new WebhookClient(auth.webhook.id, auth.webhook.token);
const createAutomate = (markov: Markov, username: string, avatarURL: string, min = 10000, max = 30000) =>
	createRandomInterval(
		async () => {
			const generated = markov.generate();
			await webhook.send(generated.replace(/\@everyone/g, "＠everyone").replace(/\@here/g, "＠here"), {
				username,
				avatarURL,
			});
		},
		min,
		max
	);
createAutomate(
	zirqn,
	"furqn",
	"https://cdn.discordapp.com/avatars/437845189227446273/6905a41c1d827dbd3efc4f3ef997a956.png?size=1024"
);
createAutomate(
	bow,
	"bowknee shape row",
	"https://cdn.discordapp.com/avatars/156922894415429632/2af3bb778e07624c8070b96a2040572d.png?size=1024"
);
createAutomate(
	florida,
	"FloridaCan",
	"https://cdn.discordapp.com/avatars/678405690464665631/2a631f58ac0468d13c11bddc7ce38a18.png?size=1024"
);
createAutomate(
	rad,
	"Radeline",
	"https://cdn.discordapp.com/avatars/630047851011112970/7c001b05762d7d171eff31b113977c02.png?size=1024",
	2000,
	50000
);
createAutomate(
	zef,
	"unexpected william ░",
	"https://cdn.discordapp.com/avatars/413143886702313472/5795319df1a0ff89e1d4d491c9ad2879.webp?size=1024"
);
createAutomate(
	rceckie,
	"RCEckie",
	"https://cdn.discordapp.com/avatars/467383775165284373/e5384d38bcf73206c132155ba824f500.webp?size=1024",
	20000,
	120000
);
