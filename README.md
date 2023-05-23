# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 8
1. 使用 `Postman` 測試 `WebSocket` 連線
2. 前端可與後端透過 `WebSocket` 連線
3. 後端可推送資料至前端，讓前端接收並顯示推送的資料
4. 透過 `docker` 部署驗收環境

# 練習記錄
## 建置雛形
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

# 參考資料
1. [Gateways | NestJS - A progressive Node.js framework](https://docs.nestjs.com/websockets/gateways)
2. [NestJS Websockets Tutorial #1 - Creating a Websocket Gateway Server - YouTube](https://www.youtube.com/watch?v=iObzX8-Y5xg)

# 編輯記錄
1. 2023-05-22
    - 開始進行 Topic. 8。
1. 2023-05-23
    - 持續進行 Topic. 8。
