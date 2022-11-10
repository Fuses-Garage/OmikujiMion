async function cc(interaction){
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
	switch(interaction.commandName){
		case "ping":
			const com = require("./commands/ping.js")
			com.execute(interaction)
			break;
	}
	interaction.messageId
}
module.exports = cc;//メソッドを渡すよ
