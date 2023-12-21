let tagForm = document.forms.IN;
tagForm.addEventListener('submit',validateForm,false);

let elemDev = tagForm.elements.develop;
elemDev.addEventListener('blur',function() {validateFormDev(false)},false); // строковое значение не более 30 символов

let elemName = tagForm.elements.name;
elemName.addEventListener('blur',function() {validateFormN(false)},false); // строковое значение не более 20 символов

let elemUrl = tagForm.elements.URL;
elemUrl.addEventListener('blur',function() {validateFormU(false)},false); // допустимы латинские буквы, цифры 0-9 и символы @,#,?,:,&,.,/,-,_

let elemDate = tagForm.elements.date;
elemDate.addEventListener('blur',function() {validateFormD(false)},false); // установите дату

let elemVisit = tagForm.elements.visit;
elemVisit.addEventListener('blur',function() {validateFormV(false)},false); // допустимые символы 0-9

let elemMail = tagForm.elements.mail;
elemMail.addEventListener('blur',function() {validateFormM(false)},false); // допустимы латинские буквы, цифры 0-9 и символы @,#,?,:,&,.,/,-,_

let elemRubric = tagForm.elements.rubric;
elemRubric.addEventListener('change',function() {validateFormR(false)},false); 

let elemLoc = tagForm.elements.location;
elemLoc[0].addEventListener('click',function() {validateFormL(false)},false);
elemLoc[1].addEventListener('click',function() {validateFormL(false)},false);
elemLoc[2].addEventListener('click',function() {validateFormL(false)},false);

let elemAllow = tagForm.elements.allow;
elemAllow.addEventListener('change',function() {validateFormA(false)},false);

let elemDescription = tagForm.elements.description;
elemDescription.addEventListener('blur',function() {validateFormDes(false)},false); // строковое значение не менее 30 символов

function validateFormDev(focusErr) {
        let tagForm = document.forms.IN;
        let elemDev = tagForm.elements.develop;
        let developValue = elemDev.value; 
        let amError = 0;
        if (focusErr === true)
            elemDev.focus();
        if (developValue.length>30) {
            let spanError = document.getElementById('devError');
            spanError.innerHTML = 'значение строки должно быть более 30 символов';
            amError += 1;
         }
         else {
            let spanError = document.getElementById('devError');
            spanError.innerHTML = '';
         }
         if (developValue === "") {
            let spanError = document.getElementById('devError');
            spanError.innerHTML = 'вы не ввели разработчиков';
            amError += 1;  
         }
     return amError;
}


function validateFormN(focusErr) {
        let tagForm = document.forms.IN;
        let elemName = tagForm.elements.name;
        let nameValue = elemName.value; 
        let amError = 0;
        if (focusErr === true)
            elemName.focus();
        if (nameValue.length > 20) {
            let spanError = document.getElementById('nameError');
            spanError.innerHTML = 'значение строки должно быть не более 20 символов';
            amError += 1;
         }
         else {
            let spanError = document.getElementById('nameError');
            spanError.innerHTML = '';
         }
         if (nameValue === "") {
            let spanError = document.getElementById('nameError');
            spanError.innerHTML = 'вы не ввели название сайта';
            amError += 1;
         }   
    return amError;
}

function validateFormU(focusErr) {
        let tagForm = document.forms.IN;
        let elemUrl = tagForm.elements.URL;
        let urlValue = elemUrl.value; 
        let amError = 0;
        let alph = { a:1, b:1, c:1, d:1, e:1, f:1, g:1, h:1, i:1, j:1, k:1, l:1, m:1, n:1, o:1, p:1, q:1, r:1, s:1, t:1, u:1, v:1, w:1, x:1, y:1, z:1, A:1, B:1, C:1, D:1, E:1, F:1, G:1, H:1, I:1, J:1, K:1, L:1, M:1, N:1, O:1, P:1, Q:1, R:1, S:1, T:1, U:1, V:1, W:1, X:1, Y:1, Z:1, '1':1, '2':1, '3':1, '4':1, '5':1, '6':1, '7':1, '8':11, '9':1, '0':1, '&':1, '?':1, ':':1, '=':1, '#':1, '@':1, '.':1, '-':1, '/':1, '_':1 };
        if (focusErr === true)
                elemUrl.focus();
        if (urlValue === "") {
                let spanError = document.getElementById('urlError');
                spanError.innerHTML = 'вы не ввели URL сайта';
                amError += 1;
            }
        for (let i = 0; i < urlValue.length; i++) {
            let el = urlValue[i];
            if (!(el in alph)) {
                let spanError = document.getElementById('urlError');
                spanError.innerHTML = 'допустимы латинские буквы, цифры 0-9 и символы @,#,?,:,&,.,/,-,_';
                amError += 1;
            }
            else {
                let spanError = document.getElementById('urlError');
                spanError.innerHTML = '';
            }
        }
    return amError;
}

function validateFormD(focusErr) {
        let tagForm = document.forms.IN;  
        let elemDate = tagForm.elements.date;
        let dateValue = elemDate.value; 
        let amError = 0;
        if (focusErr === true)
            elemDate.focus();
        if (dateValue === "") {
            let spanError = document.getElementById('dateError');
            spanError.innerHTML = 'установите дату';
            amError += 1;
         }
         else {
            let spanError = document.getElementById('dateError');
            spanError.innerHTML = '';
         }
    return amError;
}

function validateFormV(focusErr) {
        let tagForm = document.forms.IN;  
        let elemVisit = tagForm.elements.visit;
        let visValue = elemVisit.value;
        let visitValue = Number(elemVisit.value.trim()); 
        let amError = 0;
        if (focusErr === true)
            elemDate.focus();
        if (isNaN(visitValue)) {
            let spanError = document.getElementById('visitError');
            spanError.innerHTML = 'допустимые символы 0-9';
            amError += 1; 
         }
         else {
            let spanError = document.getElementById('visitError');
            spanError.innerHTML = '';
         }
         if (visValue === "") {
            let spanError = document.getElementById('visitError');
            spanError.innerHTML = 'вы не ввели количество посетителей';
            amError += 1; 
         }
    return amError;
}

function validateFormM(focusErr) {
        let tagForm = document.forms.IN;
        let alph = { a:1, b:1, c:1, d:1, e:1, f:1, g:1, h:1, i:1, j:1, k:1, l:1, m:1, n:1, o:1, p:1, q:1, r:1, s:1, t:1, u:1, v:1, w:1, x:1, y:1, z:1, A:1, B:1, C:1, D:1, E:1, F:1, G:1, H:1, I:1, J:1, K:1, L:1, M:1, N:1, O:1, P:1, Q:1, R:1, S:1, T:1, U:1, V:1, W:1, X:1, Y:1, Z:1, '1':1, '2':1, '3':1, '4':1, '5':1, '6':1, '7':1, '8':11, '9':1, '0':1, '&':1, '?':1, ':':1, '=':1, '#':1, '@':1, '.':1, '-':1, '/':1, '_':1 };
        let amError = 0;
        let elemMail = tagForm.elements.mail;
        let mailValue = elemMail.value; 
        if (focusErr === true)
            elemMail.focus();
        if (mailValue === "") {
            let spanError = document.getElementById('mailError');
            spanError.innerHTML = 'вы не ввели E-mail для связи';
            amError += 1;
        }
        else {
            let spanError = document.getElementById('mailError');
            spanError.innerHTML = '';
        }
        for (let i = 0; i < mailValue.length; i++) {
            let el = mailValue[i];
            if (!(el in alph)) {
                let spanError = document.getElementById('mailError');
                spanError.innerHTML = 'допустимы латинские буквы, цифры 0-9 и символы @,#,?,:,&,.,/,-,_';
                amError += 1;
            }
            else {
                let spanError = document.getElementById('mailError');
                spanError.innerHTML = '';
            }
        }
    return amError;
}

function validateFormR(focusErr) {
        let tagForm = document.forms.IN;
        let elemRubric = tagForm.elements.rubric;
        let rubricValue = elemRubric.value;
        let amError = 0;
        if (focusErr === true)
            elemRubric.focus();
        if (rubricValue == 1) {
            let spanError = document.getElementById('rubricError');
            spanError.innerHTML = 'вы уверены что хотите выбрать данную рубрику?';
            amError += 1;
         }
         else {
                let spanError = document.getElementById('rubricError');
                spanError.innerHTML = '';
         }
    return amError;
}

function validateFormL(focusErr) {
        let tagForm = document.forms.IN;
        let elemLoc = tagForm.elements.location;
        let locationValue = elemLoc.value;
        let amError = 0;
        if (focusErr === true)
            document.getElementById('tx8').scrollIntoView();
         if (locationValue == 6) {
            let spanError = document.getElementById('locationError');
            spanError.innerHTML = 'вы уверенны что хотите данный тип размещения?';
            amError += 1;
         }  
         else {
                let spanError = document.getElementById('locationError');
                spanError.innerHTML = '';
         } 
        if (locationValue === "") {
            let spanError = document.getElementById('locationError');
            spanError.innerHTML = 'вы не указали тип размещения';
            amError += 1;
         }       
    return amError;
}

function validateFormA(focusErr) {
        let tagForm = document.forms.IN;
        let elemAllow = tagForm.elements.allow;
        let allowValue = elemAllow.checked;
        let amError = 0;
        if (focusErr === true)
            elemAllow.scrollIntoView();
        if (!allowValue) {
            let spanError = document.getElementById('allowError');
            spanError.innerHTML = 'вы не разрешили отзывы';
            amError += 1;
         }
         else {
            let spanError = document.getElementById('allowError');
            spanError.innerHTML = '';
         }
    return amError;
}

function validateFormDes(focusErr) {
        let tagForm = document.forms.IN;
        let elemDescription = tagForm.elements.description;
        let descriptionValue = elemDescription.value; 
        let amError = 0;
        if (focusErr === true)
            elemDescription.focus();
        if (descriptionValue.length < 30) {
            let spanError = document.getElementById('desError');
            spanError.innerHTML = 'значение строки должно быть не менее 30 символов';
            amError += 1;
         }
         else {
            let spanError = document.getElementById('desError');
            spanError.innerHTML = '';
         }
    return amError;
}

function validateForm(eo) {
    eo = eo || window.event;
    try {
    let amError = 0;
        amError += validateFormDev(!amError);
        amError += validateFormN(!amError);
        amError += validateFormU(!amError);
        amError += validateFormD(!amError);
        amError += validateFormV(!amError);
        amError += validateFormM(!amError);
        amError += validateFormR(!amError);
        amError += validateFormL(!amError);
        amError += validateFormA(!amError);
        amError += validateFormDes(!amError);
        if (amError !== 0)
            eo.preventDefault();
    }
    catch ( ex ) {
        alert('Извините, что-то пошло не так! Пересмотрите заполнение формы!');
        eo.preventDefault();
    }
}