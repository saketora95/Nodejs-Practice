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