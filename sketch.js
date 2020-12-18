//Create variables here
var dog,happyDog;
var foodS,foodStock;
var database;

function preload()
{
  //load images here
  happyDogImage = loadImage("images/dogImg1.png");
  DogImage = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  Doggo=createSprite(250,400,25,25);
  Doggo.addImage(DogImage);
  Doggo.scale=0.25;

  database = firebase.database();

  foodStock = database.ref("food");
  foodStock.on("value",readStock);
}


function draw() { 
  background(46,137,89); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    Doggo.addImage(happyDogImage);
  }

  if(frameCount%500==0){
    sad();
  }

  drawSprites();
  //add styles here
  textSize(25);
  stroke("black");
  fill("black");
  text("food remaining = "+foodS, 150, 250);

  textSize(15);
  stroke("black");
  fill("black");
  text("note : press UP to feed doggo", 150, 20);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  });
}

function sad(){
  Doggo.addImage(DogImage);
}