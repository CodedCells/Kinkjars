var canvas = undefined;
var ctx = undefined;
var jar = undefined;
var jarTop = 29;
var jarBase = 112;
var jarSelect = 0;

var jars = {
	"Transformation": 0,
	"Vore": 0,
	"Inflation": 0,
	"Paw": 0,
	"Hyper": 0,
	"Muscle": 0,
	"Breeding": 0,
	"Macro/Micro": 0,
	"Pregnancy": 0,
	"Hypnosis": 0,
	"Cumplay": 0,
	"Bimboification": 0,
	"Musk": 0,
	"Sensory Deprivation": 0,
	"Mawplay/Teeth": 0,
	"Drone": 0,
	"Maid": 0,
	"oviposition": 0,
	"Pooltoy/Plush": 0,
	"Latex": 0,
	"Petplay": 0,
	"Teratophilia": 0,
	"Stuffing": 0,
	"Chastity/Denial": 0,
	"Growth": 0,
	"Weight Gain": 0,
	"Tentacles": 0,
	"(Free Space)": 0
}

function drawJar(name, value, x, y) {
	//ctx.fillStyle = "#ff0";//debug
	//ctx.fillRect(x+10, y+10, 100, 120);
	
	ctx.fillStyle = "#ccc";
	
	// fill
	if (value == 0) {
	} else if (value >= 1) {
		ctx.drawImage(jar, 200, 0, 100, 120, x+10, y+10, 100, 120);
	} else {
		ctx.drawImage(jar, 100, 0, 100, 120, x+10, y+10, 100, 120);
		ctx.fillRect(x+10, y+jarTop+10, 100, (1-value) * (jarBase-jarTop));
	}
	
	// outer
	ctx.drawImage(jar, 0, 0, 100, 120, x+10, y+10, 100, 120);
	
	ctx.fillStyle = "#1a1a1a";
	ctx.textAlign = "center";
	ctx.font = "16px Roboto";
	ctx.fillText(name, x+60, y+160);
	ctx.fillText(value.toFixed(2), x+60, y+180);
}

function drawEverything() {
	ctx.fillStyle = "#ccc";
	ctx.fillRect(0, 0, 900, 900);
	
	ctx.fillStyle = "#1a1a1a";
	ctx.font = "48px Roboto";
	ctx.textAlign = "start";
	ctx.fillText("Jar of Kinks", 20, 55);
	ctx.textAlign = "end";
	ctx.font = "18px Roboto";
	ctx.fillText("Create your own at codedcells.github.io/kinkjars", 880, 45);
	
	i = 0;
	for (var n in jars) {
		x = i % 7;
		y = Math.floor(i / 7);
		drawJar(n, jars[n], (x*120)+30, (y*200)+90);
		i++;
	}
}

function init() {
	canvas = document.getElementById("jardisplay");
	ctx = canvas.getContext("2d");
	
	jar = document.getElementById("jar-mc");
	
	for (var n in jars) {
		jars[n] = Math.random() * 1.2;
	}
	
	drawEverything();
}

function  getMousePos(canvas, evt) {
	// copied from https://stackoverflow.com/questions/17130395
	// get the accurate* position of the cursor on a scaled canvas
	// had to add 45 to both x and y for some reason
	var rect = canvas.getBoundingClientRect(), // abs. size of element
		scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
		scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
	
	return {
		x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
		y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
	}
}

function clickcanvas(e) {
	drawEverything();
	
	mouse = getMousePos(canvas, e);
	console.log(mouse);
	ctx.fillStyle = "#f00";
	ctx.fillRect(mouse.x-2, mouse.y-2, 4, 4);
	
	//40, 100, 140, 220
	//160...
	//40, 300...
	
	jarx = Math.floor((mouse.x - 30) / 120);
	jarxf = (mouse.x - 30) % 120;
	
	jary = Math.floor((mouse.y - 80) / 200);
	jaryf = (mouse.y - 80) % 200
	
	if (jarx < 0 || jary < 0 || jarx > 7 || jary > 3) {return;}
	console.log("jar", jarx, jary)
	console.log("sub", jarxf, jaryf);
	
	ctx.strokeStyle = "#070";
	ctx.rect((jarx*120)+40, (jary*200)+100, 100, 120);
	ctx.stroke();
}