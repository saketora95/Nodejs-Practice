# 使用的 Image 名稱
FROM keymetrics/pm2:18-alpine

# 說明此 Dockerfile 的撰寫與維護者
LABEL maintainer="Kai"

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
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]