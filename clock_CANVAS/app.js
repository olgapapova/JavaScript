function constructClock () {
    let inputEl=document.getElementById('sizeClock');
    let inputVal=inputEl.value;

    let angleNum=(360/12)/180*Math.PI; // угол на циферблате между цифрами
    let radiusNum=(inputVal/100*40); // радиус от центра циферблата до цифры 40% от диаметра часов
    let radNum=(inputVal/100*13)/2; // диаметр кружка с цифрой 13% от диаметра часов
    let numbFontS=(inputVal/100*7); // велечина шрифта 7% от диаметра часов
    let handHoursWid=(inputVal/100*4); // ширина часовой стрелки 4% от диаметра часов
    let handHoursHeig=(inputVal/100*25); // высота часовой стрелки 25% от диаметра часов
    let handMinWid=(inputVal/100*2); // ширина минутной стрелки 2% от диаметра часов
    let handMinHeig=(inputVal/100*15); // высота минутной стрелки 15% от диаметра часов
    let handSecWid=(inputVal/100*1); // ширина секундной стрелки 1% от диаметра часов
    let handSecHeig=(inputVal/100*10); // высота секундной стрелки 10% от диаметра часов
    let spanFontSize=(inputVal/100*9); // велечина шрифта 9% от диаметра часов
    let angle=360/60/180*Math.PI; // угол однократного поворота секундной и минутной стрелки
    let angleH=360/60*5/180*Math.PI; // угол однократного поворота часовой стрелки
    let numberSeconds=60*60; // количество секунд в одном часу

    if (inputVal<200 || inputVal>800) {
       alert ('укажите число от 200 до 800');
       return;
    }

    let inp=document.getElementsByTagName('input');
    for (let i=0; i<inp.length; i++) 
       inp[i].style.display='none';

    let spanEl=document.getElementById('num');
    spanEl.style.left=inputVal/2-(inputVal/2/100*27)+'px';
    spanEl.style.top=inputVal/2-(inputVal/100*23)+'px';
    spanEl.style.display='block';
    spanEl.style.fontSize=spanFontSize+'px';

    timeUpdate();
    setInterval(timeUpdate,1000);

    function timeUpdate() {

       let cvs=document.getElementById('clockCVS');
       let context=cvs.getContext('2d');
       cvs.style.display='block';
       cvs.setAttribute('width', inputVal);
       cvs.setAttribute('height', inputVal);
       //cvs.style.width=inputVal;
       //cvs.style.height=inputVal;
       context.fillStyle='orange';
       context.beginPath();
       context.arc(inputVal/2, inputVal/2, inputVal/2, 0, 2*Math.PI, false);
       context.fill();
 
       for (let i=1; i<=12; i++) {
          context.beginPath();
          context.fillStyle='#66CDAA'; 
          let numberCenterX=inputVal/2+radiusNum*Math.sin(angleNum);
          let numberCenterY=inputVal/2-radiusNum*Math.cos(angleNum);
          angleNum+=(360/12)/180*Math.PI;
          context.arc(numberCenterX, numberCenterY, radNum, 0, 2*Math.PI, false);
          context.fill();
       }

       for (let s=1; s<=12; s++) {
          context.beginPath();
          context.fillStyle='black';
          context.font=`normal normal ${numbFontS+'px'} Times New Roman`;
          context.textAlign='center';
          context.textBaseline='middle';
          let numberCenterX=inputVal/2+radiusNum*Math.sin(angleNum);
          let numberCenterY=inputVal/2-radiusNum*Math.cos(angleNum);
         angleNum+=(360/12)/180*Math.PI;
         context.fillText(s, numberCenterX, numberCenterY);   
      }

      

      let time=new Date();
      let timeStr=formatDateTime(time);
      spanEl.innerHTML=timeStr;
      console.log(timeStr);

      let h=(time.getHours()+ time.getMinutes() / 60 + time.getSeconds() * numberSeconds) *angleH;
      let m=time.getMinutes()*angle;
      let s=time.getSeconds()*angle;

      context.lineCap='round';
      context.lineWidth=handHoursWid;
      context.beginPath();
      let handHoursCenterX=inputVal/2+(inputVal/2-handHoursHeig)*Math.sin(h);
      let handHoursCenterY=inputVal/2-(inputVal/2-handHoursHeig)*Math.cos(h);
      context.moveTo(inputVal/2, inputVal/2);
      context.lineTo(handHoursCenterX, handHoursCenterY);
      context.stroke();
 
      context.lineWidth=handMinWid;
      context.beginPath();
      let handMinCenterX=inputVal/2+(inputVal/2-handMinHeig)*Math.sin(m);
      let handMinCenterY=inputVal/2-(inputVal/2-handMinHeig)*Math.cos(m);
      context.moveTo(inputVal/2, inputVal/2);
      context.lineTo(handMinCenterX, handMinCenterY);
      context.stroke();
 
      context.lineWidth=handSecWid;
      context.beginPath();
      let handSecCenterX=inputVal/2+(inputVal/2-handSecHeig)*Math.sin(s);
      let handSecCenterY=inputVal/2-(inputVal/2-handSecHeig)*Math.cos(s);
      context.moveTo(inputVal/2, inputVal/2);
      context.lineTo(handSecCenterX, handSecCenterY);
      context.stroke();
   }
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