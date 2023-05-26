
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

// MQTT
import { Payload } from '@nestjs/microservices';
import * as moment from 'moment';

@WebSocketGateway({
    namespace: '/env-data',
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
})
export class MQTTGateway implements OnGatewayConnection, OnGatewayDisconnect {
    
    @WebSocketServer() server: Server;

    public emitData(@Payload() payload: number[]) {

        let event_topic = 'emit';
        if (payload['params']['stream'] == 'temperature') {
            event_topic += 'Temp';
        } else if (payload['params']['stream'] == 'humidity') {
            event_topic += 'Humi';
        }
        
        this.server.emit(event_topic, {
            value: payload['params']['data'],
            timestamp: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        });
    }

    public handleDisconnect(client: Socket): void {
        console.log(`MQTT - Instance ${process.env.pm_id}\'s Client ${client.id} Disconnected`)
    }

    public handleConnection(client: Socket): void {
        console.log(`MQTT - Instance ${process.env.pm_id}\'s Client ${client.id} Connected`)
    }
}