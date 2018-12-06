var partNum = 750; //Particle number

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function between(min, max) {
  return Math.random() * (max - min) + min;
}

var istruehover = true;

var c = document.getElementById('c'); //Context and Canvas ID
var ctx = c.getContext('2d');

var w = window.innerWidth; //Width of Canvas
var h = window.innerHeight; //Height of Canvas

c.width = w; //Setting Width for Canvas
c.height = h; //Setting Height for Canvas

var mouse = { //Position of Mouse
  x: w / 2, //Center of Window
  y: h / 2 //Center of Window
};

document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY;
  
  	istruehover = false;
}, false);

document.addEventListener('mouseover', function(){ //Function to find mouse over canvas position
  	istruehover = false;
}, false);

var particles = [];
for(var x = 0; x < c.width / 33; x++) { //How far the particles are to the left/right depending on positive or negative values, on the window
  for(var y = 0; y < c.height / 33; y++) { //How far the particles locate upwards on the window
    particles.push(new particle(x*33, y*33)); //Distribution on-screen
  }
}

//Particle Function:
function particle(x, y) {
  this.x = x + 20;
  this.y = y + 20;
  
  this.xo = x + 20;
  this.yo = y + 20;
  
  this.r = 15;
  
  var one = 'rgba(213, 117, 0, 0.7)'; //Brown Naturistic Colour
  var two = 'rgba(219, 202, 105, 0.7)'; //Mild Brown Naturistic Colour
  var three = 'rgba(102, 141, 60, 0.9)'; //Pastle Green Naturistic Colour
  var colors = [one, two, three];
  this.color = colors[Math.round(Math.random() * 5)]; //Only random colours of variables
}

function draw() {
  requestAnimFrame(draw);
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)'; //Filling the canvas Black
  ctx.fillRect(0, 0, c.width, c.height);
  
  for(t = 0; t < particles.length; t++) {
    var p = particles[t];
    
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
    ctx.fill();
    //The context of the particle(s)
    
   var dist,
		dx = mouse.x - p.x,
		dy = mouse.y - p.y;
	
	dist = Math.sqrt(dx*dx + dy*dy);
  
	if(dist <= 100) {
		var ax = dx,
			ay = dy;

      p.x -= ax/25;
		  p.y -= ay/25;
  }
    
 
  var disto,
		dxo = p.x - p.xo,
		dyo = p.y - p.yo;
    
    disto = Math.sqrt(dxo*dxo + dyo*dyo);

    p.x -= dxo/25; //Moving particles back into place after cursor moves, speed of returning to normal?
    p.y -= dyo/25;
    
    if(disto != 0) {
       p.r = (disto / 4) + 15; 
      //Simple algebra XD
    }

}
}

draw();



setInterval(mousemove, 50);