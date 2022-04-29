var bullet,bulletImg
var SpaceShip,SpaceShipImg
var EnemySpaceShip,EnemySpaceShipImg
var baground,bagroundImg
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var EnemySpaceShipG,bulletsG
var score ;
var win,lose,winImg,loseImg

function preload(){
bulletImg = loadImage("gun_prev_ui.png");
SpaceShipImg = loadImage("download_prev_ui.png");
EnemySpaceShipImg = loadImage("Enemy Spaceship.png");
bagroundImg = loadImage("spaceactuall_prev_ui.png");
winImg = loadImage("win image.png");
loseImg = loadImage("you_lose.png");
}

function setup() {
createCanvas(400,400);
EnemySpaceShipG =new Group();
bulletsG =new Group();

baground = createSprite(200,200,400,400);
baground.addImage("img",bagroundImg);
baground.scale = 1.5;

SpaceShip = createSprite(200,350,30,30);
SpaceShip.addImage("Ship",SpaceShipImg);
SpaceShip.scale = 0.5;

win = createSprite(200,200,400,400);
win.addImage("win",winImg);
win.visible = false;
win.scale = 2.2

lose = createSprite(200,200,400,400);
lose.addImage("lose",loseImg);
lose.visible = false;
lose.scale = 0.5



score = 0;

}

function draw() {
background(180);    
text("Score: "+ score,340,40);
drawSprites(); 
game();

}

function game(){
    if (gameState === PLAY){
        
        
        
        if(baground.y > 400){
            baground.y = baground.y/2;
        }
       
        baground.velocityY = 3

        EnemyKill();
        ShipMove();
        EnemySpawn();
        End();
        bulletfire();
    }
      

 if(gameState === END){
EnemySpaceShipG.velocityY = 0;
EnemySpaceShipG.lifetime = -1;
EnemySpaceShipG.visible = false
console.log("working");
    }      
  

    
}
function EnemySpawn(){
    if (World.frameCount % 50 == 0){

        EnemySpaceShip = createSprite(300,0,20,20);
        EnemySpaceShip.addImage("ship",EnemySpaceShipImg);
        EnemySpaceShip.scale = 0.2;
        EnemySpaceShip.x = Math.round(random(10,390));
        EnemySpaceShip.velocityY = +4;
        EnemySpaceShipG.add(EnemySpaceShip);
        EnemySpaceShip.lifetime = 200;
    }
}

function EnemyKill(){
    if(bulletsG.isTouching(EnemySpaceShipG)){
        EnemySpaceShipG.destroyEach();
        bulletsG.destroyEach();
        score = score +1;
    }
}

function End(){
    if(EnemySpaceShipG.isTouching(SpaceShip)){
        gameState = END;
        lose.visible = true 
    }

    if(score === 10){
        gameState = END;
        win.visible = true
    }
}

function ShipMove(){
    if (keyDown("LEFT_ARROW")){
        SpaceShip.velocityX = -5;
    }
    if (keyWentUp("LEFT_ARROW")){
        SpaceShip.velocityX = 0;
    }
    if (keyDown("RIGHT_ARROW")){
        SpaceShip.velocityX = 5;
    }
    if (keyWentUp("RIGHT_ARROW")){
        SpaceShip.velocityX = 0;
    }
}

function bulletfire(){
    
 if (keyDown("SPACE")){
    bullet = createSprite(20,300,10,10)
    bullet.addImage("bullet",bulletImg);
    bullet.scale = 0.1;
    bullet.x = SpaceShip.x;
    bullet.velocityY = -5;
    bulletsG.add(bullet);
    bullet.lifetime = 200;
    }  
}