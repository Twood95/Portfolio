//Trenton Wood
//p5.play library added to make it a bit easier (sprites, collision, etc)
//Lots of inspiration/ideas/help from: http://creative-coding.decontextualize.com/making-games-with-p5-play/

var counter = 1000;
var counter2 = 1000;
var counter3 = 1000;
var counter4 = 1000;
var score = 0;
var start = 0;
var milliseconds2;

function preload() {
  anim = loadAnimation("assets/face1.png",
    "assets/face2.png",
    "assets/face3.png");
}

function setup() {

  createCanvas(800, 600);

  fivehundredlogos = new Group();
  threehundredlogos = new Group();
  negOneThouLogos = new Group();
  negFiveLogos = new Group();

  faceImg = loadImage("assets/face1.png");
  deathlog = loadImage("assets/deathlogo.png");
  angelcorpselog = loadImage("assets/angelcorpse.png");
  anthraxlog = loadImage("assets/anthrax.png");
  mayhemlog = loadImage("assets/mayhem.png");

  bvblog = loadImage("assets/bvb2.png");
  bfmvlog = loadImage("assets/bfmv.png");
  whitechapellog = loadImage("assets/whitechapel2.png");

  sprite = createSprite(width / 2, height - 40, 40, 40);
  sprite.scale = 0.3;
  sprite.addAnimation("default", anim);
}

function draw() {
  var milliseconds = millis();
  
  //variable to determine the time after the game has been initialized
  var gameSeconds = (milliseconds2 - millis()) * -1;

  background(0);
  
  //scoreboard display
  fill(255, 255, 255, 200);
  textSize(32);
  text("SCORE: " + score, 550, 580);


  //click to start display
  if (start == 0) {
    textSize(100)
    text("Click to Start", 100, 250);
  }
  
  
  //timer, rounded
  if (gameSeconds < 15000) {
     fill(255, 255, 255, 150)
    textSize(200)
     text(15 - round(gameSeconds / 1000), width / 3, height / 3);
   }


  //assigns milliseconds2 to the time the program is started & allows game to start
  if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && start < 1) {
    start++;
    milliseconds2 = millis();
  }

  //unlocks character after mouse click
  if (start >= 1) {
    sprite.position.x = mouseX;
    sprite.position.y = height - 40;
  }


  //different logos are assigned to different point groups
  if (gameSeconds > counter && gameSeconds < counter + 500) {
    deathLogo = createSprite(random(50, 750), random(-200, -2000), 25, 25);
    deathLogo.addImage(deathlog);
    deathLogo.scale = random(.08, 0.35);
    deathLogo.setSpeed(random(8, 15), 90);
    deathLogo.life = 1000;
    fivehundredlogos.add(deathLogo);

    angelcorpselogo = createSprite(random(50, 750), random(-200, -2000), 25, 25);
    angelcorpselogo.addImage(angelcorpselog);
    angelcorpselogo.scale = random(0.2, 0.5);
    angelcorpselogo.setSpeed(random(8, 15), 90);
    angelcorpselogo.life = 1000;
    fivehundredlogos.add(angelcorpselogo);

    counter += 10000;
  }

  if (gameSeconds > counter2 && gameSeconds < counter2 + 500) {
    anthrax = createSprite(random(50, 750), random(-200, -1200), 35, 35);
    anthrax.addImage(anthraxlog);
    anthrax.scale = random(0.1, 0.45);
    anthrax.setSpeed(random(8, 15), 90);
    anthrax.life = 1000;
    threehundredlogos.add(anthrax);

    mayhem = createSprite(random(50, 750), (-200, -1200), 25, 25);
    mayhem.addImage(mayhemlog);
    mayhem.scale = random(0.15, 0.8);
    mayhem.setSpeed(random(8, 15), 90);
    mayhem.life = 1000;
    threehundredlogos.add(mayhem);

    counter2 = counter2 + 1000;
  }

  if (gameSeconds > counter3 && gameSeconds < counter3 + 500) {
    bvb = createSprite(random(50, 750), random(-200, -1200), 35, 35);
    bvb.addImage(bvblog);
    bvb.scale = random(0.1, 0.45);
    bvb.setSpeed(random(8, 15), 90);
    bvb.life = 1000;
    negOneThouLogos.add(bvb);

    counter3 = counter3 + 1000;
  }

  if (gameSeconds > counter4 && gameSeconds < counter4 + 500) {
    bfmv = createSprite(random(50, 750), random(-200, -1200), 35, 35);
    bfmv.addImage(bfmvlog);
    bfmv.scale = random(0.1, 0.45);
    bfmv.setSpeed(random(8, 15), 90);
    bfmv.life = 1000;
    negFiveLogos.add(bfmv);

    whitechapel = createSprite(random(50, 750), (-200, -1200), 25, 25);
    whitechapel.addImage(whitechapellog);
    whitechapel.scale = random(0.15, 0.8);
    whitechapel.setSpeed(random(8, 15), 90);
    whitechapel.life = 1000;
    negFiveLogos.add(whitechapel);

    counter4 = counter4 + 1000;
  }
  
  drawSprites();

  //detects collision between sprites and runs the appropriate point function
  if (gameSeconds >= 1) {
    fivehundredlogos.overlap(sprite, fivepoints);
    threehundredlogos.overlap(sprite, threepoints);
    negOneThouLogos.overlap(sprite, negThouPoints);
    negFiveLogos.overlap(sprite, negFivePoints);
  }
  
  //stops sprites after reaching 15 seconds
  if (gameSeconds > 15000) {
    updateSprites(false);
    displayscores();
  }
}

//functions to addscore and remove the falling logo that collided
function fivepoints(fivehundredlogo, sprite) {
  score += 500;
  fivehundredlogo.remove();
}

function threepoints(threehundredlogo, sprite) {
  score += 300;
  threehundredlogo.remove();
}

function negThouPoints(negOneThouLogo, sprite) {
  score -= 1000;
  negOneThouLogo.remove();
}

function negFivePoints(negFiveLogo, sprite) {
  score -= 500;
  negFiveLogo.remove();
}


//displays end scores and "rank" the player recieves
function displayscores() {
  if (score < 0) {
    fill(0);
    rect(width / 3, height / 3 - 50, 600, 200);
    textSize(55);
    fill(256, 0, 0);
    text("SCORE = " + score, width / 3, height / 3);

    textSize(100);
    text("POSER", width / 3 + 100, height / 3 + 100);
  } else if (score > 0 && score < 2500) {
    fill(0);
    rect(width / 3, height / 3 - 50, 600, 200);
    textSize(55);
    fill(256, 0, 0);
    text("SCORE = " + score, width / 3, height / 3);

    textSize(100);
    text("NEWBIE", width / 3, height / 3 + 100);
  } else if (score >= 2500) {
    fill(0);
    rect(width / 3 - 100, height / 3 - 50, 700, 200);
    textSize(55);
    fill(256, 0, 0);
    text("SCORE = " + score, width / 3, height / 3);

    textSize(100);
    text("TRVE KVLT", width / 3 - 50, height / 3 + 100);
  }
}