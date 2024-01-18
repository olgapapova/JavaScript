"use strict";

     let sizeBall=15*2;
     let heightBric=90;
     let widthBric=8;
     let widthPole=499;  // ширина поля
     let heightPole=299;  // высота поля

     

     let leftBric={
          width: widthBric,
          height: heightBric, 
          posX: 0, 
          posY: (heightPole/2)-(heightBric/2),
          speedY: 0,
         
          update : function() {
            let leftBricEl=document.getElementById('bLeft');
            leftBricEl.style.x=this.posX+'px';
            leftBricEl.style.y=this.posY+'px';
            leftBricEl.style.width=this.width+'px';
            leftBricEl.style.height=this.height+'px';
          }
       };

       let rightBric={
          width: widthBric,
          height: heightBric, 
          posX: widthPole-widthBric, 
          posY: (heightPole/2)-(heightBric/2),
          speedY: 0,
         
          update : function() {
            let rightBricEl=document.getElementById('bRight');
            rightBricEl.style.x=this.posX+'px';
            rightBricEl.style.y=this.posY+'px';
            rightBricEl.style.width=this.width+'px';
            rightBricEl.style.height=this.height+'px';
          }
       };

       let ball={
          width: sizeBall,
          height: sizeBall, 
          posX: (widthPole/2), 
          posY: (heightPole/2),
          speedX: 0, 
          speedY: 0,
         
          update : function() {
            let ballEl=document.getElementById('ball');
            ballEl.style.cx=this.posX+'px';
            ballEl.style.cy=this.posY+'px';
            ballEl.style.width=this.width+'px';
            ballEl.style.height=this.height+'px';
          }
       };
 
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
          ball.update();
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
      
          if ( ball.posX+ball.width/2>widthPole ) {
             ball.speedY=0;
             ball.speedX=0;
             ball.posX=widthPole-ball.width/2;
             let rightSch=document.getElementById('rightSch');
             schetRight+=1;
             rightSch.innerHTML=schetRight;
          }
  
          if ( ball.posX<rightBric.posX+rightBric.width && ball.posX+ball.width/2>rightBric.posX && ball.posY-ball.height/2<rightBric.posY+rightBric.height && ball.posY+ball.height/2>rightBric.posY ) {
             ball.speedX=-ball.speedX;
             ball.posX=widthPole-ball.width/2-rightBric.width;
          }

          if ( ball.posX-ball.width/2<0 ) {
             ball.speedY=0;
             ball.speedX=0;
             ball.posX=0+ball.width/2;
             let leftSch=document.getElementById('leftSch');
             schetLeft+=1;
             leftSch.innerHTML=schetLeft;
          }

          if ( ball.posX-ball.width/2<leftBric.posX+leftBric.width && ball.posX+ball.width/2>leftBric.posX && ball.posY-ball.height/2<leftBric.posY+leftBric.height && ball.posY+ball.height/2>leftBric.posY ) {
             ball.speedX=-ball.speedX;
             ball.posX=0+leftBric.width+ball.width/2;
          }

          ball.posY+=ball.speedY;
      
          if ( ball.posY+ball.height/2>heightPole ) {
             ball.speedY=-ball.speedY;
             ball.posY=heightPole-ball.height/2;
          }
          if ( ball.posY-ball.height/2<0 ) {
             ball.speedY=-ball.speedY;
             ball.posY=0+ball.height/2;
          }
          ball.update();         
       };

       function moveBricStart(eo) {
          eo=eo || window.event;
          eo.preventDefault();
          if (eo.keyCode===16) {
             leftBric.speedY=-1;
          }
          else if (eo.keyCode===17) {
             leftBric.speedY=1;
          }
          else if (eo.keyCode===38) {
             rightBric.speedY=-1;
          }
          else if (eo.keyCode===40) {
             rightBric.speedY=1;
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
