---
title: '2.1: The HTML Canvas API'
layout: module
nav_order: 10200
summary: >
  Introducing the HTML canvas element and the browser APIs we can use to work with it.
typora-root-url: ./
typora-copy-images-to: assets\images
example: 02-canvas
---

Back in the early days of the web, you'd occasionally see sites that created images using thousands of 1x1-pixel `div` or `span` elements, with each element assigned a different `background-color` to simulate individual pixels.

Fortunately, modern browsers support an HTML element called `canvas`, standardized in 2006, which gives us a much finer degree of control when it comes to drawing lines, shapes and images in browser-based web applications. In this module, we'll add a `canvas` element to our application, along with some simple JavaScript code that'll demonstrate how to render graphics onto our canvas.

Open `index.html` and update the `body` element so it looks like this:

```html
<body>
  <canvas id="my-canvas" width="400" height="300"></canvas>
  <script type="module" src="./main.js"></script>
</body>
```

Next, add a CSS rule to `style.css` that sets the canvas' background color to black:

```css
canvas {
  background-color: #000;
}
```

You should now see a blank page with an empty black canvas on it:

![image-20220318172105969](assets/images/image-20220318172105969.png)

## Drawing graphics onto a canvas

Now we're going to add some JavaScript code to demonstrate how to draw graphics onto the canvas.

Open `main.js`, delete the existing code, and replace it with this:

```javascript
let myCanvas = document.getElementById('my-canvas')
let ctx = myCanvas.getContext('2d');
ctx.fillStyle = '#C14634';
ctx.fillRect(40, 40, 170, 210);
```

If you're using vite, the page will reload automatically. If you're using Spark, you'll need to refresh your browser. You should see this:

![image-20220324104859424](./assets/images/image-20220324104859424.png)

To draw more complex shapes, we can just call `fillRect` over and over again:

```javascript
let myCanvas = document.getElementById('my-canvas')
let ctx = myCanvas.getContext('2d');
ctx.fillStyle = 'rgb(3,4,5)';
ctx.fillRect(0, 0, 400, 300);
ctx.fillStyle = '#dfd9dc';
ctx.fillRect(0, 0, 100, 30);
ctx.fillRect(110, 0, 100, 30);
ctx.fillRect(0, 40, 30, 100);
ctx.fillRect(0, 150, 30, 100);
ctx.fillRect(220, 150, 50, 100);
ctx.fillRect(100, 260, 110, 100);
ctx.fillRect(220, 260, 110, 100);
ctx.fillRect(340, 0, 60, 140);
ctx.fillStyle = '#C14634';
ctx.fillRect(40, 40, 170, 210);
ctx.fillRect(340, 260, 170, 210);
ctx.fillStyle = '#E2C158';
ctx.fillRect(220, 0, 110, 30);
ctx.fillRect(220, 40, 110, 100);
ctx.fillStyle = '#224170';
ctx.fillRect(0, 260, 90, 40);
ctx.fillRect(280, 150, 120, 100);
```

![HTML Canvas image inspired by Piet Mondrian](./assets/images/image-20220318173430750.png)

**Try it live: [examples/02-canvas/mondrian.html](examples/02-canvas/mondrian.html)**

There we go... we're using JavaScript and the `<canvas>` element to create digital artworks inspired by [Piet Mondrian](https://en.wikipedia.org/wiki/Piet_Mondrian). Not bad.

In this example, we've introduced four new concepts:

1. We get a reference to the canvas using `document.getElementById` and specifying the `id` of our `canvas` element
2. We create a **graphics context** by calling `myCanvas.getContext('2d')`. The `'2d'` here specifies we're using a 2-dimensional canvas; some browsers now support built-in 3D graphics using the WebGL API, but in this workshop we'll be rendering 3D graphics onto a 2D canvas.
3. We're setting the context's **fill style** by specifying a color. Canvas graphics support all HTML color formats, including hex digits (`#123abc`), RGB values `rgb(0,127,255)`, and alpha transparency `rgba(63,127,255,0.5)`.
4. We're calling `ctx.fillRect(top, left, width, height)` to draw a filled rectangle using the current fill style.

## The HTML Canvas: Review & Recap

- The `canvas` element and API give us a way to draw graphics using JavaScript
- To draw graphics, we need to get a **graphics context** for our canvas element.
- We control the color we're drawing by setting the context's`fillStyle` to an HTML color value.
- We can draw individual pixels by using the `fillRect` method and specifying a width and height of ` pixel.

## References and Further Reading

* The Canvas API: [https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* HTML Colors reference at w3schools: [https://www.w3schools.com/html/html_colors.asp](https://www.w3schools.com/html/html_colors.asp)
