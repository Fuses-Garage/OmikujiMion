async function cc(interaction) {
	if (!interaction.isChatInputCommand()) return;
	var com
	switch (interaction.commandName) {
		case "ping":
			com = require("./commands/ping.js")
			com.execute(interaction)
			break;
		case "lgtm":
			com = require("./commands/lgtm.js")
			com.execute(interaction)
			break;
	}
	interaction.messageId
}
module.exports = cc;//メソッドを渡すよ
