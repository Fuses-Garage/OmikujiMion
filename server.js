const express = require('express');//express使うよ
const server = express();

server.all('/', (req, res) => {
	res.send('<center>Your bot is alive!</center>')//リクエストあったらHTML還すよ
})
function keepAlive() {
	server.listen(3000, () => { console.log("Server is ready!") });
}
module.exports = keepAlive;