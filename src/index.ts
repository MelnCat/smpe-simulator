import { Markov } from "./structures/markov";
import fs from "fs";
import { Message } from "./modules/typings";
import { createRandomInterval } from "./structures/timing";
import { WebhookClient } from "discord.js";
import { join } from "path";
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
const webhook = new WebhookClient(auth.webhook.id, auth.webhook.token);
const createAutomate = (markov: Markov, username: string, avatarURL: string, min = 10000, max = 30000) => createRandomInterval(
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
createAutomate(zirqn, "furqn", "https://cdn.discordapp.com/avatars/437845189227446273/6905a41c1d827dbd3efc4f3ef997a956.png?size=1024");
createAutomate(bow, "bowknee shape row", "https://cdn.discordapp.com/avatars/156922894415429632/2af3bb778e07624c8070b96a2040572d.png?size=1024");
createAutomate(florida, "FloridaCan", "https://cdn.discordapp.com/avatars/678405690464665631/2a631f58ac0468d13c11bddc7ce38a18.png?size=1024");
createAutomate(rceckie, "RCEckie", "https://cdn.discordapp.com/avatars/467383775165284373/e5384d38bcf73206c132155ba824f500.webp?size=1024", 30000, 120000);

