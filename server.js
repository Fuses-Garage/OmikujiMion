const express = require('express');//express使うよ
const server = express();

server.all('/', (req, res)=>{
res.send('bot稼働中…')
})
function keepAlive() {
server.listen(3000, ()=>{console.log("サーバーを建てたよ！")});
}
module.exports = keepAlive;