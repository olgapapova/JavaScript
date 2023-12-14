let mode = 'time';

const output = document.getElementById('output');
const fullBtn = document.getElementById('full');
const dateBtn = document.getElementById('date');
const timeBtn = document.getElementById('time');

function buindMode(name) {
    return function() {
        mode = name;
        update();
    }
}

fullBtn.onclick = buindMode('full');

dateBtn.onclick = buindMode('date');

timeBtn.onclick = buindMode('time');

update();
setInterval(() => {
    update(); 
}, 1000);

function update() {
    output.textContent = format(mode);
}

function format(formatMode) {
    const now = new Date();

    switch(formatMode) {
        case "time" :
            return now.toLocaleTimeString();
        case 'date' :
            return now.toLocaleDateString();
        case 'full' :
            return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        default :
            return now.toLocaleTimeString();
    }
}