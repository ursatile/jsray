import { Camera, Scene, Tracer, Vector, Color } from './modules/tracer.js';
import { Sphere } from './modules/shapes/sphere.js';
import { Plane } from './modules/shapes/plane.js';
import { Box } from './modules/shapes/box.js';
import { Light } from './modules/light.js';
import { Finish, Texture } from './modules/texture.js';

function renderDemo(lights, shapes) {
  let camera = new Camera(new Vector(0, 20, 0), new Vector(0, 0, 0), 1, 0.75);
  let background = new Color(0, 0, 0);
  let scene = new Scene(camera, shapes, lights, background);
  let canvas = document.getElementById('my-canvas');
  let ctx = canvas.getContext('2d');
  let tracer = new Tracer(canvas.width, canvas.height);
  tracer.trace(scene, (x, y, color, step) => {
    var rgb = `rgb(${color.r},${color.g},${color.b})`;
    ctx.fillStyle = rgb;
    ctx.fillRect(x, y, step, step);
  });

}
function renderFinishDemo() {
  let lights = [new Light(new Vector(10, 20, 20), Color.White)];
  let color = new Color("#69f");
  const RADIUS = 0.9;
  const SPACING = 2.2;
  let shapes = [
    // new Plane(Vector.Y, 0, Color.Gray50),
    new Sphere(new Vector(-SPACING * 1.5, 1, SPACING), RADIUS, new Texture(color, new Finish({ ambient: 1, diffuse: 0, specular: 0 }))),
    new Sphere(new Vector(-SPACING * 0.5, 1, SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0.6, diffuse: 0.3, specular: 0 }))),
    new Sphere(new Vector(SPACING * 0.5, 1, SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0.3, diffuse: 0.6, specular: 0 }))),
    new Sphere(new Vector(SPACING * 1.5, 1, SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0, diffuse: 1, specular: 0 }))),

    new Sphere(new Vector(-SPACING * 1.5, 1, 0), RADIUS, new Texture(color, new Finish({ ambient: 1, diffuse: 0, specular: 0.5 }))),
    new Sphere(new Vector(-SPACING * 0.5, 1, 0), RADIUS, new Texture(color, new Finish({ ambient: 0.6, diffuse: 0.3, specular: 0.5 }))),
    new Sphere(new Vector(SPACING * 0.5, 1, 0), RADIUS, new Texture(color, new Finish({ ambient: 0.3, diffuse: 0.6, specular: 0.5 }))),
    new Sphere(new Vector(SPACING * 1.5, 1, 0), RADIUS, new Texture(color, new Finish({ ambient: 0, diffuse: 1, specular: 0.5 }))),

    new Sphere(new Vector(-SPACING * 1.5, 1, -SPACING), RADIUS, new Texture(color, new Finish({ ambient: 1, diffuse: 0, specular: 1 }))),
    new Sphere(new Vector(-SPACING * 0.5, 1, -SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0.6, diffuse: 0.3, specular: 1 }))),
    new Sphere(new Vector(SPACING * 0.5, 1, -SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0.3, diffuse: 0.6, specular: 1 }))),
    new Sphere(new Vector(SPACING * 1.5, 1, -SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0, diffuse: 1, specular: 1 }))),
  ];
  renderDemo(lights, shapes);
};
function renderLightsDemo() {
  let lights = [
    new Light(new Vector(-17, 20, 10), new Color("#933")),
    new Light(new Vector(0, 20, -20), new Color("#393")),
    new Light(new Vector(17, 20, 10), new Color("#339")),

  ];
  let color = new Color("#ccc");
  const RADIUS = 0.9;
  const SPACING = 2.2;
  let shapes = [
    // new Plane(Vector.Y, 0, Color.Gray50),
    new Sphere(new Vector(-SPACING * 1.5, 1, SPACING), RADIUS, new Texture(color, new Finish({ ambient: 1, diffuse: 0, specular: 0 }))),
    new Sphere(new Vector(-SPACING * 0.5, 1, SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0.6, diffuse: 0.3, specular: 0 }))),
    new Sphere(new Vector(SPACING * 0.5, 1, SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0.3, diffuse: 0.6, specular: 0 }))),
    new Sphere(new Vector(SPACING * 1.5, 1, SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0, diffuse: 1, specular: 0 }))),

    new Sphere(new Vector(-SPACING * 1.5, 1, 0), RADIUS, new Texture(color, new Finish({ ambient: 1, diffuse: 0, specular: 0.5 }))),
    new Sphere(new Vector(-SPACING * 0.5, 1, 0), RADIUS, new Texture(color, new Finish({ ambient: 0.6, diffuse: 0.3, specular: 0.5 }))),
    new Sphere(new Vector(SPACING * 0.5, 1, 0), RADIUS, new Texture(color, new Finish({ ambient: 0.3, diffuse: 0.6, specular: 0.5 }))),
    new Sphere(new Vector(SPACING * 1.5, 1, 0), RADIUS, new Texture(color, new Finish({ ambient: 0, diffuse: 1, specular: 0.5 }))),

    new Sphere(new Vector(-SPACING * 1.5, 1, -SPACING), RADIUS, new Texture(color, new Finish({ ambient: 1, diffuse: 0, specular: 1 }))),
    new Sphere(new Vector(-SPACING * 0.5, 1, -SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0.6, diffuse: 0.3, specular: 1 }))),
    new Sphere(new Vector(SPACING * 0.5, 1, -SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0.3, diffuse: 0.6, specular: 1 }))),
    new Sphere(new Vector(SPACING * 1.5, 1, -SPACING), RADIUS, new Texture(color, new Finish({ ambient: 0, diffuse: 1, specular: 1 }))),
  ];
  renderDemo(lights, shapes);

}

document.getElementById('render-finish-demo').addEventListener("click", renderFinishDemo);
document.getElementById('render-lights-demo').addEventListener("click", renderLightsDemo);
renderFinishDemo();