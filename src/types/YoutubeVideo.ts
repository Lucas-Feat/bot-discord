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
    }
};
