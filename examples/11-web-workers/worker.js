import { Tracer } from './modules/tracer.js';
import * as ExampleScenes from './scenes/examples.js';

function callback(x, y, color, step) {
    self.postMessage({ what: 'renderedPixel', x: x, y: y, r: color.r, g: color.g, b: color.b, step: step });
}

self.addEventListener('message', function (message) {
    let data = message.data;
    switch (data.command) {
        case 'start':
            callback(10, 10, { r: 255, g: 127, b: 0 }, 100);
            // let tracer = new Tracer(data.width, data.height);
            // let scene = ExampleScenes.ReflectingShapes();
            // tracer.trace(scene, callback, data.step);
            // self.close();
            // self.postMessage({ what: 'renderComplete' });
            break;
    }
});
