const { ApplicationCommandType, SlashCommandUserOption } = require('discord.js');

module.exports = {
	name: '吵他！！',
	description: "可能是",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
	run: async (client, interaction) => {
		if(!client.isannoying ) {
			client.isannoying  = true;
			let times = 0;
			await interaction.reply("好的，我会吵他100次的")
			setInterval(() => {
				interaction.channel.send("<@986477819901120572>")
				times += 1;
				if (times > 100) {
					client.isannoying = false;
					clearInterval(this)
				}
			},512)

		}
	}
};