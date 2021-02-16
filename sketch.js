var dog, happyDog;
var foodS, foodStock;
var database; 
var dogImg, happyDogImg;
var button1, button2;
var foodObj;
var feedTime;
var lastFed;

function preload()
{
  dogImg = loadImage("Images/Dog.png");
  happyDogImg = loadImage("Images/happy dog.png");
}

function setup() {

  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250, 300, 150, 150)
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodObj = new Food();

  button1 = createButton("Feed the Dog");
  button1.position(700, 95);
  button1.mousePressed(feedDog);

  button2 = createButton("Add food");
  button2.position(800, 95);
  button2.mousePressed(addFoods);




  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);

  foodObj.display();
  feedTime = database.ref("feedTime");
  feedTime.on("value", function(data){
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 12){
    text("lastFeed:" + lastFed%12 + "PM", 350, 30);
  }

  else if(lastFed == 0){
    text("lastFeed: 12 AM", 350, 30);
  }

  else{
    text("lastFeed:" + lastFed + "AM", 350, 30);
  }
  drawSprites();





}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImg);

  if(foodObj.getFoodStock() <= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;

  database.ref('/').update({
    food:foodS
  })
}



