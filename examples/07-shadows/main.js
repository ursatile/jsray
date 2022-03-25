import { Tracer } from './modules/tracer.js';
import * as ExampleScenes from './scenes/examples.js';

let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
let tracer = new Tracer(canvas.width, canvas.height);

function paint(x, y, width, height, color) {
    var rgb = `rgb(${color.r},${color.g},${color.b})`;
    ctx.fillStyle = rgb;
    ctx.fillRect(x, y, width, height);
}

export function render() {
    let scene = ExampleScenes.AssortedShapes();
    tracer.trace(scene, paint);
}

render();