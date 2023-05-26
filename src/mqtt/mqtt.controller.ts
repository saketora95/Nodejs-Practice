import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { MQTTGateway } from './mqtt.gateway';

@Controller('mqtt')
export class MqttController {
    constructor(
      private readonly mqttGateway: MQTTGateway
    ) {}

    @MessagePattern(process.env.MQTT_TOPIC)
    receiveData(@Payload() payload: number[], @Ctx() context: MqttContext) {
        this.mqttGateway.emitData(payload);
    }
}
