const { REST, Routes } = require('discord.js');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// コマンドファイルの中のjsファイルを引っ張り出す
for (const file of commandFiles) {//すべてのファイルから
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());//データを引っ張り出しJSONで格納
}
token=process.env['BOTTOKEN']
cid=process.env['CliID'].toString()
//コマンドの登録にはトークンとクライアントIDが必要
const rest = new REST({ version: '10' }).setToken(token);
async function deploy(sid){//サーバーIDが引数
	(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(cid, sid
										   ),
			{ body: commands },
		);
		//片っ端から登録
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
}
module.exports = deploy;//メソッドを渡すよ