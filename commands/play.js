const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send("Vous devez être dans un canal vocal pour jouer de la musique!");
        const stream = ytdl(args[0], { filter: 'audioonly' });
        const player = createAudioPlayer();
        const resource = createAudioResource(stream);

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        player.play(resource);
        connection.subscribe(player);

        player.on('stateChange', (oldState, newState) => {
            if (newState.status === 'idle') {
                connection.destroy();
            }
        });

        message.reply(`Joue maintenant: ${args[0]}`);
    }
};
