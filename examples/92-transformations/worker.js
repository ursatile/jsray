import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

function makeCallback(width, step) {
    let rgbaData = new Uint8ClampedArray(width * 4 * step);
    return function (x, y, pixelColor, step) {
        let rgba = new Array(step).fill(pixelColor.rgba).flat();
        for (let row = 0; row < step; row++) rgbaData.set(rgba, ((row * width) + x) * 4);
        if (x + step == width) {
            let imageData = new ImageData(rgbaData, width, step);
            let data = { what: 'putImageData', x: 0, y: y, imageData: imageData };
            self.postMessage(data);
        }
    }
}

self.addEventListener('message', function (message) {
    let data = message.data;
    switch (data.command) {
        case 'start':
            let renderer = new Renderer(data.width, data.height);
            let scene = ExampleScenes.TransformedShapes();
            let callback = makeCallback(data.width, data.step);
            renderer.trace(scene, callback, data.step);
            self.close();
            self.postMessage({ what: 'finished' });
            break;
    }
});
