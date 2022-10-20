import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

function makeCallback(canvasWidth, step) {
    let rgbaData = new Uint8ClampedArray(canvasWidth * 4 * step);
    function callback(x, y, width, height, color) {
        let rgba = new Array(width).fill(color.rgba).flat();
        for (let row = 0; row < height; row++) rgbaData.set(rgba, ((row * canvasWidth) + x) * 4);
        if (x + width == canvasWidth) {
            let imageData = new ImageData(rgbaData, canvasWidth, height);
            let data = { what: 'putImageData', x: 0, y: y, imageData: imageData };
            self.postMessage(data);
        }
    }
    return callback;
}

self.addEventListener('message', function (message) {
    let data = message.data;
    switch (data.command) {
        case 'start':
            let renderer = new Renderer(data.width, data.height);
            let scene = ExampleScenes.ReflectingShapes();
            let callback = makeCallback(data.width, data.step);
            renderer.trace(scene, callback, data.step);
            self.close();
            self.postMessage({ what: 'finished' });
            break;
    }
});
