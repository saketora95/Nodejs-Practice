# 概述
此為 `作業 - 8.1` 為前後端協作，所撰寫的 `Socket.IO` 簡要文件。

# 正文
## 基礎連線
- URL (localhost) : `http://localhost/chat`
- URL (ugrok) : `https://[ngrok_url]/chat`
- Param : `{transports: ['websocket']}`

## Event (Client -> Server)
### `msgToServer` event
使用者透過聊天室畫面發送聊天訊息時使用。

- 注意事項
    - 在使用者決定名稱並進入 `room` 前，不可使用。

- 必要輸入 : 
    - `name` : 使用者登記的自訂名稱。
    - `room` : 使用者所處的 `room`。
    - `text` : 使用者輸入的聊天訊息。

- 範例輸入 : 
    ```
    {
        "name": "Tora", 
        "room": "test_room", 
        "text": "Hello"
    }
    ```

- Server 回應（[123](#msgtoserver-event)）
    - Event 名稱 : `msgToClient`
    - 對象 : `room` 與 `msgToServer` event 中的 `room` 相同的 clients
    - 回應內容 : 
        - `name` : 發送聊天訊息的使用者的自訂名稱。
        - `room` : 發送聊天訊息的使用者所處的 `room`。
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
使用者決定加入某一個 `room` 時使用。

- 注意事項
    - 在使用者決定名稱前，不可使用。

- 必要輸入 : 
    - `name` : 使用者登記的自訂名稱。
    - `room` : 使用者所處的 `room`。
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
    - 對象 : `room` 與 `msgToServer` event 中的 `room` 相同的 clients
    - 回應內容 : 
        - `name` : 發送聊天訊息的使用者的自訂名稱。
        - `room` : 發送聊天訊息的使用者所處的 `room`。
        - `text` : 發送聊天訊息的使用者輸入的聊天訊息。
    - 範例回應 : 
        ```
        {
            "name": "Tora", 
            "room": "test_room", 
            "text": "Hello"
        }
        ```


## Event (Server -> Client)

### `msgToClient` event

heee

# 編輯記錄
1. 2023-05-25 : 建立檔案並編寫。