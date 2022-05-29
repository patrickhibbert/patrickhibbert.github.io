//
//  Project: "I Read You"
//
//  Assignment 2 & 3
//  ARCH1477 Computational Prototyping for Industrial Design
//
//  Patrick Hibbert, s3664204
//

// Global variables
var backgroundColour
var mode
var tutorialScreen
var points = []
var mult = 0.005

// Create and name variables
let left_lens;
let right_lens;
let img;
let video;
let flippedVideo;
let label = "";
let font;
let button;
let classifier;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/srEuXgicq/';

// Fonts and sign language model are pre-loaded for use by the application
// The assets directory is referenced as the location for each file
function preload() {
  font = loadFont('assets/genos_font.ttf');
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

// Project setup elements (including Canvas and Video)
function setup() {
  tutorialScreen =  0;
  createCanvas(1750, 980);
  textFont(font);
  background(30);
  video = createCapture(VIDEO);
  video.size(700, 540);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();

  img = loadImage('assets/auslan_b.png');

  // Setup for the flow field animation (constructed below)
  var density = 30
  var space = width / density

  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x, y)
      points.push(p)
    }
  }
  // Size and position of shapes used on the "Welcome Screen"
  left_lens = new Circle(615, 445, 440);
  right_lens = new Circle(1130, 445, 440);
}

function draw() {
  // Define the screens that will be displayed throughout the program
  // These can be broken-down into 4 distinct categories
  // (1). Welcome Screen, (2). Tutorial Intro, (3). Tutorial, (4). Tutorial Over
  if (tutorialScreen == 0) {
    welcomeScreen();
  } else if (tutorialScreen == 1) {
    tutorialIntroScreen1();
  } else if (tutorialScreen == 2) {
    tutorialIntroScreen2();
  } else if (tutorialScreen == 3) {
    tutorialCanvas();
  } else if (tutorialScreen == 4) {
    tutorialOverScreen();
    }
}

function welcomeScreen() {
  // Welcome page / splash screen to introduce the user to the project
  // Flow field animation is used to set the tone of the project
  // Animation will be positioned inside the lenses of a pair of glasses (constructed below)
  noStroke()
  fill(255)

  for (var i = 0; i < points.length; i++) {

    var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 200)

    points[i].add(createVector(cos(angle), sin(angle)))

    // Defining the position of the flow field animation (left lens)
    if (dist(width / 2.85, height / 2.2, points[i].x, points[i].y) < 200) {
     ellipse(points[i].x, points[i].y, 1)
    }

    // Defining the position of the flow field animation (right lens)
    if (dist(width / 1.55, height / 2.2, points[i].x, points[i].y) < 200) {
     ellipse(points[i].x, points[i].y, 1)
    }
  }
  
  // Text is used to welcome the user to the application
  textSize(40);
  text('Welcome to...', 60, 60);
  fill(200);
  textSize(90);
  text('"I Read You"', 60, 130);
  textSize(35);
  text('Hosted By', 60, 760);
  textSize(50);
  text('Patrick Hibbert', 60, 800);
  // Apply flashing text to guide user input
  strokeWeight(2);
  fill(255, 210, 0 + sin(frameCount*0.1) * 255);
  textSize(40);
  text('Press ENTER to Begin...', 1320, 810);

  // Create the components, position and style of the glasses
  noFill();
  stroke(255);
  strokeWeight(3);
  // Component: Bridge
  arc(873, 418, 140, 140, PI + QUARTER_PI, TWO_PI - QUARTER_PI);
  // Lenses of the glasses constructed in class ("Circle") below
  left_lens.display();
  right_lens.display();
  }

function tutorialIntroScreen1() {
  // Tutorial Intro page (1)
  // Explains the fundamentals of the program to the user
  background(30); 
  // Flow field animation that will surround the text (sets the relaxing tone for the program)
  var density = 20
  var space = width / density

  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x, y)
      points.push(p)
    }
  }
  noStroke();
  fill(255);

  for (var i = 0; i < points.length; i++) {

    var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, 720)

    points[i].add(createVector(cos(angle), sin(angle)))

    // Defining the position of the flow field animation
    ellipse(points[i].x, points[i].y, 1)
    
  }
  // Framing surrounding text blocks (designed for legibiliy)
  fill(30);
  rect(845, 160, 840, 112, 20);
  rect(845, 360, 840, 112, 20);
  rect(845, 560, 840, 112, 20);
  rect(1180, 785, 520, 40, 20);

  // Circular framing to surrounding imagery
  fill(30);
  stroke(255);
  ellipse(450, 420, 400, 400);

  image(img, 305, 280, img.width / 7, img.height / 7)
   // Apply flashing text to guide user input
  strokeWeight(2);
  stroke(255);
  fill(255, 255, 0 + sin(frameCount*0.5) * 255);
  textSize(30);
  text('Press the RIGHT ARROW KEY to Continue...', 1205, 810);

   // Introduction text (no effects applied)
  strokeWeight(1);
  fill(255, 210, 0);
  textSize(40);
   // Text Block (1)
  text('"I Read You" is an application designed to teach people', 865, 200);
  text('sign language (AUSLAN).', 865, 250);
   // Text Block (2)
  text('AUSLAN is the predominant sign language of the', 865, 400);
  text('Australian Deaf Community', 865, 450);
   // Text Block (3)
  text('Nearly 20,000 people converse with AUSLAN each day.', 865, 600);
  text('This tutorial will show you just how easy it is!', 865, 650);
  }

function tutorialIntroScreen2() {
  // Tutorial Intro page (2)
  // Explains the fundamentals of the program to the user
  background(30);
  // Apply flashing text to guide user input
  strokeWeight(1);
  fill(255, 210, 0 + sin(frameCount*0.2) * 255);
  textSize(30);
  text('Press "S" to Start...', 1464, 810);
   // Explanatory text (no effects applied)
   noFill();
   textSize(40);
   // Text Block
   text('This tutorial uses the webcam to read your gestures.', 865, 370);
   text('For accurate results, make sure you are in a well-lit', 865, 420);
   text('space and the camera is positioned toward your hands.', 865, 470);
}

function tutorialCanvas() {
  // Tutorial Page / Canvas
  // Full tutorial takes place on this page
  background(30);
  // Position the video feed on the tutorial page
  image(flippedVideo, 920, 180);
  fill(255);
  strokeWeight(1);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  // Position the border for the video feed
  noFill();
  strokeWeight(7);
  rect(914, 178, 710, 544, 20);
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}

function tutorialOverScreen() {
}

function keyPressed() {
  // When 'ENTER' is pressed at the welcome screen, the user is taken to the Tutorial Intro
  if (keyCode === ENTER) {
    tutorialScreen = 1;
  // Pressing the 'RIGHT_ARROW' key paginates next on the tutorial intro
  } else if (keyCode === RIGHT_ARROW) {
    tutorialScreen = 2;
  // Pressing the 'LEFT_ARROW' key paginates back on the tutorial intro
  } else if (keyCode === LEFT_ARROW) {
    tutorialScreen = 1;
  }
}

function keyTyped() {
  // When 'S' is typed, the tutorial screen is displayed
  if (key === 's') {
    tutorialScreen = 3;
  }
}

function startTutorialIntroScreen1() {
  tutorialScreen = 1;
  }

class Circle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    ellipse(this.x, this.y, this.size);
  }
}