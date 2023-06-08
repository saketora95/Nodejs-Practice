# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# Test. RedisCache 概述
將 `Redis` 作為 `SQL` 的資料快取，自 `SQL` 取出的資料會暫存於 `Redis` 中，以避免過度查詢 `SQL`。

# 測驗目標
1. 查詢資料時，使用者會得到 `CacheStatus` 與 `Result` 兩筆資料
    - `CacheStatus` : `Redis` 的暫存狀態，若 Redis 存有資料將回應 `Cache Hit`，反之則回應 `Cache Missing`。
    - `Result` : 查詢的資料。
2. 不論 `CacheStatus`，`Result` 都必須有查詢資料。
3. 能夠對 `SQL` 內的資料進行編輯，並於再次查詢時回應新的資料。
4. `Redis` 中的資料於 3 秒後就會因過期消失。
5. 於 5 秒內每秒對同資料連續查詢時，第 1 與 4 秒的 `CacheStatus` 應顯示 `Cache Hit`

# 過程記錄
1. 修改 `src\maria-api\maria-api.controller.ts` 檔案
```
@Get('cache/:key')
async getSQLCache(@Param('key') key:string): Promise<string> {
    return await this.mariaApiService.getCache(key);
}
```
2. 修改 `src\maria-api\maria-api.service.ts` 檔案，設置 `getCache` 函數
    - 使用 `this.redis.get(key)` 確認 Redis 中是否有暫存資料。
        - 為 `null` 時，表示沒有暫存資料：
            - 使用 `this.fruitPriceRepository.findOneBy({name: key})` 查詢資料。
            - 使用 `this.redis.set(key, JSON.stringify(queryResult), 'EX', 3)` 將資料儲存於 Redis 中，並透過 `EX` 設置 3 秒後會清除資料。
            - 回傳查詢結果與 `Cache Missing`。
        - 反之則代表存在暫存資料，回傳 Redis 的暫存資料與 `Cache Hit`。

# 參考資料
1. [TypeORM - Amazing ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases. Works in NodeJS, Browser, Ionic, Cordova and Electron platforms.](https://typeorm.io/)

# 編輯記錄
1. 2023-06-08
    - 開始進行 Test. RedisCache
    - 完成 Test. RedisCache