# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 5
1. 實作可以對 `Redis server` 進行 `SET`、`GET` 與 `DELETE` 操作的 API
2. 對 `Redis server` 設定帳號密碼
3. 使用 `Docker` 進行部屬

# 練習記錄
## 安裝 Redis
1. 於終端機中執行 `docker pull redis`，透過 `Docker` 進行安裝
2. 於終端機中執行 `docker run --name redis-lab -p 6379:6379 -d redis`，使 Redis container 運作
3. 為了直接對 container 進行操作，於終端機中執行 `docker exec -it [CONTAINER ID] bash`
    - 可以透過 `docker ps` 確認 `CONTAINER ID`。
4. 於終端機中執行 `redis-cli`，進入 `Redis` 的操作環境
5. 於終端機中執行 `ping`，確認是否回傳 `PONG`

![確認 Redis 的運作](Image/01.png)

## 建立 API
### API 基本準備
1. 於終端機中執行下列三行指令，建立 `game-character` 的基本架構
```
nest generate module features/game-character
nest generate controller features/game-character
nest generate service features/game-character
```
2. 沿用 `video-info` 的設定，模擬出類似的功能

### NestJS 與 Redis
1. 為了使 NestJS 可以與 Redis 互動，於終端機中執行下列四行指令，安裝相關套件：
```
npm install cache-manager --save
npm install cache-manager-redis-store --save
npm install @types/cache-manager -D
npm install @nestjs/cache-manager cache-manager
```
2. 於終端機中執行 `nest generate module db/redis-cache`
3. 修改前一步驟中建立的 `src\db\redis-cache\redis-cache.module.ts`
```
```


1. 修改 `src\features\game-character\game-character.service.ts`：
    - 課題要求中要進行 `SET`、`GET` 與 `DELETE`，功能依序是 `新增/更新`、`取得資料` 以及 `刪除`。
```
1
```
1. 1


# 參考資料
1. [安裝 WSL | Microsoft Learn](https://learn.microsoft.com/zh-tw/windows/wsl/install)
2. [使用WSL2在Windows下快速打造Linux開發環境(含Docker) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10255920)
3. [Getting started with Redis | Redis](https://redis.io/docs/getting-started/)
4. [[Redis] 使用 Docker 安裝 Redis ~ m@rcus 學習筆記](https://marcus116.blogspot.com/2019/02/how-to-run-redis-in-docker.html)
5. [redis/node-redis: Redis Node.js client](https://github.com/redis/node-redis)
6. https://www.tomray.dev/nestjs-caching-redis

# 編輯記錄
1. 2023-05-16
    - 開始進行 Topic. 5。
2. 2023-05-18
    - 更新部分檔案以符合 Topic. 3 與 Topic. 4 的變動。
3. 待進行事項
    - 完成 `實作可以對 'Redis server' 進行 'SET'、'GET' 與 'DELETE' 操作的 API` 的目標。
    - 完成 `對 'Redis server' 設定帳號密碼` 的目標。
    - 完成 `使用 'Docker' 進行部屬` 的目標。
    - 整理 `README.md` 並完成課題。

