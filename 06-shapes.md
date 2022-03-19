---
title: "6: Shape Up or Ship Out"
layout: module
nav_order: 6
summary: >
    Let's add some shapes to our ray-tracer.
typora-root-url: ./
typora-copy-images-to: assets\images
---

We've got vectors, we've got colors; time to add some shapes.

In this module, we'll create:

* A base class called `Shape`. All the objects we use in our scenes will extend `Shape`
  * We've called it `Shape` rather than `Object` so we don't get confused between objects in our 3D scenes and JavaScript objects.

* A class called `Sphere`, representing a sphere.

Create a new file in your project called `modules/shapes.js`, with the following content:

```javascript
// modules/shapes.js

{% include_relative module03/jstracer/modules/shapes.js %}
```

For now, shapes in our world have only one responsibility: we can pass a ray of light into the shape and say "hey, does this ray intersect you anywhere?" -- and if it *does*, what's the distance from the start of the ray to the nearest intersection point?

 
