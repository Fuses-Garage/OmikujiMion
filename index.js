const { exec } = require('child_process')//再起動に必要だよ
const token = process.env['BOTTOKEN']//トークンを取得するよ
const keepAlive = require("./server.js")//24時間稼働に必要だよ
const log = require("./login.js")//24時間稼働に必要だよ
const { Client, Intents, Events } = require('discord.js');
const Discord = require("discord.js");
const client = new Client({ intents: [32767] });
if(token!=null){//トークンが設定されてたら

	(async () => { // ログイン処理を行うよ
		const re=await log(client)
			.catch((e) => {//タイムアウトしたら
	    	    exec("kill 1")//再起動するよ
	    	});
	})()
} 
 client.once('ready', async () => {//ログイン出来たら
	console.log('Ready!');//コンソールにメッセージ
	client.user.setActivity('!edumaid')//アクティビティを設定するよ
	const dep=require("./deploy.js")
	const gs = client.guilds.cache
	const date = new Date()
	gs.forEach(async function(g) {
		dep(g.id.toString())
	});
 })
client.on(Events.InteractionCreate, async interaction => {
	const cc=require("./commandcall.js")
	cc(interaction)
});
keepAlive();//webサーバーを建てるよ