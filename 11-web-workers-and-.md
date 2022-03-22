---
title: "11: Web Workers Continued"
layout: module
nav_order: 900
summary: >
    In this module, we look at how to use advanced data structures to optimise the performance of our web workers.
typora-root-url: ./
typora-copy-images-to: assets\images
---

In the last section, we moved our rendering calculations into a web worker, but this didn't deliver the performance improvements we hoped for -- in fact, it made everything significantly slower.

In this section, we'll use a special JavaScript data type called a **clamped array** to speed up our rendering process.

A clamped array works like a regular array, but will automatically clamp any values that are too big or small to fit in the datatype of each array element.

We're going to use a `Uint8ClampedArray` to transfer blocks of pixel data between our worker and the main browser thread.

UInt8 is shorthand here for an unsigned 8 bit integer, which can store any value from `0` through `255` (`0x00` through `0xFF`) -- which, by a happy coincidence, is exactly what we need for each of the red, green, and blue values in our ray-tracer's color model.

We'll also need to modify the callback code between our worker and our browser, so that instead of running a callback for every single pixel, we run fewer callbacks but transfer a lot more pixel data in each callback; this cuts down the amount of time we spend packing and unpacking messages.









https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects



https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#transferring_data_to_and_from_workers_further_details
