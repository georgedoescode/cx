import {
    createCanvasElement,
    setCanvasPxDensity,
    mountCanvasToDOM,
} from './dom-utils';

import { createCustomContext } from './ctx-utils';

const DEFAULTS = {
    width: 640,
    height: 480,
    mount: document.body,
};

export function createCanvas(opts) {
    const options = Object.assign(DEFAULTS, opts);

    const element = createCanvasElement(options.width, options.height);
    const context = createCustomContext(element.getContext('2d'));

    mountCanvasToDOM(element, options.mount);
    setCanvasPxDensity(element, window.devicePixelRatio || 1);

    return {
        element,
        context,
        setPXDensity(density) {
            setCanvasPxDensity(element, density);
        },
    };
}
