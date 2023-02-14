// TOOLBAR

// modes
const clickBtn = document.querySelector('#click-btn');
const hoverBtn = document.querySelector('#hover-btn');

let isClick = false;
let isHover = false;

clickBtn.addEventListener('click', () => {
	clickBtn.classList.add('selected');
	hoverBtn.classList.remove('selected');
	isClick = true;
	isHover = false;
	console.log('Click Mode');
	enableDrawing(isHover, isClick);
});

hoverBtn.addEventListener('click', () => {
	hoverBtn.classList.add('selected');
	clickBtn.classList.remove('selected');
	isClick = false;
	isHover = true;
	console.log('Hover Mode');
	enableDrawing(isHover, isClick);
});

// color-picker
let currentColor = '#000000'; // hex black

const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('change', (e) => {
	currentColor = e.target.value;
	console.log(currentColor);
});

// GRID
const gridContainer = document.querySelector('.grid-container');
// pixelCount value is from (Num) x Num px, where Num = pixelCount
let pixelCount = 16;
gridContainer.style.gridTemplateColumns = 'repeat(' + pixelCount + ', 1fr)';

for (let i = 0; i < pixelCount * pixelCount; i++) {
	const pixelDiv = document.createElement('div');
	pixelDiv.classList.add('pixel');
	gridContainer.appendChild(pixelDiv);
}

// drawing to the grid
function enableDrawing(isHover, isClick) {
	const pixels = document.querySelectorAll('.pixel');

	// hover mode
	if (isHover) {
		pixels.forEach((pixel) => {
			pixel.removeEventListener('click', draw);
			pixel.addEventListener('mouseover', draw);
		});
	}

	// click and drag mode
	if (isClick) {
		pixels.forEach((pixel) => {
			pixel.removeEventListener('mouseover', draw);
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
}

function draw() {
	this.style.backgroundColor = currentColor;
}
