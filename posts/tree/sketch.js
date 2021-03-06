var stems = 16;
var maxGen = 2;
var maxWeight = 5;
var brcount = 5;
var lineSize = 0;
var range = 0;
var startRange = -390;
var paused = false;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB,1,1,1,1);
}

function mousePressed(){
	paused = !paused;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	lineSize = height/6;
	var t = frameCount/8;

	if(paused){
		range = map(mouseX, 0, width,-TWO_PI*2,TWO_PI*2);
		stroke(.5);
		fill(1);
		textSize(16);
		textAlign(CENTER, CENTER);
		text('manual control', width/2 , 16);
	}else{
		range = map(sin(radians(startRange+t)),-1,1,0,TWO_PI*2);
	}

  var c = createVector(width/2, height/2);
  for (var ang = 0; ang < TWO_PI; ang += TWO_PI/stems) {
    var tar = getPointAtAngle(c.x, c.y, lineSize, ang);
/*
    strokeWeight(2);
		stroke(0, 0, 1);
    line(c.x, c.y, tar.x, tar.y);*/
    drawLines(c.x, c.y, tar.x, tar.y, 0);
  }
}

function drawLines(x0, y0, x1, y1, gen) {
  if (++gen <= maxGen) {
    var tars = new Array();
    var midA = getAngle(x0, y0, x1, y1);
    var angleStep = range / brcount;
    for (var i = 0; i <= brcount; i++) {
      var a = midA-range/2 + i*angleStep;
      var tar = getPointAtAngle(x1, y1, lineSize, a);
      tars.push(tar);
			var weight = max(1,maxWeight - gen*maxWeight/maxGen);
	    strokeWeight(weight);
			stroke(0, 0, 1);
      line(x1, y1, tar.x, tar.y);
    }
    for (var i = 0; i < tars.length; i++){
      drawLines(x1, y1, tars[i].x, tars[i].y, gen);
		}
  }
}


function getPointAtAngle(cx, cy, radius, angle) {
   return createVector(cx + radius * cos(angle), cy + radius * sin(angle));
}

function getAngle(x0, y0, x1, y1) {
   return atan2(y1 - y0, x1 - x0);
}
