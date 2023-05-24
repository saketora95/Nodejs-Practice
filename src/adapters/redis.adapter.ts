import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
    createIOServer(port: number): any {
        const server = super.createIOServer(port);
        const redisAdapter = redisIoAdapter({
            host: 'redis',
            port: 6379,
            user: 'tora',
            password: '1234'
        });
        server.adapter(redisAdapter);
            return server;
    }
}