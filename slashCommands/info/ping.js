const { ApplicationCommandType } = require('discord.js');

module.exports = {
	name: '延遲',
	description: "多ㄉㄚ",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
		interaction.reply({ content: `🏓 Pong! 多大呢? **${Math.round(client.ws.ping)} ms**` })
	}
};