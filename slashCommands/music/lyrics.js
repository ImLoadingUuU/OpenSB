const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const apm = require("../../lib/apm")
const mojimLib = require('../../lib/mojim')
let mojim = mojimLib()
module.exports = {
  name: '歌詞',
  description: "歌詞.",
  type: ApplicationCommandType.ChatInput,
  /**
 * @param {import('discord.js').Interaction} interaction 
 * @param {import("../../index")} client
 */
  run: async (client, interaction) => {

    let player = client.kazagumo.getPlayer(interaction.member.guild.id);
    if (!player) return interaction.reply("你必須要在語音頻道裡面才能使用此指令")
    if(player.queue.current) {
      let currentTrack = player.queue.current
    let lrc = await  mojim.search(currentTrack.title.replace(currentTrack.author,"").replace("-",""))
    if (!lrc[0]) return interaction.reply("並未找到歌詞");
     let res = await mojim.lyrics(lrc,0)
    res = mojim.rmUseless(mojim.rmADs(res)).replace("document.write(YYsT111);","")
    interaction.channel.send({
        embeds: [
            new EmbedBuilder()
            .setTitle("歌詞")
            .setDescription(res)
        ]
    })
    } else {
        interaction.reply("沒有歌曲在播放中")
    }


  }
};