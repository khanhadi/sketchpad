// TOOLBAR
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

const pixels = document.querySelectorAll('.pixel');

pixels.forEach((pixel) => {
	pixel.addEventListener('mouseover', () => {
		pixel.style.backgroundColor = currentColor;
	});
});
