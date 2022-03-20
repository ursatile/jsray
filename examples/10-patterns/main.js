import { Camera, Scene, Tracer, Vector, Color } from './modules/tracer.js';
import { Sphere } from './modules/shapes/sphere.js';
import { Plane } from './modules/shapes/plane.js';
import { Box } from './modules/shapes/box.js';
import { Light } from './modules/light.js';
import { Finish } from './modules/finish.js';
import { Texture } from './modules/texture.js';
import { Stripes } from './modules/patterns/stripes.js';
import { Layers } from './modules/patterns/layers.js';
import { Chessboard } from './modules/patterns/chessboard.js';
import { Rings } from './modules/patterns/rings.js';

export function render(reflection, step = 1) {
  let finish = new Finish({ reflection: reflection, ambient: 0.1, diffuse: 0.7, specular: 0.7 })
  let camera = new Camera(new Vector(-5, 8, -9), new Vector(1, 2, 0), 2, 1.5);
  let background = new Color(0, 0, 0);
  let lights = [
    new Light(new Vector(-2, 12, -6), Color.White)
  ];
  let layers = new Layers({
    0.0: new Color("#f00"),
    0.2: new Color("#00f"),
    0.4: new Color("#0f0"),
    0.6: new Color("#ff0"),
    0.8: new Color("#0ff"),
    1.0: new Color("#f0f")
  });
  let rings = new Rings({
    0.00: new Color(197, 132, 75),
    0.10: new Color(200, 132, 75),
    0.16: new Color(255, 252, 193),
    0.20: new Color(200, 132, 75),
    0.25: new Color(255, 252, 193),
    0.32: new Color(187, 132, 75),
    0.37: new Color(255, 252, 193),
    0.40: new Color(200, 127, 75),
    0.45: new Color(255, 244, 198),
    0.51: new Color(200, 132, 75),
    0.55: new Color(255, 246, 170),
    0.61: new Color(200, 140, 75),
    0.65: new Color(255, 246, 170),
    0.70: new Color(200, 132, 75),
    0.75: new Color(255, 236, 170),
    0.82: new Color(200, 132, 75),
    0.88: new Color(255, 246, 170),
    0.91: new Color(200, 132, 75),
    0.95: new Color(255, 246, 176),
    1.00: new Color(197, 132, 75)
  });
  let shapes = [
    new Plane(Vector.Y, 0, new Texture(new Chessboard(Color.Black, Color.White), finish)),
    new Sphere(new Vector(1, 2, 0), 2, new Texture(rings, new Finish({ ambient: 0.2, diffuse: 0.7, specular: 0, reflection: 0 }))),
    new Box(new Vector(5, 0, 5), new Vector(1, 4, 3), new Texture(layers)),
    // new Sphere(new Vector(3, 1, 0), 1, new Texture(new Color("#0c3"), finish)),
    // new Sphere(new Vector(3, 0.5, -2), 0.5, new Texture(new Color("#00f"), finish)),
    // new Sphere(new Vector(-1, 1, 2), 1, new Texture(new Color("#f00"), finish)),
    // new Sphere(new Vector(-2, 2, 5), 2, new Texture(new Color("#fc0"), finish)),
  ];

  let scene = new Scene(camera, shapes, lights, background);
  let canvas = document.getElementById('my-canvas');
  let ctx = canvas.getContext('2d');
  let tracer = new Tracer(canvas.width, canvas.height);
  tracer.trace(scene, (x, y, color, step) => {
    var rgb = `rgb(${color.r},${color.g},${color.b})`;
    ctx.fillStyle = rgb;
    ctx.fillRect(x, y, step, step);
  }, step);
}