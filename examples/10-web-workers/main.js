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
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let worker = new Worker('worker.js', { type: 'module' });
    worker.addEventListener('message', handleMessageFromWorker);
    cancelButton.addEventListener("click", function () {
        worker.terminate();
        updateStatus(false);
    });
    worker.postMessage({ command: 'render', width: canvas.width, height: canvas.height });
    updateStatus(true);
};


function updateStatus(running) {
    renderButton.disabled = running;
    cancelButton.disabled = !running;
}

renderButton.addEventListener("click", render);
render();
