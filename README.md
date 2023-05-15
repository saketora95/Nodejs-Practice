# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 課題 Topic. 1
1. 使用 `Node.js` 與 `NestJS` 建立 API
    - 以 `4000` 為 port
    - API 名為 `helloword` 並採用 `GET`
    - 回傳 `Hello World!`
2. 使用 `ngrok` 令 API 可以經由外部連入

# 練習記錄
## 使用 Node.js 建立 API
參照 [參考資料 [1]](https://summer10920.github.io/2020/12-30/article-nodejs/)，於 [立相依關係的應用](https://summer10920.github.io/2020/12-30/article-nodejs/#%E7%AB%8B%E7%9B%B8%E4%BE%9D%E9%97%9C%E4%BF%82%E7%9A%84%E6%87%89%E7%94%A8) 一段中確認到了 `Node.js` 監聽的方式：
```
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```
使用 `npm install express` 補足初次使用缺少的套件，接著配合練習題目的要求進行調整：
```
const express = require('express');
const app = express();

// 監聽 GET 'helloworld' 並印出對應資料
app.get('/helloworld', (req, res) => {
    res.send('Hello World!')
})

// port 設置為 4000
var hello_world = app.listen(4000, function(){
    console.log('Listening on port ' + hello_world.address().port);
});
```
透過 `node app.js` 執行並連入 `http://localhost:4000/helloworld`；結果如圖：
![Node helloworld API](/Image/01.png)

## 使用 ngrok 供外部連入
1. 於終端機中執行 `choco install ngrok` 安裝 `ngrok`
2. 自 `ngrok` 的 dashboard 中取得認證金鑰
3. 於終端機中執行 `ngrok config add-authtoken` 設定認證金鑰
4. 於終端機中執行 `ngrok http 4000`，使其指向 `http://localhost:4000`
5. 連入 `[ngrok 提供的網址]/helloworld` 確認結果
![成功透過 ngrok 連入](/Image/02.png)

## 使用 Node.js 與 NestJS 建立 API
### 安裝 NestJS 與建立預設 App
1. 於終端機中執行 `npm install -g @nestjs/cli` 安裝 `NestCLI`
2. 於終端機中執行 `nest new hello-world` 建立預設的 App 架構
3. 於終端機中執行 `cd hello-world` 移動至新建的 App 資料夾內
4. 於終端機中執行 `npm run start`，並連入 `http://localhost:3000/` 確認運轉
![Nest App 初步建立](/Image/03.png)

### 調整/建置以符合要求
1. 修改 `src\main.ts`，使其監聽 port 與目標相同
```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 自 3000 變更為 4000
  await app.listen(4000);
}
bootstrap();
```
2. 於終端機中執行 `nest generate controller helloworld` 建置 `Controller`
3. 修改 `src\helloworld\helloworld.controller.ts` 以符合要求
```
import { Controller, Get } from '@nestjs/common';

@Controller('helloworld')
export class HelloworldController {
    @Get()
    getHelloWorld() {
        return 'Hello World!';
    }
}
```
4. 再次使用 `ngrok` 供外部連入
![轉為 NestJS 亦成功透過 ngrok 連入](/Image/04.png)

# 參考資料
1. [[學習之路] Node.js 入門教學 | 洛奇的邪惡組織手札](https://summer10920.github.io/2020/12-30/article-nodejs/)
2. [javascript - NodeJS: How to get the server's port? - Stack Overflow](https://stackoverflow.com/questions/4840879/nodejs-how-to-get-the-servers-port)
3. [[Day-37] 使用 ngrok 讓外網連接你的 API - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10197345)
4. [[NestJS 帶你飛！] DAY02 - Hello NestJS - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10265810)
5. [[NestJS 帶你飛！] DAY03 - Controller (上) - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10266653)

# 編輯記錄
1. 2023-05-15
    - 建立 Repo。
    - 完成 `使用 Node.js 建立 API` 的目標。
    - 完成 `使用 ngrok 供外部連入` 的目標。
    - 完成 `使用 Node.js 與 NestJS 建立 API` 的目標。
    - 整理 `README.md` 並完成課題。
    - 標記課題編號。
    - 整理 `README.md`。
