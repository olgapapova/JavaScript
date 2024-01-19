//model

function Clock(timezone) {
    let self=this;
    self.currentTime=null;
    self.states=1; // 1часы идут, 2-стоят
    self.timezone=timezone;   // 5-Нью-Йорк, ''-Лондон, 1-Берлин, 3-Минск, 9-Токио, 10-Владивосток
    let myView=null;
    let myField=null;
    self.timer=null;

    self.start=function(view, field) {
        myView=view;
        myField=field;
    }

    self.timeUpdate=function() {
        self.currentTime=new Date();
        self.timer=setTimeout( self.timeUpdate,1020-self.currentTime.getMilliseconds());
        if ( myView )
            myView.update();
    }

    self.stopClock=function() {
         clearTimeout(self.timer);
    }

    self.startClock=function() {
         if (self.timer) {
            clearTimeout(self.timer);
            self.timer=null;
         }
         self.timeUpdate();    
    }
}

// view

function ClockViewDOM() {
    let self=this;
    self.diamClock=240;
    self.angleNum=(360/12)/180*Math.PI; // угол на циферблате между цифрами
    self.radiusNum=(240/100*40); // радиус от центра циферблата до цифры 40% от диаметра часов
    self.numbWid=(240/100*13); // ширина кружка с цифрой 13% от диаметра часов
    self.numbHeig=(240/100*13); // высота кружка с цифрой 13% от диаметра часов
    self.numbLineH=(240/100*13); // выравнивание по вертикали тоже 13% как и высота кружка
    self.numbFontS=(240/100*7); // велечина шрифта 7% от диаметра часов
    self.handHoursWid=(240/100*4); // ширина часовой стрелки 4% от диаметра часов
    self.handHoursHeig=(240/100*30); // высота часовой стрелки 30% от диаметра часов
    self.handHourOrX=self.handHoursWid/100*50; // точка соприкосновения часовой стрелки с серединой циферблата по горизонтали
    self.handHourOrY=self.handHoursHeig/100*90; // точка соприкосновения часовой стрелки с серединой циферблата по вертикали
    self.handMinWid=(240/100*2); // ширина минутной стрелки 2% от диаметра часов
    self.handMinHeig=(240/100*40); // высота минутной стрелки 40% от диаметра часов
    self.handSecWid=(240/100*1); // ширина секундной стрелки 1% от диаметра часов
    self.handSecHeig=(240/100*45); // высота секундной стрелки 45% от диаметра часов
    self.handMinOrX=self.handMinWid/100*50; // точка соприкосновения минутной стрелки с серединой циферблата по горизонтали
    self.handMinOrY=self.handMinHeig/100*90; // точка соприкосновения минутной стрелки с серединой циферблата по вертикали
    self.handSecOrX=self.handSecWid/100*50; // точка соприкосновения минутной стрелки с серединой циферблата по горизонтали
    self.handSecOrY=self.handSecHeig/100*90; // точка соприкосновения минутной стрелки с серединой циферблата по вертикали
    self.spanFontSize=(240/100*9); // велечина шрифта 9% от диаметра часов
    self.angle=360/60; // угол однократного поворота секундной и минутной стрелки
    self.angleH=360/60*5; // угол однократного поворота часовой стрелки
    self.numberSeconds=60*60; // количество секунд в одном часу
    let myModel=null;
    let myField=null;
    self.elemClock=null;
    self.centerClockX=null;
    self.centerClockY=null;
    let handHours=null;
    let handMinutes=null;
    let handSeconds=null;

    self.start=function(model, field) {
        myModel=model;
        myField=field;
        self.elemClock=myField.querySelector('#cl');
        self.centerClockX=self.elemClock.offsetLeft+self.diamClock/2;
        self.centerClockY=self.elemClock.offsetTop+self.diamClock/2;
        handHours=myField.querySelector('#handW');
        handMinutes=myField.querySelector('#handM');
        handSeconds=myField.querySelector('#handS');

        for (let i=1; i<=12; i++) {
            let numb=document.createElement('div');
            numb.style.width=self.numbWid+'px';
            numb.style.height=self.numbHeig+'px';
            numb.className='NUMBER';
            let numberCenterX=self.centerClockX+self.radiusNum*Math.sin(self.angleNum);
            let numberCenterY=self.centerClockY-self.radiusNum*Math.cos(self.angleNum);
            numb.style.left=Math.round(numberCenterX-self.numbWid/2)+'px';
            numb.style.top=Math.round(numberCenterY-self.numbHeig/2)+'px';
            document.body.appendChild(numb);
            numb.style.lineHeight=self.numbLineH+'px';
            numb.style.fontSize=self.numbFontS+'px';
            numb.innerHTML=i;
            self.angleNum+=(360/12)/180*Math.PI;
        }

        handHours.style.width=self.handHoursWid+'px';
        handHours.style.height=self.handHoursHeig+'px';
        handHours.style.left=(self.centerClockX-self.handHourOrX)+'px';
        handHours.style.top=(self.centerClockY-self.handHourOrY)+'px';
        handHours.style.transformOrigin='50% 90%';

        handMinutes.style.width=self.handMinWid+'px';
        handMinutes.style.height=self.handMinHeig+'px';
        handMinutes.style.left=(self.centerClockX-self.handMinOrX)+'px';
        handMinutes.style.top=(self.centerClockY-self.handMinOrY)+'px';
        handMinutes.style.transformOrigin='50% 90%';
        handMinutes.style.zIndex='1000';

        handSeconds.style.width=self.handSecWid+'px';
        handSeconds.style.height=self.handSecHeig+'px';
        handSeconds.style.left=(self.centerClockX-self.handSecOrX)+'px';
        handSeconds.style.top=(self.centerClockY-self.handSecOrY)+'px';
        handSeconds.style.transformOrigin='50% 90%';
        handSeconds.style.zIndex='1500';
    }
    console.log(myModel);

    self.update= function() {      
        let h=((myModel.currentTime.getHours()+myModel.timezone) + myModel.currentTime.getMinutes() / 60 + myModel.currentTime.getSeconds() * self.numberSeconds) * self.angleH;
        let m=myModel.currentTime.getMinutes()*self.angle;
        let s=myModel.currentTime.getSeconds()*self.angle;

        handSeconds.style.transform='rotate('+s+'deg)';
        handMinutes.style.transform='rotate('+m+'deg)';
        handHours.style.transform='rotate('+h+'deg)';
    }
}

function ClockViewCanvas() {
    let self=this;
    self.diamClock=240;

    let angleNum=(360/12)/180*Math.PI; // угол на циферблате между цифрами
    let radiusNum=(self.diamClock/100*40); // радиус от центра циферблата до цифры 40% от диаметра часов
    let radNum=(self.diamClock/100*13)/2; // диаметр кружка с цифрой 13% от диаметра часов
    let numbFontS=(self.diamClock/100*7); // велечина шрифта 7% от диаметра часов
    let handHoursWid=(self.diamClock/100*4); // ширина часовой стрелки 4% от диаметра часов
    let handHoursHeig=(self.diamClock/100*25); // высота часовой стрелки 25% от диаметра часов
    let handMinWid=(self.diamClock/100*2); // ширина минутной стрелки 2% от диаметра часов
    let handMinHeig=(self.diamClock/100*15); // высота минутной стрелки 15% от диаметра часов
    let handSecWid=(self.diamClock/100*1); // ширина секундной стрелки 1% от диаметра часов
    let handSecHeig=(self.diamClock/100*10); // высота секундной стрелки 10% от диаметра часов
    let spanFontSize=(self.diamClock/100*9); // велечина шрифта 9% от диаметра часов
    let angle=360/60/180*Math.PI; // угол однократного поворота секундной и минутной стрелки
    let angleH=360/60*5/180*Math.PI; // угол однократного поворота часовой стрелки
    let numberSeconds=60*60; // количество секунд в одном часу
    
    let myModel=null;
    let myField=null;
    let cvs=null;

    self.start=function(model, field) {
        myModel=model;
        myField=field;
        cvs=myField.querySelector('#clockCVS');
    }

    self.update= function() {
        let context=cvs.getContext('2d');
        cvs.setAttribute('width', self.diamClock);
        cvs.setAttribute('height', self.diamClock);
        context.fillStyle='orange';
        context.beginPath();
        context.arc(self.diamClock/2, self.diamClock/2, self.diamClock/2, 0, 2*Math.PI, false);
        context.fill();

        for (let i=1; i<=12; i++) {
            context.beginPath();
            context.fillStyle='#66CDAA'; 
            let numberCenterX=self.diamClock/2+radiusNum*Math.sin(angleNum);
            let numberCenterY=self.diamClock/2-radiusNum*Math.cos(angleNum);
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
           let numberCenterX=self.diamClock/2+radiusNum*Math.sin(angleNum);
           let numberCenterY=self.diamClock/2-radiusNum*Math.cos(angleNum);
           angleNum+=(360/12)/180*Math.PI;
           context.fillText(s, numberCenterX, numberCenterY);   
       }

       let h=((myModel.currentTime.getHours()+myModel.timezone)+ myModel.currentTime.getMinutes() / 60 + myModel.currentTime.getSeconds() * numberSeconds) *angleH;
       let m=myModel.currentTime.getMinutes()*angle;
       let s=myModel.currentTime.getSeconds()*angle;

       context.lineCap='round';
       context.lineWidth=handHoursWid;
       context.beginPath();
       let handHoursCenterX=self.diamClock/2+(self.diamClock/2-handHoursHeig)*Math.sin(h);
       let handHoursCenterY=self.diamClock/2-(self.diamClock/2-handHoursHeig)*Math.cos(h);
       context.moveTo(self.diamClock/2, self.diamClock/2);
       context.lineTo(handHoursCenterX, handHoursCenterY);
       context.stroke();

       context.lineWidth=handMinWid;
       context.beginPath();
       let handMinCenterX=self.diamClock/2+(self.diamClock/2-handMinHeig)*Math.sin(m);
       let handMinCenterY=self.diamClock/2-(self.diamClock/2-handMinHeig)*Math.cos(m);
       context.moveTo(self.diamClock/2, self.diamClock/2);
       context.lineTo(handMinCenterX, handMinCenterY);
       context.stroke();

       context.lineWidth=handSecWid;
       context.beginPath();
       let handSecCenterX=self.diamClock/2+(self.diamClock/2-handSecHeig)*Math.sin(s);
       let handSecCenterY=self.diamClock/2-(self.diamClock/2-handSecHeig)*Math.cos(s);
       context.moveTo(self.diamClock/2, self.diamClock/2);
       context.lineTo(handSecCenterX, handSecCenterY);
       context.stroke();
    }
}

function ClockViewSVG() {
    let self=this;
    self.diamClock=240;
    let angleNum=(360/12)/180*Math.PI; // угол на циферблате между цифрами
    let radiusNum=(self.diamClock/100*40); // радиус от центра циферблата до цифры 40% от диаметра часов
    let numbWid=(self.diamClock/100*13); // ширина кружка с цифрой 13% от диаметра часов
    let numbHeig=(self.diamClock/100*13); // высота кружка с цифрой 13% от диаметра часов
    let numbLineH=(self.diamClock/100*13); // выравнивание по вертикали тоже 13% как и высота кружка
    let numbFontS=(self.diamClock/100*7); // велечина шрифта 7% от диаметра часов
    let handHoursWid=(self.diamClock/100*4); // ширина часовой стрелки 4% от диаметра часов
    let handHoursHeig=(self.diamClock/100*30); // высота часовой стрелки 30% от диаметра часов
    let handHourOrX=handHoursWid/100*50; // точка соприкосновения часовой стрелки с серединой циферблата по горизонтали
    let handHourOrY=handHoursHeig/100*90; // точка соприкосновения часовой стрелки с серединой циферблата по вертикали
    let handMinWid=(self.diamClock/100*2); // ширина минутной стрелки 2% от диаметра часов
    let handMinHeig=(self.diamClock/100*40); // высота минутной стрелки 40% от диаметра часов
    let handSecWid=(self.diamClock/100*1); // ширина секундной стрелки 1% от диаметра часов
    let handSecHeig=(self.diamClock/100*45); // высота секундной стрелки 45% от диаметра часов
    let handMinOrX=handMinWid/100*50; // точка соприкосновения минутной стрелки с серединой циферблата по горизонтали
    let handMinOrY=handMinHeig/100*90; // точка соприкосновения минутной стрелки с серединой циферблата по вертикали
    let handSecOrX=handSecWid/100*50; // точка соприкосновения минутной стрелки с серединой циферблата по горизонтали
    let handSecOrY=handSecHeig/100*90; // точка соприкосновения минутной стрелки с серединой циферблата по вертикали
    let spanFontSize=(self.diamClock/100*9); // велечина шрифта 9% от диаметра часов
    let angle=360/60; // угол однократного поворота секундной и минутной стрелки
    let angleH=360/60*5; // угол однократного поворота часовой стрелки
    let numberSeconds=60*60; // количество секунд в одном часу

    let myModel=null;
    let myField=null;
    let handHours=null;
    let handMinutes=null;
    let handSeconds=null;
    self.cont=null;
    self.centerClockX=null;
    self.centerClockY=null;

    self.start=function(model, field) {
        myModel=model;
        myField=field;
        let clockSVG=myField.querySelector('#svgEl');
        clockSVG.style.width=self.diamClock+'px';
        clockSVG.style.height=self.diamClock+'px';
        self.cont=myField.querySelector('.svgConteyner');
   
        self.centerClockX=self.diamClock/2;
        self.centerClockY=self.diamClock/2;
        handHours=myField.querySelector('#handH');
        handHours.style.width=handHoursWid+'px';
        handHours.style.height=handHoursHeig+'px';
        handHours.style.left=(self.centerClockX-handHourOrX)+'px';
        handHours.style.top=(self.centerClockY-handHourOrY)+'px';
        handHours.style.transformOrigin='50% 90%';

        handMinutes=myField.querySelector('#handM');
        handMinutes.style.width=handMinWid+'px';
        handMinutes.style.height=handMinHeig+'px';
        handMinutes.style.left=(self.centerClockX-handMinOrX)+'px';
        handMinutes.style.top=(self.centerClockY-handMinOrY)+'px';
        handMinutes.style.transformOrigin='50% 90%';
        handMinutes.style.zIndex='1000';

        handSeconds=myField.querySelector('#handS');
        handSeconds.style.width=handSecWid+'px';
        handSeconds.style.height=handSecHeig+'px';
        handSeconds.style.left=(self.centerClockX-handSecOrX)+'px';
        handSeconds.style.top=(self.centerClockY-handSecOrY)+'px';
        handSeconds.style.transformOrigin='50% 90%';
        handSeconds.style.zIndex='1500';
         
        for (let i=1; i<=12; i++) {
            let numb=document.createElement('div');
            numb.style.width=numbWid+'px';
            numb.style.height=numbHeig+'px';
            numb.className='NUMBER';
            let numberCenterX=(self.centerClockX+5)+radiusNum*Math.sin(angleNum);
            let numberCenterY=(self.centerClockY)-radiusNum*Math.cos(angleNum);
            numb.style.left=Math.round(numberCenterX-numbWid/2)+'px';
            numb.style.top=Math.round(numberCenterY-numbHeig/2)+'px';
            self.cont.appendChild(numb);
            numb.style.lineHeight=numbLineH+'px';
            numb.style.fontSize=numbFontS+'px';
            numb.innerHTML=i;
            angleNum+=(360/12)/180*Math.PI;
        }      
    }

    self.update= function() {

        let h=((myModel.currentTime.getHours()+myModel.timezone) + myModel.currentTime.getMinutes() / 60 + myModel.currentTime.getSeconds() * numberSeconds) * angleH;
        let m=myModel.currentTime.getMinutes()*angle;
        let s=myModel.currentTime.getSeconds()*angle;

        handSeconds.style.transform='rotate('+s+'deg)';
        handMinutes.style.transform='rotate('+m+'deg)';
        handHours.style.transform='rotate('+h+'deg)';
    }
}

// controller

function ClockControllerButtons() {
    let self=this;
    let myModel=null;
    let myField=null;
    
    self.start=function(model,field) {
        myModel=model;
        myField=field;
    
        let elemStop=myField.querySelector('.stopCL');
        let elemStart=myField.querySelector('.startCL');
        elemStart.addEventListener('click', self.bottomStart, false);
        elemStop.addEventListener('click', self.bottomStop, false);
    }

    self.bottomStart=function() {
        myModel.startClock();
    }

    self.bottomStop=function() {
        myModel.stopClock();
    }
}

let clockNY= new Clock(5);
let clockNYView=new ClockViewDOM();
let clockNYController=new ClockControllerButtons();

let containerElemNY=document.getElementById('NewYork');
clockNY.start(clockNYView, containerElemNY);
clockNYView.start(clockNY, containerElemNY);
clockNYController.start(clockNY, containerElemNY);

clockNY.timeUpdate();

let clockL= new Clock(-2);
let clockLView=new ClockViewDOM();
let clockLController=new ClockControllerButtons();

let containerElemL=document.getElementById('London');
clockL.start(clockLView, containerElemL);
clockLView.start(clockL, containerElemL);
clockLController.start(clockL, containerElemL);

clockL.timeUpdate();

let clockB= new Clock(-1);
let clockBView=new ClockViewCanvas();
let clockBController=new ClockControllerButtons();

let containerElemB=document.getElementById('Berlin');
clockB.start(clockBView, containerElemB);
clockBView.start(clockB, containerElemB);
clockBController.start(clockB, containerElemB);

clockB.timeUpdate();

let clockM= new Clock(0);
let clockMView=new ClockViewCanvas();
let clockMController=new ClockControllerButtons();

let containerElemM=document.getElementById('Minsk');
clockM.start(clockMView, containerElemM);
clockMView.start(clockM, containerElemM);
clockMController.start(clockM, containerElemM);

clockM.timeUpdate();

let clockT= new Clock(6);
let clockTView=new ClockViewSVG();
let clockTController=new ClockControllerButtons();

let containerElemT=document.getElementById('Tokyo');
clockT.start(clockTView, containerElemT);
clockTView.start(clockT, containerElemT);
clockTController.start(clockT, containerElemT);

clockT.timeUpdate();

let clockV= new Clock(7);
let clockVView=new ClockViewSVG();
let clockVController=new ClockControllerButtons();

let containerElemV=document.getElementById('Vladivostok');
clockV.start(clockVView, containerElemV);
clockVView.start(clockV, containerElemV);
clockVController.start(clockV, containerElemV);

clockV.timeUpdate();