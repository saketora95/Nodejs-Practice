import { Module } from '@nestjs/common';
import { VideoInfoController } from './video-info.controller';
import { VideoInfoService } from './video-info.service';

@Module({
  controllers: [VideoInfoController],
  providers: [VideoInfoService]
})
export class VideoInfoModule {}
