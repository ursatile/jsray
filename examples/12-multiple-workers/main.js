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
            console.log('finished!');
            runningWorkers--;
            updateStatus(runningWorkers > 0);
            break;
    }
}

function partition(width, height, rows, columns) {
    let blockWidth = Math.ceil(width / rows);
    let blockHeight = Math.ceil(height / columns);
    let x = 0;
    let y = 0;
    let blocks = [];
    while (x + blockWidth < width) {
        while (y + blockHeight < height) {
            blocks.push({ x: x, y: y, width: blockWidth, height: blockHeight });
            y += blockHeight;
        }
        blocks.push({ x: x, y: y, width: blockWidth, height: blockHeight });
        y = 0;
        x += blockWidth;
    }
    while (y + blockHeight < height) {
        blocks.push({ x: x, y: y, width: width - x, height: blockHeight });
        y += blockHeight;
    }
    blocks.push({ x: x, y: y, width: width - x, height: height - y });
    return blocks;
}

let runningWorkers = 0;
function render() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let blocks = partition(ctx.canvas.width, ctx.canvas.height, 4, 2);
    ctx.strokeStyle = "#999";
    blocks.forEach(block => {
        ctx.strokeRect(block.x, block.y, block.width, block.height);
        runWorkerForBlock(canvas, block);
        runningWorkers++;
    });
    updateStatus(true);
};

function runWorkerForBlock(canvas, block) {
    let worker = new Worker('worker.js', { type: 'module' });
    worker.addEventListener('message', handleMessageFromWorker);
    cancelButton.addEventListener("click", function () {
        worker.terminate();
        updateStatus(false);
    });
    worker.postMessage({ command: 'render', width: canvas.width, height: canvas.height, block: block });
}

function updateStatus(running) {
    renderButton.disabled = running;
    cancelButton.disabled = !running;
    if (!running) {
        var elapsed = (new Date().valueOf()) - window.renderStarted;
        console.log(`Render completed in ${elapsed / 1000} seconds`);
    }
}

renderButton.addEventListener("click", render);
render();
