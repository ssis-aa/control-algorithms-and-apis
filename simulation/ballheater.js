// https://editor.p5js.org/emwdx/sketches/vZxxr7lmn
let heaterPower = 0.0;
let outsideTemp = 20.0;

let button;

let temperature = 25.0
const k = 0.05;
const HEATER_POWER = 5.0;
const TOLERANCE = 5.0;
const UPDATE_INTERVAL = 10;
const FRAME_RATE = 25;
const SIMULATION_LENGTH = 30.0;
let ballColor = [200,200,200];

let temperatureRecord = [];
let currTime = 0.0;
let loopCount = 0;

function setup() {
  createCanvas(400, 400);
  frameRate(FRAME_RATE);
}

function draw() {
  background(230);
  drawBall();
  ballSimulation();
  
  // your automated code goes here:
  // You want to use the temperature variable and the heaterOn and heaterOff functions to get the temperature to stay at 40 degrees.
  
}

function heaterOn(){
  heaterPower = HEATER_POWER;
  ballColor = [200,50,50]
}
function heaterOff(){
  heaterPower = 0.0;
  ballColor = [200,200,200]
}

function drawBall(){
  fill(ballColor);
  circle(200,200,100);
  fill(0);
  textSize(width / 10);
  textAlign(CENTER, CENTER);
  text(temperature.toFixed(1),200,200)
}
function ballSimulation(){
  let deltaTemp =(-(temperature - outsideTemp)*k+heaterPower)*0.05
  temperature += deltaTemp
  
  if(loopCount == UPDATE_INTERVAL){
    loopCount = 0;
    currTime += 1.0 / FRAME_RATE * UPDATE_INTERVAL
    temperatureRecord.push([currTime,temperature])
  }
  else{
    loopCount += 1
  }
  if(currTime >= SIMULATION_LENGTH){
    for(var i = 0;i<temperatureRecord.length;i++){
      console.log(temperatureRecord[i][0]+"\t" + temperatureRecord[i][1]);
    }
    noLoop();
  }
}
function mousePressed(){
  heaterOn();
  ballColor = [200,50,50]
}
function mouseReleased(){
  heaterOff();
  ballColor = [200,200,200]
} 
