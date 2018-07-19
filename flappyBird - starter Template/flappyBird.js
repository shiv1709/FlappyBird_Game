var cvs=document.getElementById("canvas");
var ctx=cvs.getContext("2d");


//loading images here

var bird=new Image();
var bg=new Image();
var fg=new Image();
var pipeNorth=new Image();
var pipeSouth=new Image();

bird.src="images/bird.png";
bg.src="images/bg.png";
fg.src="images/fg.png";
pipeNorth.src="images/pipeNorth.png";
pipeSouth.src="images/pipeSouth.png";

//variables declaration

var gap=210;//85
var pipeNorthHeight=100;//pipeNorth.height-92;
var pipeSouthHeight=50;//pipeSouth.height-178;
var constant=pipeNorthHeight+gap;//pipeNorthHeight+gap;
var birdWidth=30;//bird.width-8;
var birdHeight=20;//bbird.height-6;
/*
console.log("constant= " + constant);
console.log("pNH= " + pipeNorthHeight);
console.log("pSH= " + pipeSouthHeight);
console.log("birdHeight = "+birdHeight);
console.log("birdWidth= "+birdWidth);
*/
var bX=10;
var bY=150;

var gravity=1.5;
var score=0;

//Including audio files
var fly=new Audio();
var scor=new Audio();
fly.src="sounds/fly.mp3";
scor.src="sounds/score.mp3";  
//on key press

document.addEventListener("keypress",moveUp);

function moveUp(){
	bY-=25;
	fly.play();
}

//pipe coordinates declartion

var pipe=[];
pipe[0]={

	x:cvs.width,
	y:0
};


//drawing images

function draw(){
	/*console.log("pNH "+pipeNorthHeight);
	console.log("pSH "+pipeSouthHeight);
	console.log("cvsH "+cvs.height);
	console.log("cvsW "+cvs.width);
	console.log("fgH "+fg.height);
	console.log("bH "+bird.height)
	console.log("bW "+bird.width);
	console.log("pipelenght "+pipe.length);
	*/
	ctx.drawImage(bg,0,0);

	for(var i=0;i<pipe.length;i++){
		//console.log("pipe[i].x= "+pipe[i].x);
		//console.log("pipe[i].y= "+pipe[i].y);
		//console.log("pipe[i].y+constant= "+(pipe[i].y+constant));

		ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);//0 replaed by pipe[i].y
		ctx.drawImage(pipeSouth,pipe[i].x,(pipe[i].y+constant));

		pipe[i].x--;

		if(pipe[i].x==cvs.width-188){
			pipe.push(
			{
				x:cvs.width,
				y:Math.floor(Math.random()*pipeNorthHeight-pipeNorthHeight)//50 replaced by *pipeNorthHeight)-pipeNorthHeight
			});
		}

		//detect collision

		if(bX+bird.width>=pipe[i].x && bX<=pipe[i].x+pipeNorth.width && (bY<=pipe[i].y+pipeNorthHeight//50 replaces by pipeNorthHeight
		 || bY+bird.height>=pipe[i].y+constant)||bY+bird.height>=cvs.height-fg.height){
			location.reload();//reload the web page again
		}
		if(pipe[i].x==5){
			score++;
			scor.play();
		}
	}

	//ctx.drawImage(pipeNorth,100,0);
	//ctx.drawImage(pipeSouth,100,0+constant);
	ctx.drawImage(fg,0,cvs.height-fg.height-6);
	ctx.drawImage(bird,bX,bY);

	bY+=gravity;

	ctx.fillStyle="#008000";
	ctx.font="20px Verdana";
	ctx.fillText("Score : "+score,10,cvs.height-20);
	requestAnimationFrame(draw);//callback function
	//window.cancelAnimationFrame(draw);
}
draw();