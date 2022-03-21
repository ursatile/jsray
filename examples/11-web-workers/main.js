import { Tracer } from './modules/tracer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');

function handleMessageFromWorker(message) {
  let data = message.data;
  switch (data.what) {
    case 'renderedPixel':
      var rgb = `rgb(${data.r},${data.g},${data.b})`;
      ctx.fillStyle = rgb;
      ctx.fillRect(data.x, data.y, data.step, data.step);
      break;
    case 'renderComplete':
      document.forms[0].renderButton.disabled = false;
      document.forms[0].cancelButton.disabled = true;
      break;

  }
}

export function render() {
  let step = 100;// parseInt(this.form.step.value);
  document.forms[0].renderButton.disabled = true;
  document.forms[0].cancelButton.disabled = false;

  ctx.fillStyle = '#999';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  window.worker = new Worker('worker.js', { type: 'module' });
  window.worker.addEventListener('message', handleMessageFromWorker);
  window.worker.postMessage({ command: 'start', width: canvas.width, height: canvas.height, step: step });
};

export function cancel() {
  if (window.worker && window.worker.terminate) window.worker.terminate();
  window.rendering = false;
  delete window.worker;
  document.forms[0].renderButton.disabled = false;
  document.forms[0].cancelButton.disabled = true;
}