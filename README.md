# Nodejs-Practice
這是個人學習與練習 Node.js 所使用的 Repo。

# 練習記錄
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

# 參考資料
1. [[學習之路] Node.js 入門教學 | 洛奇的邪惡組織手札](https://summer10920.github.io/2020/12-30/article-nodejs/)
2. [javascript - NodeJS: How to get the server's port? - Stack Overflow](https://stackoverflow.com/questions/4840879/nodejs-how-to-get-the-servers-port)

# 編輯記錄
1. 2023-05-15 : 初次建立。
    - GET 'helloworld' 處理初步完成。
2. 