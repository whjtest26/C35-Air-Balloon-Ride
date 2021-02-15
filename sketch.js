var balloon,balloonImage;
var backgroundImg;
var database;
var position;


function preload(){

    balloonImage = loadAnimation("balloon2.png","balloon3.png","balloon4.png");
    backgroundImg = loadImage("bg.png");
}

function setup() {

  createCanvas(1200,700);
  database = firebase.database();

  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("Balloon",balloonImage);
  balloon.scale = 0.5;

  var balloonPosition = database.ref("balloon/height");
  balloonPosition.on("value",readPosition,showError);
}

function draw() {
  background(backgroundImg);

    textSize(18);
    text("**Use arrow keys to move the Hot Air Balloon!",50,30);

    if(position !== undefined){

      if(keyDown(LEFT_ARROW)){
          writePosition(-10,0);
      }
      else if(keyDown(RIGHT_ARROW)){
          writePosition(10,0);
      }
      else if(keyDown(UP_ARROW)){
          writePosition(0,-10);
          balloon.scale = balloon.scale - 0.01;
      }
      else if(keyDown(DOWN_ARROW)){
          writePosition(0,+10);
          balloon.scale = balloon.scale + 0.01;
      }

  }
  drawSprites();
}

function writePosition(x,y){

  database.ref("balloon/height").set({

    "x" : position.x + x,
    "y" : position.y + y
  });
}

function readPosition(data){

  position = data.val();
  console.log(position);

  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){

  console.log("Error Writing in the Database");
}