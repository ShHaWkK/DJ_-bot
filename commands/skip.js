module.exports = {
    name: 'skip',
    description: 'Skip to the next song in the queue',
    execute(message, args, serverQueue) {
        if (!message.member.voice.channel)
            return message.channel.send("You need to be in a voice channel to skip music!");
        if (!serverQueue)
            return message.channel.send("There is no song that I could skip!");

        // If there is a song that is currently playing
        if (serverQueue.connection.dispatcher) {
            serverQueue.connection.dispatcher.end();
        }
    },
};
