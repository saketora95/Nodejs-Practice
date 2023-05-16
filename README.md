# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 4
1. 安裝 `Docker` 與 `Docker Compose`
2. 撰寫 `Dockerfile`
3. 使用 `docker-compose` 啟動開發環境

# 練習記錄
## 安裝環境
1. 個人是使用 `Windows 11` 環境
2. 於 [Docker 官方網站](https://www.docker.com/) 中下載 `Docker Desktop`
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

## 建置 Docker 容器與測試
1. 於終端機中執行 `docker build -t topic4 .` 並等候建置完成
    - `-t topic4` 用於設定容器名稱為 `topic4`。
2. 於終端機中執行 `docker image ls` 確認
![Docker 容器建置結果](Image/01.png)
3. 於終端機中執行 `docker run -d -p80:4000 topic4`
    - `-d` : 於背景執行。
    - `-p` : 設置 port，`4000` 對應於先前練習時使用的 port。
4. 連入 `http://localhost/doc` 即可看到先前在 `Topic. 2` 中設置的 Swagger 文件
    - 因 `-p80:4000` 的設定，使 `Docker` 會將容器的 `4000` port 映射至主機的 `80` port

![連入透過 Docker 啟動的專案](Image/02.png)

## 使用 `Docker Compose` 啟動開發環境
1. 建立 `docker-compose.yml` 檔案
2. 在 `docker-compose.yml` 檔案中填入以下內容：
```
version: '1'
services:
  node:
    build:
      dockerfile: Dockerfile
    ports:
      - 80:4000
```
3. 於終端機中執行 `docker-compose up` 啟動

![使用 Docker Compose 啟動成功](Image/03.png)

# 參考資料
1. [Ultimate Guide: NestJS Dockerfile For Production [2022]](https://www.tomray.dev/nestjs-docker-production)
2. [Docker Desktop WSL 2 backend on Windows | Docker Documentation](https://docs.docker.com/desktop/windows/wsl/)
3. [Day5: 實作撰寫第一個 Dockerfile - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10191016)
4. [What does "copy . ." mean? - Docker Hub - Docker Community Forums](https://forums.docker.com/t/what-does-copy-mean/74121/6)
5. [【Day 3】 -  Docker 基本指令操作 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10186431)

# 編輯記錄
1. 2023-05-16
    - 開始進行 Topic. 4。
    - 完成 `安裝 'Docker' 與 'Docker Compose'` 的目標。
    - 完成 `撰寫 'Dockerfile'` 的目標。
    - 完成 `使用 'Docker Compose' 啟動開發環境` 的目標。
    - 整理 `README.md` 並完成課題。