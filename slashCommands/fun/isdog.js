const { ApplicationCommandType, SlashCommandUserOption } = require('discord.js');

module.exports = {
	name: 'dog',
	description: "可能是",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
          name: '人物',
          description: '人名',
          type: 2
        }
      ],
	run: async (client, interaction) => {
		if(interaction.get("人物").value.id == 1033363401767911464) {
            interaction.reply("是狗")
        } else {
            interaction.reply("應該不是")
        }
	}
};