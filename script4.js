let gameboard=document.getElementById("board");
let content=gameboard.getContext('2d')
let scoretext=document.getElementById('scoreval');
const width=gameboard.width;
const height=gameboard.height;
const unitprice=25;
let active=true;
let started=false;
let score=0;
let snake=[
  {x:unitprice*3,y:0},
  {x:unitprice*2,y:0},
  {x:unitprice,y:0},
  {x:0,y:0}
];
window.addEventListener('keydown',keypress);
let xvel=25;
let yvel=0;
startgame();
function startgame()
{
    content.fillStyle='#212121';
    content.fillRect(0,0,width,height);
    createfood();
    displayfood();
    // snakesize();
    // movesnake();
    // clearboard()
    snakesize();
    // keypress();


}
function clearboard()
{
  content.fillStyle='#212121';
  content.fillRect(0,0,width,height);
}
function createfood()
{
  foodx=Math.floor(Math.random()*width/unitprice)*unitprice;
  foody=Math.floor(Math.random()*width/unitprice)*unitprice;

}
function displayfood()
{
    content.fillStyle='yellow';
    content.fillRect(foodx,foody,unitprice,unitprice);
}
function snakesize(){
  content.fillStyle='blue';
  content.strokeStyle='#212121';
  snake.forEach((snakebutton)=>
  {
    content.fillRect(snakebutton.x,snakebutton.y,unitprice,unitprice);
    content.strokeRect(snakebutton.x,snakebutton.y,unitprice,unitprice);

  })
}
function movesnake()
{
     const head= {x:snake[0].x+xvel,y:snake[0].y+yvel};
     snake.unshift(head);
     if(snake[0].x==foodx&&snake[0].y==foody)
     {
      score++;
      scoretext.textContent=score;
      createfood();
     }
     else
     snake.pop();
}
function nexttric()
{
  if(active)
  {
  setTimeout(( )=>{
     clearboard();
     displayfood();
     movesnake();
     snakesize();
     gameover();
     nexttric();
  },200)
  }
  else
  {
    clearboard();
    content.font="bold 50px serif";
    content.fillStyle="white";
    content.textalign="center";
    content.fillText("Game Over!!",width/4,height/2);

  }
}
function keypress(event1)
{
  if(!started)
  {
    started=true;
    nexttric()
  }
  
 const left=37;
  const up=38;
  const right=39;
  const down=40;
  
  if(event1.keyCode==left&&xvel!=unitprice)
  {
     xvel=-unitprice;
     yvel=0;
  }
  else if(event1.keyCode==up &&yvel!=unitprice)
  {
    xvel=0;
    yvel=-unitprice;
  }
  else if(event1.keyCode==right&&xvel!=-unitprice)
  {
    xvel=unitprice;
    yvel=0;
  }
  else if(event1.keyCode==down&&yvel!=-unitprice) {
    xvel=0;
    yvel=unitprice;
  }

}
function gameover()
{
  if(snake[0].x<0||snake[0].x>=width||snake[0].y<0||snake[0].y>=height)
  {
    active=false
    return 0;
  }
}