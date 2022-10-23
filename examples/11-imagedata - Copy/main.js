let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderButton = document.getElementById('render-button');
let cancelButton = document.getElementById('cancel-button');

function paintPixel(x, y, color) {
    var rgb = `rgb(${color.r},${color.g},${color.b})`;
    ctx.fillStyle = rgb;
    ctx.fillRect(x, y, 1, 1);
}

function handleMessageFromWorker(message) {
    let data = message.data;
    switch (data.command) {
        case 'putImageData':
            ctx.putImageData(data.imageData, data.x, data.y);
            break;
        case 'fillRect':
            let color = { r: data.r, g: data.g, b: data.b };
            paintPixel(data.x, data.y, color);
            break;
        case 'finished':
            updateStatus(false);
            break;
    }
}

function render() {
    let step = parseInt(stepInput.value);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    var blocks = [
        { x: 0, y: 0, width: ctx.canvas.width / 2, height: ctx.canvas.height / 2 },
        { x: ctx.canvas.width / 2, y: 0, width: ctx.canvas.width / 2, height: ctx.canvas.height / 2 },
        { x: 0, y: ctx.canvas.height / 2, width: ctx.canvas.width / 2, height: ctx.canvas.height / 2 },
        { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2, width: ctx.canvas.width / 2, height: ctx.canvas.height / 2 },
    ];
    blocks.forEach(block => {
        let worker = new Worker('worker.js', { type: 'module' });
        worker.addEventListener('message', handleMessageFromWorker);
        cancelButton.addEventListener("click", function () {
            worker.terminate();
            updateStatus(false);
        });
        worker.postMessage({
            command: 'render',
            canvas: { width: canvas.width, height: canvas.height },
            block: block
        });
    });
    updateStatus(true);
};


function updateStatus(running) {
    renderButton.disabled = running;
    cancelButton.disabled = !running;
}

renderButton.addEventListener("click", render);
render();
