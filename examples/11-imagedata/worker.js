import { Renderer } from './modules/renderer.js';
import * as ExampleScenes from './scenes/examples.js';

function makeCallback(blockWidth, blockX) {
    let rgbaData = new Uint8ClampedArray(blockWidth * 4);
    function callback(x, y, width, height, color) {
        rgbaData.set(color.rgba, (x - blockX) * 4);
        if (x + width == (blockWidth + blockX)) {
            let imageData = new ImageData(rgbaData, blockWidth, 1);
            let data = { what: 'putImageData', x: blockX, y: y, imageData: imageData };
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
            let scene = ExampleScenes.AssortedShapes();
            let callback = makeCallback(data.block.width, data.block.x);
            renderer.render(scene, callback, data.step, data.block);
            self.close();
            self.postMessage({ what: 'finished' });
            break;
    }
});
