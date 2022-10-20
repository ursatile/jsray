import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

function callback(x, y, width, height, color) {
    let data = { x: x, y: y, width: width, height: height, r: color.r, g: color.g, b: color.b };
    self.postMessage({ what: 'fillRect', ...data });
}

self.addEventListener('message', function (message) {
    let data = message.data;
    switch (data.command) {
        case 'start':
            let renderer = new Renderer(data.width, data.height);
            let scene = ExampleScenes.ReflectingShapes();
            renderer.trace(scene, callback, data.step);
            self.close();
            self.postMessage({ what: 'finished' });
            break;
    }
});
