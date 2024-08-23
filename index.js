const {Client,GatewayIntentBits} =require("discord.js");
const app =require("express");
require('dotenv').config();

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent],
});

const token = process.env.TOKEN;
app.get('/', (req, res) => {
    res.send('Welcome to the DISCORD BOT');
  });



client.on("messageCreate",(message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith('create')){
        const url =message.content.split('create')[1];
        return message.reply({
            content : "Generating Short ID for" + url,
        });
    }
    message.reply({
        content:"Hey! What's up?",
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    try {
        if (commandName === 'ping') {
            await interaction.reply('Pong!');
        } else if (commandName === 'create') {
            const url = options.getString('url');
            await interaction.reply(`Generating Short ID for ${url}`);
        } else if (commandName === 'ban') {
            const user = options.getUser('user');
            const reason = options.getString('reason') || 'No reason provided';
            await interaction.reply(`Banning user ${user.tag} for ${reason}`);
        } else if (commandName === 'kick') {
            const user = options.getUser('user');
            const reason = options.getString('reason') || 'No reason provided';
            await interaction.reply(`Kicking user ${user.tag} for ${reason}`);
        } else if (commandName === 'mute') {
            const user = options.getUser('user');
            const duration = options.getInteger('duration');
            await interaction.reply(`Muting user ${user.tag} for ${duration} minutes`);
        } else if (commandName === 'unmute') {
            const user = options.getUser('user');
            await interaction.reply(`Unmuting user ${user.tag}`);
        } else if (commandName === 'warn') {
            const user = options.getUser('user');
            const reason = options.getString('reason') || 'No reason provided';
            await interaction.reply(`Warning user ${user.tag} for ${reason}`);
        }
    } catch (error) {
        console.error(error);
        await interaction.reply('There was an error while executing this command!');
    }
});


client.login(token);
