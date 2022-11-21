import {Channel, Client, User} from 'discord.js';
import convert from 'xml-js';

export function findUserById(client: Client, id: string): User {
    return client.users.cache.find(user => user.id === id);
}

export function findChannelById(client: Client, id: string): Channel {
    return client.channels.cache.find(channel => channel.id === id);
}

export function convertXmlToArray(xml: any): any {
    const objectFromXML = JSON.parse(convert.xml2json(xml.data));
    return objectFromXML
        .elements[0]
        .elements
        .filter((element: any) => element.name === 'entry')
        .map((element: any) => element.elements);
}
