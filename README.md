# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 9
1. 使用 `docker-compose` 建置 `MQTT broker server`
    - docker pull eclipse-mosquitto:2.0.14-openssl
2. 可以使用 `MQTT client tool(MQTTX)` 連上建置的 server
3. 需設置可以連線的帳號與密碼

# 練習記錄
## 建置環境
1. 建立 `mosquitto\config\mosquitto.conf` 檔案
    - `persistence` : 啟用後，將資料儲存於指定的位置，增加連線的穩定性。
    - `persistence_location` : 搭配 `persistence` 的設置，設定儲存的位置。
    - `log_dest file` : 將 log 儲存於指定的位置。
    - `listener` : 設置服務監聽的 port。
    - `allow_anonymous` : 在 `2.0` 之後預設不允許匿名使用者登入，設置為 `true` 方便初期測試。
```
persistence true
persistence_location /mosquitto/data/
log_dest file /mosquitto/log/mosquitto.log
listener 1883

allow_anonymous true
```
2. 修改 `docker-compose.yml` 檔案
    - 寫入 `MQTT` 的設定，並使用 `volumes` 掛載前面建立的 `mosquitto\config\mosquitto.conf` 檔案
```
  mosquitto:
    image: eclipse-mosquitto:2.0.14-openssl
    ports:
      - 1883:1883
      - 9001:9001
    volumes:
      - ./mosquitto:/mosquitto
```
3. 於終端機中執行 `docker-compose up --build`

## 環境測試
1. 使用 `MQTTX`，建立 `local` 與 `local-2` 兩個連線並連線至 `mqtt://localhost:1883`
2. 設置兩個連線 subscribe `msgTest`，並由其中一者（`local-2`）發送相同 topic 的訊息，確認是否有成功接收
    - `local-2` 發送的訊息，在 `local` 成功收到。
    ![local 收到 local-2 的訊息](Image/01.png)
    - `local-2` 同樣 subscribe 了 `msgTest`，因此同樣也有收到訊息。
    ![同樣收到訊息的 local-2](Image/02.png)

## 設置帳號與密碼
1. 於 container 的終端機中執行 `mosquitto_passwd -c /mosquitto/config/passwd_file tora`
    - 基於 `-c` 新建一個帳密檔案，會取代掉已經存在的檔案，若只是添加可以去掉這個參數。
    - 新建或添加資料的帳密檔案於 `/mosquitto/config/passwd_file`。
    - 在該檔案內部加上 user `tora` 的帳密資料。
2. 修改 `mosquitto\config\mosquitto.conf` 檔案
    -  將 `allow_anonymous` 設為 `false`，取消匿名使用者的登入功能。
    -  添加 `password_file /mosquitto/config/passwd_file`，以讀取帳密檔案的設置。

## 登入驗證
從下圖可以觀察到登入的狀況：
- 第 `6 - 7` 行 : 嘗試連線，但因為沒設置連線的帳號與密碼，被阻擋下來。
- 第 `8 - 9` 行 : 使用前面設置的 `tora` 和密碼，順利連線。

![從 log 觀察登入狀況](Image/03.png)

# 參考資料
1. [[MQTT] Mosquitto Docker 架設與設定詳細過程 | 薛惟仁 筆記本](https://weirenxue.github.io/2021/07/01/mqtt_mosquitto_docker/)
2. [vvatelot/mosquitto-docker-compose: A simple Mosquitto Docker Compose template](https://github.com/vvatelot/mosquitto-docker-compose)
3. [Configuring the Mosquitto MQTT Docker container for use with Home Assistant — Home Automation Guy](https://www.homeautomationguy.io/blog/docker-tips/configuring-the-mosquitto-mqtt-docker-container-for-use-with-home-assistant)

# 編輯記錄
1. 2023-05-24
    - 開始進行 Topic. 9。
    - 完成 Topic. 9。
