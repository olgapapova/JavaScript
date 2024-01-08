function constructClock () {
    let inputEl=document.getElementById('sizeClock');
    let inputVal=inputEl.value;

    let angleNum=(360/12)/180*Math.PI; // угол на циферблате между цифрами
    let radiusNum=(inputVal/100*40); // радиус от центра циферблата до цифры 40% от диаметра часов
    let numbWid=(inputVal/100*13); // ширина кружка с цифрой 13% от диаметра часов
    let numbHeig=(inputVal/100*13); // высота кружка с цифрой 13% от диаметра часов
    let numbLineH=(inputVal/100*13); // выравнивание по вертикали тоже 13% как и высота кружка
    let numbFontS=(inputVal/100*7); // велечина шрифта 7% от диаметра часов
    let handHoursWid=(inputVal/100*4); // ширина часовой стрелки 4% от диаметра часов
    let handHoursHeig=(inputVal/100*30); // высота часовой стрелки 30% от диаметра часов
    let handHourOrX=handHoursWid/100*50; // точка соприкосновения часовой стрелки с серединой циферблата по горизонтали
    let handHourOrY=handHoursHeig/100*90; // точка соприкосновения часовой стрелки с серединой циферблата по вертикали
    let handMinWid=(inputVal/100*2); // ширина минутной стрелки 2% от диаметра часов
    let handMinHeig=(inputVal/100*40); // высота минутной стрелки 40% от диаметра часов
    let handSecWid=(inputVal/100*1); // ширина секундной стрелки 1% от диаметра часов
    let handSecHeig=(inputVal/100*45); // высота секундной стрелки 45% от диаметра часов
    let handMinOrX=handMinWid/100*50; // точка соприкосновения минутной стрелки с серединой циферблата по горизонтали
    let handMinOrY=handMinHeig/100*90; // точка соприкосновения минутной стрелки с серединой циферблата по вертикали
    let handSecOrX=handSecWid/100*50; // точка соприкосновения минутной стрелки с серединой циферблата по горизонтали
    let handSecOrY=handSecHeig/100*90; // точка соприкосновения минутной стрелки с серединой циферблата по вертикали
    let spanFontSize=(inputVal/100*9); // велечина шрифта 9% от диаметра часов
    let angle=360/60; // угол однократного поворота секундной и минутной стрелки
    let angleH=360/60*5; // угол однократного поворота часовой стрелки
    let numberSeconds=60*60; // количество секунд в одном часу

    if (inputVal<200 || inputVal>800) {
       alert ('укажите число от 200 до 800');
       return;
    }
    let divClock=document.getElementById('cl');
    divClock.style.width=inputVal+'px';
    divClock.style.height=inputVal+'px';
    divClock.style.display='block';
    let inp=document.getElementsByTagName('input');
    for (let i=0; i<inp.length; i++) 
       inp[i].style.display='none';
    let centerClockX=divClock.offsetLeft+divClock.offsetWidth/2;
    let centerClockY=divClock.offsetTop+divClock.offsetHeight/2;

    for (let i=1; i<=12; i++) {
          let numb=document.createElement('div');
          numb.style.width=numbWid+'px';
          numb.style.height=numbHeig+'px';
          numb.className='NUMBER';
          let numberCenterX=centerClockX+radiusNum*Math.sin(angleNum);
          let numberCenterY=centerClockY-radiusNum*Math.cos(angleNum);
          numb.style.left=Math.round(numberCenterX-numbWid/2)+'px';
          numb.style.top=Math.round(numberCenterY-numbHeig/2)+'px';
          document.body.appendChild(numb);
          numb.style.lineHeight=numbLineH+'px';
          numb.style.fontSize=numbFontS+'px';
          numb.innerHTML=i;
          angleNum+=(360/12)/180*Math.PI;
     }

     let handHours=document.getElementById('handW');
     handHours.style.width=handHoursWid+'px';
     handHours.style.height=handHoursHeig+'px';
     handHours.style.left=(centerClockX-handHourOrX)+'px';
     handHours.style.top=(centerClockY-handHourOrY)+'px';
     handHours.style.transformOrigin='50% 90%';
     handHours.style.display='block';

     let handMinutes=document.getElementById('handM');
     handMinutes.style.width=handMinWid+'px';
     handMinutes.style.height=handMinHeig+'px';
     handMinutes.style.left=(centerClockX-handMinOrX)+'px';
     handMinutes.style.top=(centerClockY-handMinOrY)+'px';
     handMinutes.style.transformOrigin='50% 90%';
     handMinutes.style.display='block';
     handMinutes.style.zIndex='1000';

     let handSeconds=document.getElementById('handS');
     handSeconds.style.width=handSecWid+'px';
     handSeconds.style.height=handSecHeig+'px';
     handSeconds.style.left=(centerClockX-handSecOrX)+'px';
     handSeconds.style.top=(centerClockY-handSecOrY)+'px';
     handSeconds.style.transformOrigin='50% 90%';
     handSeconds.style.display='block';
     handSeconds.style.zIndex='1500';

     let spanEl=document.getElementById('num');
     spanEl.style.display='block';
     spanEl.style.fontSize=spanFontSize+'px';

     timeUpdate();
     setInterval(timeUpdate,1000);

     function timeUpdate() {
          let time=new Date();
          let timeStr=formatDateTime(time);
          spanEl.innerHTML=timeStr;
          console.log(timeStr);

          let h=(time.getHours() + time.getMinutes() / 60 + time.getSeconds() * numberSeconds) * angleH;
          let m=time.getMinutes()*angle;
          let s=time.getSeconds()*angle;

          handSeconds.style.transform='rotate('+s+'deg)';
          handMinutes.style.transform='rotate('+m+'deg)';
          handHours.style.transform='rotate('+h+'deg)';
       }

     function formatDateTime(dt) {
          const hours=dt.getHours();
          const minutes=dt.getMinutes();
          const seconds=dt.getSeconds();
          return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
       }
 
       function str0l(val,len) {
          let strVal=val.toString();
          while ( strVal.length < len )
          strVal='0'+strVal;
          return strVal;
       }
 }