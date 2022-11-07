const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()//コマンドのデータ
		.setName('ping')//コマンドの識別名（一意）
		.setDescription('テスト用のコマンドだよ。'),//コマンドの説明文
	async execute(interaction) {//実行時の処理
		await interaction.reply('Pong!');//Pong!と返信
	},
};