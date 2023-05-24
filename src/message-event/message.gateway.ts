import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

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
        this.server.to(payload.room).emit('msgToClient', payload);
        console.log(`- Emit [ msgToClient ] to room [ ${payload.room} ] : [ ${payload.text} ]`)
    }

    @SubscribeMessage('joinRoom')
    public async joinRoom(client: Socket, payload: any): Promise<void> {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Emit [ joinRoom ] : ${payload.room}`)
        client.join(payload.room);
        client.emit('joinedRoom', payload.room);

        payload.text = `加入了 [ ${payload.room} ] 聊天室`;
        payload.count = (await this.server.in(payload.room).fetchSockets()).length;
        this.server.to(payload.room).emit('roomMsg', payload);
    }

    @SubscribeMessage('leaveRoom')
    public async leaveRoom(client: Socket, payload: any): Promise<void> {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Emit [ leaveRoom ] : ${payload.room}`)
        client.leave(payload.room);
        client.emit('leftRoom', payload.room);
        
        payload.text = `離開了 [ ${payload.room} ] 聊天室`;
        payload.count = (await this.server.in(payload.room).fetchSockets()).length;
        this.server.to(payload.room).emit('roomMsg', payload);
    }

    public handleDisconnect(client: Socket): void {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Disconnected`)
    }

    public handleConnection(client: Socket): void {
        console.log(`Instance ${process.env.pm_id}\'s Client ${client.id} Connected`)
    }
}