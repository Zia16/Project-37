var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

   if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
   }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);

   }


}

// function to display UI
function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 +" PM ",350,30);
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30 )
  } else{
   text("Last Feed : "+ lastFed + " AM" ,350,30);
  }

  
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
    
   function feedDog(){
    dog.addImage( happyDog );

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()

  })

   }

  function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS

  })

  }


}


