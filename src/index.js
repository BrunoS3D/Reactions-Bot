const { Client } = require("discord.js");
const { DEFAULT_SERVER, DEFAULT_CHANNEL, DISCORD_TOKEN } = require("./config.json");

const client = new Client();

// variables
let ready = false;
let current_channel = DEFAULT_CHANNEL;

// start
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	setChannelByID(current_channel);
});

// on message
client.on('message', async (message) => {
	if (message.content.toLocaleLowerCase().includes("(react)")) {
		await message.react("❤");
		await message.react("👍");
		await message.react("👎");
		await message.react("😂");
		await message.react("😮");
		await message.react("😡");
	}
});

function setChannelByName(name) {
	const channel = getChannelByName(name);
	if (channel) {
		current_channel = channel;
	}
	console.log("Now you are on:", `#${channel.name}`, channel.id);
}

function setChannelByID(id) {
	const channel = getChannelByID(id);
	if (channel) {
		current_channel = channel;
	}
	console.log("Now you are on:", `#${channel.name}`, channel.id);
}

async function say(message) {
	if (!ready) return;
	return await current_channel.send(message);
}

async function sayOnID(channelID, message) {
	if (!ready) return;
	return await getChannelByID(channelID).send(message);
}

async function sayOn(channel, message) {
	if (!ready) return;
	return await getChannelByName(channel).send(message);
}

function getEmojiByName(name) {
	return client.emojis.find(emoji => emoji.name == name);
}

function getChannelByID(id) {
	return client.channels.find(channel => channel.id == id);
}

function getChannelByName(name) {
	return client.channels.find(channel => channel.name == name);
}

function getVoiceChannelByName(name) {
	return client.voiceConnections.find(channel => channel.channel.name == name);
}

client.login(DISCORD_TOKEN);