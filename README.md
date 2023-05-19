# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 6
1. 於本機端，經由 `Docker` 架設 `MariaDB` SQL server
2. 透過 `docker env`，設置 SQL server 連線用的帳號和密碼
3. 使用 `SQL client tool` 進行連線
4. 使用 `docker-compose` 部屬環境

# 練習記錄
## 於本機端，經由 `Docker` 架設 `MariaDB` SQL server
1. 於終端機中執行 `docker pull mariadb`，下載 MariaDB 的 image
2. 於終端機中執行 `docker run --name mariadb_tora -e MYSQL_ROOT_PASSWORD=tora1234 -d mariadb`
    - 以 image `mariadb` 建立名為 `mariadb_tora` 的 container，並設置密碼為 `tora1234`。

![MariaDB container 已經啟動](Image/01.png)

3. 於終端機中執行 `docker exec -it [Container ID] bash`，進入 MariaDB container 的終端機
    - 此步驟在擁有 `Docker Desktop` 的情形下，也可以直接到 `Docker Desktop` 使用  MariaDB container 的終端機。
4. 於終端機中執行 `mysql -u root -p` 進入 MariaDB，密碼對應於步驟 2 所設置
5. 於終端機中執行 `show databases;`，確認與 MariaDB 之間的互動

![確認 MariaDB container 狀況](Image/02.png)

## 透過 `docker env`，設置 SQL server 連線用的帳號和密碼
### 使用 `.env` 檔案
此作業中沒有使用到 NestJS 與 Redis，修改 `docker-compose.yml` 檔案，先將 NestJS 與 Redis 暫時撤掉相關設置；接著，設置 `MariaDB` 的 container，並透過 `env_file` 的設定，讓 `docker-compose` 使用 `mariadb.env` 內的設定。
```
# docker-compose 版本號碼
version: '3.8'

services:

  # MariaDB
  maria:
    image: mariadb
    ports:
      - 3306:3306
    env_file:
      - mariadb.env
```
完成 `docker-compose.yml` 檔案的修改後，建立 `mariadb.env` 檔案並供 `env_file` 讀取；在 `mariadb.env` 檔案中，設置 `root` 的密碼為 `1234`，並建立 user `tora`，將其密碼設為 `4321`。
```
MYSQL_ROOT_PASSWORD=1234

MYSQL_USER=tora
MYSQL_PASSWORD=4321
```

### 於 `docker-compose.yml` 內設定
與前段相同，修改 `docker-compose.yml` 檔案，但不是設置 `env_file`，而是設置 `environment`，將環境設定直接包入 `docker-compose.yml` 檔案之中。
```
# docker-compose 版本號碼
version: '3.8'

services:

  # MariaDB
  maria:
    image: mariadb
    ports:
      - 3306:3306
    environment:
      - MYSQL_ROOT_PASSWORD=1234
      - MYSQL_USER=tora
      - MYSQL_PASSWORD=4321
```

### 測試
1. 於終端機中執行 `docker-compose up --build` 建置並啟動環境
2. 同 `於本機端，經由 'Docker' 架設 'MariaDB' SQL server` 描述，操控 MariaDB container 的終端機並確認帳密設置正確

![透過設置的帳號與密碼登入](Image/03.png)

## 使用 `SQL client tool` 進行連線
在這邊使用 `VS Code` 的延伸模組 `MySQL` 進行連線。
1. 經由 `VS Code` 下載與安裝延伸模組 `MySQL`
2. 建立 SQL 連線
    - host : `localhost`
    - user : `root`
    - password : `1234`
    - port : `3306`
    - SSL : `(留空)`

![連線並取得資料](Image/04.png)

3. 執行 SQL 語法確認連線

![確認可以使用 SQL 語法](Image/05.png)

## 使用 `docker-compose` 部屬環境
在進行 `於本機端，經由 'Docker' 架設 'MariaDB' SQL server` 時，將 NestJS 與 Redis 設置暫時撤除；在復原並與 MariaDB container 合併後，於終端機中執行 `docker-compose up --build` 建置環境。

# 參考資料
1. [Docker安裝與建立MariaDB - HackMD](https://hackmd.io/@WL-WTIRiRlOr-R2wORqerA/ByiJz_6RD)
2. [env-file and MariaDB in docker-compose - Stack Overflow](https://stackoverflow.com/questions/53921335/env-file-and-mariadb-in-docker-compose)
3. [MySQL - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=formulahendry.vscode-mysql)
    

# 編輯記錄
1. 2023-05-19
    - 開始進行 Topic. 6。
    - 完成 `於本機端，經由 'Docker' 架設 'MariaDB' SQL server` 的目標。
    - 完成 `使用 'SQL client tool' 進行連線` 的目標。
    - 完成 `使用 'docker-compose' 部屬環境` 的目標。
    - 整理 `README.md` 並完成課題。
