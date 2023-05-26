import { Module } from '@nestjs/common';
import { MQTTGateway } from './mqtt.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT',
        options: {
          url: `mqtt://${process.env.MQTT_URL}:${process.env.MQTT_PORT}`,
          username: process.env.MQTT_USERNAME,
          password: process.env.MQTT_PASSWORD,
        },
      },
    ]),
  ],
  controllers: [MqttController],
  providers: [MQTTGateway],
})
export class MQTTModule {}