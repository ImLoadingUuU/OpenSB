const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const apm = require("../../lib/apm")
module.exports = {
  name: '跳過',
  description: "不想聽了.",
  type: ApplicationCommandType.ChatInput,
  /**
 * @param {import('discord.js').Interaction} interaction 
 * @param {import("../../index")} client
 */
  run: async (client, interaction) => {
    let player = client.kazagumo.getPlayer(interaction.member.guild.id);
    if (!player) return interaction.reply("你必須要在語音頻道裡面才能使用此指令")
    player.skip()
    interaction.reply("已跳過.")



  }
};