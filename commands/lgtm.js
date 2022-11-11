const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const { GlobalFonts } = require('@napi-rs/canvas');
GlobalFonts.registerFromPath
	('./Material/migmix/migmix-1m-bold.ttf', 'migm');

module.exports = {
	data: new SlashCommandBuilder()//コマンドのデータ
		.setName('lgtm')//コマンドの識別名（一意）
		.setDescription('送られた画像をLGTM画像に加工します。')//コマンドの説明文
	    .addAttachmentOption(option =>
		option.setName('元画像')
			.setDescription('加工元の画像をアップロードしてください')
			.setRequired(true)),
	
	async execute(interaction) {//実行時の処理
		const file =interaction.options.getAttachment("元画像")

		if (!file) return // 添付ファイルがなかったらスルー
		if (!file.height && !file.width) return // 画像じゃなかったらスルー
		const canvas = createCanvas(file.width, file.height);
		const context = canvas.getContext('2d');
		const background = await loadImage(file.url);
		context.drawImage(background, 0, 0, canvas.width, canvas.height);
		context.font = Math.ceil(Math.min(canvas.width * 0.8 / 4, canvas.height * 0.8)).toString() + 'px MigMix 1M';
		context.fillStyle = '#ffffff';
		// Select the style that will be used to fill the text in
		context.textAlign = 'center'
		context.textBaseline = 'middle'
		// Draw a rectangle with the dimensions of the entire canvas

		// Actually fill the text with a solid color
		context.fillText('LGTM', canvas.width / 2, canvas.height / 2);
		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
		interaction.reply({ files: [attachment] });
	},
};