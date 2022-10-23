import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

function callback(x, y, color) {
    let data = { x: x, y: y, r: color.r, g: color.g, b: color.b };
    self.postMessage({ command: 'fillRect', ...data });
}

self.addEventListener('message', function (message) {
    let data = message.data;
    switch (data.command) {
        case 'render':
            let renderer = new Renderer(data.width, data.height);
            let scene = ExampleScenes.AssortedShapes();
            renderer.render(scene, callback);
            self.close();
            self.postMessage({ what: 'finished' });
            break;
    }
});
