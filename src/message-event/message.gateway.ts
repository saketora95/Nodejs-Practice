import {
    SubscribeMessage,
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
    namespace: '/chat',
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
    
    @WebSocketServer() server: Server;

    // MQTT Broker Event

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

    // SocketIO Event

    @SubscribeMessage('msgToServer')
    public handleMessage(client: Socket, payload: any): void {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Emit [ msgToServer ]`)
        console.log(`- User [ ${payload.name} ] from room [ ${payload.room} ] : [ ${payload.text} ]`)
        this.server.to(payload.room).emit('msgToClient', payload);
        console.log(`- Emit [ msgToClient ] to room [ ${payload.room} ] : [ ${payload.text} ]`)
    }

    @SubscribeMessage('joinRoom')
    public async joinRoom(client: Socket, payload: any): Promise<void> {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Emit [ joinRoom ] : ${payload.room}`)

        // Personal Message
        client.join(payload.room);
        client.emit('joinedRoom', payload.room);

        // Room Notional Message
        this.server.to(payload.room).emit('roomNotiMsg', {
            action: 'join',
            name: payload.name,
            room: payload.room
        });

        // Global Notional Message
        this.server.emit('updateClientCnt', {
            general: (await this.server.in('general').fetchSockets()).length,
            roomA: (await this.server.in('roomA').fetchSockets()).length,
            roomB: (await this.server.in('roomB').fetchSockets()).length,
            roomC: (await this.server.in('roomC').fetchSockets()).length,
            roomD: (await this.server.in('roomD').fetchSockets()).length,
        });
    }

    @SubscribeMessage('leaveRoom')
    public async leaveRoom(client: Socket, payload: any): Promise<void> {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Emit [ leaveRoom ] : ${payload.room}`)

        // Room Notional Message
        this.server.to(payload.room).emit('roomNotiMsg', {
            action: 'leave',
            name: payload.name,
            room: payload.room
        });

        // Personal Message
        client.leave(payload.room);
        client.emit('leftRoom', payload.room);

        // Global Notional Message
        this.server.emit('updateClientCnt', {
            general: (await this.server.in('general').fetchSockets()).length,
            roomA: (await this.server.in('roomA').fetchSockets()).length,
            roomB: (await this.server.in('roomB').fetchSockets()).length,
            roomC: (await this.server.in('roomC').fetchSockets()).length,
            roomD: (await this.server.in('roomD').fetchSockets()).length,
        });
    }

    public handleDisconnect(client: Socket): void {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Disconnected`)
    }

    public handleConnection(client: Socket): void {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Connected`)
    }
}