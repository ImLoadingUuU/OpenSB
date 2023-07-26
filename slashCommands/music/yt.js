const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
function cleanTitle(string,artist){
return string.replace("(Offical Music Video)","").replace("(Offical Video)").replace(`${artist} - `,"").replace("(Offical 4K Remastered Video)","").replace("(Video)")
}
module.exports = {
  name: 'youtube',
  description: "Youtube搜尋..",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: '音樂',
      description: '音樂名',
      type: 3,
      required: true
    }
  ],

  /**
 * @param {import('discord.js').Interaction} interaction 
 * @param {import("../../index")} client
 */
  run: async (client, interaction) => {
// interaction.reply("已停用此功能")
 //   return;
    const song = interaction.options.get('音樂').value;
    if (!interaction.isRepliable()) return;
    if (!interaction.member.voice) return interaction.reply("你必須要在語音頻道裡面才能使用此指令")
    interaction.reply("獲取節點中...")
    /**
     * @param {import("shoukaku").Node} node
     */
    let player = await client.kazagumo.createPlayer({
      guildId: interaction.guildId,
      voiceId: interaction.member.voice.channelId,
      textId: interaction.channelId,
      volume: 100
    })

   
    let result = await client.kazagumo.search(song, {requester: interaction.member});
    if(!result.tracks) return interaction.editReply("沒有結果")
    console.log(result.tracks)
    let track = result.tracks[0]
    if (!track) return interaction.editReply("找不到音樂呢");
    await player.queue.add(result.tracks[0])
  
    interaction.editReply(`由 "${track.author.replace("- Topic","")}"演出的"${cleanTitle(track.title,track.author)}"已被新增至名單`);
    if (!player.playing && !player.paused) player.play();

  }
};