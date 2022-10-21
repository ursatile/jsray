import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function paint(x, y, color) {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillStyle = rgb;
  ctx.fillRect(x, y, 1, 1);
}

let renderFinishDemo = () => renderer.render(ExampleScenes.AssortedFinishes(), paint);
let renderLightsDemo = () => renderer.render(ExampleScenes.ColoredLights(), paint);
let renderShapesDemo = () => renderer.render(ExampleScenes.AssortedShapes(), paint);

document.getElementById('render-finish-demo').addEventListener("click", renderFinishDemo);
document.getElementById('render-lights-demo').addEventListener("click", renderLightsDemo);
document.getElementById('render-shapes-demo').addEventListener("click", renderShapesDemo);

renderFinishDemo();

