"use strict";
  window.addEventListener('load', imgPos, false);

  function imgPos (eo) {
      eo=eo || window.event;
      let tagImg=document.getElementsByTagName('img');
      
      console.log(tagImg);
      for (let t=tagImg.length-1; t>=0; t--) {
          let dragImg=tagImg[t];
          
          dragImg.addEventListener('mousedown', dragElemD, {passive: false});
          dragImg.addEventListener('mouseup', dragElemU, {passive: false});
          dragImg.style.left=dragImg.offsetLeft+'px';
          dragImg.style.top=dragImg.offsetTop+'px';
      }

      for (let t=tagImg.length-1; t>=0; t--) {
          let dragImg=tagImg[t];
          
          dragImg.style.position='absolute';  
      }
      
      let elem=null;
      let elemX=0;
      let elemY=0;
  
      function dragElemD(eo) {
          eo=eo || window.event;
          eo.preventDefault();

          elem=eo.target;
          elemX=eo.pageX-elem.offsetLeft;
          elemY=eo.pageY-elem.offsetTop;
          elem.parentNode.appendChild(elem);

          window.addEventListener('mousemove', dragElemM, false); 
      }   
      
      function dragElemM (eo) {
          eo=eo || window.event;
          eo.preventDefault();

          elem.style.left=(eo.pageX-elemX)+'px';
          elem.style.top=(eo.pageY-elemY)+'px';
      }  

      function dragElemU(eo) {
          eo=eo || window.event;
          eo.preventDefault();
          elem=null;
          window.removeEventListener('mousemove', dragElemM, false);
      }
  }