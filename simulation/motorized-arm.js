// https://editor.p5js.org/emwdx/sketches/7djf_KfSD
angle = 10.0;
CANVAS_SIZE = 700;
ARM_WIDTH = 10;
ARM_LENGTH = CANVAS_SIZE/2;
ARM_MASS = 1.0;
ARM_FRICTION = 1.8;

DELTA_T = 0.05;

arm_angle = 0;
arm_velocity = 0;
arm_torque = 560;
let slider;
let sum_error=0;
let last_error = 0;
let ANGLE_SETPOINTS = [30,45,60,90,120,135, 150];
angle_index = 0;
let ANGLE_SET = ANGLE_SETPOINTS[angle_index];
let loopCount = 0;
const INTERVAL_DURATION = 50;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  angleMode(DEGREES);
  slider = createSlider(0, 255, 128);
  slider.position(10, 10);
  slider.style('width', '80px');
}

let SETPOINT = 120;
let MOTOR_TORQUE = 1200;
let TOLERANCE = 5;

function draw() {
  drawLines();
  drawArm();
  armSimulation();
  
  // Use the arm_torque slider to observe the effect of torque on the position of the arm. When you are ready to try to automate this, comment out the next line.
  arm_torque = map(slider.value(),0,255,-2000,2000);
  
    // your automated code goes here:
  
  
}


function drawArm() {
  
  fill(100, 100, 150);

  rect(CANVAS_SIZE / 2 - 25, CANVAS_SIZE / 2 - 25, 50, CANVAS_SIZE/1.5, 5);

  fill(200);
  push();
  translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2 - ARM_WIDTH / 2);
  rotate(map(arm_angle, 0, 90, 90, 0));
  rect(-ARM_WIDTH / 2, -ARM_WIDTH / 2, ARM_LENGTH, ARM_WIDTH, 5);
  pop();
}

function drawLines() {
  const LINE_ANGLES = [30, 45, 60, 90, 135, 120, 150];
background(230);
  for (var i = 0; i < LINE_ANGLES.length; i++) {
    stroke(200);
    push();
    translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2 - ARM_WIDTH / 2);
    rotate(map(LINE_ANGLES[i], 0, 90, 90, 0));
    setLineDash([10, 10]); //longer stitches
    line(0, 0, 150, 0);
    pop();
  }
}
function armSimulation() {
  MAX_TORQUE = 2000;
  if(arm_torque>MAX_TORQUE){
    arm_torque = MAX_TORQUE;
  }
  if(arm_torque<-MAX_TORQUE){
    arm_torque = -MAX_TORQUE;
  }
  let weight_torque = ((ARM_MASS * 9.81 * ARM_LENGTH) / 2) * sin(arm_angle);
  deltaVel =
    ((-weight_torque + arm_torque - ARM_FRICTION * arm_velocity) * DELTA_T) /
    ARM_MASS;
  arm_velocity += deltaVel;
  arm_angle = arm_angle + arm_velocity * DELTA_T;
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}
