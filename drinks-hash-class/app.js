
class HashStorageClass {
    
    constructor() {
    this.storage = {};
    }
    addValue(key, value) {this.storage[key]=value}
    getValue(key) {return this.storage[key]}
    deleteValue(key) {
        if (key in this.storage) {
            delete this.storage[key]; 
            return true;
            }
         else
            return false; 
    }
    getKeys() { 
        let keyArr = [];
        for (let keys in this.storage)
            keyArr.push(keys);
        return keyArr;
    }
}

const drinkStorage= new HashStorageClass();

function enter() {
    let drinkName = prompt('Введите название напитка:');
    let isAlcohol = confirm('Это алкогольный напиток? Если да нажмите "ОК", если нет "Отмена"');
    let alcohol = (isAlcohol===true) ? 'да' : 'нет';
    let recipe = prompt('Введите рецепт его приготовления:');
    let inform = {'алкогольный': alcohol, 'рецепт приготовления': recipe}
    drinkStorage.addValue(drinkName, inform);
}

function info() {
    let drinkN = prompt('Введите название напитка:');
    let obj = drinkStorage.getValue(drinkN);
    let rez = "";
    if (obj !== undefined) {
        for (let k in obj) {
            rez += (k + ': ' + obj[k] + '\n');
            }
        alert('напиток' + ' ' + drinkN + '\n' + rez);
        }
    else
        alert('Данного напитка нет в хранилище!');
}

function del() {
    let drink = prompt('Введите название напитка:');
    drinkStorage.deleteValue(drink) ? alert ('Напиток удалён') : alert ('Данного напитка нет в хранилище!');
}

function listGen() {
    return alert(drinkStorage.getKeys());
}