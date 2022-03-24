// JavaScript module containing examples of patterns and procedural rendering.

function renderCanvas(canvas, getColorAtPixel) {
    let ctx = canvas.getContext('2d');
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            ctx.fillStyle = getColorAtPixel(x, y);
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

export function Gradiance(canvas) {
    renderCanvas(canvas, (x, y) => {
        let r = (4 * x) % 256;
        let g = (x + y) % 256;
        let b = y % 256;
        return `rgb(${r},${b},${g})`;
    });
}

export function Supernova(canvas) {
    renderCanvas(canvas, (x, y) => {
        let r = (x * (1 + Math.sin(y / 100))) % 255;
        let g = Math.abs(20 * Math.tan(y)) % 255;
        let b = (y * (1 + Math.cos(x / 2))) % 255;
        return `rgb(${r},${g},${b})`;
    });
}

export function Chessboard(canvas, size = 20, color1 = "rgb(255,255,255)", color2 = "rgb(0,0,0)") {
    renderCanvas(canvas, (x, y) => {
        const xOdd = (x % (2 * size) < size);
        const yOdd = (y % (2 * size) < size);
        return (xOdd != yOdd ? color1 : color2);
    });
}

export function Lasers(canvas) {
    renderCanvas(canvas, (x, y) => {
        let r = 255 * Math.sin(200 - x / 20) + 255 * Math.cos(150 - y / 20);
        let g = 255 * Math.sin(200 - x / 20);
        let b = 255 * Math.cos(150 - y / 20);
        return `rgb(${r},${g},${b})`;
    });
}