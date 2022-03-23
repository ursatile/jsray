import { Camera, Scene, Vector, Color } from '../modules/tracer.js';
import { Sphere } from '../modules/shapes/sphere.js';
import { Plane } from '../modules/shapes/plane.js';
import { Box } from '../modules/shapes/box.js';
import { Light } from '../modules/light.js';
import { Texture } from '../modules/texture.js';
import { Finish } from '../modules/finish.js';
import { Rotate, Scale, Translate } from '../modules/transformations/transformation.js';
import { Matrix } from '../modules/transformations/matrix.js';

let background = new Color(0, 0, 0);

export function EmptySky() {
  let camera = new Camera(new Vector(-4, 1, -5), new Vector(0, 1, 0));
  let background = new Color(120, 150, 255);
  return new Scene(camera, background);
}

export function ColoredSpheres() {
  let camera = new Camera(new Vector(0, 2, -3), new Vector(0, 1, 0));
  let shapes = [
    new Sphere(new Vector(0, 1, 0), 1, new Color("#fff")),
    new Sphere(new Vector(2, 1, 2), 1, new Color("#0f0")),
    new Sphere(new Vector(4, 1, 4), 1, new Color("#00f")),
    new Sphere(new Vector(-2, 1, 2), 1, new Color("#f00")),
    new Sphere(new Vector(-4, 1, 4), 1, new Color("#fc0")),
  ];
  return new Scene(camera, background, shapes);
}

export function ColoredSpheresWithLight() {
  let scene = ColoredSpheres();
  scene.lights = [new Light(new Vector(5, 10, -5), Color.White)];
  return scene;
}

export function AssortedShapes() {
  let camera = new Camera(new Vector(-5, 4, -9), new Vector(0, 2, 0), 2, 1.5);
  let lights = [new Light(new Vector(-12, 6, -6), Color.White)];
  let shapes = [
    new Plane(Vector.Y, 0, Color.Gray50),
    new Box(new Vector(-1, 0, -1), new Vector(1, 2, 1), new Color("#09f")),
    new Sphere(new Vector(3, 1, 0), 1, new Color("#0f0")),
    new Sphere(new Vector(3, 0.5, -2), 0.5, new Color("#00f")),
    new Sphere(new Vector(-1, 1, 2), 1, new Color("#f00")),
    new Sphere(new Vector(-2, 2, 5), 2, new Color("#fc0")),
  ];
  return new Scene(camera, background, shapes, lights);
}

const RADIUS = 0.9;
const SPACING = 2.2;

export function AssortedFinishes() {
  let camera = new Camera(new Vector(0, 20, 0), new Vector(0, 0, 0), 1, 0.75);
  let lights = [new Light(new Vector(10, 20, 20), Color.White)];
  let color = new Color("#69f");
  let shapes = [
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
  return new Scene(camera, background, shapes, lights);
}

export function ColoredLights() {
  let camera = new Camera(new Vector(0, 20, 0), new Vector(0, 0, 0), 1, 0.75);
  let lights = [
    new Light(new Vector(-17, 20, 10), new Color("#933")),
    new Light(new Vector(0, 20, -20), new Color("#393")),
    new Light(new Vector(17, 20, 10), new Color("#339")),
  ];
  let color = new Color("#ccc");
  let shapes = [
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
  return new Scene(camera, background, shapes, lights);
}

export function ReflectingShapes(reflection = 0.5) {
  let finish = new Finish({ reflection: reflection, ambient: 0.1, diffuse: 0.7, specular: 0.7 })
  let camera = new Camera(new Vector(-5, 5, -9), new Vector(0, 2, 0), 2, 1.5);
  let background = new Color(0, 0, 0);
  let lights = [new Light(new Vector(-8, 12, -6), Color.White)];
  let shapes = [
    new Plane(Vector.Y, 0, new Texture(Color.Gray50, finish)),
    new Box(new Vector(5, 0, 5), new Vector(1, 4, 3), new Texture(new Color("#609"), finish)),
    new Sphere(new Vector(3, 1, 0), 1, new Texture(new Color("#0c3"), finish)),
    new Sphere(new Vector(3, 0.5, -2), 0.5, new Texture(new Color("#00f"), finish)),
    new Sphere(new Vector(-1, 1, 2), 1, new Texture(new Color("#f00"), finish)),
    new Sphere(new Vector(-2, 2, 5), 2, new Texture(new Color("#fc0"), finish)),
    new Sphere(new Vector(2, 0.5, 1.8), 0.5, new Texture(new Color("#ccc"), finish)),
  ];
  return new Scene(camera, background, shapes, lights);
}

export function TransformedShapes() {
  let finish = new Finish({ ambient: 0.5, specular: 0.2, reflection: 0.2 })
  // let finish = new Finish({ reflection: 0.5, ambient: 0.18, diffuse: 0.7, specular: 0.7 });
  let camera = new Camera(new Vector(-8, 6, -7), new Vector(0, 1, 0), 2, 1.5);
  let lights = [new Light(new Vector(-1, 12, -6), Color.White)];
  let shapes = [
    new Plane(Vector.Y, 0, new Texture(Color.Gray50, finish)),
    new Sphere(new Vector(4, 1, 0), 1, new Texture(new Color("#9ff"), finish), [Matrix.scale(1, 2, 1)]),
    new Sphere(new Vector(2.82, 1, -2.82), 1, new Texture(new Color("#f99"), finish), [Matrix.scale(1, 1.5, 1)]),
    new Sphere(new Vector(0, 1, -4), 1, new Texture(new Color("#99f"), finish)),
    new Sphere(new Vector(-2.82, 1, -2.82), 1, new Texture(new Color("#9f9"), finish), [Matrix.scale(1, 0.8, 1)]),
    new Sphere(new Vector(-4, 1, 0), 1, new Texture(new Color("#ff9"), finish), [Matrix.scale(1, 0.2, 1)]),

    new Box(new Vector(-1, 0, -1), new Vector(1, 4, 1), new Texture(new Color("#999"), finish),
      [
        Matrix.rotate(0, 1, 0, 45),
        //Matrix.scale(1, 1, 0.1, 0),
        //Matrix.translate(2, 2, 2),

      ]
    ),

    // new Sphere(new Vector(0, 0, 0, 0), 1, new Texture(new Color("#f90"), finish), [
    //   Matrix.scale(1, 2, 1),
    //   Matrix.translate(-2, 0, 0)
    // ]),
    // new Sphere(new Vector(0, 0, 0, 0), 1, new Texture(new Color("#09f"), finish), [Matrix.identity]),
    // new Sphere(new Vector(0, 0, 0, 0), 1, new Texture(new Color("#0f6"), finish), [
    //   Matrix.scale(1, 3, 1),
    //   //  Matrix.rotate(0, 0, 1, 25),
    //   Matrix.translate(3, 0, 0)]
    // ),
  ];
  // let floor = 

  return new Scene(camera, background, shapes, lights);
}