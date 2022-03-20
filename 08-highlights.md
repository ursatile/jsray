---
title: "8: Specular Highlights"
layout: module
nav_order: 800
summary: >
    Adding support for specular highlights. That's the technical term for "shiny spots".
typora-root-url: ./
typora-copy-images-to: assets\images
---

Time to introduce some more terminology. The color of a shape in our tracer scene is actually controlled by a bunch of different parameters

* **ambient** color is how much of the shape's underlying color is visible, even when it isn't directly illuminated. Ambient lighting is a bit of a hack; in the real world, especially in daylight, there's so much reflected sunlight and artificial light bouncing around that we can see what color objects are even if they're not being directly illuminated. Calculating those kinds of lighting effects in a tracer is prohibitively difficult, though, so if we need it, we fake it by adding a bit of ambient color to the object's appearance.
* **diffuse** color is how strongly the shape reacts to direct light sources.
* **specular** highlights are the bright shiny spots we get when a light source reflects in the surface of a smooth curved object.

To use these optical properties in our scenes, we need to add a new property to our shapes. Until now, everything in our world has been a solid color; now we're going to introduce the idea of a texture.

A texture has two parts:

* the **material** -- what's the object actually made of? 
* the **finish** -- how shiny is it? Does it have highlights?

We're going to introduce two new classes here, `texture.js` and `finish.js`:

```javascript
// modules/texture.js

{% include_relative examples/08-highlights/modules/texture.js %}
```

```javascript
//modules/finish.js

{% include_relative examples/08-highlights/modules/finish.js %}
```



