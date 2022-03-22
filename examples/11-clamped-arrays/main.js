let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderButton = document.getElementById('render-button');
let cancelButton = document.getElementById('cancel-button');
let stepInput = document.getElementById('step-input');

function handleMessageFromWorker(message) {
  let data = message.data;
  switch (data.what) {
    case 'putImageData':
      ctx.putImageData(data.imageData, data.x, data.y);
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
