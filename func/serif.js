const { createCanvas ,loadImage} = require('@napi-rs/canvas');
const {GlobalFonts} = require('@napi-rs/canvas');
GlobalFonts.registerFromPath
('./Material/migmix/migmix-1m-bold.ttf', 'migm');
async function Serif(fukicenter,fukisize,fukiradius,text,faceradius,facetype,context,haba) {
		context.font = '30px MigMix 1M';//フォント読み込み
		context.lineWidth = 5//外枠の太さ
		context.textAlign = 'center'
		context.textBaseline = 'middle'
		context.save();
		context.beginPath();//パス定義ここから
		var lu={"x":fukicenter["x"]-fukisize["x"]/2,"y":fukicenter["y"]-fukisize["y"]/2}
		var ru={"x":fukicenter["x"]+fukisize["x"]/2,"y":fukicenter["y"]-fukisize["y"]/2}
		var rd={"x":fukicenter["x"]+fukisize["x"]/2,"y":fukicenter["y"]+fukisize["y"]/2}
		var ld={"x":fukicenter["x"]-fukisize["x"]/2,"y":fukicenter["y"]+fukisize["y"]/2}
		context.moveTo(lu["x"]+fukiradius,lu["y"]);
		context.lineTo(ru["x"]-fukiradius,ru["y"]);
		context.arc(ru["x"]-fukiradius,ru["y"]+fukiradius,fukiradius, Math.PI*-0.5, 0, false);//円を描く
		context.lineTo(rd["x"],fukicenter["y"]-20);
		context.lineTo(rd["x"]+haba,fukicenter["y"]);
		context.lineTo(rd["x"],fukicenter["y"]+20);
		context.lineTo(rd["x"],rd["y"]-fukiradius);
		context.arc(rd["x"]-fukiradius,rd["y"]-fukiradius,fukiradius, 0, Math.PI * 0.5, false);//円を描く
		context.lineTo(ld["x"]+fukiradius,ld["y"]);
		context.arc(ld["x"]+fukiradius,rd["y"]-fukiradius,fukiradius,  Math.PI * 0.5, Math.PI * 1, false);//円を描く
		context.lineTo(lu["x"],lu["y"]+fukiradius);
		context.arc(lu["x"]+fukiradius,lu["y"]+fukiradius,fukiradius, Math.PI*1, Math.PI * 1.5, false);//円を描く
		context.closePath();//パス定義終わり
		context.strokeStyle = '#303030'
		context.stroke()//パスを描画
		context.clip();//ここからはパスの中にのみ描画
		context.fillStyle = '#606060';//灰色
		context.fill();//パスを塗りつぶす
		context.fillStyle = '#ffffff';//文字は白色
		context.fillText(text, fukicenter["x"], fukicenter["y"]);
		context.restore();
		context.beginPath();//パス定義ここから
		context.arc(fukicenter["x"]+fukisize["x"]/2+faceradius+haba, fukicenter["y"], faceradius, 0, Math.PI * 2, true);//円を描く
		context.closePath();//パス定義終わり
		
		context.strokeStyle = '#303030'
		context.stroke()//パスを描画
		context.clip();//ここからはパスの中にのみ描画
		context.fillStyle = '#606060';//灰色
		context.fill();//パスを塗りつぶす
		const avatar = await loadImage('Material/miko'+facetype+'.png');//ミコちゃんを描画
		context.drawImage(avatar, fukicenter["x"]+fukisize["x"]/2-faceradius*1+haba, fukicenter["y"]-faceradius*2, faceradius*4, faceradius*4);
}
module.exports = Serif;