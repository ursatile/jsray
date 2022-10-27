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

function partition(width, height, howManyBlocks) {
    let blockWidth = width / howManyBlocks;
    let x = 0;
    let blocks = [];
    while (x + blockWidth < width) {
        blocks.push({x: x, y: 0, width: blockWidth, height: height});
        x += blockWidth;
    }
    blocks.push({x:x, y: 0, width: width-x, height: height});
    console.log(blocks);
    return blocks;
}

let runningWorkers = 0;
function render() {
    console.log("Rendering:");
    window.renderStarted = new Date().valueOf();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let blocks = partition(ctx.canvas.width, ctx.canvas.height,256);
    blocks.forEach(block => {
        let worker = new Worker('worker.js', { type: 'module' });
        worker.addEventListener('message', handleMessageFromWorker);
        cancelButton.addEventListener("click", function () {
            worker.terminate();
            updateStatus(false);
        });
        worker.postMessage({ command: 'render', width: canvas.width, height: canvas.height, block: block });
        runningWorkers++;
    });
    updateStatus(true);
};


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
