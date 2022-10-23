import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function paintPixel(x, y, color) {  
  ctx.fillStyle = color.html;
  ctx.fillRect(x, y, 1, 1);
}

let renderFinishDemo = () => renderer.render(ExampleScenes.AssortedFinishes(), paintPixel);
let renderLightsDemo = () => renderer.render(ExampleScenes.ColoredLights(), paintPixel);
let renderShapesDemo = () => renderer.render(ExampleScenes.AssortedShapes(), paintPixel);

document.getElementById('render-finish-demo').addEventListener("click", renderFinishDemo);
document.getElementById('render-lights-demo').addEventListener("click", renderLightsDemo);
document.getElementById('render-shapes-demo').addEventListener("click", renderShapesDemo);

switch(window.location.hash) {
  case "#finish": renderFinishDemo(); break;
  case "#shapes": renderShapesDemo(); break;
  default: renderLightsDemo(); break;
}


