const Discord = require('discord.js');
require('dotenv').config({ path: './config.env' });
const bot = new Discord.Client();
const discordToken = process.env.DISCORD_TOKEN;

// COMMANDS
const valCommands = require('./commands/Valorant/Commands.js');

bot.commands = new Discord.Collection();

let commandObj = {...valCommands};

Object.keys(commandObj).map(key => {
  bot.commands.set(commandObj[key].name, commandObj[key])
});

bot.login(discordToken);
// Command prefix setup
const prefix = '-';

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
})

bot.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift();
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});
