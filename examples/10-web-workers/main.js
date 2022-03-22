let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderButton = document.getElementById('render-button');
let cancelButton = document.getElementById('cancel-button');
let stepInput = document.getElementById('step-input');

function paint(x, y, width, height, color) {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, width, height);
}

function handleMessageFromWorker(message) {
  let data = message.data;
  switch (data.what) {
    case 'fillRect':
      let color = { r: data.r, g: data.g, b: data.b };
      paint(data.x,data.y,data.width,data.height,color);
      break;
    case 'finished':
      updateStatus(false);
      break;
  }
}

function render() {
  let step = parseInt(stepInput.value);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  let worker = new Worker('worker.js', { type: 'module' });
  worker.addEventListener('message', handleMessageFromWorker);
  cancelButton.addEventListener("click", function () {
    worker.terminate();
    updateStatus(false);
  });
  worker.postMessage({ command: 'start', width: canvas.width, height: canvas.height, step: step });
  updateStatus(true);
};


function updateStatus(running) {
  renderButton.disabled = running;
  cancelButton.disabled = !running;
}

renderButton.addEventListener("click", render);
render();
