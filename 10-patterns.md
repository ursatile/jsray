---
title: "10: Patterns"
layout: module
nav_order: 900
summary: >
    Extending materials so we can use patterns like checkerboards and stripes.
typora-root-url: ./
typora-copy-images-to: assets\images
---

Until now, every shape in our world is a single solid color. In this section, we'll see how to create different kinds of materials so we can create objects with patterned finishes, like stripes, rings, and the obligatory checkerboard pattern.

A pattern works by extending `Material` and returning different colors for different points, depending on those points' coordinates.

### Stripes

First, we'll create a striped pattern. Stripes are exactly 1 unit wide, and run parallel to the Z-axis; to create a stripe pattern, we specify two colours. 

```javascript
// modules/patterns/stripes.js

{% include_relative examples/10-patterns/modules/patterns/stripes.js %}
```

To create a striped shape, we pass a `new Stripes` into the `Texture` constructor:

```javascript
var plane = new Plane(
	Vector.Y, 
	0, 
	new Texture(
		new Stripes(Color.Black, Color.White), 
		new Finish({reflection: 0.1, diffuse: 0.7, ambient: 0.1 })
	}
);
```

![image-20220320140656233](assets/images/image-20220320140656233.png)

### Chessboard

The chessboard pattern uses the same principle as stripes, but we need to look at both the `x` and `z` coordinates to decide which color to return.

```javascript
// modules/patterns/chessboard.js

{% include_relative examples/10-patterns/modules/patterns/chessboard.js %}
```

As with `Stripes`, we need to specify two colors when creating a `Chessboard` pattern:

```javascript
var plane = new Plane(
	Vector.Y, 
	0, 
	new Texture(
		new Chessboard(Color.Black, Color.White), 
		new Finish({reflection: 0.1, diffuse: 0.7, ambient: 0.1 })
	}
);
```

![image-20220320141809004](assets/images/image-20220320141809004.png)

### Layers

Layers are flat horizontal layers of colour, like you'd find in a layer cake. 

The `Layers` pattern is a repeating 1-unit pattern that repeats vertically along the Y-axis. Instead of specifying two colors like we did with stripes and chessboards, we're going to specify a **color map** which maps values between `0` and `1` onto a range of colors.

The color map takes a JavaScript hash of keys and color values, and provides a single method `getColorAtValue`, which returns the color for a specific value. Any value outside the range `0 <= value <= 1` will be converted to a valid value before looking up the color.





### Rings

We'll add one more pattern while we're here. `Rings` are concentric rings of colour around the Y-axis - imagine a tree growing straight up the origin; cut across the tree, and you'll see the growth rings? That. Rings are useful for creating textures that look like wood.

To create rings, we need to specific a `

