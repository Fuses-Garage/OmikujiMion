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
		context.lineWidth = 10
		context.strokeStyle = '#03a9f4'
		context.fillStyle = '#03a9f4'

		context.strokeRect(0, 0, canvas.width, canvas.height);
		const avatar = await loadImage('Material/miko8.png');
		// Move the image downwards vertically and constrain its height to 200, so that it's square
		context.drawImage(avatar, 450, 25, 200, 200);
		context.beginPath();
	// Start the arc to form a circle
		context.arc(70, 450, 100, 0, Math.PI * 2, true);
	// Put the pen down
		context.closePath();
	// Clip off the region yo//u drew on
		//context.clip();
		context.font = '60px MigMix 1M';
		context.fillStyle = '#ffffff';
		// Select the style that will be used to fill the text in
		
		// Draw a rectangle with the dimensions of the entire canvas
		
		// Actually fill the text with a solid color
		context.fillText('Pong!', canvas.width / 2.5, canvas.height / 1.8);
		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
		interaction.reply({ files: [attachment] });
	},
};