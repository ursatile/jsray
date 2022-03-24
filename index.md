---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: Introduction
nav_order: 00
---

**Hello!** This is the online handbook for Dylan Beattie's JavaScript ray-tracer workshop.

The handbook includes instructions and code samples for each part of the workshop, for attendees who want to follow along with the live coding exercises and build their own JavaScript ray tracer.

## Contents

<ul id="index-nav">
    {% assign contents = site.pages | where_exp:"item", "item.summary != nil" %}
    {% for page in contents %}
    <li>
        <a href="{{ page.url | relative_url }}">{{ page.title }}</a>
        <p>{{ page.summary }}</p>
    </li>
    {% endfor %}
</ul>

THE 3D VIEWER IS https://3dviewer.net/
