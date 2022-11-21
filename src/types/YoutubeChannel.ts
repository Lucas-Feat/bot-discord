export class YoutubeChannel {
    public id: string;
    public title: string;
    public description: string;
    public thumbnails: string;
    public url: string;

    public constructor(data: Partial<YoutubeChannel> = {}) {
        Object.assign(this, data);
    }
}

export const channelConverter = {
    fromJSON: (data: any) => {
        return new YoutubeChannel({
            id: data.id,
            title: data.snippet.title,
            description: data.snippet.description,
            thumbnails: data.snippet.thumbnails.high.url,
            url: `https://www.youtube.com/${data.snippet.customUrl}`
        });
    }
};
