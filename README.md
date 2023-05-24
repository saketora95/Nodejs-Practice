# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 8.1
1. 整合 `Redis` 與 `socket.io`，建立簡易聊天室
2. 此聊天室應具備：
    1. 使用者可以自訂自己的名稱
    2. 具有複數的聊天室，且使用者可以自行選擇加入的聊天室並自行離開
    3. 顯示聊天室當下的連線人數，並使聊天室內的使用者之間的訊息可以正確傳遞
3. Server 必須啟動多個 `instance`
4. 透過 `docker` 部署驗收環境

# 練習記錄
## 建置環境
### Server
1. 於終端機中執行 `npm i --save socket.io-redis` 安裝相關套件
2. 建立 `src\adapters\redis.adapter.ts` 檔案，透過 `Redis Adapter` 建立 IO server
```
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>;

    async connectToRedis(): Promise<void> {
        const pubClient = createClient({
            socket: {
                host: 'redis',
                port: 6379,
            },
            username: 'tora',
            password: '1234',
        });
        const subClient = pubClient.duplicate();

        await Promise.all([pubClient.connect(), subClient.connect()]);

        this.adapterConstructor = createAdapter(pubClient, subClient);
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        return server;
    }
}
```
2. 建立 `src\message-event\message.gateway.ts` 檔案，設置監聽的 events 與對應的函數
3. 建立 `src\message-event\message.module.ts` 檔案，將 `MessageGateway` 寫入 `providers` 的 list 中
4. 修改 `src\app.module.ts` 檔案，將 `MessageModule` 寫入 `imports` 的 list 中
5. 修改 `src\main.ts` 檔案
    - import 相關套件：
    ```
    import { RedisIoAdapter } from './adapters/redis.adapter';
    import { NestExpressApplication } from '@nestjs/platform-express';
    import { join } from 'path';
    ```
    - 調整 `bootstrap` 函數中 `app` 的設置：
    ```
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    
    // Adapter
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);

    // 簡易 Client
    app.useStaticAssets(join(__dirname, '..', 'resource'));
    ```

### Client
1. 建立 `resource` 資料夾（對應於 Server `src\main.ts` 檔案中，`useStaticAssets` 所給予的路徑）
2. 建立 `resource\index.html`、`resource\main.js` 與 `resource\styles.css` 檔案
    - 為供測試，製作簡易的頁面。
        - 供使用者自訂自己的名稱、進入的聊天室（room）與發送的訊息。
        - 顯示接收到的訊息。

### 環境測試
1. 於終端機中執行 `docker-compose up --build` 建置並啟動環境
2. 開啟四個瀏覽器分頁，連入 `http://localhost/`
3. 分別設置名稱為 `A User`、`B User`、`C User` 與 `D User`
4. 由 `C User` 發佈任意訊息
    - 因所有 client 均處於預設的 `general` room 中，因此所有人都接收到了訊息。
![同 room 的所有 client 均接收到訊息](Image/01.png)
5. 將 `A User` 與 `B User` 一同轉入 `roomA` 中
6. 由 `A User` 發佈任意訊息
    - `A User` 與 `B User` 兩個 client 待在 `roomA`，因此 `C User` 與 `D User` 並沒有收到消息。
![roomA 的成員順利接收訊息](Image/02.png)

至此，測試結果符合預期，完成環境的基礎建置。

{"path": "/socket.io", "forceNew": true, "reconnectionAttempts": 3, "timeout": 2000, "transports": ["websocket"]}

# 參考資料
1. [Usage with PM2 | Socket.IO](https://socket.io/docs/v4/pm2/)
2. [Redis adapter | Socket.IO](https://socket.io/docs/v4/redis-adapter/)
3. [Build a real-time chat application with Websocket, Socket.IO, Redis, and Docker in NestJS. | by Phat Vo | Medium](https://medium.com/@phatdev/build-a-real-time-chat-application-with-websocket-socket-io-redis-and-docker-in-nestjs-499c2513c18)
    - [phatvo21/nest-chat-realtime](https://github.com/phatvo21/nest-chat-realtime)
4. [javascript - Heroku returns 400 Bad Request Response (Socket.IO Node.js) - Stack Overflow](https://stackoverflow.com/questions/57459115/heroku-returns-400-bad-request-response-socket-io-node-js)
5. [Adapter - Gateways | NestJS - A progressive Node.js framework](https://stackoverflow.com/questions/72162790/node-js-app-not-connect-to-docker-redis-container)
6. [Node.js app not connect to docker redis container - Stack Overflow](https://stackoverflow.com/questions/72162790/node-js-app-not-connect-to-docker-redis-container)

# 編輯記錄
1. 2023-05-24
    - 開始進行 Topic. 8.1。
