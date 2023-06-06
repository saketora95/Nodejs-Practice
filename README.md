# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# Test. RedisMutex 概述
透過 `Redis SET NX` 建立互斥鎖，避免資料的 `race condition` 狀況發生。

# 測驗目標
1. `Redis` 中預設存有 `{"treasure": 100}` 資料
2. 具備一支 API，可以使 `treasure` 的數值增加，並回傳數值給使用者
3. 一旦 `treasure` 的數值被 API 改變，`10` 秒內無論 API 被呼叫多少次，`treasure` 的數值都無法再變動

# 過程記錄


# 參考資料
1. [[Day 25] 用Redis當鎖？你確定？ - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10298305)
2. [SETNX | Redis](https://redis.io/commands/setnx/)
3. [SET | Redis](https://redis.io/commands/set/)

# 編輯記錄
1. 2023-06-06
    - 開始進行 Test. RedisMutex