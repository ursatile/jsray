---
title: "7: Shadows"
layout: module
nav_order: 600
summary: >
    Adding support for shadows
typora-root-url: ./
typora-copy-images-to: assets\images
---

At the end of the last section, our scene looked like this:

![image-20220320011118565](assets/images/image-20220320011118565.png)

We're going to add support for shadows, so that shapes will cast shadows, and areas that are in shadow won't be illuminated by the associated light source.

All this happens inside the `Shape` class - in fact, we only need to modify the `getColorAt` method. 

Here's `shape.js` with the modified method in place:

```javascript
// modules/shape.js

{% include_relative examples/07-shadows/modules/shape.js %}
```

What we do here is, for each point on the shape's surface, we trace a ray from that point to the light source, and check whether that ray intersects any other shapes along the way. If it does, then we're in that shape's shadow, and so we should skip that light source when calculating how much light falls on this shape.

Compare the result below with the original image above:

![image-20220320012307359](assets/images/image-20220320012307359.png)





