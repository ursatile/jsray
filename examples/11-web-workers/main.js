import { Camera, Scene, Tracer, Vector, Color } from './modules/tracer.js';
import { Sphere } from './modules/shapes/sphere.js';
import { Plane } from './modules/shapes/plane.js';
import { Box } from './modules/shapes/box.js';
import { Light } from './modules/light.js';
import { Finish } from './modules/finish.js';
import { Texture } from './modules/texture.js';
import { Stripes } from './modules/patterns/stripes.js';
import { Chessboard } from './modules/patterns/chessboard.js';
import { Tiles } from './modules/patterns/tiles.js';

function callback(x, y, color, step) {
  var rgb = `rgb(${color.r},${color.g},${color.b})`;
  self.postMessage({ what: 'pixelRendered', x: x, y: y, step: step, rgb: rgb })
}

self.addEventListener('message', function (message) {
  let data = message.data;
  switch (data.command) {
    case 'render':
      console.log("Starting trace on background worker thread.")
      render(data.width, data.height, data.reflection, data.step);
      self.close();
      self.postMessage({ what: 'sceneRendered' });
      break;
  }
});

export function render(width, height, reflection, step = 1) {

  let tracer = new Tracer(width, height);
  tracer.trace(scene, callback, step);
}

