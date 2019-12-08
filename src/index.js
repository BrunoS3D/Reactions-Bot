const { Client } = require("discord.js");
const { DEFAULT_SERVER, DEFAULT_CHANNEL, DISCORD_TOKEN } = require("./config.json");

const client = new Client();

// start
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	setChannelByID(current_channel);
});

// on message
client.on('message', async (message) => {
	if (!DEFAULT_SERVER || DEFAULT_SERVER === message.guild.id) {
		if (!DEFAULT_CHANNEL || DEFAULT_CHANNEL === message.channel.id) {
			if (message.content.toLocaleLowerCase().includes("(react)")) {
				await message.react("❤");
				await message.react("👍");
				await message.react("👎");
				await message.react("😂");
				await message.react("😮");
				await message.react("😡");
			}
		}
	}
});

client.login(DISCORD_TOKEN);