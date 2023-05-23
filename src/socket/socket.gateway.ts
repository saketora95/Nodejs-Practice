import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
    // namespace: '/chat',
    cors: {
        origin: '*', 
        methods: ['GET', 'POST'],
        transports: ['websocket'],
        credentials: true
    },
    allowEIO3: true
})
export class SocketGateway implements OnModuleInit {

    @WebSocketServer() server: Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log('Connected : ' + socket.id);
        });
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log(body);
        this.server.emit('onMessage', {
            title: 'Message from server',
            content: body
        });
    }
}
