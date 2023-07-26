const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const apm = require("../../lib/apm")
module.exports = {
  name: 'apm',
  description: "找找APM Music裡面的音樂..",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: '音樂',
      description: '音樂名',
      type: 3,
      required: true,
      autocomplete: true
    }
  ],
  /**
 * @param {import('discord.js').Interaction} interaction 
 */
  autocomplete: async (interaction, choices) => {
    const focusedValue = interaction.options.getFocused();
    if (!focusedValue) return interaction.respond([
      {
        "name": "請輸入音樂名",
        "value": "noResult",
      }
    ])
    let json = await apm.serach(focusedValue)
    if (!json.rows) return interaction.respond([
      {
        "name": "沒有結果",
        "value": "noResult",
        "disabled": true
      }
    ])
    function doesStringContainAllWords(str, wordsArray) {
      return wordsArray.every(word => str.includes(word));
    }    
    interaction.respond(json.rows.filter((item) => {
      // 將項目名稱轉換成小寫，並檢查是否包含搜尋關鍵字（不分大小寫）
      const itemName = `${item.trackTitle}  ${item.libraryCode} ${item.apmReleaseDate} ${item.albumCode}`.toLowerCase();
    
      return  doesStringContainAllWords(itemName,focusedValue.toLowerCase().split(" "));
    }).slice(0, 20).map(x => ({
      "name": `${x.trackTitle.slice(0, 30)} - ${x.libraryCode} (${x.albumCode})`,
      "value": x.id
    })));

  },
  /**
 * @param {import('discord.js').Interaction} interaction 
 * @param {import("../../index")} client
 */
  run: async (client, interaction) => {

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
      volume: 40
    })

   
    let json = await apm.serach(song)
    let result = await client.kazagumo.search(json.rows[0].audioUrl, {requester: interaction.member});
    await player.queue.add(result.tracks[0])
    interaction.editReply("已添加至名單...");
    if (!player.playing && !player.paused) player.play();

  }
};