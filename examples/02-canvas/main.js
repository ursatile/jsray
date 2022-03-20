function getColorAtPixel(x, y) {
  let r = 255 * (Math.sin(200 - x / 20)) + 255 * (Math.cos(150 - y / 20));;
  let g = 255 * (Math.sin(200 - x / 20));
  let b = 255 * (Math.cos(150 - y / 20));
  return `rgb(${r},${g},${b})`
}

let myCanvas = document.getElementById('my-canvas');
let ctx = myCanvas.getContext('2d');
for (let x = 0; x < myCanvas.width; x++) {
  for (let y = 0; y < myCanvas.height; y++) {
    ctx.fillStyle = getColorAtPixel(x, y);
    ctx.fillRect(x, y, 1, 1);
  }
}