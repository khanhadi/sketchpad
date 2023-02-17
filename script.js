let currentColor = '#000000'; // default color
let gridEnabled = true;

//#region TOOLBAR

// modes
const clickBtn = document.querySelector('#click-btn');
const hoverBtn = document.querySelector('#hover-btn');

let isClick = false;
let isHover = false;

clickBtn.addEventListener('click', () => {
	clickBtn.classList.toggle('selected');

	if (clickBtn.classList.contains('selected')) {
		isClick = true;
		isHover = false;
		hoverBtn.classList.remove('selected');
	}

	if (!clickBtn.classList.contains('selected')) {
		isClick = false;
	}

	console.log('Click Mode');
	enableDrawing(isHover, isClick, gridEnabled);
});

hoverBtn.addEventListener('click', () => {
	hoverBtn.classList.toggle('selected');

	if (hoverBtn.classList.contains('selected')) {
		isHover = true;
		isClick = false;
		clickBtn.classList.remove('selected');
	}

	if (!hoverBtn.classList.contains('selected')) {
		isHover = false;
	}

	console.log('Hover Mode');
	enableDrawing(isHover, isClick, gridEnabled);
});

// tools

// eraser
let erase = false;
const eraserBtn = document.querySelector('#eraser-btn');
eraserBtn.addEventListener('click', () => {
	eraserBtn.classList.toggle('selected');

	if (eraserBtn.classList.contains('selected')) {
		erase = true;
		sketch = false;
		darken = false;
		lighten = false;
		rainbow = false;
		sketchBtn.classList.remove('selected');
		darkenBtn.classList.remove('selected');
		lightenBtn.classList.remove('selected');
		rainbowBtn.classList.remove('selected');
	}

	if (!eraserBtn.classList.contains('selected')) {
		erase = false;
	}
});

// sketch
let sketch = false;
let shading = 0;
const sketchBtn = document.querySelector('#sketch-btn');
sketchBtn.addEventListener('click', () => {
	sketchBtn.classList.toggle('selected');

	if (sketchBtn.classList.contains('selected')) {
		erase = false;
		sketch = true;
		darken = false;
		lighten = false;
		rainbow = false;
		eraserBtn.classList.remove('selected');
		darkenBtn.classList.remove('selected');
		lightenBtn.classList.remove('selected');
		rainbowBtn.classList.remove('selected');
	}

	if (!sketchBtn.classList.contains('selected')) {
		sketch = false;
	}
});

// darken
let darken = false;
const darkenBtn = document.querySelector('#darken-btn');
darkenBtn.addEventListener('click', () => {
	darkenBtn.classList.toggle('selected');

	if (darkenBtn.classList.contains('selected')) {
		erase = false;
		sketch = false;
		darken = true;
		lighten = false;
		rainbow = false;
		eraserBtn.classList.remove('selected');
		sketchBtn.classList.remove('selected');
		lightenBtn.classList.remove('selected');
		rainbowBtn.classList.remove('selected');
	}

	if (!darkenBtn.classList.contains('selected')) {
		darken = false;
	}
});

// lighten
let lighten = false;
const lightenBtn = document.querySelector('#lighten-btn');
lightenBtn.addEventListener('click', () => {
	lightenBtn.classList.toggle('selected');

	if (lightenBtn.classList.contains('selected')) {
		erase = false;
		sketch = false;
		darken = false;
		lighten = true;
		rainbow = false;
		eraserBtn.classList.remove('selected');
		sketchBtn.classList.remove('selected');
		darkenBtn.classList.remove('selected');
		rainbowBtn.classList.remove('selected');
	}

	if (!lightenBtn.classList.contains('selected')) {
		lighten = false;
	}
});

// rainbow
let rainbow = false;
const rainbowBtn = document.querySelector('#rainbow-btn');
rainbowBtn.addEventListener('click', () => {
	rainbowBtn.classList.toggle('selected');

	if (rainbowBtn.classList.contains('selected')) {
		erase = false;
		sketch = false;
		darken = false;
		lighten = false;
		rainbow = true;
		eraserBtn.classList.remove('selected');
		sketchBtn.classList.remove('selected');
		darkenBtn.classList.remove('selected');
		lightenBtn.classList.remove('selected');
	}

	if (!rainbowBtn.classList.contains('selected')) {
		rainbow = false;
	}
});

// toggle grid
const gridBtn = document.querySelector('#grid-btn');
gridBtn.addEventListener('click', () => {
	gridBtn.classList.toggle('selected');

	if (gridBtn.classList.contains('selected')) {
		gridEnabled = true;
		enableDrawing(isHover, isClick, gridEnabled);
	}

	if (!gridBtn.classList.contains('selected')) {
		gridEnabled = false;
		enableDrawing(isHover, isClick, gridEnabled);
	}
});

// grid size slider
const slider = document.querySelector('.slider');
const gridSizeText = document.querySelector('.grid-size');
gridSizeText.textContent = slider.value + 'x' + slider.value;
slider.addEventListener('input', () => {
	gridSizeText.textContent = slider.value + 'x' + slider.value;
});

// color-picker
const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('change', (e) => {
	currentColor = e.target.value;
});

// swatches
const swatches = document.querySelectorAll('.swatch');
swatches.forEach((swatch) => {
	swatch.addEventListener('click', (e) => {
		if (e.altKey) {
			e.target.style.backgroundColor = colorPicker.value;
		}
	});

	swatch.addEventListener('click', (e) => {
		if (!e.target.style.backgroundColor == '') {
			currentColor = e.target.style.backgroundColor;
			currentColor = rgbToHex(currentColor);
			colorPicker.value = currentColor;
		}
	});
});

//#endregion

//#region GRID
const gridContainer = document.querySelector('.grid-container');

// initialise default grid
// pixelCount value is from (Num) x Num px, where Num = pixelCount
let pixelCount = 16;

gridContainer.style.gridTemplateColumns = 'repeat(' + pixelCount + ', 1fr)';
for (let i = 0; i < pixelCount * pixelCount; i++) {
	const pixelDiv = document.createElement('div');
	pixelDiv.classList.add('pixel');
	pixelDiv.style.backgroundColor = '#ffffff';
	pixelDiv.setAttribute('draggable', false);
	pixelDiv.setAttribute('data-shading', 0);
	gridContainer.appendChild(pixelDiv);
}

slider.addEventListener('input', () => {
	pixelCount = slider.value;
	gridContainer.style.gridTemplateColumns = 'repeat(' + pixelCount + ', 1fr)';

	while (gridContainer.firstChild) {
		gridContainer.removeChild(gridContainer.lastChild);
	}

	for (let i = 0; i < pixelCount * pixelCount; i++) {
		const pixelDiv = document.createElement('div');
		pixelDiv.classList.add('pixel');
		pixelDiv.style.backgroundColor = '#ffffff';
		pixelDiv.setAttribute('draggable', false);
		pixelDiv.setAttribute('data-shading', 0);
		gridContainer.appendChild(pixelDiv);
	}
	enableDrawing(isHover, isClick, gridEnabled); // preserve mode
});

// drawing to the grid
function enableDrawing(isHover, isClick, gridEnabled) {
	const pixels = document.querySelectorAll('.pixel');

	if (gridEnabled == false) {
		pixels.forEach((pixel) => {
			pixel.style.border = 'none';
		});
	} else {
		pixels.forEach((pixel) => {
			pixel.style.border = '1px dotted rgb(245, 245, 245)';
		});
	}

	// hover mode
	if (isHover) {
		pixels.forEach((pixel) => {
			pixel.addEventListener('mouseover', draw);
		});
	}

	// click and drag mode
	if (isClick) {
		pixels.forEach((pixel) => {
			pixel.addEventListener('click', draw);
		});

		window.addEventListener('mousedown', () => {
			pixels.forEach((pixel) => {
				pixel.addEventListener('mouseover', draw);
			});
		});

		window.addEventListener('mouseup', () => {
			pixels.forEach((pixel) => {
				pixel.removeEventListener('mouseover', draw);
			});
		});
	}

	// remove all event listeners from pixels if neither are selected
	if (!isHover && !isClick) {
		pixels.forEach((pixel) => {
			pixel.replaceWith(pixel.cloneNode(true));
		});
	}
}

// main function which draws to pixels
function draw() {
	if (sketch) {
		if (this.dataset.shading < 0) {
			// always keep shade vals for sketch positive
			this.setAttribute('data-shading', 0);
		}
		nextVal = this.dataset.shading; // get current shade val
		if (nextVal <= 9) {
			nextVal++;
		}
		this.setAttribute('data-shading', nextVal);
		this.style.backgroundColor = darkenColor('rgb(255,255,255)', nextVal);
	} else if (erase) {
		this.setAttribute('data-shading', 0); // reset shading
		this.style.backgroundColor = '#FFFFFF';
	} else if (darken) {
		nextVal = this.dataset.shading;
		if (nextVal <= 9) {
			nextVal++;
		}
		this.setAttribute('data-shading', nextVal);
		this.style.backgroundColor = darkenColor(this.style.backgroundColor, nextVal);
	} else if (lighten) {
		nextVal = this.dataset.shading;
		if (nextVal >= -9) {
			nextVal--;
		}
		this.setAttribute('data-shading', nextVal);
		this.style.backgroundColor = lightenColor(this.style.backgroundColor, nextVal);
	} else if (rainbow) {
		this.style.backgroundColor = getRandomColor();
	} else this.style.backgroundColor = currentColor;
}

function darkenColor(color, shade) {
	color = rgbToHex(color);
	colorArray = hexToRGB(color);
	if (shade < 0) {
		shade = shade * -1; // set shade to positive
	}
	for (let i = 0; i < colorArray.length; i++) {
		if (colorArray[i] > 0) {
			if (sketch) {
				colorArray[i] = colorArray[i] - shade * 25.5;
			} else {
				colorArray[i] = colorArray[i] - shade * 5;
			}
		} else {
			colorArray[i] = 0;
		}
	}
	return 'rgb(' + colorArray.toString() + ')';
}

function lightenColor(color, shade) {
	color = rgbToHex(color);
	colorArray = hexToRGB(color);
	if (shade < 0) {
		shade = shade * -1; // set shade to positive
	}
	for (let i = 0; i < colorArray.length; i++) {
		if (colorArray[i] < 255) {
			colorArray[i] = colorArray[i] + shade * 5;
		} else {
			colorArray[i] = 255;
		}
	}
	return 'rgb(' + colorArray.toString() + ')';
}

function shadeUp(color, shade) {
	return 'rgb(' + hexToRGB(color).toString() + ',' + shade * 0.1 + ')';
}

function getRandomColor() {
	let r = randomInteger(255);
	let g = randomInteger(255);
	let b = randomInteger(255);
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function randomInteger(max) {
	return Math.floor(Math.random() * (max + 1));
}

// thank u stackoverflow :p
function hexToRGB(hex) {
	const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
	if (normal) return normal.slice(1).map((e) => parseInt(e, 16));

	const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
	if (shorthand) return shorthand.slice(1).map((e) => 0x11 * parseInt(e, 16));

	return null;
}

function rgbToHex(rgb) {
	// Choose correct separator
	let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
	// Turn "rgb(r,g,b)" into [r,g,b]
	rgb = rgb.substr(4).split(')')[0].split(sep);

	let r = (+rgb[0]).toString(16),
		g = (+rgb[1]).toString(16),
		b = (+rgb[2]).toString(16);

	if (r.length == 1) r = '0' + r;
	if (g.length == 1) g = '0' + g;
	if (b.length == 1) b = '0' + b;

	return '#' + r + g + b;
}

//#endregion
