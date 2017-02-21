[jQuery Simple Magnifier Plugin ES5 & ES6 0.1](https://github.com/alexey62soft)
================================

by Rakitski Aleksei (alexey62soft)
license: Opensource

## Getting Started

Include jQuery and the plugin on a page. Include your images and initialise the plugin.

```html
<div id="magnify" style="width: 600px;"></div>

<script>
    $('.magnify').simpleMagnifier({
        url: 'images/image.jpg'
    });
</script>
```

## Plugin options

url - path of the image (required, default: false);

duration - magnifier ring animation time in ms (not required, default: 100);

magnifierWidth - width of magnifier ring (not required, default: '150px');

magnifierColor - color of magnifier ring (not required, default: '#fff');

## Html options (CSS)

width - width of the picture on the site (not required, default: 80% at client width);

## License
This opensource plugin for jQuery.
By Rakitski Aleksei.
Belarus, 2017.