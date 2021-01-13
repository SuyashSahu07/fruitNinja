var PLAY=1;
var END=0;
var gameState=1;
var sword,fruit,enemy,fruitGroup,germGroup,score,rand;
var swordImage,fruit1,fruit2,fruit3,fruit4,enemyImage,gameOverImage;

function preload(){
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  enemyImage = loadAnimation("alien1.png","alien2.png")
  gameOverImage = loadImage("gameover.png")
}

function setup(){
  createCanvas(600,600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7
  
  sword.setCollider("rectangle",0,0,40,40);
  
  score=0;
  
  fruitGroup=createGroup();
  
  germGroup=createGroup();
}

function draw(){
  background("lightblue");
  
  text("Score: "+ score, 300, 30);

  
  if(gameState===PLAY){
    fruits();
    germs();
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    if(fruitGroup.isTouching(sword)){
      
      fruitGroup.destroyEach();
      
      score=score+2;
      
    } else if(germGroup.isTouching(sword)){
    
    gameState = END;
      
    fruitGroup.destroyEach();
      
    germGroup.destroyEach();
      
    fruitGroup.setVelocityXEach(0);
      
    germGroup.setVelocityXEach(0);
      
    sword.addImage(gameOverImage)
    sword.x=200;
    sword.y=200;
    
  }
  
  }
  drawSprites();
   }
function germs(){
     if(World.frameCount%200===0){
       enemy=createSprite(400,200,20,20);
       enemy.addAnimation("moving",enemyImage);
       enemy.y=Math.round(random(100,300));
       enemy.velocityX=-8;
       enemy.lifetime=50;
       
       germGroup.add(enemy);
     }
   }


function fruits(){
    if(World.frameCount%80===0){
      fruit=createSprite(400,200,20,20);
      fruit.scale=0.2;
      rand=Math.round(random(1,4));
      if (rand == 1) {
        fruit.addImage(fruit1);
      } else if (rand == 2) {
        fruit.addImage(fruit2);
      } else if (rand == 3) {
        fruit.addImage(fruit3);
      } else if (rand == 4) {
        fruit.addImage(fruit4);
      }
      fruit.y=Math.round(random(50,340));
      
      fruit.velocityX=-7;
      fruit.setLifetime=100;
      
      fruitGroup.add(fruit);
    }
  }