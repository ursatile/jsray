import { Tracer } from './modules/tracer.js';
import * as ExampleScenes from './scenes/examples.js';

const ROW_SIZE = 20;
function makeCallback(width, step) {
    let rgbaData = new Uint8ClampedArray(width * 4 * step * ROW_SIZE);
    return function (x, y, pixelColor, step) {
        let rgba = new Array(step).fill(pixelColor.rgba).flat();
        for (var row = 0; row < step; row++) {
            let index = (((y % ROW_SIZE + row) * width) + x) * 4;
            rgbaData.set(rgba, index);
        }
        if (x + step == width && (y + step) % ROW_SIZE == 0) {
            self.postMessage({
                what: 'renderedBlock',
                x: 0,
                y: (y + step) - ROW_SIZE - 1,
                imageData: new ImageData(rgbaData, width, ROW_SIZE * step)
            });
        }
    }
}

self.addEventListener('message', function (message) {
    let data = message.data;
    switch (data.command) {
        case 'start':
            let tracer = new Tracer(data.width, data.height);
            let scene = ExampleScenes.ReflectingShapes();
            let callback = makeCallback(data.width, data.step);
            tracer.trace(scene, callback, data.step);
            self.close();
            self.postMessage({ what: 'renderComplete' });
            this.self.close();
            break;
    }
});
