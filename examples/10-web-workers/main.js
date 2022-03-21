let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderButton = document.getElementById('render-button');
let cancelButton = document.getElementById('cancel-button');
let stepInput = document.getElementById('step-input');

renderButton.addEventListener("click", render);
cancelButton.addEventListener("click", cancel);

function handleMessageFromWorker(message) {
  let data = message.data;
  switch (data.what) {
    case 'renderedPixel':
      ctx.fillStyle = `rgb(${data.r},${data.g},${data.b})`;
      ctx.fillRect(data.x, data.y, data.step, data.step);
      break;
    case 'renderComplete':
      window.worker = null;
  }
}

function render() {
  if (window.worker) return; // don't start another one if we're already rendering!
  let step = parseInt(stepInput.value);
  ctx.fillStyle = '#999';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  window.worker = new Worker('worker.js', { type: 'module' });
  window.worker.addEventListener('message', handleMessageFromWorker);
  window.worker.postMessage({ command: 'start', width: canvas.width, height: canvas.height, step: step });
};

function cancel() {
  if (window.worker && window.worker.terminate) window.worker.terminate();
  window.worker = null;
}

render();
