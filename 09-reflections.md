---
title: "9: Reflections"
layout: module
nav_order: 900
summary: >
    Adding reflections so we can model mirrors and reflective surfaces
typora-root-url: ./
typora-copy-images-to: assets\images
---

We're closing in on the classic ray-tracer demo image - a mirrored sphere resting on a chessboard. There's only two things missing... we can't do mirrors, and we can't do chessboards. 

Let's start with mirrors. We're going to add another property to our `Finish` class, which controls how reflective a shape is. A finish with `reflection==1` is a perfect mirror; a finish with `reflection == 0` doesn't reflect at all.

```javascript
// modules/finish.js

{% include_relative examples/09-reflections/modules/finish.js %}
```



