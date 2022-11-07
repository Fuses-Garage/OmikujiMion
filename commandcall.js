async function cc(interaction){//コマンド入力時の処理
	if (!interaction.isChatInputCommand()) return;//念のためコマンドか確認
	switch(interaction.commandName){//コマンド名で分岐
		case "ping":
			const com = require("./commands/ping.js")//対応するモジュールを読み込み
			com.execute(interaction)//実行
			break;
	}
}
module.exports = cc;//メソッドを渡すよ
