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
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
    createIOServer(port: number): any {
        const server = super.createIOServer(port);
        const redisAdapter = redisIoAdapter({
            host: 'redis',
            port: 6379,
        });
        server.adapter(redisAdapter);
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
    app.useWebSocketAdapter(new RedisIoAdapter(app));
    app.useStaticAssets(join(__dirname, '..', 'resource'));
    ```

### Client


# 參考資料
1. [Usage with PM2 | Socket.IO](https://socket.io/docs/v4/pm2/)
2. [Redis adapter | Socket.IO](https://socket.io/docs/v4/redis-adapter/)
3. [javascript - Heroku returns 400 Bad Request Response (Socket.IO Node.js) - Stack Overflow](https://stackoverflow.com/questions/57459115/heroku-returns-400-bad-request-response-socket-io-node-js)

# 編輯記錄
1. 2023-05-24
    - 開始進行 Topic. 8.1。
