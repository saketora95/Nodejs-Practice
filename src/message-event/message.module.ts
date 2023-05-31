import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageService } from './message.service';
import { OutboundResponseSerializer } from './mqtt.serializer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT',
        transport: Transport.MQTT,
        options: {
          url: `mqtt://${process.env.MQTT_URL}:${process.env.MQTT_PORT}`,
          username: process.env.MQTT_USERNAME,
          password: process.env.MQTT_PASSWORD,
          serializer: new OutboundResponseSerializer()
        },
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageGateway, MessageService],
})
export class MessageModule {}