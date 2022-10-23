import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

function makeCallback(block, step) {
    let rgbaData = new Uint8ClampedArray(block.width * 4 * step);
    function callback(x, y, width, height, color) {
        let rgba = new Array(block.width).fill(color.rgba).flat();
        for (let row = 0; row < height; row++) rgbaData.set(rgba, ((row * width) + x) * 4);
        if (x + width == width) {
            let imageData = new ImageData(rgbaData, width, height);
            let data = { what: 'putImageData', imageData: imageData, x: block.x, y: y };
            self.postMessage(data);
        }
    }
    return callback;
}

self.addEventListener('message', function (message) {
    let data = message.data;
    switch (data.command) {
        case 'start':
            let renderer = new Renderer(data.canvas.width, data.canvas.height);
            let scene = ExampleScenes.ReflectingShapes();
            let callback = makeCallback(data.render.width, data.step);
            renderer.trace(scene, callback, data.step, 0, 0, 100, 100);
            self.close();
            self.postMessage({ what: 'finished' });
            break;
    }
});
