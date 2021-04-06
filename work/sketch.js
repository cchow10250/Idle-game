//image and video variables
var clicker;
var flame;
var buyButton;
var upgrades;
var release;
var blissofLight;
var undyingFlame;
var charmofHope;
var questionMark;
var bg;
var free;

//money and upgrade variables
var money;
var moneyPerClick = 1;
var moneyPerClickCost = 10;
var autoLevel = 0;
var autoLevel2 = 0;
var autoCost = 25;
var autoCost2 = 10;
var releaseCost = 10252753666;
var gameOver = false;

//clicker position
var clickerX;
var clickerY;

//flame push
var flameXY = [];
var size = 40;

//font preload
function preload() {
    pixelFont = loadFont('Retro.ttf');
}

function setup() {
  createCanvas(1300,965);
  
  //load images
  clicker = loadImage("clicker.png");
  flame = loadImage("flame.png");
  buyButton = loadImage("buy.png");
  upgrades = loadImage("upgrades.png");
  release = loadImage("release.png");
  blissofLight = loadImage("blissoflight.png");
  undyingFlame = loadImage("undyingflame.png");
  charmofHope = loadImage("charmofhope.png");
  questionMark = loadImage("question.png");
  bg = loadImage("dungeon.png");
  free = loadImage("free.png");

  //money & clicker button position
  money = 0;
  clickerX = 1000;
  clickerY = 600;
}

function draw() {
  imageMode(CORNER);  
  background(bg);
  
  //load images
  imageMode(CENTER);
  image(clicker,clickerX,clickerY,900,700);
  
  //flame rising when pressing soul
  for(var i = 0;i < flameXY.length; i++) {
      image(flame,flameXY[i][0], flameXY[i][1], random(30,80), random(30,80));
      flameXY[i][1] -= random(1,10);
  }
  
  //Cleanse the Soul title
  textAlign(CENTER);
  fill(0,0,0);
  stroke(4,130,230);
  strokeWeight(5);
  textSize(50);
  textFont(pixelFont);
  text("CLEANSE THE SOUL.",1000,70);
  
  //money
  stroke(0);
  fill(255);
  textSize(50);
  text('Faith:',1000,140);
  text(money,1000,200);
  
  //How to Play
  stroke(0);
  strokeWeight(2);
  fill(117,7,7);
  textSize(25);
  let howTo = 'The Soul is tainted. Press (Left Click) on The Soul to gain Faith, and unlock the upgrades to set it free from Oblivion.'
  text(howTo, 10, 10, 650, 500);
  
  //Upgrades Tabs
  image(upgrades,190,200,400,200);
  
  //Bliss of Light (Clicker) Upgrade Text
  noStroke();
  fill(255);
  textSize(25);
  text("Bliss of Light",110,300);
  text("Cost:",45,335);
  fill(255,0,0);
  textAlign(LEFT);
  text(moneyPerClickCost,90,335);
  image(buyButton,60,375,120,100);
  
  //Undying Flame (Auto Level 1) Upgrade Text
  textAlign(CENTER);
  fill(255);
  textSize(25);
  text("Undying Flame",115,460);
  text("Cost:",45,495);
  fill(255,0,0);
  textAlign(LEFT);
  text(autoCost,90,495);
  image(buyButton,60,535,120,100);
  
  //Charm of Hope (Auto Level 2) Upgrade Text
  textAlign(CENTER);
  fill(255);
  textSize(25);
  text("Charm of Hope",117,620);
  text("Cost:",45,655);
  fill(255,0,0);
  textAlign(LEFT);
  text(autoCost2,90,655);
  image(buyButton,60,695,120,100);
  
  //RELEASE
  textAlign(CENTER);
  image(release,185,830,400,250);
  text(releaseCost,110,930);
  text('FAITH REQUIRED',350,930);
  image(questionMark,380,785,30,30);
  releaseInfo();
  
  //Bliss of Light Picture
  image(blissofLight,300,340,120,120);
  image(questionMark,380,295,30,30);
  blissInfo();
  
  //Undying Flame Picture
  image(undyingFlame,300,505,120,120);
  image(questionMark,380,460,30,30);
  flameInfo();
  
  //Charm of Hope Picture
  image(charmofHope,300,665,120,120);
  image(questionMark,380,620,30,30);
  charmInfo();
  
  //If you bought the release upgrade, then the game is over.
  if(gameOver == true) {
    clear();
    background(10);
    fill(0);
    stroke(4,130,230);
    strokeWeight(5);
    textSize(90);
    text("You are free...", width/2,height/2);
  }
}

//If the mouse is pressed on CERTAIN buttons
function mousePressed() {
    
    //clicker
    if(mouseX > clickerX - 230 && mouseX < clickerX + 230 && mouseY > clickerY - 350 && mouseY < clickerY + 140) {
        money = money + moneyPerClick;
        flameXY.push([mouseX,mouseY]);
    }
    
    //upgrade 1 (clicker power)
    if(mouseX > 10 && mouseX < 110 && mouseY > 350 && mouseY < 400) {
        buyMoneyPerClick();
    }
    
    //upgrade 2 (auto clicker 1)
    if(mouseX > 10 && mouseX < 110 && mouseY > 500 && mouseY < 550) {
        autoUpgrade();
    }
    
    //upgrade 3 (auto clicker 2 (This is a cheat upgrade, gives you a lot of Faith))
    if(mouseX > 10 && mouseX < 110 && mouseY > 670 && mouseY < 720) {
        autoUpgrade2();
    }   
    
    //Release upgrade
    if(mouseX > 10 && mouseX < 360 && mouseY > 760 && mouseY < 900) {
        if(money >= releaseCost) {
            gameOver = true;
        }
  }
}

//Clicker power (Bliss of Light)
function buyMoneyPerClick() {
    if(money >= moneyPerClickCost) {
        money -= moneyPerClickCost;
        moneyPerClick += 1;
        moneyPerClickCost *= 2;
    }
}

//Autoclick function (Undying flame)
function autoUpgrade() {
    if(money >= autoCost) {
        money -= autoCost;
        autoLevel++;
        autoCost *= 2;
        setInterval(autoIncrease, 1000);
    }
}

//Cheat level (Charm of Hope)
function autoUpgrade2() {
    if(money >= autoCost2) {
        money -= autoCost2;
        autoLevel2++;
        autoCost2 *= 2;
        setInterval(autoIncrease2, 1000);
    }
}

//increase intervals for Undying Flame
function autoIncrease() {
    money += autoLevel;
}

//increase interval for Charm of Hope
function autoIncrease2() {
    money += autoLevel2 * 10000000000;
}

//Text info for Bliss of Light
function blissInfo() {
    if(mouseX > 365 && mouseX < 395 && mouseY > 280 && mouseY < 310) {
        fill(228,166,94);
        textSize(15);
        textAlign(LEFT);
        let blissText = 'A speck of light left by an honorable soldier who lost their way in Oblivion';
        text(blissText, 400, 285, 350, 100);
        textAlign(CENTER);
        fill(255);
        text('Faith Per Click:',470,340);
        fill(255,0,0);
        text(moneyPerClick,550,340);
    }
}

//Text info for Undying Flame
function flameInfo() {
    if(mouseX > 365 && mouseX < 395 && mouseY > 442 && mouseY < 472) {
        fill(228,166,94);
        textSize(15);
        textAlign(LEFT);
        let undyingText = 'An immortal flame, once borne by Pyro Emperor Yeezus';
        text(undyingText,400,450,290,100);
        textAlign(CENTER);
        fill(255);
        text('Level:',428,505);
        text('Faith Per Second:',483,525);
        fill(255,0,0);
        text(autoLevel,465,505);
        text(autoLevel,575,525);
    }
}

//Text info for Charm of Hope
function charmInfo() {
    if(mouseX > 365 && mouseX < 395 && mouseY > 605 && mouseY < 635) {
        fill(228,166,94);
        textSize(15);
        textAlign(LEFT);
        let charmText = "A warrior's last resort, the charm calls for world's faith";
        text(charmText,400,610,330,100);
        textAlign(CENTER);
        fill(255);
        text('Level:',428,665);
        text('Faith Per Level:',474,685);
        fill(255,0,0);
        text(autoLevel2,465,665);
        text(10000000000,615,685);
    }
}

//Text info for Release
function releaseInfo() {
    if(mouseX > 365 && mouseX < 395 && mouseY > 770 && mouseY < 800) {
        fill(228,166,94);
        textSize(15);
        textAlign(LEFT);
        let releaseText = "Is this what you really want? (Ends the game)";
        text(releaseText,400,775,280,100);
    }
}
    