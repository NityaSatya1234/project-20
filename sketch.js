var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Rishi, Rishi_Running, Rishi_Collided;
var fireland, fireLandImg;

var woodStick1,woodStick2,woodSticksGroup, woodSticksImage;

var score;
var gameOverImage, restartImage;

function preload(){

Rishi_Running = loadImage("Rishi 1.png","Rishi 2.png")
Rishi_Collided = loadImage("Rishi_Collided.png")


fireLandImg = loadImage("fireLand.png")

woodStick1 = loadImage("woodStick 1.png")
woodStick2 = loadImage("woodStick 2.png")

gameOverImage = loadImage("gameOver.png")
restartImage = loadImage("restart.png")

}

function setup() {
 createCanvas(600,200)

 var message = "This is a message"
 console.log(message)

 Rishi = createSprite(50,160,20,50)
 Rishi.addAnimation("running",Rishi_Running)
 Rishi.addAnimation("Collided",Rishi_Collided)

 Rishi.scale = 0.5;

fireland = createSprite(200,180,400,20)
fireLand.addImage("fireLand",fireLandImg)
fireland.x = fireland.width/2;

gameOver = createSprite(300,140)
gameOver.addImage(gameOverImage)

restart = createSprite(300,140)
restart.addImage(restartImage)

gameOver.scale = 0.5;
restart.scale = 0.5

//creating woodSticks
woodSticksGroup = createGroup();

Rishi.setCollider("rectangle",0,0,Rishi.width,Rishi.height)
Rishi.debug = false

score = 0;

}

function draw() {
 
background(180)
//displaying score
text("score: "+ score, 500,50);

if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;

    fireland.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);

    if(score>0 && score%100 === 0){
        Rishi.velocityY = -12;
    }

    //add gravity
    Rishi.velocityY = Rishi.velocityY + 0.8

    //spawn the woodSticks on the ground
    spawnwoodSticks()

    if(woodSticksGroup.isTouching(Rishi)){
        //Rishi.velocityY = -12
        gameState = END

    }

}

else if(gameState === END){
gameOver.visible = true;
restart.visible = true;

//change the Rishi Animation
Rishi.changeAnimation("collided",Rishi_Collided);




fireland.velocityX = 0;
Rishi.velocityY = 0


//set lifetime of the game objects so that they are never destroyed
woodSticksGroup.setLifetimeEach(-1)

woodSticksGroup.setVelocityXEach(0)
}

//stop Rishi from falling down
Rishi.collide(fireland);

if(mousePressedOver(restart)){
    reset();
}

drawSprites();

}

function reset(){
  gameState=PLAY
  woodSticksGroup.destroyEach();
  score=0;
  Rishi.changeAnimation("running",Rishi_Running)
}

function spawnwoodSticks(){
    if(frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + score/100)

    //asign scale and lifetime to the woodSticks
    woodStick.scale = 0.5;
    woodStick.lifetime = 300;
   
   //add each woodSticks to the group
    woodSticksGroup.add(obstacle);
}

}