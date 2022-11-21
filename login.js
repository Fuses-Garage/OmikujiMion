
const { Client, GatewayIntentBits, SharedSlashCommandOptions, Guild, inlineCode } = require("discord.js");//discord.jsを読み込むよ
function LoginC(client) {//ログイン処理の中身だよ
	return new Promise(async (resolve, reject) => {	//実行結果が返り値だよ
		setTimeout(() => {
			reject(new Error("timeout"))

		}, 5000)	//五秒以内に終わらなかったらエラー吐くよ
		const token = process.env['BOTTOKEN']
		console.log("ログインを開始するよ。")
		await client.login(token)//ログインするよ
		console.log("ログインが完了したよ！");
		resolve("a")//正常実行
	})
}
module.exports = LoginC;//メソッドを渡すよ