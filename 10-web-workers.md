---
title: "11: Web Workers"
layout: module
nav_order: 11000
summary: >
    In this module, we move all our rendering into a background worker process so that our browser doesn't become unresponsive while a scene is rendering.
typora-root-url: ./
typora-copy-images-to: assets\images
example: 10-web-workers
---

As our tracer gets more powerful, scenes will take more time to render -- but because we're hosting our tracer inside a web browser, which only has a single processing thread, this means our browser becomes unresponsive while a scene is rendering. It also means we have no way to stop a render once it's started.

In this section, we're going to use a technology called **web workers** to move our rendering into a background thread.

### Browser support for worker modules

Because our tracer code uses JavaScript modules, adding web workers requires a browser that supports **worker modules** - and as of March 2022, worker modules *do not work in Mozilla Firefox.*

![image-20220321141006404](./assets/images/image-20220321141006404.png)

* [Bugzilla issue 1247687](https://bugzilla.mozilla.org/show_bug.cgi?id=1247687) - worker module support in Firefox
* CanIUse.com [Worker API support for ECMAScript modules](https://caniuse.com/mdn-api_worker_worker_ecmascript_modules)

If you need to install a browser with support for worker modules, these examples have all been tested on:

* [Google Chrome](https://www.google.com/chrome/) 

* [Microsoft Edge](https://www.microsoft.com/en-us/edge) 

* [Vivaldi](https://vivaldi.com/)

* [Brave](https://brave.com/)

Safari on macOS (and on iOS, if you want to run a ray-tracer on your iPhone!) has supported worker modules since version 15 (September 2021).

### A simple worker module

Take a look at [simple-worker.html](examples/11-web-workers/simple-worker/index.html) for a very simple example of a web worker using ES modules, and how to use `postMessage` and event listeners to communicate between the main browser thread and we workers.

### Running a ray tracer as a worker module

To run our ray tracer in a worker module, we need to handle three things:

1. Telling the worker when to start (and what settings to use)
2. Updating the `canvas` when the worker has rendered an element
3. Stopping the worker if we want to cancel the render

There are a few constraints that make life interesting, though...

* Web workers can't manipulate the DOM - they can't see (or modify) any HTML elements, which means they can't write to the `canvas` element.
* The only way to communicate between the browser and the worker is using the `postMessage` API, and we can only send limited kinds of data via this API
  * Strings, numbers, booleans, and simple JavaScript objects are OK
  * We can't pass classes (or class instances), or references to any DOM elements.

So, here's how we're going to structure our code.

We'll create a new module called `worker.js`. This will create and start the actual trace, and will use `postMessage` to send messages back to the main thread every time a pixel is rendered:

```javascript
// worker.js

{% include_relative examples/10-web-workers/worker.js %}
```

Next, we'll modify `main.js` to create a new web worker based on `worker.js`, and start and stop it as required:

 ```javascript
 // main.js
 
 {% include_relative examples/10-web-workers/main.js %}
 ```

Now, reload the page; you should see something like this:

<video src="assets/videos/progressive-rendering-example.mp4" style="width: 640px; height: 480px;" />

The good news is that it's definitely rendering on a background thread, and we can cancel the render without having to shut down our browser. The bad new is that our render time has gone from 0.8 seconds to nearly 30 seconds... which is *terrible*! This was supposed to be a performance optimisation, right?

But take a look in the browser's console log:

```
Render completed in 0.734 seconds
```

That message is coming from the `Tracer` itself... so what's going on?

The answer is: we're using the web worker API in a *really* inefficient way. 

The tracer is taking 0.7 seconds to rip through the entire scene and render every pixel... and for every one of those pixels, it's posting a message to the foreground thread saying "hey, I just rendered pixel (3,4) - it's red!"

Internally, the browser pushes all those message into a queue, and then processes them as fast as it can.  So after 0.7 seconds, our tracer has rendered the entire scene, and pushed a few hundred thousand messages onto the queue -- one for every rendered pixel. The delay isn't the renderer itself; we're waiting for the browser to dequeue, unpack, and render several hundred thousand messages.

In the next module, we'll look at a much more efficient way to pass rendered data from the worker back to the main browser thread.









