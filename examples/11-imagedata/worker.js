import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

function makeCallback(width, rowsPerCallback = 1) {    
    let rgbaData = new Uint8ClampedArray(width * 4 * rowsPerCallback);
    let yOffset = 0;
    function callback(x, y, color) {
        let offset = ((y % rowsPerCallback) * width + x) * 4; // each rgba takes four array elements
        rgbaData.set(color.rgba, offset);
        if (offset + 4 == rgbaData.length) {
            let imageData = new ImageData(rgbaData, width, rowsPerCallback);
            let data = { command: 'putImageData', x: 0, y: yOffset, imageData: imageData };
            self.postMessage(data);
            yOffset += rowsPerCallback;
        }
    }
    return callback;
}


self.addEventListener('message', function (message) {
    let data = message.data;
    switch (data.command) {
        case 'render':
            let renderer = new Renderer(data.width, data.height);
            let scene = ExampleScenes.AssortedShapes();
            let callback = makeCallback(data.width, 20);
            renderer.render(scene, callback);
            self.close();
            self.postMessage({ command: 'finished' });
            break;
    }
});
