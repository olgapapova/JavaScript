class HashStorageClass {      
    constructor (keyS) {
        this.storage={}; 
        this.keyStorage=keyS;
    }

    addValue (key, value) { 
        this.storage[key]=value;
        localStorage.setItem(this.keyStorage, JSON.stringify(this.storage));
    }
    getValue (key) { return this.storage[key] }
    deleteValue (key) {
        if ( key in this.storage ) {
            delete this.storage[key]; 
            localStorage.setItem(this.keyStorage, JSON.stringify(this.storage));
            return true;
            }
         else
            return false; 
    }
    getKeys () { 
        let keyArr=[];
        for ( let keys in this.storage )
            keyArr.push ( keys );
        return keyArr;
    }
    storageL() {
        if (localStorage.getItem(this.keyStorage) !==null) {
            let storJs=localStorage.getItem(this.keyStorage);
            let stor=JSON.parse(storJs);
            this.storage=stor;
            console.log(stor);
        }
        else {
            return;
        }
    }
    
}

const drinkStorage= new HashStorageClass ('storageDrink');
const foodStorage= new HashStorageClass ('storageFood');
drinkStorage.storageL();
foodStorage.storageL();

function enterD() {
    let drinkName= prompt ('Введите название напитка:');
    let isAlcohol=confirm ('Это алкогольный напиток? Если да нажмите "ОК", если нет "Отмена"');
    let alcohol= (isAlcohol===true) ? 'да' : 'нет';
    let recipe= prompt ('Введите рецепт его приготовления:');
    let inform={ 'алкогольный': alcohol, 'рецепт приготовления': recipe };
    drinkStorage.addValue(drinkName, inform);
}

function enterF() {
    let foodName= prompt ('Введите название блюда:');
    let isHotter=confirm ('Это горячее блюдо? Если да нажмите "ОК", если нет "Отмена"');
    let hotter= (isHotter===true) ? 'да' : 'нет';
    let recipe= prompt ('Введите рецепт его приготовления:');
    let inform={ 'горячее': hotter, 'рецепт приготовления': recipe };
    foodStorage.addValue(foodName, inform);
}

function infoD() {
    let drinkN= prompt ('Введите название напитка:');
    let obj=drinkStorage.getValue(drinkN);
    let rez="";
    if ( obj !== undefined ) {
        for ( let k in obj ) {
            rez += (k+': '+obj[k]+'\n');
            }
        alert ('напиток'+' '+ drinkN+'\n'+ rez);
        }
    else
        alert ('Данного напитка нет в хранилище!');
}

function infoF() {
    let foodN= prompt ('Введите название блюда:');
    let obj=foodStorage.getValue(foodN);
    let rez="";
    if ( obj !== undefined ) {
        for ( let k in obj ) {
            rez += (k+': '+obj[k]+'\n');
            }
        alert ('блюдо'+' '+ foodN+'\n'+ rez);
        }
    else
        alert ('Данного блюда нет в хранилище!');
}

function delD() {
    let drink= prompt ('Введите название напитка:');
    drinkStorage.deleteValue(drink) ? alert ('Напиток удалён') : alert ('Данного напитка нет в хранилище!');
}

function delF() {
    let food= prompt ('Введите название блюда:');
    foodStorage.deleteValue(food) ? alert ('Блюдо удалёно') : alert ('Данного блюда нет в хранилище!');
}

function listGenD() {
    return alert (drinkStorage.getKeys());
}

function listGenF() {
    return alert (foodStorage.getKeys());
}