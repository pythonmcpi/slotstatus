const shared = require('./shared.js');
const config = shared.loadConfig();

const Discord = require('discord.js-light');

const client = new Discord.Client({
    shards: 'auto',
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
    partials: [],
    intents: new Discord.Intents(0), // No intents
    presence: {
        status: config.status,
        activities: [{
            name: config.statusMsg,
            type: "PLAYING",
        }],
    },
});

client.on('ready', async () => {
    console.log(`Ready event fired for ${client.user.tag}`);
});

process.on('unhandledRejection', e => {
    console.error(e);
});

client.on('error', e => {
    console.error(e);
});

client.login(config.token);
