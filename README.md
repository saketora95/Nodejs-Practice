# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 12
1. 接收 SUNIX AI Device Port 的數據
2. 連接 SUNIX DI/O Device Port 與指示燈
3. 依據接收到的 SUNIX AI Device Port 數據，透過 SUNIX DI/O Device Port 設置指示燈的狀態。
    - 數據 `0.0 ~  4.0` 時，指示燈點亮 `黃色燈光`；
    - 數據 `4.1 ~  6.0` 時，指示燈點亮 `綠色燈光`；
    - 數據 `6.1 ~ 10.0` 時，指示燈點亮 `紅色燈光`，並且當數據達 `9.0` 以上時，會另有蜂鳴器響起。
4. 連接 SUNIX RS-422/485 Device Port 與 DTB4848 溫控器
5. 經由 Modbus Protocol，讀取 DTB4848 溫控器的溫度與軟體版本，並變更


# 練習記錄 [課題 1 - 3]
## 設備連接
依照指示，繪製簡圖與連接設備：
![設備連接簡圖](Image/01.png)

## 連接 MQTT Broker Server
### 基礎連線
修改 `ecosystem.config.js`，於 `env` 中設置 MQTT Broker Server 的連線資訊。

### 接收與發送數據
1. 修改 `src\message-event\message.service.ts` 檔案，設置點亮指示燈與開啟蜂鳴器的函數
    - 於 `constructor` 中，注入先前設置的 `MQTT_CLIENT`。
    ```
    constructor(
        @Inject('MQTT_CLIENT') private mqttClient: ClientProxy
    ) {}
    ```
    - 設置 `setLight` 函數，依據傳入的數值，產生一個 boolean array，並將此 array 轉給 `publishLightSetting` 函數進行發佈。
        - 數據為 `0.0 ~  4.0` 時，點亮黃光（紅線與綠線，即 DO1 與 DO3）；
        - 數據為 `4.1 ~  6.0` 時，點亮綠光（綠線，即 DO3）；
        - 數據為 `6.1 ~  10.0` 時，點亮紅光（紅線，即 DO1）；
        - 數據為 `9.0` 以上時，點亮紅光並響起蜂鳴（紅線與紫線，即 DO1 與 DO4）。
        - 範例：數據為 `9.5` 時，會產生 `[true, false, false, true]`。
    - 設置 `publishLightSetting` 函數，依據傳入的 boolean array，發佈訊息到指定的 Topic。
    ```
    this.mqttClient.emit(
        tatgetTopic, 
        {
            params: {
                stream: "DO",
                type: "bool",
                data: signal[i]
            }
        }
    );
    ```
2. 修改 `src\message-event\message.controller.ts` 檔案，訂閱來源數據的 Topic，並將數據轉給前述的 `setLight` 函數
```
import { MessageService } from './message.service';
...
constructor(
    private readonly msgGateway: MessageGateway,
    private readonly sunixService: MessageService
) {}

@MessagePattern('SUNIX/26:00:01_EZG1300/97:00:fb_EZR5231/GET/AI_INTERFACE/CH_01')
receiveData_EZG1300_AI_01(@Payload() payload: number[], @Ctx() context: MqttContext) {
    this.sunixService.setLight(payload);
}
```
3. 新建 `src\message-event\mqtt.serializer.ts` 檔案：
```
import { Serializer, OutgoingResponse } from '@nestjs/microservices';

export class OutboundResponseSerializer implements Serializer {
    serialize(value: any): OutgoingResponse {
        return value.data;
    }
}
```
4. 修改 `src\message-event\message.module.ts` 檔案，於 `MQTT_CLIENT` 的 `options` 中追加 `serializer: new OutboundResponseSerializer()`

#### 使用 serializer 的原因
若無設置 `serializer`，在發佈訊息的 `this.mqttClient.emit` 函數會傳出以下訊息：
```
{
    pattern: 'SUNIX/26:00:01_EZG1300/9a:00:c5_EZR5002/SET/DO_INTERFACE/CH_01',
    data: { params: { stream: 'DO', type: 'bool', data: false } }
}
```
發佈的訊息會由 `pattern` 與 `data` 構成，但這樣的結構不被設備接受，因此要調整成單有 `{ params: { stream: 'DO', type: 'bool', data: false }` 一段；經由 `src\message-event\mqtt.serializer.ts` 檔案的設置，`return value.data` 僅回傳了期望發佈的部分，藉此配合設備需求的結構。

## 實際測試
透過訊號產生器產生電壓訊號，經由 SUNIX AI Device Port 接收並發佈至 MQTT Broker Server；之後經由 NestJS 訂閱指定 Topic，對接收到的數據進行邏輯處理，以發佈對應的訊息給 SUNIX DI/O Device Port。
![指示燈如預期運作](Image/02.png)

# 練習記錄 [課題 4 - 5]
此段落為 2023-06-01 新增課題的記錄。

## 設備連接
依照指示，繪製簡圖與連接設備：
![設備連接簡圖](Image/03.png)

slaveId command offset(high) offset(low) length(high) length(low) CRC 
01 03 00 00 00 01

# 參考資料
1. [三泰科技 - 雲服務轉譯器Gateway](https://www.sunix.com/tw/product_detail.php?cid=2&kid=4&gid=25&pid=2110)
2. [Draw.io (Diagrams.net)](https://app.diagrams.net/)
3. [三泰科技 - 遠端I/O模組](https://www.sunix.com/tw/product_detail.php?cid=2&kid=4&gid=27&pid=2009)
4. [三用電表如何表測直流電流？ (2021/6/18 修補版) @ Ray痞Blog~ :: 痞客邦 ::](https://promiserobert.pixnet.net/blog/post/228861560-%E4%B8%89%E7%94%A8%E9%9B%BB%E8%A1%A8%E5%A6%82%E4%BD%95%E8%A1%A8%E6%B8%AC%E7%9B%B4%E6%B5%81%E9%9B%BB%E6%B5%81%EF%BC%9F)
5. [SUNIX - 遠端I/O模組](https://www.sunix.com/en/product_detail.php?cid=2&kid=4&gid=27&pid=2024)
6. [RQ-85-明緯企業股份有限公司-交換式電源供應器製造商](http://www.meanwell.com.tw/productPdf.aspx?i=379)
7. [typescript - Nestjs ClientMqtt.emit publish both pattern and data to broker rather than only data - Stack Overflow](https://stackoverflow.com/questions/67485078/nestjs-clientmqtt-emit-publish-both-pattern-and-data-to-broker-rather-than-only)
8. [三泰科技 - 遠端I/O模組](https://www.sunix.com/tw/product_detail.php?cid=2&kid=4&gid=27&pid=2040)
9. [DTB 系列溫度控制器操作手冊](https://filecenter.deltaww.com/Products/download/06/060405/Manual/DELTA_IA-TC_DTB_I_TSET_20140421.pdf)

# 編輯記錄
1. 2023-05-30
    - 開始進行 Topic. 12
2. 2023-05-31
    - 完成 Topic. 12
3. 2023-06-01
    - 新增課題目標 [4] 與 [5]
    - 持續進行 Topic. 12