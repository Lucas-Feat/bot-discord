import {Client, User} from 'discord.js';

export function findUserById(client: Client, id: string): User {
    return client.users.cache.find(user => user.id === id);
}
