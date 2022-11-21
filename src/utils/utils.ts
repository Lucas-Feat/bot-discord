import {Channel, Client, Colors, Interaction, User} from 'discord.js';
import convert from 'xml-js';
import axios from 'axios';

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

export async function getUserColor(client: Client, interaction: Interaction): Promise<any> {
    let {banner_color, accent_color} = await axios
        .get(`https://discord.com/api/users/${interaction.user.id}`, {headers: {Authorization: `Bot ${client.token}`}})
        .then(res => res.data);
    return banner_color ? banner_color : (accent_color ? accent_color : Colors.Green);
}
