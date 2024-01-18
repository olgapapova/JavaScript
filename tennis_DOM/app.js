"use strict";
  
let sizeBall=30;
let heightBric=sizeBall*3;
let widthPole=500;  // ширина поля
let heightPole=300;  // высота поля

let cont=document.getElementById('cont');
cont.style.width=widthPole+'px';

let pole={
     width : widthPole,
     height : heightPole,

     size : function() {
        let poleEl=document.getElementById('pol');
        poleEl.style.width=this.width+'px';
        poleEl.style.height=this.height+'px';
    }
};
pole.size();

let leftBric={
     width: 8,
     height: heightBric, 
     posX: 0, 
     posY: (heightPole/2)-(heightBric/2),
     speedY: 0,
    
     update : function() {
       let leftBricEl=document.getElementById('bL');
       leftBricEl.style.left=this.posX+'px';
       leftBricEl.style.top=this.posY+'px';
       leftBricEl.style.width=this.width+'px';
       leftBricEl.style.height=this.height+'px';
     }
  };
  leftBric.update();

  let rightBric={
     width: 8,
     height: heightBric, 
     posX: widthPole-8, 
     posY: (heightPole/2)-(heightBric/2),
     speedY: 0,
    
     update : function() {
       let rightBricEl=document.getElementById('bR');
       rightBricEl.style.left=this.posX+'px';
       rightBricEl.style.top=this.posY+'px';
       rightBricEl.style.width=this.width+'px';
       rightBricEl.style.height=this.height+'px';
     }
  };
  rightBric.update();

  let ball={
     width: sizeBall,
     height: sizeBall, 
     posX: (widthPole/2)-(sizeBall/2), 
     posY: (heightPole/2)-(sizeBall/2),
     speedX: 0, //randomDiap(-2,2),
     speedY: 0, //randomDiap(-2,2),
    
     update : function() {
       let ballEl=document.getElementById('b');
       ballEl.style.left=this.posX+'px';
       ballEl.style.top=this.posY+'px';
       ballEl.style.width=this.width+'px';
       ballEl.style.height=this.height+'px';
     }
  };
  ball.update();

  let schetLeft=0;
  let schetRight=0;

  setInterval(tick,40);

  document.addEventListener('keydown', moveBricStart, false);
  document.addEventListener('keyup', moveBricStop, false);

  function start() {
     let angleRand=(randomDiap(20,45))/180*Math.PI;
     let angleRandVer=randomDiap(1,2); // если 1 то вверх, если 2 то вниз летит
     let angleRandHor=randomDiap(3,4); // если 3 то влево, если 4 то вправо летит
   
     if (angleRandVer===1) {
        ball.speedY=-angleRand;
     }
     else {
        ball.speedY=angleRand;
     }
     if (angleRandHor===4) {
        ball.speedX=3;
     }
     else {
        ball.speedX=-3;
     }
     ball.posX=(widthPole/2)-(sizeBall/2);
     ball.posY=(heightPole/2)-(sizeBall/2);
  };

  function tick() {

     leftBric.posY+=leftBric.speedY;
     leftBric.update();

     rightBric.posY+=rightBric.speedY;
     rightBric.update();

     if (leftBric.posY<0) {
        leftBric.posY=0;
        leftBric.speedY=0;
     }
     if (leftBric.posY+leftBric.height>heightPole) {
        leftBric.posY=heightPole-leftBric.height;
        leftBric.speedY=0;
     }
     if (rightBric.posY<0) {
        rightBric.posY=0;
        rightBric.speedY=0;
     }
     if (rightBric.posY+rightBric.height>heightPole) {
        rightBric.posY=heightPole-rightBric.height;
        rightBric.speedY=0;
     }

     ball.posX+=ball.speedX;
 
     if ( ball.posX+ball.width>pole.width ) {
        ball.speedY=0;
        ball.speedX=0;
        ball.posX=pole.width-ball.width;
        let rightSch=document.getElementById('rightSch');
        schetRight+=1;
        rightSch.innerHTML=schetRight;
     }

     if ( ball.posX<rightBric.posX+rightBric.width && ball.posX+ball.width>rightBric.posX && ball.posY<rightBric.posY+rightBric.height && ball.posY+ball.height>rightBric.posY ) {
        ball.speedX=-ball.speedX;
        ball.posX=pole.width-ball.width-rightBric.width;
     }

     if ( ball.posX<0 ) {
        ball.speedY=0;
        ball.speedX=0;
        ball.posX=0;
        let leftSch=document.getElementById('leftSch');
        schetLeft+=1;
        leftSch.innerHTML=schetLeft;
     }

     if ( ball.posX<leftBric.posX+leftBric.width && ball.posX+ball.width>leftBric.posX && ball.posY<leftBric.posY+leftBric.height && ball.posY+ball.height>leftBric.posY ) {
        ball.speedX=-ball.speedX;
        ball.posX=leftBric.width;
     }

     ball.posY+=ball.speedY;
 
     if ( ball.posY+ball.height>pole.height ) {
        ball.speedY=-ball.speedY;
        ball.posY=pole.height-ball.height;
     }
     if ( ball.posY<0 ) {
        ball.speedY=-ball.speedY;
        ball.posY=0;
     }
     ball.update();
  };

  function moveBricStart(eo) {
     eo=eo || window.event;
     eo.preventDefault();
     if (eo.keyCode===16) {
        leftBric.speedY=-2;
     }
     else if (eo.keyCode===17) {
        leftBric.speedY=2;
     }
     else if (eo.keyCode===38) {
        rightBric.speedY=-2;
     }
     else if (eo.keyCode===40) {
        rightBric.speedY=2;
     }
   }

   function moveBricStop (eo) {
      eo=eo || window.event;
      eo.preventDefault();
      if (eo.keyCode===16) {
         leftBric.speedY=0;
      }
      else if (eo.keyCode===17) {
         leftBric.speedY=0;
      }
      else if (eo.keyCode===38) {
         rightBric.speedY=0;
      }
      else if (eo.keyCode===40) {
         rightBric.speedY=0;
      }
   }

  function randomDiap(n,m) {
     return Math.floor(Math.random()*(m-n+1))+n;
  }