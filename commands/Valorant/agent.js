const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  name: '-agent', 
  description: 'Gets Valorant Character',
  async execute(msg, args) {
    try {
      const API_KEY = process.env.RIOT_API_KEY;
      let input = args.slice(0).join(" ");
      let updatedInput = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      let imgUrl = `https://vgraphs.com/images/agents/${input}-avatar.jpg`;

      let apiResponse = await axios.get("https://na.api.riotgames.com/val/content/v1/contents", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Charse": "application/x-www-form-urlencoded; charset=UTF-8",
          "Origin": "https://developer.riotgames.com",
          "X-Riot-Token": `${API_KEY}`
        }
      })

      let charactersArray = apiResponse.data.characters;
      let character = "";

      for (let i = 0; i < charactersArray.length; i++) {
        if (updatedInput == charactersArray[i].name) {
          character = charactersArray[i].name;
        }
      }

      const agentDisplay = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(updatedInput)
        .setDescription(`${updatedInput} Agent description`)
        .setThumbnail(imgUrl)
        .addFields(
          { name: 'Regular field title', value: 'Some value here' },
          { name: 'Ability 1' , value: 'Ability', inline: true},
          { name: 'Ability 2' , value: 'Ability', inline: true},
          { name: 'Ability 3' , value: 'Ability', inline: true},
        )
        .addField('Inline field title', 'Some value here', true)
        .setFooter('Image and info provided by vgraphs.com');

      msg.channel.send(agentDisplay);
    }
    catch(error) {
      console.log(error)
    }
  }
}