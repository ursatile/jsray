---
title: "13: Going Further"
layout: module
nav_order: 11300
summary: >
    Topics and features for further explanation
typora-root-url: ./
typora-copy-images-to: assets\images
---

In this workshop, we've gone from an empty HTML page to a ray-tracer that supports highlights, shadows, reflections, procedural patterns, multiple shapes and light sources -- but we've really only scratched the surface of what a full-featured ray-tracer can do.

If you want to extend the code from this workshop, here's some of the features that we didn't have time to implement so far.

### Transparency and Refraction

All the objects in our world so far are **opaque** -- light bounces off them, but can't travel through them.

To implement transparency and refraction, we'd need to:

* Add support for an alpha channel, so we can create transparent colours
  * Some tracers actually support two different kinds of transparency, sometimes known as **filter** and **transmit**. **Filter** is like looking through colored glass; light can pass through, but the color of the object affects the color of the light. **Transmit** means light can pass through the object but won't change color - think about looking through a very fine piece of gauze.
* To support **refraction**, we need to add an **index of refraction** property to an object's `Finish`. Then, when a ray of light hits the object surface, we calculate **two** rays - a reflected ray, and a refracted ray - and recursively trace each of these through the scene.

### Transformations - Translate, Rotate, and Scale

We can't create a box that isn't aligned with the `x/y/z` axes of our scene, because there's no way to rotate a box around an axis.

We can use a 4x4 *transformation matrix* to move, stretch, squash and rotate our shapes around in our scenes; the arithmetic for this gets pretty complicated, but it makes our renderer much more flexible in terms of the scenes that it can render.

### More Procedural Textures

Right at the start of the workshop, we looked at some examples of procedural patterns, like the gradiance and supernova examples.

Using procedural textures, we can simulate all sorts of real and imagined materials and textures. Wood can be simulated as a pattern of concentric rings (think about cutting down a tree, and then cutting and carving shapes from the tree trunk). We can also use different algorithms to produce clouds, and geometric patterns like hexagonal tiles.

### More shapes

So far, we've implemented spheres, boxes, and planes.

You can extend the existing shape system to add cylinders, cones, and truncated cones -- in fact, if you add a truncated cone, created by specifing two endpoints and the major and minor radius, you can create regular cylinders by setting both radii to the same value, and cones by setting the minor radius to zero.

There's plenty of other shapes we could add using geometric formulae - the torus, the tetrahedron, and a whole family of shapes called [hyperquadrics](https://en.wikipedia.org/wiki/Superquadrics) that we can use to model boxes and cylinders with rounded corners.

There's also a data structure called a [triangle mesh](https://en.wikipedia.org/wiki/Triangle_mesh), which we can use to model just about any shape by representing it as a collection of triangles.

### Composite Solid Geometry

Want to make a box with a hole in it? Or glue a cone onto a cylinder to make a 3D arrow shape? Adding support for composite solid geometry - CSG - lets us combine shapes in various ways by creating the **union** of two shapes (which glues them together into one big shape), the **intersection** (which gives us the "overlap" between two shapes in 3D space) or the **difference** (use one shape to punch a hole in another).

### Create a Scene Description Language

Scenes in our renderer currently have to be written as JavaScript functions. We could add a JSON-based format for describing scenes, or even create a completely separate scene description language by using a tool like peg.js to create a parser that supports any syntax we like.

