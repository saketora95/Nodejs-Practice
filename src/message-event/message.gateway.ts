import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
// import { Server } from 'ws';

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

    @SubscribeMessage('msgToServer')
    public handleMessage(client: Socket, payload: any): void {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Emit [ msgToServer ]`)
        console.log(`- User [ ${payload.name} ] from room [ ${payload.room} ] : [ ${payload.text} ]`)
        this.server.emit('aaa', 'aaa');
        this.server.to(payload.room).emit('msgToClient', payload);
        console.log(`- Emit [ msgToClient ] to room [ ${payload.room} ] : [ ${payload.text} ]`)
    }

    @SubscribeMessage('joinRoom')
    public joinRoom(client: Socket, room: string): void {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Emit [ joinRoom ] : ${room}`)
        client.join(room);
        client.emit('joinedRoom', room);
        console.log(this.server.emit('aaa', 'bbb'));
    }

    @SubscribeMessage('leaveRoom')
    public leaveRoom(client: Socket, room: string): void {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Emit [ leaveRoom ] : ${room}`)
        client.leave(room);
        client.emit('leftRoom', room);
    }

    public handleDisconnect(client: Socket): void {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Disconnected`)
    }

    public handleConnection(client: Socket): void {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Connected`)
    }
}