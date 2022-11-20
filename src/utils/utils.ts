import {Channel, Client, User} from 'discord.js';

export function findUserById(client: Client, id: string): User {
    return client.users.cache.find(user => user.id === id);
}

export function findChannelById(client: Client, id: string): Channel {
    return client.channels.cache.find(channel => channel.id === id);
}
