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
			.filter(Boolean),
			"word", 2, false
	);
const auth: {
	webhook: {
		id: string;
		token: string;
	};
} = JSON.parse(fs.readFileSync(join(__dirname, "../auth.json"), { encoding: "utf8" }));
const f: Message[] = JSON.parse(fs.readFileSync(join(__dirname, "../data/zef.json"), { encoding: "utf8" }))
const kk=f.map(x=>new Date(x.timestamp).getHours()).reduce((l,c)=>{l[c]=l[c]?l[c]+1:1;return l}, {} as { [idnex: number]: number })
for (let i = 0;i<24;i++)kk[i]?[]:kk[i]=0

const zirqn = loadMarkov("../data/zirqn.json");
const bow = loadMarkov("../data/bow.json");
const florida = loadMarkov("../data/florida.json");
const rceckie = loadMarkov("../data/rceckie.json");
const rad = loadMarkov("../data/rad.json");
const dae = loadMarkov("../data/dae.json");
const zef = loadMarkov("../data/zef.json");
const axo = loadMarkov("../data/axo.json");
const ten = loadMarkov("../data/ten.json");
const fin = loadMarkov("../data/fin.json");
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
}
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
const createAutomate = (markov: Markov, username: string, avatarURL: string, min = 10000, max = 30000) =>
	createRandomInterval(
		async () => {
			const generated = markov.generate();
			await webhook.send(generated.replace(/\<\@\!?(\d+)\>/g, (x, n: keyof typeof tags) => tags[n] ? `@${tags[n]}` : x).slice(0, 1999), {
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
	"https://cdn.discordapp.com/attachments/735321036471402507/744397698576416848/Untitled1352_20200815202904.png"
	// "https://cdn.discordapp.com/avatars/437845189227446273/6905a41c1d827dbd3efc4f3ef997a956.png?size=1024"
);
createAutomate(
	bow,
	"bowknee shape row",
	"https://cdn.discordapp.com/avatars/156922894415429632/2af3bb778e07624c8070b96a2040572d.png?size=1024"
);
createAutomate(
	florida,
	"FloridaCan",
	"https://cdn.discordapp.com/avatars/678405690464665631/8773de610e82841d3b3304cc86e2e17c.png?size=256"
);
createAutomate(
	rad,
	"Radeline",
	"https://cdn.discordapp.com/avatars/630047851011112970/ea116f67cfc0ac30550f335d8fee8364.png?size=1024",
	2000,
	50000
);
createAutomate(
	dae,
	"Daemon_Ignis",
	"https://cdn.discordapp.com/avatars/321349427476299777/84c7f789be81a1e49bb248d295fd787a.png?size=1024",
	3000,
	60000
);
createAutomate(
	zef,
	"unexpected william ░",
	"https://cdn.discordapp.com/avatars/413143886702313472/5795319df1a0ff89e1d4d491c9ad2879.webp?size=1024"
);
createAutomate(
	fin,
	"Findex_",
	"https://cdn.discordapp.com/avatars/320591753956687882/4538b296d6e14e46543bd0bb94a4f50a.png?size=1024"
);
createAutomate(
	axo,
	"axo",
	"https://cdn.discordapp.com/avatars/624744152550342666/2b6467cabfc270febe07ee084b86011d.png?size=1024",
	20000,
	220000
);

createAutomate(
	ten,
	"Ten",
	"https://cdn.discordapp.com/avatars/410571285148598282/0cd64e91d12e649de7b1f7456af46951.png?size=1024",
	20000,
	220000
);

createAutomate(
	rceckie,
	"RCEckie",
	"https://cdn.discordapp.com/avatars/467383775165284373/e5384d38bcf73206c132155ba824f500.webp?size=1024",
	20000,
	120000
);