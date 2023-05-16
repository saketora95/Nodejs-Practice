# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 4
1. 安裝 `Docker` 與 `Docker Compose`
2. 撰寫 `Dockerfile`
3. 使用 `Docker Compose` 啟動開發環境

# 練習記錄
## 安裝環境
1. 個人是使用 `Windows 11` 環境
2. 於 [`Docker` 官方網站](https://www.docker.com/) 中下載 `Docker Desktop`
3. 安裝 `Docker Desktop`
4. 依照指示於終端機中執行 `wsl --update` 以安裝 `Windows Subsystem for Linux`

## 撰寫 Dockerfile
1. 建立 `Dockerfile` 檔案
2. 在 `Dockerfile` 檔案中填入以下內容：
```
# 使用的 Image 名稱
FROM node:18

# 說明此 Dockerfile 的撰寫與維護者
MAINTAINER Kai

# 建立 App 的資料夾
WORKDIR /usr/src/app

# 複製內容（package.json 與 package-lock.json）
COPY package*.json ./

# 安裝所需套件
RUN npm install

# 複製當前所在的資料到 Docker 容器之中
COPY . .

# 建置專案
RUN npm run build

# 透過建置後的檔案啟動專案
CMD [ "node", "dist/main.js" ]
```

# 參考資料
1. [Ultimate Guide: NestJS Dockerfile For Production [2022]](https://www.tomray.dev/nestjs-docker-production)
2. [Docker Desktop WSL 2 backend on Windows | Docker Documentation](https://docs.docker.com/desktop/windows/wsl/)
3. [Day5: 實作撰寫第一個 Dockerfile - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10191016)
4. [What does "copy . ." mean? - Docker Hub - Docker Community Forums](https://forums.docker.com/t/what-does-copy-mean/74121/6)

# 編輯記錄
1. 2023-05-16
    - 開始進行 Topic. 4。
    - 完成 `安裝 'Docker' 與 'Docker Compose'` 的目標。
    - 完成 `撰寫 'Dockerfile'` 的目標。
2. 待進行項目：
    - 完成 `使用 'Docker Compose' 啟動開發環境` 的目標。
    - 整理 `README.md` 並完成課題。