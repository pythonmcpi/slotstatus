const shared = require('./shared.js');
const config = shared.loadConfig();

const Discord = require('discord.js-light');

const client = new Discord.Client({
    shard: 0,
    shardCount: 144,
    // Cache options copy pasted from discord.js-light readme
    makeCache: Discord.Options.cacheWithLimits({
        ApplicationCommandManager: 0, // guild.commands
        BaseGuildEmojiManager: 0, // guild.emojis
        ChannelManager: 0, // client.channels
        GuildChannelManager: 0, // guild.channels
        GuildBanManager: 0, // guild.bans
        GuildInviteManager: 0, // guild.invites
        GuildManager: 0, // client.guilds
        GuildMemberManager: 0, // guild.members
        GuildStickerManager: 0, // guild.stickers
        GuildScheduledEventManager: 0, // guild.scheduledEvents
        MessageManager: 0, // channel.messages
        PermissionOverwriteManager: 0, // channel.permissionOverwrites
        PresenceManager: 0, // guild.presences
        ReactionManager: 0, // message.reactions
        ReactionUserManager: 0, // reaction.users
        RoleManager: 0, // guild.roles
        StageInstanceManager: 0, // guild.stageInstances
        ThreadManager: 0, // channel.threads
        ThreadMemberManager: 0, // threadchannel.members
        UserManager: 0, // client.users
        VoiceStateManager: 0, // guild.voiceStates
    }),
    partials: [
        'CHANNEL', // Required to receive DMs according to docs? idk
    ],
    intents: new Discord.Intents(0).add([Discord.Intents.FLAGS.DIRECT_MESSAGES]), // Only DM intents
    presence: {
        status: config.status,
        activities: [{
            name: config.statusMsg,
            type: "PLAYING",
        }],
    },
    failifNotExists: false, // Ensure that all replies go through even if the referenced message was deleted
});

client.on('ready', async () => {
    console.log(`Ready event fired for ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.partial) return; // Partial message, we shouldn't be receiving these but we should be able to drop them safely
    if (message.guildId) return; // We are not handling any guild messages
    if (!message.content) return; // DM messages will automatically send content, no need to pass message content intents
    
    if (!message.content.startsWith(config.prefix)) return; // Not a command
    
    const args = message.content.replace(config.prefix, '').split(' '); // Strip message prefix and split into arguments array
    const cmd = args.shift().toLowerCase(); // Pop first value from arguments array and lowercase it
    
    if (cmd == 'slothub')
        return message.reply(config.infoText);
    else
        if (config.notFoundText) return message.reply(config.notFoundText);
});

process.on('unhandledRejection', e => {
    console.error(e);
});

client.on('error', e => {
    console.error(e);
});

console.log(`Note: The 'ready' event may not fire; this is normal.`);
client.login(config.token);
