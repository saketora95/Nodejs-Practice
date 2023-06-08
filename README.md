# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# Test. RedisMutex 概述
透過 `Redis SET NX` 建立互斥鎖，避免資料的 `race condition` 狀況發生。

# 測驗目標
1. `Redis` 中預設存有 `{"treasure": 100}` 資料
2. 具備一支 API，可以使 `treasure` 的數值增加，並回傳數值給使用者
3. 一旦 `treasure` 的數值被 API 改變，`10` 秒內無論 API 被呼叫多少次，`treasure` 的數值都無法再變動

# 過程記錄
## 接收請求
修改 `src\redis-api\redis-api.controller.ts` 檔案，設置監聽 API 位址的函數：
```
// Mutex
@Get('mutex/treasure')
async getTreasure(): Promise<string> {
    return await this.redisAPIService.getTreasure();
}
```

## 處理請求
修改 `src\redis-api\redis-api.service.ts` 檔案，設置 `getTreasure` 函數進行處理：
- 使用 `get('treasureMutex')` 取得 `treasureMutex` 的數值。
    - 為 `null` 表示互斥鎖已經消失，可以對 `treasure` 進行處理。
        - 使用 `set('treasureMutex', true, { ttl: 10 } as any)` 先行加上互斥鎖。
        - 使用 `get('treasure')` 檢查 `treasure` 的數值。
        - 若為 `null` 則設置為 `初始值 (100) + 1`，若已有數值則將 `+ 1`；並將結果回傳給請求來源。
    - 為 `true` 或其他數值表示互斥鎖仍存在，不可以對 `treasure` 進行處理。
        - 使用 `get('treasure')` 直接回傳 `treasure` 的數值。

## 使用 `Redis SET NX` 建立
- 由於原先使用的 `cache-manager` 沒有找到相關的文章，轉以使用 `@liaoliaots/nestjs-redis` 進行。
1. 修改 `src\app.module.ts` 檔案，在 `imports` 中加入 `RedisModule.forRoot`
2. 修改 `src\redis-api\redis-api.service.ts` 檔案：
    - 宣告 `private readonly redis: Redis;` 並於 `constructor` 中建立連線。
        ```
        constructor(
            private readonly redisService: RedisService
        ) {
            this.redis = this.redisService.getClient();
        }
        ```
    - 修改 `getTreasure` 函數：
        - 以 `if ((await this.redis.set('tLock', '1', 'EX', 10, 'NX')) === 'OK')` 設置互斥鎖，並同時用於供 if 判斷目前是否為上鎖狀態。
            - 若 `set` 執行成功，表示尚未上鎖，可以改動數值。
                - 以 `parseInt(await this.redis.get('treasure'))` 取得 `treasure` 數值。
                - 以 `if (isNaN(treasureValue))` 防止 `treasure` 數值尚未初始化。
                - 後依據情形設置初始值或提高數值，並回傳給使用者。
            - 若 `set` 執行失敗，表示仍在鎖定狀態，不可以改動數值。
                - 以 `await this.redis.get('treasure')` 取得數值後，直接回傳給使用者。

# 參考資料
1. [[Day 25] 用Redis當鎖？你確定？ - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10298305)
2. [SETNX | Redis](https://redis.io/commands/setnx/)
3. [SET | Redis](https://redis.io/commands/set/)
4. [Upgrade redis to v4 · Issue #40 · dabroek/node-cache-manager-redis-store](https://github.com/dabroek/node-cache-manager-redis-store/issues/40#issuecomment-1318816820)
5. [liaoliaots/nestjs-redis at fc697638af9ecf80ad2992a923047c626f2bf95b](https://github.com/liaoliaots/nestjs-redis/tree/fc697638af9ecf80ad2992a923047c626f2bf95b)

# 編輯記錄
1. 2023-06-06
    - 開始進行 Test. RedisMutex
2. 2023-06-07
    - 完成 Test. RedisMutex
2. 2023-06-08
    - 改善 Test. RedisMutex