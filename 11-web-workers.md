---
title: "11: Web Workers"
layout: module
nav_order: 900
summary: >
    In this module, we move all our rendering into a background worker process so that our browser doesn't become unresponsive while a scene is rendering.
typora-root-url: ./
typora-copy-images-to: assets\images
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

Try it out here: [simple-worker.html](examples/11-web-workers/simple-worker/index.html)

```javascript
// main.js



// worker.js


```





