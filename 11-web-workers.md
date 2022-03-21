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
