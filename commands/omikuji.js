const { SlashCommandBuilder,AttachmentBuilder } = require('discord.js');
const { createCanvas ,loadImage} = require('@napi-rs/canvas');
const {GlobalFonts} = require('@napi-rs/canvas');
GlobalFonts.registerFromPath
('./Material/migmix/migmix-1m-bold.ttf', 'migm');

module.exports = {
	data: new SlashCommandBuilder()//コマンドのデータ
		.setName('omikuji')//コマンドの識別名（一意）
		.setDescription('おみくじで遊べますよ！'),//コマンドの説明文
	async execute(interaction) {//実行時の処理
		const canvas = createCanvas(700,600);
		const context = canvas.getContext('2d');
		const background = await loadImage('Material/ping.png');
		context.drawImage(background, 0, 0, canvas.width, canvas.height);
		context.lineWidth = 10//外枠の太さ
		context.strokeStyle = '#606060'
		context.strokeRect(0, 0, canvas.width, canvas.height)//外枠を描画
		const luck={1:"大凶",2:"凶",3:"末吉",4:"小吉",5:"吉",6:"中吉",7:"大吉",8:"極吉"}
		const soe=Math.floor(Math.random()*8)+1
		const lucklogo = await loadImage('Material/luck/luck'+soe+'.png');
		context.drawImage(lucklogo, 0, 0, 700, 350);
		const Serif=require("../func/serif.js");
		await Serif({"x":225,"y":475},{"x":400,"y":175},20,"今日の運勢は"+luck[soe]+"ですよ！",100,soe,context,50)
		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
		interaction.reply({ files: [attachment] });
	},
};