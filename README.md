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
    npm install -D @types/cache-manager-redis-store
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
        - 仿照 `Topic. 2`，引入建立 API 時會用到的相關套件。
        ```
        import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
        ```
        - 設置 `getData`、`setData` 與 `deleteData` 函數。
        ```
        // GET
        @Get(':key')
        async getData(@Param('key') key: string): Promise<string> {
            return await this.redisAPIService.getData(key);
        }
        
        // SET
        @Post()
        setData(@Body() data: SetDataDto) {
            return this.redisAPIService.setData(data['key'], data['value']);
        }

        // DEL
        @Get('DEL/:key')
        async deleteData(@Param('key') key: string): Promise<string> {
            return await this.redisAPIService.deleteData(key);
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
        - 實作 `getData`、`setData` 與 `deleteData` 函數。
        ```
        // GET
        // SET
        async setData(key: string, value: string) {
            console.log('SET key [ ' + key + ' ]\'s value to [ ' + value + ' ].')
            await this.cacheService.set(key, value);
        }

        // GET
        async getData(key: string): Promise<any> {
            const cachedData = await this.cacheService.get(key);
            console.log('GET key [ ' + key + ' ]\'s value, and result is [ ' + cachedData + ' ].')

            return cachedData;
        }

        // DEL
        async deleteData(key: string) {
            console.log('DEL key [ ' + key + ' ].')
            await this.cacheService.del(key);
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

## 測試 API 運行
### 建置與啟動環境
於終端機中執行 `docker-compose up --build` 進行建置並啟動環境。

![啟動 NestJS 與 Redis 的 Container](Image/01.png)

### GET
1. 透過 `Docker Desktop`，於 `Redis container` 的終端機中執行 `redis-cli`，進入 `Redis` 的 CLI
2. 於同一處執行 `set pen 10`，創建一筆資料供稍後測試

![在 redis-cli 中創建測試資料](Image/02.png)

3. 連入 `http://localhost/redis-api/pen` 進行測試

![透過 API 取得 Redis 資料](Image/03.png)

### POST
1. 使用 `POST`，對 `http://localhost/redis-api` 發送 `{"key": "notebook", "value": 30}` 的資料
2. 於 `Redis` 的 CLI 中執行 `get notebook` 確認 API 運作狀況

![透過 API 設定 Redis 資料](Image/04.png)

### DEL
1. 連入 `http://localhost/redis-api/DEL/pen` 進行測試
2. 於 `Redis` 的 CLI 中執行 `get pen` 確認 API 運作狀況

![透過 API 刪除 Redis 資料](Image/05.png)

## 對 Redis server 設定帳號密碼
### 建立設定檔
1. 建立 `redis.conf` 並填入 `aclfile /usr/local/etc/redis/users.acl`，使其讀取權限設定檔
2. 建立 `users.acl` 並填入：
    - `user default off` 
        - 關閉預設使用者的使用，避免出現以預設使用者操作的情形。
    - `user tora >1234 on ~* &* +@all`
        - `user tora`：設置新的 user
        - `>1234`：設置此 user 可以使用的密碼
        - `on`：啟用 user
        - `~*`：設置此 user 可以使用所有可能的 key
        - `&*`：設置此 user 可以使用所有可能的 channel 
        - `+@all`：設置此 user 可以使用所有可能的指令
3. 修改 `docker-compose.yml` 檔案：
    - 於 Redis container 下：
        - `volumes` 追加掛載 `./redis.conf:/usr/local/etc/redis/redis.conf` 與 `./users.acl:/usr/local/etc/redis/users.acl`
        - 設置 `command: ["redis-server", "/usr/local/etc/redis/redis.conf" ]`

### 調整 CacheModule.register()
修改 `src\app.module.ts` 中的 `CacheModule.register()`，令其透過設定的帳號與密碼進行驗證：
```
CacheModule.register({
    isGlobal: true,
    store: redisStore,
    host: "redis",
    port: "6379",
    // 設置的 user 帳號與密碼
    user: "tora",
    password: "1234",
}),
```

## 測試
1. 於終端機中執行 `docker-compose up --build` 建置
2. 執行 API 進行測試
    - 於 API 中均有設置 `console.log`，透過其記錄觀察呼叫與執行是否順利。

![API 給予回應](Image/06.png)

# 參考資料
1. [安裝 WSL | Microsoft Learn](https://learn.microsoft.com/zh-tw/windows/wsl/install)
2. [Getting started with Redis | Redis](https://redis.io/docs/getting-started/)
3. [redis/node-redis: Redis Node.js client](https://github.com/redis/node-redis)
4. [Ultimate Guide: NestJS Caching With Redis [2022]](https://www.tomray.dev/nestjs-caching-redis)
5. [NestJS + Redis + Postgres Local Development With Docker Compose](https://www.tomray.dev/nestjs-docker-compose-postgres)
6. [ACL | Redis](https://redis.io/docs/management/security/acl/)
7. [RedisInsight | The Best Redis GUI](https://redis.com/redis-enterprise/redis-insight/)

# 編輯記錄
1. 2023-05-16
    - 開始進行 Topic. 5。
2. 2023-05-18
    - 更新部分檔案以符合 Topic. 3 與 Topic. 4 的變動。
    - 完成 `實作可以對 'Redis server' 進行 'SET'、'GET' 與 'DELETE' 操作的 API` 的目標。
3. 2023-05-19
    - 完成 `對 'Redis server' 設定帳號密碼` 的目標。
    - 完成 `使用 'Docker' 進行部屬` 的目標。
    - 整理 `README.md` 並完成課題。
    - 完成 `ACL_Note.MD`。

