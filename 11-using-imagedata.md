---
title: "11: Using ImageData"
layout: module
nav_order: 900
summary: >
    In this module, we look at how to use advanced data structures to optimise the performance of our web workers.
typora-root-url: ./
typora-copy-images-to: assets\images
---

In the last section, we moved our rendering calculations into a web worker, but this didn't deliver the performance improvements we hoped for -- in fact, it made everything significantly slower.

In this section, we'll meet three new JavaScript features that we can use to speed up our rendering process.

### Clamped Arrays

A clamped array works like a regular array, but will automatically clamp any values that are too big or small to fit in the datatype of each array element.

We're going to use a `Uint8ClampedArray` to transfer blocks of pixel data between our worker and the main browser thread.

>  UInt8 is shorthand here for an unsigned 8 bit integer, which can store any value from `0` through `255` (`0x00` through `0xFF`) -- which, by a happy coincidence, is exactly what we need for each of the red, green, and blue values in our ray-tracer's color model.

### ImageData

`ImageData` is a JavaScript data structure for, well, image data.

We can create a new `ImageData` by passing it a `Uint8ClampedArray` of pixel data, plus a width and height. 

> ImageData is expecting FOUR color channels - red, green, blue, and alpha (used for transparency). We're not using transparency at the moment, so we need to set every fourth element in the array to 255 (fully opaque).
>
> Note that this means the length of the array must be exactly `width * height * 4` - if it's not, the `ImageData()` constructor will throw an exception.

```javascript
const width = 256;
const height = 128; 
let rgbaData = new Uint8ClampedArray(width * height * 4);
rgbaData.fill(0);
let imageData = new ImageData(rgbaData, width, height);
```

### canvas.putImageData

Finally, the `canvas` has a method called `putImageData(data, x, y)`, which is a heavily optimised (i.e. very fast) method for rendering a chunk of pixel data onto a canvas at a specific location.

### Modifying our tracer to use ImageData

We're going to modify our tracer code so that the worker will add pixels to an array buffer, and then when it has a full row of pixel data, it'll send a mesage to the main thread saying "hey, here's a row of pixels for you!" and the main thread will draw that row using `putImageData`.

It's not *quite* as simple as just rendering every row in turn, because we can specify a `step` parameter to speed up renders by rendering blocks of pixels instead of each individual pixel, so we need to account for this: if `step==4`, say, then each callback will draw a `width x 4	` strip of pixels.

Here's the modified code for our `worker.js`:

```javascript
// worker.js

{% include_relative examples/11-clamped-arrays/worker.js %}
```

The `makeCallback` method here is a function that returns another function; when we call `makeCallback`, it allocates the array to stored the pixel data, and this array is then captured by the scope of the inner function and reused over and over again so we're not having to allocate more arrays.

Once we've got a full row of pixels (which happens when `x + step == width`), we create a new `ImageData` using that pixel data, and post a `putImageData` message to the main browser thread. We don't need to clear or reset the array; it'll just get overwritten during the next pass.

Finally, in `main.js`, we need to add a new case to our message handler, so that when we receive a `putImageData` message, we call `ctx.putImageData`.  We can also remove the `fillRect` case and the `paint` method, since these will never be called by our worker:

```javascript
// main.js

{% include_relative examples/11-clamped-arrays/main.js %}
```



https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects



https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#transferring_data_to_and_from_workers_further_details
