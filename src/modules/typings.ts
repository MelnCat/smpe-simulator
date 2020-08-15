export declare interface Message {
	id: string;
	type: number;
	content: string;
	channel_id: string;
	author: {
		id: string;
		username: string;
		avatar: string;
		discriminator: string;
		public_flags: number;
	};
	attachments: unknown[];
	embeds: unknown[];
	mentions: unknown[];
	mention_roles: unknown[];
	pinned: boolean;
	mention_everyone: boolean;
	tts: boolean;
	timestamp: string;
	edited_timestamp: string | null;
	flags: number;
	hit: number;
}
