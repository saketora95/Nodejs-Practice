# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 5
1. 實作可以對 `Redis server` 進行 `SET`、`GET` 與 `DELETE` 操作的 API
2. 對 `Redis server` 設定帳號密碼
3. 使用 `Docker` 進行部屬

# 練習記錄
## API 與 Redis
1. 編輯 `src\app.module.ts` 檔案
    1. 安裝相關套件
    ```
    npm install cache-manager
    npm install -D @types/cache-manager
    npm install @nestjs/cache-manager
    npm install cache-manager-redis-store
    npm install @types/cache-manager-redis-store
    ```
    2. 引入相關套件
    ```
    import { CacheModule } from '@nestjs/cache-manager';
    import * as redisStore from 'cache-manager-redis-store';
    ```
    3. 在 `@Module` 的 `imports` 下追加 `CacheModule.register()`
    ```
    CacheModule.register({
        isGlobal: true,
        store: redisStore,
        // 對應於 Redis container 的名字
        host: "redis",
        // 對應於 Redis 使用的 port，預設值為 6379
        port: "6379"
    }),
    ```
2. 建立 API
    1. 執行 `nest generate`，快速建立 API 的基礎文件
    ```
    nest generate module redis-api
    nest generate controller redis-api
    nest generate service redis-api
    ```
    2. 編輯 `src\redis-api\redis-api.controller.ts` 檔案
        - 追加引入 `@nestjs/common` 中的 `Get` 與 `Param`。
        ```
        import { Controller, Get, Param } from '@nestjs/common';
        ```
        - 設置 `getData` 函數，使這個函數會去呼叫 `service` 中的函數
        ```
        @Get(':key')
        async getData(@Param('key') key: string): Promise<string> {
            return await this.redisAPIService.getData(key);
        }
        ```
    3. 編輯 `src\redis-api\redis-api.service.ts` 檔案
        - 引入相關套件。
        ```
        import { Inject, Injectable } from '@nestjs/common';
        import { CACHE_MANAGER } from '@nestjs/cache-manager';
        import { Cache } from 'cache-manager';
        ```
        - 於 `RedisApiService` 內設置 `constructor`。
        ```
        constructor(
            @Inject(CACHE_MANAGER) private cacheService: Cache,
        ) {}
        ```
        - 實作 `getData` 函數，使其經由 `cache-manager` 進行動作。
        ```
        async getData(key: string): Promise<any> {
            console.log(key);
            const cachedData = await this.cacheService.get(key);
            console.log(cachedData);

            return cachedData;
        }
        ```
3. 編輯 `docker-compose.yml` 檔案
    1. 於 `services` 下追加 `redis` container
    ```
    # Redis container 
    redis:
      image: redis:7.0-alpine
      ports:
        - 6379:6379
      volumes:
        - redis:/data
    ```
    2. 於最末追加 `volumes`
        - `volumes` 用於掛載目錄或已經存在的資料。
    ```
    volumes:
      redis:
        driver: local
    ```
    3. 於 `node` 下追加設置 `depends_on`
        - 設置 `depends_on` 可以使 `node` container 在 `redis` container 啟動後才啟動。
    ```
    depends_on:
      - redis
    ```
    4. 
4. 1

## 建立 API
### API 基本準備
1. 於終端機中執行下列三行指令，建立 `redis-api` 的基本架構
```
nest generate module redis-api
nest generate controller redis-api
nest generate service redis-api
```
2. 沿用 `video-info` 的設定，模擬出類似的功能



# 參考資料
1. [安裝 WSL | Microsoft Learn](https://learn.microsoft.com/zh-tw/windows/wsl/install)
2. [Getting started with Redis | Redis](https://redis.io/docs/getting-started/)
3. [redis/node-redis: Redis Node.js client](https://github.com/redis/node-redis)
4. [Ultimate Guide: NestJS Caching With Redis [2022]](https://www.tomray.dev/nestjs-caching-redis)
5. [NestJS + Redis + Postgres Local Development With Docker Compose](https://www.tomray.dev/nestjs-docker-compose-postgres)

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

