
// x and y are arrays that store the x and y coordinates for the trees
let x = []
let y = []

// tree is a variable that stores the tree image
let tree
function preload(){
  tree = loadImage('tree.png')
}

// variables that are used to add trees every 8 seconds
let timer = 0
let timePassed = 8000

// profit is a variable that is the score
let profit = 0

// ecoHealth is a variable equal to the number of trees
let ecoHealth = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
  imageMode(CENTER)
  rectMode(CENTER)

  // for loop that runs 100 times to generate random positions for the trees
  // trees are placed within the window screen, 150 pixels from the top and 50 pixels from the other sides
  for(let i = 0; i<100; i++){
  x.push(random(50, windowWidth - 50))
  y.push(random(120, windowHeight - 50))
  }

  // sets ecoHealth variable equal to the number of trees
  ecoHealth = x.length
}

function draw() {
  // background is red if profit is negative or ecoHealth is less than 50%
  if(profit < 0 || ecoHealth < 50){
    background(255, 0, 0)
  }else{
    background(255)
  }

  // text to display profit and ecosystem health
  fill(0)
  textSize(35)
  textAlign(LEFT, TOP)
  text('Profit $' + profit, 30, 40)
  text('Ecosystem Health: ' + ecoHealth + '%', 300, 40)

  // for loop that draws the 100 trees
  for(let i = 0; i < x.length; i++){
  image(tree, x[i], y[i], 50, 50)
  }

  // adds a tree to the screen after a certain amount of time has passed
  if(millis() >= timer + timePassed){
    x.push(random(50, windowWidth - 50))
    y.push(random(120, windowHeight-50))
    timer = millis()
    ecoHealth = x.length
  }

  // runs the ecoHealthWarning custom function
  ecoHealthWarning()
}

// if mouse is pressed over a tree, the tree is harvested
function mousePressed(){
    for(let i = x.length - 1; i >= 0; i--){
      if(dist(mouseX, mouseY, x[i], y[i]) < 25){
        x.splice(i, 1)
        y.splice(i, 1)

        // profit increases, ecosystem health decreases since a tree is removed
        profit += 200
        ecoHealth = x.length
      }
    }
      
    }

// if t key is pressed, a tree is planted
function keyPressed(){
  if((key == 't')){
    x.push(random(50, windowWidth - 50))
    y.push(random(120, windowHeight - 50))
    
    // profit decreases, ecosystem health increases since a tree is added
    profit -= 300
    ecoHealth = x.length
  }
}

// if ecoHealth is less than 50, a warning pops up
function ecoHealthWarning(){
  if(ecoHealth < 50){
    fill(0)
    rect(windowWidth/2, windowHeight/2, 750, 100)
    fill(255, 0, 0)
    textSize(35)
    textAlign(CENTER, CENTER)
    text('Warning: Ecosystem Health is less than 50%', windowWidth/2, windowHeight/2)
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}
