---
title: "3.4: Rendering an Empty Scene"
layout: module
nav_order: 0304
summary: >
    In this section we'll create a scene containing only a camera and a background color, and run a test render to check that everything we've got so far is working properly.
typora-root-url: ./
typora-copy-images-to: assets\images
---

**Download code: [examples/03.tracer.zip](examples/03.tracer.zip)**

**Run this code: [examples/03-tracer/index.html](examples/03-tracer/index.html)**

So, we have vectors, colors, rays, a scene, a camera... now we're going to create the actual ray-tracer, hook that up to our HTML canvas, and render something.

We don't have any shapes yet, so all we'll be able to render is empty space, but we can control the background color of our scene so we should at least be able to check that the empty sky in our empty world is the right color.

### Creating the tracer

Create a new file called `modules/tracer.js`, that looks like this:

```javascript
// modules/tracer.js

{% include_relative examples/03-tracer/modules/tracer.js %}
```

The main purpose of the `Tracer` class is to translate HTML canvas pixel coordinates into floating-point world coordinates, and then call `scene.trace` once for each pixel on our canvas.

>  The tracer includes a variable called `step`; this controls how many pixels we'll render in each loop. The default value `step=1` will render every pixel in the canvas, but this can take a long time - and if we're trying to use `console.log` to debug our code, it'll slow things to a crawl. Setting `step` to 10 or even `100` will render solid 10x10 or 100x100 blocks of pixels, which speeds things up considerably.

Notice that the tracer doesn't actually update the `canvas` directly; instead, for each pixel that's rendered, it'll call a `callback` function and pass the `x`, `y`, `color`  and `step` values.

### Connecting it all together

Update the `main.js` file in your project with this code:

```javascript
// main.js

{% include_relative examples/03-tracer/main.js %}
```

In this file, we create a scene containing a camera and a background color, then create a `Tracer`, and trace that scene, using a callback function that renders each pixel (or pixel block) to our HTML canvas element.

### Checklist:

You should have a project structure now that looks like this:

* [index.html](jstracer-part01/jstracer/index.html)
* [style.css](jstracer-part01/jstracer/style.css)
* [main.js](jstracer-part01/jstracer/main.js)
* modules/
  * [camera.js](jstracer-part01/jstracer/modules/camera.js)
  * [material.js](jstracer-part01/jstracer/modules/material.js)
  * [ray.js](jstracer-part01/jstracer/modules/ray.js)
  * [scene.js](jstracer-part01/jstracer/modules/scene.js)
  * [settings.js](jstracer-part01/jstracer/modules/settings.js)
  * [tracer.js](jstracer-part01/jstracer/modules/tracer.js)
  * [vector.js](jstracer-part01/jstracer/modules/vector.js)

**Download code: [examples/03.tracer.zip](examples/03.tracer.zip)**

**Run this code: [examples/03-tracer/index.html](examples/03-tracer/index.html)**


If everything works, you'll get a solid block of bright blue sky:

![image-20220319152045451](assets/images/image-20220319152045451.png)

Try changing the `background` color on line 4 -- for example, to make our sky midnight dark blue, try:

```javascript
let background = new Color(0, 20, 55);
```

![image-20220319152156710](assets/images/image-20220319152156710.png)

## Review & Recap

* The `Tracer` class is the connection between the browser's HTML and canvas elements, which work in 2D screen coordinates based on pixels, and the ray-tracing engine, which works in 3D world coordinates based on vectors.
* Any ray in our scene that doesn't hit a shape will end up as `scene.background` - and because we don't have any shapes yet, all we can do is draw empty skies.

