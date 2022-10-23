import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderButton = document.getElementById('render-button');
let reflectionInput = document.getElementById('reflection-input');
let renderer = new Renderer(canvas.width, canvas.height);

function paint(x, y, color) {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, 1, 1);
}

function render() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    let reflection = parseFloat(reflectionInput.value) ?? 0.5;
    let scene = ExampleScenes.AssortedShapes(reflection);
    renderer.render(scene, paint);
};
renderButton.addEventListener("click", render);
render();
