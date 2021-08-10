marioX = 325;
marioY = 325;
wristY = 0;
wristX = 0;

function preload() {
	img = loadImage("mario05.png");
	world_start = loadSound("world_start.wav");
	setSprites();
	MarioAnimation();
}

function setup() {
	canvas = createCanvas(1240, 336);
	canvas.parent('canvas');

	video = createCapture(VIDEO);
	video.size(600, 300);
	video.parent("game_console");
	instializeInSetup(mario);

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function draw() {
	game()
	// background("#D3D3D3");
	if (wristX < 300) {
		marioX = marioX - 1;
		console.log("Mario x = "+marioX);
	}
	if (wristX > 300) {
		marioX = marioX + 1;
	}
	if (wristY < 150) {
		marioY = marioY - 1;
	}
	image(img, marioX, marioY, 40, 70);
}

function gotPoses(results) {
	if (results.length > 0) {
		wristX = results[0].pose.rightWrist.x;
		wristY = results[0].pose.rightWrist.y;
		console.log("wrist x = " + wristX + "  Wrist y = " + wristY)
		console.log(results);
	}

}

function modelLoaded() {
	console.log("Model is loaded");
}