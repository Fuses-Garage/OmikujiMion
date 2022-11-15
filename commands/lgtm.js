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
		const canvas = createCanvas(file.width, file.height);//画像のファイルに合わせキャンバス生成
		const context = canvas.getContext('2d');
		const background = await loadImage(file.url);//背景として読み込み
		context.drawImage(background, 0, 0, canvas.width, canvas.height);//渡された画像を背景に
		context.font = Math.ceil(Math.min(canvas.width * 0.8 / 4, canvas.height * 0.8)).toString() + 'px MigMix 1M';
		context.fillStyle = '#ffffff';//色は白
		context.textAlign = 'center'
		context.textBaseline = 'middle'
		context.fillText('LGTM', canvas.width / 2, canvas.height / 2);
		//縦横ともに中央揃え
		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
		//メッセージに添付できる形式に変換
		interaction.reply({ files: [attachment] });//画像を添付し返信
	},
};