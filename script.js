// Returns color between color1 and color2 depending on t [0, 1]
function interpolateColor(colorString1, colorString2, t) {
    // Parse first color
    let color1 = [];
    for (let i = 0; i < 3; i++) {
        color1[i] = parseInt(colorString1.slice(i * 2 + 1, i * 2 + 3), 16);
    }
    
    // Parse second color
    let color2 = [];
    for (let i = 0; i < 3; i++) {
        color2[i] = parseInt(colorString2.slice(i * 2 + 1, i * 2 + 3), 16);
    }
    
    // interpolate
    let lerp = (a, b, t) => (1 - t) * a + t * b;

    let resultColor = [];
    for (let i = 0; i < 3; i++) {
        resultColor[i] = Math.round(lerp(color1[i], color2[i], t));
    }

    // convert to string
    let resultColorString = '#';
    for (let i = 0; i < 3; i++) {
        resultColorString += ('0' + resultColor[i].toString(16)).slice(-2);
    }
    
    return resultColorString;
}

function fillField(size, color1, color2) {
    // Remove previous cells
    fieldDiv.innerHTML = '';

    // Create new cells
    fieldDiv.style['grid-template-columns'] = `repeat(${size}, auto)`;
    fieldDiv.style['grid-template-rows'] = `repeat(${size}, auto)`;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let color = interpolateColor(color1, color2, (i + j) / size / 2);

            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('mouseenter', onHover);
            cell.dataset.color = color;
            fieldDiv.appendChild(cell);
        }
    }

    // Also update page background
    body.style.backgroundImage = `linear-gradient(to bottom right, ${color1}, ${color2})`;
}

function onHover(e) {
    e.target.style.backgroundColor = e.target.dataset.color;
}

function updateButtonClick(e) {
    let newSize = parseInt(inputText.value);
    if (isNaN(newSize)) return;
    if (newSize < 5 || newSize > 100) return;

    // Update field
    fillField(newSize, firstColor.value, secondColor.value);

    console.log(`Updating with parameters: first color: ${firstColor.value}, secondColor: ${secondColor.value}, size: ${newSize}`);
}

// HTML elements
// body
let body = document.querySelector('body');

// div element containing all cells
let fieldDiv = document.querySelector('#field');

// Update button
let buttonUpdate = document.querySelector('#update-button');
buttonUpdate.addEventListener('click', updateButtonClick);

// Input text
let inputText = document.querySelector('#input-text');

// First color input
let firstColor = document.querySelector('#first-color');

// Second color input
let secondColor = document.querySelector('#second-color');

// Start
fillField(10, '#ffcc33', '#990066');
