const { SlashCommandBuilder,AttachmentBuilder } = require('discord.js');
const { createCanvas ,loadImage} = require('@napi-rs/canvas');
const {GlobalFonts} = require('@napi-rs/canvas');
GlobalFonts.registerFromPath
('./Material/migmix/migmix-1m-bold.ttf', 'migm');

module.exports = {
	data: new SlashCommandBuilder()//コマンドのデータ
		.setName('ping')//コマンドの識別名（一意）
		.setDescription('テスト用のコマンドだよ。'),//コマンドの説明文
	async execute(interaction) {//実行時の処理
		const canvas = createCanvas(700,250);
		const context = canvas.getContext('2d');
		const background = await loadImage('Material/ping.png');
		context.drawImage(background, 0, 0, canvas.width, canvas.height);
		context.lineWidth = 10//外枠の太さ
		context.strokeStyle = '#606060'
		context.strokeRect(0, 0, canvas.width, canvas.height)//外枠を描画
		
		const Serif=require("../func/serif.js");
		await Serif({"x":225,"y":125},{"x":400,"y":175},20,"pong!",100,8,context,50)
		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
		interaction.reply({ files: [attachment] });
	},
};