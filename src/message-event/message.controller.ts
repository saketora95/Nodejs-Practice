import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { MessageGateway } from './message.gateway';

@Controller('message')
export class MessageController {
    constructor(
      private readonly msgGateway: MessageGateway
    ) {}

    @MessagePattern(process.env.MQTT_TOPIC)
    receiveData(@Payload() payload: number[], @Ctx() context: MqttContext) {
        this.msgGateway.emitData(payload);
    }
}
