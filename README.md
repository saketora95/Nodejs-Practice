# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 8
1. 使用 `Postman` 測試 `WebSocket` 連線
2. 前端可與後端透過 `WebSocket` 連線
3. 後端可推送資料至前端，讓前端接收並顯示推送的資料
4. 透過 `docker` 部署驗收環境

# 練習記錄
## 建置 `socket.io server`
1. 於終端機中執行 `npm i --save @nestjs/websockets @nestjs/platform-socket.io` 安裝相關套件
2. 建立 `src\socket\socket.gateway.ts` 檔案
    - 搭配 `@WebSocketGateway` 建立 `SocketGateway` class，並搭配 `@SubscribeMessage` 建立函數 `onNewMessage`。
    - 透過 `@SubscribeMessage('newMessage')`，使 event 名稱為 `newMessage` 的訊息會觸發 `onNewMessage` 函數。
    - `onNewMessage` 會將接收到的訊息透過 `console.log` 顯示出來，方便測試。
3. 建立 `src\socket\socket.module.ts` 檔案
    - 設置 `@Module` 的 `providers` 為 `[SocketGateway]`。
4. 修改 `src\app.module.ts` 檔案
    - 將 `SocketModule` 放入 `@Module` 的 `imports` 之中。
5. 透過 `Postman` 發送 `Socket.IO` 連線到 `http://localhost:4000`，確認建置是否成功
![成功建立連線](Image/01.png)
6. 再次透過 `Postman` 發送 `newMessage` event，確認觸發 `onNewMessage`
![成功觸發 onNewMessage](Image/02.png)

## 測試環境
1. 於終端機中執行 `docker-compose up --build` 建置環境
2. 使用 [Socket IO Client Tool](https://amritb.github.io/socketio-client-tool/) 進行連線
    - Server URL : `http://localhost`
    - JSON Config : `{"path": "/socket.io", "forceNew": true, "reconnectionAttempts": 3, "timeout": 2000, "transports": ["websocket"]}`
3. 依據 server 設置，設置監聽 `onMessage`
4. 對 server `emit` 一筆 `newMessage` 的 event 進行測試

![Socket IO Client Tool 成功連線與測試](Image/03.png)

## `PM2` instance
### 遭遇問題
進行中途，碰到 server `emit` 沒有發送給所有 client 的問題：
- 於 `PM2` 建置環境時，透過 `Postman` 或 `Socket IO Client Tool` 與 socket.io server 進行連線，client 與 server 之間的 `emit` 均運作正常，server 的 `emit` 也能夠發送到所有的 client。
- 以 `docker-compose` 建置環境時，雖然也能連線，但 server 的 `emit` 往往只能發送到 `newMessage` 來源的 client 上。

### 原因與解決方法
最終已釐清使用 `PM2` instance 時，各 instance 會獨立處理，使得 client 被分配到不同 instance 時，此時 server 的 `emit` 自然無法直接觸及其他 instance 中，由其他 instance 所屬的 server 進行管理的 client。
![無法直接觸及其他 instance](Image/04.png)

之所以能於 `PM2` 建置環境時達成 server `emit` 到所有 client 的目標，是因為當時 client 都被分配至同一個 instance 中導致，而以 `docker-compose` 建置環境時，instance 都被分配到不同的 instance，使得 server `emit` 只會發送到對應 instance 下的 client。

為解決此一問題，可以搭配 [`Redis Adapter`](https://socket.io/docs/v4/redis-adapter/) 解決，此部分將在 `作業 - 8.1` 中進行。


# 參考資料
1. [Gateways | NestJS - A progressive Node.js framework](https://docs.nestjs.com/websockets/gateways)
2. [NestJS Websockets Tutorial #1 - Creating a Websocket Gateway Server - YouTube](https://www.youtube.com/watch?v=iObzX8-Y5xg)
3. [Usage with PM2 | Socket.IO](https://socket.io/docs/v4/pm2/)
4. [Redis adapter | Socket.IO](https://socket.io/docs/v4/redis-adapter/)

# 編輯記錄
1. 2023-05-22
    - 開始進行 Topic. 8。
1. 2023-05-23
    - 持續進行 Topic. 8。
1. 2023-05-24
    - 整理 `README.md` 並完成課題。
