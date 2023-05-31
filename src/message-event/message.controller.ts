import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(
      private readonly msgGateway: MessageGateway,
      private readonly sunixService: MessageService
    ) {}

    @MessagePattern(process.env.MQTT_TOPIC)
    receiveData(@Payload() payload: number[], @Ctx() context: MqttContext) {
        this.msgGateway.emitData(payload);
    }

    @MessagePattern('SUNIX/26:00:01_EZG1300/97:00:fb_EZR5231/GET/AI_INTERFACE/CH_01')
    receiveData_EZG1300_AI_01(@Payload() payload: number[], @Ctx() context: MqttContext) {
      this.sunixService.setLight(payload);
    }
}
