
    //for (;;) {
    //    var fam= prompt('Введите вашу фамилию:');
    //    if ( fam!==null && fam!=="")
    //        break;
    //};
    do {
        var fam = prompt('Введите вашу фамилию:');
    } while (fam === null || fam === "")

    //for (;;) {
    //    var nam= prompt('Введите ваше имя:');
    //    if ( nam!==null && nam!=="")
    //        break;
    //};
    do {
        var nam= prompt('Введите ваше имя:');
    } while (nam === null || nam === "")

    //for (;;) {
    //    var otch= prompt('Введите ваше отчество:');
    //    if ( otch!==null && otch!=="")
    //        break;
    //};
    do {
        var otch= prompt('Введите ваше отчество:');
    } while (otch === null || otch === "")
        
    do {
        var ageSt= prompt('Введите ваш возраст:');
        age= parseInt(ageSt)
    } while ( isNaN(age));

    var genderS= confirm('Ваш пол мужской? Нажмите ОК если мужской и ОТМЕНА если женский.');
    var gender;
    if ( genderS===true)
        gender='мужской';
    else
        gender='женский';

    var pension;
    if ( genderS===true) {
        if (age>=60)
            pension='да';
        else
            pension='нет';
        }
    else {
        if ( age>=55)
            pension='да';
        else
            pension='нет';
        }
      
    var age5Years = ( age ) => age+5;
    var ageDeys = ( age ) => age * 365;

    alert('Ваше ФИО: ' + fam + ' ' + nam + ' ' + otch + '\n' +
        'Ваш возраст в годах: ' + age + '\n' +
        'Ваш возраст в днях: ' + ageDeys(age) + '\n' +
        'Через 5 лет вам будет: ' + age5Years(age) + '\n' +
        'Ваш пол: ' + gender + '\n' +
        'Вы на пенсии: ' + pension
    );
