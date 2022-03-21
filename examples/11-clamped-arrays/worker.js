import { Tracer } from './modules/tracer.js';
import * as ExampleScenes from './scenes/examples.js';

function callback(x, y, width, height, imageData, step) {
    self.postMessage({ what: 'renderedBlock', x: x, y: y, width: width, height: height, imageData: imageData, step: step });
}

self.addEventListener('message', function (message) {
    let data = message.data;
    switch (data.command) {
        case 'start':
            let tracer = new Tracer(data.width, data.height);
            let scene = ExampleScenes.ReflectingShapes();
            tracer.trace(scene, callback, data.step);
            self.close();
            self.postMessage({ what: 'renderComplete' });
            this.self.close();
            break;
    }
});
