const {REST, Routes} = require("discord.js");
require('dotenv').config();


const id =process.env.CLIENT_ID;
const token=process.env.TOKEN;
const commands = [
    {
        name: 'create',
        description: 'Creates a new short URL',
    },
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'ban',
        description: 'Bans a user from the server',
        options: [
            {
                name: 'user',
                type: 6,  // USER type
                description: 'The user to ban',
                required: true,
            },
            {
                name: 'reason',
                type: 3,  // STRING type
                description: 'Reason for the ban',
                required: false,
            }
        ],
    },
    {
        name: 'kick',
        description: 'Kicks a user from the server',
        options: [
            {
                name: 'user',
                type: 6,  // USER type
                description: 'The user to kick',
                required: true,
            },
            {
                name: 'reason',
                type: 3,  // STRING type
                description: 'Reason for the kick',
                required: false,
            }
        ],
    },
    {
        name: 'mute',
        description: 'Mutes a user in the server',
        options: [
            {
                name: 'user',
                type: 6,  // USER type
                description: 'The user to mute',
                required: true,
            },
            {
                name: 'duration',
                type: 4,  // INTEGER type
                description: 'Duration of the mute in minutes',
                required: true,
            }
        ],
    },
    {
        name: 'unmute',
        description: 'Unmutes a user in the server',
        options: [
            {
                name: 'user',
                type: 6,  // USER type
                description: 'The user to unmute',
                required: true,
            }
        ],
    },
    {
        name: 'warn',
        description: 'Warns a user in the server',
        options: [
            {
                name: 'user',
                type: 6,  // USER type
                description: 'The user to warn',
                required: true,
            },
            {
                name: 'reason',
                type: 3,  // STRING type
                description: 'Reason for the warning',
                required: false,
            }
        ],
    }
];
const rest =new REST({version:"10"}).setToken(token);

(async () => {
    try{
        console.log("Started refreshing application (/) commands.");
        await rest.put(Routes.applicationCommands(id),{body: commands});
        console.log("Successfully reloaded application (/) commands.");
    }
    catch (error){
        console.error(error);
    }

})();

