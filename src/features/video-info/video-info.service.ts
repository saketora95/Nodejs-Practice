import { Injectable } from '@nestjs/common';

// 引入 DTO
import { CreateVideoInfoDto } from './dto/create-video-info.dto';

@Injectable()
export class VideoInfoService {
    video_info_array = [
        {
            id: 1,
            title: 'LiSA 『炎』 -MUSiC CLiP-',
            link: 'https://www.youtube.com/watch?v=4DxL6IKmXx4',
            views: 290784612,
        },
        {
            id: 2,
            title: '茅原実里「みちしるべ」 MV Full Size 『ヴァイオレット・エヴァーガーデン』ED主題歌 / "violet-evergarden" Ending Theme Michishirube',
            link: 'https://www.youtube.com/watch?v=UKU4B05fPck',
            views: 6884167,
        },
        {
            id: 3,
            title: '『Hikaru no Go』 - Days／shela',
            link: 'https://www.youtube.com/watch?v=n5eoJyrPjWQ',
            views: 368867,
        },
    ];

    createVideoInfo(data: CreateVideoInfoDto) {
        const video_info = { id: this.video_info_array.length + 1, ...data };
        this.video_info_array.push(video_info);
        return video_info;
    }

    getVideoInfo(id: string) {
        return this.video_info_array.find(
            (video_info) => video_info.id.toString() === id
        );
    }
}
