# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 3
1. 使用 `PM2` 啟動 `cluster` 模式
2. 接著使 `PM2` 啟動 4 個 application process

# 練習記錄
## 安裝環境
於終端機中執行下列命令安裝相關套件：
```npm install pm2@latest -g```

## 啟動專案
1. 於終端機中執行 `npm run build`，確保 NestJS 的專案已經建置（build）完成
2. 於終端機中執行 `pm2 start dist/main.js --name <application_name>`
    - 完成建置的 NestJS 專案，可以透過 PM2 執行 `dist/main.js`。
    - 在 `--name` 後面設置合適的名稱。

![PM2 執行結果](Image/01.png)

## 啟動 cluster
在啟動 `PM2` 的指令中加上 `-i [數量]`，使其啟動 `cluster` 模式並具有 4 個 application process：
```
pm2 start dist/main.js --name Topic3 -i 4
```
![啟動 Cluster 模式](Image/02.png)

# 參考資料
1. [好 pm2, 不用嗎？. pm2 是 Node.js 的程序管理器，可以利用多程序達到類平衡負載以及 0… | by Ray Lee | 李宗叡 | Learn or Die | Medium](https://medium.com/learn-or-die/%E5%A5%BD-pm2-%E4%B8%8D%E7%94%A8%E5%97%8E-fc7434cc8821)
2. [Deploy Nest JS App using PM2 on Linux (Ubuntu) Server - DEV Community](https://dev.to/deadwin19/deploy-nest-js-app-using-pm2-on-linux-ubuntu-server-88f)
3. [使用 pm2 啟動 Node.js cluster 以提升效能. pm2 是一個管理 Node.js process… | by Larry Lu | Larry・Blog](https://larrylu.blog/nodejs-pm2-cluster-455ffbd7671)

# 編輯記錄
1. 2023-05-16
    - 開始進行 Topic. 3。
    - 完成 `使用 'PM2' 啟動 'cluster' 模式` 的目標。
    - 完成 `使 'PM2' 啟動 4 個 application process` 的目標。
    - 整理 `README.md` 並完成課題。
