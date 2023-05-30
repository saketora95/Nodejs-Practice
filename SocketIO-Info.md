# 概述
此為 `作業 - 8.1` 為前後端協作，所撰寫的 `Socket.IO` 簡要文件。

# 正文
## 基礎連線
- URL (localhost) : `http://localhost/chat`
- URL (ngrok) : `https://[ngrok_url]/chat`
- Param : `{transports: ['websocket']}`

## Client Emit Event 說明
此部分記錄由 client 主動 emit 的 event 的相關資訊。

### `msgToServer` event
使用者透過聊天室畫面發送聊天訊息時使用；Server 收到後會回應 `msgToClient` event。

- 注意事項
    - 在使用者決定名稱並進入 `room` 前，不可使用。

- 必要輸入 : 
    - `name` : 使用者登記的自訂名稱。
    - `room` : 使用者所處的 `room` 名稱。
    - `text` : 使用者輸入的聊天訊息。

- 範例輸入 : 
    ```
    {
        "name": "Tora", 
        "room": "test_room", 
        "text": "Hello"
    }
    ```

- Server 回應
    - Event 名稱 : `msgToClient`
    - 對象 : 所處 `room` 與 `msgToServer` event 中的 `room` 相同的 clients
    - 回應內容 : 
        - `name` : 發送聊天訊息的使用者的自訂名稱。
        - `room` : 發送聊天訊息的使用者所處的 `room` 名稱。
        - `text` : 發送聊天訊息的使用者輸入的聊天訊息。
    - 範例回應 : 
        ```
        {
            "name": "Tora", 
            "room": "test_room", 
            "text": "Hello"
        }
        ```

### `joinRoom` event
使用者決定加入某一個 `room` 時使用；Server 收到後會回應 `joinedRoom` 和 `roomMsg` event。

- 注意事項
    - 在使用者決定名稱前，不可使用。

- 必要輸入 : 
    - `name` : 使用者登記的自訂名稱。
    - `room` : 使用者要加入的 `room` 名稱。

- 範例輸入 : 
    ```
    {
        "name": "Tora", 
        "room": "test_room"
    }
    ```

- Server 回應 - 1
    - Event 名稱 : `joinedRoom`
    - 對象 : 發送 `joinRoom` event 的 client
    - 回應內容 : 
        - 使用者加入的 `room`。
    - 範例回應 : 
        ```
        test_room
        ```

- Server 回應 - 2
    - Event 名稱 : `roomMsg`
    - 對象 : 所處 `room` 與 `joinRoom` event 中的 `room` 相同的 clients
    - 回應內容 : 
        - `name` : 加入 `room` 的使用者的自訂名稱。
        - `room` : 加入的 `room` 名稱。
        - `text` : 使用者加入 `room` 的提示訊息。
        - `count` : 加入的 `room` 目前的 clients 數量。`1` 表示包含自己在內，共有 `1` 個 client 待在此 `room`。
    - 範例回應 : 
        ```
        {
            "name": "Tora", 
            "room": "test_room",
            "text": "加入了 [ test_room ] 聊天室"
            "count": 1
        }
        ```

### `leaveRoom` event
使用者決定離開某一個 `room` 時使用；Server 收到後會回應 `leftRoom` 和 `roomMsg` event。

- 注意事項
    - 在使用者決定名稱前，不可使用。

- 必要輸入 : 
    - `name` : 使用者登記的自訂名稱。
    - `room` : 使用者要離開的 `room` 名稱。

- 範例輸入 : 
    ```
    {
        "name": "Tora", 
        "room": "test_room"
    }
    ```

- Server 回應 - 1
    - Event 名稱 : `leftRoom`
    - 對象 : 發送 `leftRoom` event 的 client
    - 回應內容 : 
        - 使用者離開的 `room`。
    - 範例回應 : 
        ```
        test_room
        ```

- Server 回應 - 2
    - Event 名稱 : `roomMsg`
    - 對象 : 所處 `room` 與 `leaveRoom` event 中的 `room` 相同的 clients
    - 回應內容 : 
        - `name` : 離開 `room` 的使用者的自訂名稱。
        - `room` : 離開的 `room` 名稱。
        - `text` : 使用者離開 `room` 的提示訊息。
        - `count` : 離開的 `room` 目前的 clients 數量。`1` 表示不包含自己在內，共有 `1` 個 client 待在此 `room`。
    - 範例回應 : 
        ```
        {
            "name": "Tora", 
            "room": "test_room",
            "text": "離開了 [ test_room ] 聊天室"
            "count": 1
        }
        ```

## Server Emit Event 說明
此部分記錄由 server 主動 emit 的 event 的相關資訊。

### `emitTemp` event
當 server 接收到 `溫度` 資訊時，會主動 emit 至所有 clients。

- Server emit 內容
    - Event 名稱 : `emitTemp`
    - 對象 : 所有的 clients
    - 發送內容 : 
        - `value` : 接收到的溫度數值。
        - `timestamp` : server 當下的時間，為 `YYYY-MM-DD HH:mm:ss` 格式的字串。
    - 範例內容 : 
        ```
        {
            "value": 29.575, 
            "timestamp": "2023-05-26 11:43:59"
        }
        ```

### `emitHumi` event
當 server 接收到 `濕度` 資訊時，會主動 emit 至所有 clients。

- Server emit 內容
    - Event 名稱 : `emitHumi`
    - 對象 : 所有的 clients
    - 發送內容 : 
        - `value` : 接收到的濕度數值。
        - `timestamp` : server 當下的時間，為 `YYYY-MM-DD HH:mm:ss` 格式的字串。
    - 範例內容 : 
        ```
        {
            "value": 68.909, 
            "timestamp": "2023-05-26 11:43:59"
        }
        ```

# 編輯記錄
1. 2023-05-25 : 建立檔案並編寫，完成初版本。
2. 2023-05-30 : 修正錯字。