import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function paintPixel(x, y, color) {  
  ctx.fillStyle = color.html;
  ctx.fillRect(x, y, 1, 1);
}

let renderButton = document.getElementById('render-button');
let reflectionInput = document.getElementById('reflection-input');

function render() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    let reflection = parseFloat(reflectionInput.value) ?? 0.5;
    let scene = ExampleScenes.AssortedShapes(reflection);
    renderer.render(scene, paintPixel);
};
renderButton.addEventListener("click", render);
render();
