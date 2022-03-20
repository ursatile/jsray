---
layout: null
---

<!DOCTYPE html>
<html>
<head>
    <style>
        html {
            margin: 0;
            padding: 0;
            text-align: center;
        }

        div {
            margin: 0;
            border: 0;
            padding: 0;
            box-sizing: border-box;
            width: 50%;
            height: 400px;
            display: inline-block;
        }

        div iframe {
            width: 100%;
            height: 350px;
        }
    </style>

</head>

<body>
    {% assign examples = "01-hello-world,02-canvas,03-tracer,04-shapes,05-lights,06-more-shapes,07-shadows,08-highlights" | split: "," %}
    {% for example in examples %}
    <div>
        <iframe src="examples/{{ example }}/index.html"></iframe>
        <a href="examples/{{ example }}/index.html">{{ example }}</a>
    </div>
    {% endfor %}
</body>
</html>
