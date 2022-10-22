---
title: '2.2: Working with Colors'
layout: module
nav_order: 10202
summary: >
  Introducing the HTML canvas element and the browser APIs we can use to work with it.
typora-root-url: ./
typora-copy-images-to: assets\images
example: 02-canvas
---

In the last module, we used the HTML canvas element to draw a Piet Mondrian canvas. Drawing individual rectangles by hand is kinda cool, but things don't get really exciting until we start using JS code to calculate the colors of the pixels we're drawing. 

We're going to introduce a few concepts here.

### Colors

Colors in Radiance are based on the HTML RGB color model: a color has red, green, and blue values, which range from 0 through 255. (You'll sometimes see 255 sometimes written as `0xff`, for consistency with the HTML hex color model.)

Create a new file in your project called `modules/color.js`, with the following content:

```javascript
// modules/color.js

{% include_relative examples/02-canvas/modules/color.js %}
```

### Constructing new colors

We want to be able to create colors by providing either numeric RGB values or on HTML color strings.

Many object-oriented languages, like Java and C#, support something called **method overloading**, which lets us define multiple methods with the same name but with different arguments, and because we can use method overloading on constructors we could write something like this:

```csharp
public Color(string htmlString) {
	/* create a color from an HTML string */
}

public Color(int red, int green, int blue) {
    /* create a color from the specified RGB values */
}
```

Because JavaScript is a dynamically typed languages, it doesn't support this kind of strict method overloading -- so instead, we're going to define two different methods.

The constructor for our `Color` class takes three r, g, b values:

```javascript
constructor(r, g, b) {
    this.#r = r;
    this.#g = g;
    this.#b = b;
}
```

To construct a color based on an HTML color string like `#ff9900` or `rgb(50,20,0)`, call the `Color.parse` static method:

```javascript
var red = Color.parse("#F00");
var green = Color.parse("rgb(0,255,0)");
```

The `Color` class also defines a set of predefined colors we can use in our scenes:

```javascript
static Black = new Color(0, 0, 0);
static White = new Color(255, 255, 255);
static Grey = new Color(127, 127, 127);    
static Red = new Color(255,0,0);
static Green = new Color(0,255,0);
static Blue = new Color(0,0,255);
static Yellow = new Color(255,255,0);
static Magenta = new Color(255,0,255);
static Cyan = new Color(0,255,255);
```

Finally, we define three methods for doing color arithmetic.

**Adding** two colours together always makes colours brighter - think of shining a red light and a green light onto the same white wall; the red will combine with the green and the wall will appear yellow. Your computer screen is actually made of red, green and blue pixels, so where you see anything on your screen that's white, that's creating by adding red, green, and blue.

**Scaling** a colour makes it lighter or darker. Scaling by 2 makes a colour twice as bright; scaling by 0.5 makes it half as bright.

**Multiplying** colours will multiply each channel separately, and we use this to simulate how light interacts with coloured surfaces. If you've ever stood under a yellow sodium lamp wearing a blue shirt, you might have noticed your shirt looks black: blue fabric appears blue because it absorbs yellow light and reflects blue light, but if the only light falling on it is yellow, there's no light to reflect and it looks black.

In colour arithmetic, it might help to think of white as 1 and black as 0:

```
red × white = red
red × black = black 
red + black = red
red + white = white
```

## Review & Recap

- Radiance uses the HTML color model; colors have a red, green, and blue value, each from 0 to 255.

One of the simplest procedural patterns is a chessboard pattern.

Here's the `getColorAtPixel` function for drawing a chessboard pattern. Based on the tile size, we work out whether this pixel is in an odd-numbered or an even-numbered row and column:

```javascript
(x, y) => {
    const xOdd = (x % (2 * size) < size);
    const yOdd = (y % (2 * size) < size);
    return (xOdd != yOdd ? color1 : color2);
}
```

![](/assets/images/chessboard.png)

**Try it live: [examples/02-canvas/index.html#chessboard](examples/02-canvas/index.html#chessboard)**

We can also calculate individual red, green, and blue pixel values based on the x/y coordinates passed into the function.

```javascript
(x, y) => {
  let r = (4 * x) % 256
  let g = (x + y) % 256
  let b = y % 256
  return `rgb(${r},${b},${g})`
}
```

You should get an image something like this:

![image-20220318175251133](assets/images/image-20220318175251133.png)

**Try it live: [examples/02-canvas/index.html#gradiance](examples/02-canvas/index.html#gradiance)**

## Exercise: Procedural Patterns

Download the code for this section from [examples/02-canvas.zip](examples/02-canvas.zip)

Add a new pattern to `modules/patterns.js`:

1. Add a new `export function MyPattern` to `modules/patterns.js`, 

2. Come up with a new method for translating the `x,y` coordinates into `r,g,b` color values - there's some suggestions below

3. Add a new `case` to the `switch` statement in `main.js`:

   `case "#mypattern": Patterns.MyPattern(myCanvas); break;`

4. View your pattern by going to `index.html#mypattern`

Here's a couple of fun things to try:

- The modulus operator in JavaScript is `%`, so an expression like `x % 256` will always give you a value between 0 and 255 - useful for constructing valid RGB colors where each of the red, green, and blue values has be between 0 and 255.
- You can also write `256` as `0xff`, which might look more natural if you're used to HTML hex color values.
- `Math.abs(x)` will give you the absolute value (i.e. always positive) of `x`
- The trigonometry functions `Math.sin(x)` and `Math.cos(x)` will give you a value between -1 and +1; try multiplying this by the `x` or `y` values

Here's a few more examples:

### Supernova

Try it live: [examples/02-canvas/index.html#supernova](examples/02-canvas/index.html#supernova)

```javascript
(x, y) => {
  let r = (x * (1 + Math.sin(y / 100))) % 255 // 4*x % 255;
  let g = Math.abs(20 * Math.tan(y)) % 255
  let b = (y * (1 + Math.cos(x / 2))) % 255 // (x+y) % 255;
  return `rgb(${r},${g},${b})`
}
```

![image-20220318180643036](assets/images/image-20220318180643036.png)

### Lasers

Try it live: [examples/02-canvas/index.html#lasers](examples/02-canvas/index.html#lasers)

```javascript
(x, y) => {
  let r = 255 * Math.sin(200 - x / 20) + 255 * Math.cos(150 - y / 20)
  let g = 255 * Math.sin(200 - x / 20)
  let b = 255 * Math.cos(150 - y / 20)
  return `rgb(${r},${g},${b})`
}
```

![image-20220318181305507](assets/images/image-20220318181305507.png)

## The HTML Canvas: Review & Recap

- The `canvas` element and API give us a way to draw graphics using JavaScript
- To draw graphics, we need to get a **graphics context** for our canvas element.
- We control the color we're drawing by setting the context's`fillStyle` to an HTML color value.
- We can draw individual pixels by using the `fillRect` method and specifying a width and height of ` pixel.

## References and Further Reading

* The Canvas API: [https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* HTML Colors reference at w3schools: [https://www.w3schools.com/html/html_colors.asp](https://www.w3schools.com/html/html_colors.asp)
