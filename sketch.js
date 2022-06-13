let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let logo;
let xLogo;

const osc = new Tone.Oscillator();
const pingPong = new Tone.PingPongDelay().toDestination();
const rev = new Tone.Reverb().toDestination;


let time = ['1n', '2n', '4n', '8n', '16n'];
let feed = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

let colore = [rndRed, rndGreen, rndBlu, rndMulti];
let choice;

let fr;
let coeff = 4;
let low, high;
let x, y;
let w;
let divW;

let dec; //decibel

let r, g, b, alpha;
let min = 150;

let waveForm = ['sine', 'sine2', 'sine3', 'triangle', 'triangle8', 'sine4', 'square'];

//----------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//--------------------------------------------preload
function preload() {
  logo = loadImage(baseURLImage + 'good one white.png');
}

//----------------------------------------------------SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(random(5, 60));
  xLogo = windowWidth-40;

  rectMode(CENTER);
  choice = random(colore);
  r= round(random(min, 255));
  g= round(random(min, 255));
  b= round(random(min, 255));
  alpha= round(random(min, 255));
  noStroke();
  divW = 10
  w = width/20;
  x = w+w/divW;
  console.log(w, x);
  
  //----------------------------------------ping pong
  pingPong.Time = random(time);  
  pingPong.NormalRange = random(feed);
  
  //----------------------------------------osc & rev decay
  osc.frequency.value = fr;
  fr = random(110, 220);
  rev.decay = 2;
  osc.connect(pingPong, rev);
  osc.type = random(waveForm);
  osc.toDestination();
  osc.start();
  
  low = random(30, 110);
  dec = random(-40, -12);  
}

//----------------------------------------------------------DRAW

function draw() {
  osc.frequency.value = fr;
  fr -= coeff;
  
  y = map(fr, 220, 30, 0, height);
  
  choice();
  
  rect(x, y, w, random(1, 10), 3);
  
  osc.volume.value = dec;
  
  if (fr <= low) {
    // coeff = -coeff;
    resetSketch();  
  }
}

//----------------------------------------color functions
function rndBlu() {
  fill(0, 0, b);
  b= round(random(min, 255));
  if (b < min+50) {
    noFill();
  }
}
//--------------------------------------red
function rndRed() {
  fill(r, 0, 0); 
  r= round(random(min, 255));
  if (r < min+50) {
    noFill();
  }
}
//--------------------------------------green
function rndGreen() {
  fill(0, g, 0);
  g= round(random(min, 255));
  if (g < min+50) {
    noFill();
  }
}
//--------------------------------------white
function rndMulti() {
  fill(alpha);
  alpha= round(random(min, 255));
  if (alpha < min+50) {
    noFill();
  }
}

//-----------------------------------------reset sketch
function resetSketch() {
  
  osc.frequency.value = fr;
  dec = random(-40, -12);
  fr = random(110, 220);
  low = random(30, 110);
  x += w+w/divW;
  //console.log(osc.type, pingPong.Time, pingPong.NormalRange);
  
  if (x >= width-w) {
    //save();
    clear();
    x =  w+w/divW;
    //background(10);
    osc.type = random(waveForm);
    choice = random(colore);
    frameRate(random(5, 60));
    pingPong.Time = random(time);
    pingPong.NormalRange = random(feed); 
  }  
}
//-------------------------------------------mousePressed
function mousePressed() {
  let fs = fullscreen();
    fullscreen(!fs);
}
if (keyCode === 32 ) {
  imageMode(CENTER);
  logo.resize(40, 0);
  image(logo, xLogo, windowHeight-25);
  tint(200); 
  save();
  clear();
  }
}
