//const clues = require('clues.json');
const riddles = {
"I'm a path that's often crossed, but never walked in a straight line,I wind and twist, turn and bend,with no clear end in sight.What am I?": "A river.",
"I'm made of branches, leaves, and wood, but I'm not a tree or a forest, I can lead you on a winding path, or be crossed with just a step. What am I?": "A bridge.",
"I'm a symbol of love and devotion, given on special occasions, I come in all shapes and sizes, and I'm often wrapped in ribbons. What am I?": "A gift.",
"I'm a metal that's often prized, for my shine and rarity, I'm a precious and valuable find, but can also be found in a library. What am I?": "Gold",
}
let n = 0;
let hinted = false;
let div = document.getElementById("riddle-container");
window.onload = () => {
    displayRiddle(n);
}

document.getElementById("get-hint").addEventListener('click', (e) => {
    if (div.textContent.length > 0 && !hinted) {
        hinted = true;
        div.textContent += "    [" + Object.values(riddles)[n] + "]";
    }
})

document.getElementById('next').addEventListener('click', (e) => {
    if (n+1 < Object.keys(riddles).length) {
        hinted = false;
        displayRiddle(++n)
    } else {
        document.getElementById('next').value = 'No more riddles';
    }
})

function displayRiddle(n) {
    div.textContent = Object.keys(riddles)[n]; 
}


