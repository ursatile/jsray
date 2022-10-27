---
title: "12: Multiple Workers"
layout: module
nav_order: 11200
summary: >
    In this module, we dramatically speed up our tracer by creating multiple workers, runing each worker on a different CPU core, and combining the results into a single image.
typora-root-url: ./
typora-copy-images-to: assets\images
example: 12-multiple-workers
---

In the last section, we looked at using the `ImageData` and the `Uint8ClampedArray` types to reduce the overhead of passing messages between our background workers and our frontend web application.

### Multiple Workers

We can improve the performance of our ray tracer even further by dividing our image into sections, creating a dedicated worker for each section of the image, and then allowing the browser to run those workers across multiple CPU cores.

First, we need to modify our renderer, so that we can render a specific subset of our full image. We'll pass  a new `block` parameter into the `render()` method, and modify the renderer so that it will only render the pixels within that block:

```javascript
// modules/renderer.js

{% include_relative examples/12-multiple-workers/modules/renderer.js %}
```

