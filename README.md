# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 14
1. 透過 Docker 部屬 Nginx
2. 透過 Nginx 存取 Application Server
3. 介紹 Nginx 的 Load Balancing 機制

# 練習記錄
## 設置 nginx 的 conf 檔案
新建 `nginx.conf` 檔案，並填入：
```
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://node:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 調整 `docker-compose.yml` 檔案
1. NestJS container `node`
    - NestJS 在先前課題中採用了 `4000` port，而後續使用 `docker-compose` 時，則設置了 `80:4000` 於這個 container。
    - 為了讓出 `80` port 並確認 Nginx 的運作是否符合預期，更改為 `4000:4000`。
2. Nginx container `nginx`
    - 透過 `volumes` 掛載前面設定的 `.conf` 設定檔，並取代預設的設定檔。
    ```
    nginx:
        image: nginx:mainline-alpine3.17-slim
        ports:
            - 80:80
        volumes:
            - ./nginx.conf:/etc/nginx/conf.d/default.conf
        networks:
            - nest-network
        environment:
            - TZ=Asia/Taipei
    ```

## 測試環境
於終端機中執行 `docker-compose up --build` 建置環境並啟動，並連上 `localhost` 進行測試：
![NestJS 的網頁如預期出現](Image/01.png)

# 參考資料
1. [[基礎觀念系列] Web Server & Nginx — (1) | by 莫力全 Kyle Mo | Starbugs Weekly 星巴哥技術專欄 | Medium](https://medium.com/starbugs/web-server-nginx-1-cf5188459108)
2. [[基礎觀念系列] Web Server & Nginx — (2) | by 莫力全 Kyle Mo | Starbugs Weekly 星巴哥技術專欄 | Medium](https://medium.com/starbugs/web-server-nginx-2-bc41c6268646)
3. [Containerizing and load balancing a NestJS application with Docker and Nginx | by Yathartha Goenka | Medium](https://medium.com/@yatharthagoenka/containerizing-and-load-balancing-a-nestjs-application-with-docker-and-nginx-984aa5563caa)
4. [node.js - nginx: connect() failed (111: Connection refused) while connecting to upstream - Server Fault](https://serverfault.com/questions/529394/nginx-connect-failed-111-connection-refused-while-connecting-to-upstream)


# 編輯記錄
1. 2023-06-02
    - 開始進行 Topic. 14