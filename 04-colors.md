---
title: "1.4: Colors"
layout: module
nav_order: 4
summary: >
    In this section, we'll create a Color class in JavaScript, and set up the color model we'll use to simulate objects, light and shade in our scene.
typora-root-url: ./
typora-copy-images-to: assets\images
---

In the last module, we added **vectors** to our project. Vectors are incredibly useful -- we can use them to model locations in 3D space, coordinates, rays of light, all kinds of things we're going to need. But to actually see anything, we need to put some objects in our world, and we need so simulate the material those objects are made from.

In this module, we'll create:

* A base class called `Material`. All the shapes in our world are made out of materials; the material controls how light interacts with that shape.
* A class called `Color`, representing a solid color.
  * `Color` will be used in the next module as well, when we start modelling the way rays of light bounce around our scene and interact with shapes and light sources.

### Materials and Colors

Create a new file in your project called `modules/material.js`, with the following content:

```javascript
// modules/material.js

{% include_relative jstracer-part01/jstracer/modules/material.js %}
```

Material defines a single method called `getColorAt` - we give it a point somewhere in our scene, and it'll tell us what colour the material at that point is.

JSTracer uses the same color model as HTML; red, green, and blue values range from 0 through 255. (You'll sometimes see 255 sometimes written as `0xff`, for consistency with the HTML hex color model.)

#### Constructing new colors

We want to be create colors by providing either numeric RGB values or on HTML color strings. 

Many object-oriented languages, like Java and C#, support something called **method overloading**, which lets us define multiple methods with the same name but with different arguments, and because we can use method overloading on constructors we could write something like this:

```csharp
public Color(string htmlString) { 
	/* create a color from an HTML string */
}

public Color(int red, int green, int blue) {
    /* create a color from the specified RGB values */
}
```

Because JavaScript is a dynamically typed languages, it doesn't support this kind of strict method overloading -- but we can get the same effect using a bit of JS trickery.

The constructor for our `Color` class looks like this:

```javascript
constructor(r, g, b) {
    super();
    if (g == undefined) {
        [this.r, this.g, this.b] = this.parseHtmlColor(r);
    } else {
        [this.r, this.g, this.b] = [r, g, b];
    }
}
```

if we call that constructor with three values:

`let hotPink = new Color(255,50,250);`

it'll assign individual RGB values. But if we only provide a single value to the constructor:

`let neonGreen = new Color("#20ff30");`

the value of `g` will be `undefined`, and so the constructor will pass the value of `r` (which is a string in this example) to the `parseHtmlColor` function.

## Review & Recap

* JSTracer uses the HTML color model; colors have a red, green, and blue value, each from 0 to 255.
* We've defined a base class, `Material` for all the materials used in our 3D scene
* We've created a single kind of material, `Color`, for objects which are a solid color

## References and Further Reading

