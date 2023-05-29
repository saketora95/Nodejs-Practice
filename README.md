# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 11
1. 使用 `SUNIX EZG1300 Gateway`，並可以跟指定的 broker server 連線
2. 透過 `MQTT Client Tool` 接收來自 device port 所產生的資料 (AI/DI)

# 練習記錄
## 連接設備
### Gateway 與 Switch
1. 依照指示，連接設備間的基礎線路與通電：
![基礎連線簡圖](Image/01.png)
2. 由於 Gateway 設備已經設定為 DHCP 模式，使用 `IP Scanner` 找尋 IP
    - 尋得 IP：`192.168.0.17`。

### Analog Interface 連接
#### 接收電流訊號
1. 依照指示，連接 `EZR5231`（Device Port）與 `SG-002`（訊號產生器）
    - 連接電表測試電流時，以串連連接。
    - 不連接電表時，接上 `EZR5231 AI1+` 與 `SG-002 AIo`。
![與設備串連連接](Image/02.png)
1. 設置 `SG-002` 的 `F002` 參數
    - 0 : 0 - 20 mA
    - 1 : 4 - 20 mA
    - 2 : 0 - 24 mA
2. 於 Gateway 後臺的 Communication 中，修改 Channel 的設定，使其接收電流訊號（`Measure Mode: Current`）
3. 調整 `EZR5231` 內部的跳針設置，電流模式應改為 2 與 3

#### 接收電壓訊號
1. 依照指示，連接 `EZR5231`（Device Port）與 `SG-002`（訊號產生器）
    - 連接電表測試電流時，以並連連接。
    - 不連接電表時，分開接上 `EZR5231 AI1+` 與 `SG-002 AVo`，以及 `EZR5231 AI1-` 與 `SG-002 GND`；於附圖中使用 WAGO 的情形時，撤掉電表的探針即可。
![與設備串連連接](Image/03.png)
2. 於 Gateway 後臺的 Communication 中，修改 Channel 的設定，使其接收電壓訊號（`Measure Mode: Voltage`）
3. 調整 `EZR5231` 內部的跳針設置，電壓模式應改為 1 與 2

## 與 broker 連線
於前段已經完成設備的線路連接，進入 `SUNIX EZG1300 Gateway` 後臺的 `Communication` 標籤中，設置伺服器相關資料即可。
![已與 broker 達成連線](Image/04.png)

# 參考資料
1. [三泰科技 - 雲服務轉譯器Gateway](https://www.sunix.com/tw/product_detail.php?cid=2&kid=4&gid=25&pid=2110)
2. [Draw.io (Diagrams.net)](https://app.diagrams.net/)
3. [三泰科技 - 遠端I/O模組](https://www.sunix.com/tw/product_detail.php?cid=2&kid=4&gid=27&pid=2009)
4. [三用電表如何表測直流電流？ (2021/6/18 修補版) @ Ray痞Blog~ :: 痞客邦 ::](https://promiserobert.pixnet.net/blog/post/228861560-%E4%B8%89%E7%94%A8%E9%9B%BB%E8%A1%A8%E5%A6%82%E4%BD%95%E8%A1%A8%E6%B8%AC%E7%9B%B4%E6%B5%81%E9%9B%BB%E6%B5%81%EF%BC%9F)

# 編輯記錄
1. 2023-05-26
    - 開始進行 Topic. 11
2. 2023-05-29
    - 持續進行 Topic. 11
