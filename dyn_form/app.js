function formF(mas) {
    let bodyTag = document.getElementById('body');
    let formSt = document.createElement('form');
    bodyTag.appendChild(formSt);
    formSt.setAttribute('method','get');
    formSt.setAttribute('action','https://fe.it-academy.by/TestForm.php');
    for (var i = 0; i < mas.length; i++){
        let elem = mas[i];
        let cont = document.createElement('div');
        formSt.appendChild(cont);
        if ('label' in elem) {
            var elemLeb = document.createElement('label');
            cont.appendChild(elemLeb);
            elemLeb.setAttribute('for',i);
            elemLeb.className = 'Title';
            let text = document.createTextNode(elem['label']);
            elemLeb.appendChild(text);
        }
        var contVn = document.createElement('div');
        cont.appendChild(contVn);
        contVn.className = 'Conteiner';
        if ('kind' in elem) {
            switch(elem['kind']) {
                case 'longtext':
                    var elemText = document.createElement('input');
                    elemText.setAttribute('type','text');
                    elemText.className = 'Longtext';
                    break;
                case 'combo':
                    var elemText = document.createElement('select');
                    elemText.className = 'Combo';
                    if ('variants' in elem) {
                        for ( var z = 0; z < elem['variants'].length; z++ ){
                            var obj = elem['variants'][z];
                            var vl = document.createElement('option');
                            elemText.appendChild(vl);
                            var textOp = document.createTextNode(obj['text']);
                            vl.appendChild(textOp);
                            vl.setAttribute('value',obj['value']);
                        }
                    }
                    break;
                case 'number':
                    var elemText = document.createElement('input');
                    elemText.setAttribute('type','text');
                    elemText.className = 'Number';
                    break;
                case 'shorttext':
                    var elemText = document.createElement('input');
                    elemText.setAttribute('type','text');
                    elemText.className = 'Shorttext';
                    break;
                case 'radio':
                    var elemText = document.createElement('div');
                    if ('variants' in elem) {
                        for ( var s = 0; s < elem['variants'].length; s++ ){
                            var obj = elem['variants'][s];
                            var elemR = document.createElement('input');
                            elemText.appendChild(elemR);
                            elemR.setAttribute('type','radio');
                            elemR.setAttribute('name','placement');
                            let textR = document.createElement('span');
                            elemText.appendChild(textR);
                            var textOp = document.createTextNode(obj['text']);
                            textR.appendChild(textOp);
                            elemR.setAttribute('value',obj['value']);
                            textR.className = 'Radio';
                        }
                    }
                    break;
                case 'check':
                    var elemText = document.createElement('input');
                    elemText.setAttribute('type','checkbox');
                    elemText.checked = true;
                    break;
                case 'memo':
                    var elemText = document.createElement('textarea');
                    contVn.className = 'Memo';
                    elemText.className = 'Memo2';
                    break;
                case 'submit':
                    var elemText = document.createElement('input');
                    elemText.setAttribute('type','submit');
                    elemText.setAttribute('value','Опубликовать');
                    contVn.className = 'Subm';
                    var brEl = document.createElement('br');
                    formSt.appendChild(brEl);
                    break;
            }
        }
        contVn.appendChild(elemText);
        elemText.setAttribute('id',i);
        if ('name' in elem) {
            elemText.setAttribute('name',elem['name']);
        }
     }
 console.log(formSt);
 let rez = formSt.innerHTML;
 return rez;
 }

 let rezForm = formF([
    {label:'Название сайта:',kind:'longtext',name:'sitename'},
    {label:'URL сайта:',kind:'longtext',name:'siteurl'},
    {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
    {label:'E-mail для связи:',kind:'shorttext',name:'email'},
    {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
    {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
    {label:'Разрешить отзывы:',kind:'check',name:'votes'},
    {label:'Описание сайта:',kind:'memo',name:'description'},
    {caption:'Опубликовать',kind:'submit'},
 ]);
 let rezForm2 = formF([
    {label:'Фамилия:',kind:'longtext',name:'lastname'},
    {label:'Имя:',kind:'longtext',name:'firstname'},
    {label:'Отчество:',kind:'longtext',name:'secondname'},
    {label:'Возраст:',kind:'number',name:'age'},
    {caption:'Зарегистрироваться',kind:'submit'},
 ]);