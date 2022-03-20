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
  let finish = new Finish({ reflection: reflection, ambient: 0.1, diffuse: 0.7, specular: 0.7 })
  let camera = new Camera(new Vector(-5, 5, -9), new Vector(0, 2, 0), 2, 1.5);
  let background = new Color(0, 0, 0);
  let lights = [
    new Light(new Vector(-2, 12, -6), Color.White)
  ];

  let tiles = new Texture(
    new Tiles(new Vector(1, 1, 1), 0.05, Color.Black, new Color("#fff")),
    new Finish({ ambient: 0, diffuse: 0.7, reflection: 0.2 })
  )
  let shapes = [
    new Plane(Vector.Y, 0, tiles),
    //    new Sphere(new Vector(1, 2, 0), 2, new Texture(rings, new Finish({ ambient: 0.2, diffuse: 0.7, specular: 0, reflection: 0 }))),
    //new Sphere(new Vector(1, 2, 0), 2, bricks),
    new Box(new Vector(5, 0, 5), new Vector(1, 4, 3), new Texture(new Color("#369"), finish)),
    new Sphere(new Vector(3, 1, 0), 1, new Texture(new Color("#0c3"), finish)),
    new Sphere(new Vector(3, 0.5, -2), 0.5, new Texture(new Color("#00f"), finish)),
    new Sphere(new Vector(-1, 1, 2), 1, new Texture(new Color("#f00"), finish)),
    new Sphere(new Vector(-2, 2, 5), 2, new Texture(new Color("#fc0"), finish)),
  ];

  let scene = new Scene(camera, shapes, lights, background);
  let tracer = new Tracer(width, height);
  tracer.trace(scene, callback, step);
}

