import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    // namespace: '/socket.io',
    // cors: {
    //     origin: '*', 
    //     methods: ['GET', 'POST'],
    //     transports: ['websocket', 'polling'],
    //     credentials: true
    // },
    // allowEIO3: true
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    handleConnection(client: Socket){
        console.log('Instance ' + process.env.pm_id + ' Connected : ' + client.id);
    }
    handleDisconnect(client: Socket){
        console.log('Instance ' + process.env.pm_id + ' Disconnected : ' + client.id);
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log('Instance ' + process.env.pm_id + ' client Emit [ newMessage ] : ' + body);
        this.server.emit('onMessage', {
            title: 'Instance ' + process.env.pm_id + ' Message from server',
            content: body
        });
    }
}
