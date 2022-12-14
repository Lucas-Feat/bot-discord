import moment, {Moment} from 'moment';

export class YoutubeVideo {
    public id: string;
    public title: string;
    public description: string;
    public thumbnails: string;
    public channelTitle: string;
    public publishedAt: Moment;
    public url: string;

    public constructor(data: Partial<YoutubeVideo> = {}) {
        Object.assign(this, data);
    }
}

export const videoConverter = {
    fromJSON: (data: any) => {
        return new YoutubeVideo({
            id: data.id.videoId,
            title: data.snippet.title,
            description: data.snippet.description,
            thumbnails: data.snippet.thumbnails.high.url,
            channelTitle: data.snippet.channelTitle,
            publishedAt: moment(data.snippet.publishedAt),
            url: `https://www.youtube.com/watch?v=${data.id.videoId}`
        });
    },

    fromXML: (data: any[]) => {
        const subData = data.find((element: any) => element.name === 'media:group').elements;
        return new YoutubeVideo({
            id: data.find(data => data.name === 'yt:videoId').elements[0].text,
            title: subData.find((data: any) => data.name === 'media:title').elements[0].text,
            description: subData.find((data: any) => data.name === 'media:description').elements[0].text,
            thumbnails: subData.find((data: any) => data.name === 'media:thumbnail').attributes.url,
            channelTitle: data.find(data => data.name === 'author').elements[0].elements[0].text,
            publishedAt: moment(data.find(data => data.name === 'published').elements[0].text),
            url: data.find(data => data.name === 'link').attributes.href,
        });
    }
};
