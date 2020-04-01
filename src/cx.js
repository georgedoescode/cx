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
    dpr: window.devicePixelRatio,
};

export function createCanvas(opts) {
    const options = Object.assign(DEFAULTS, opts);

    const canvasEl = createCanvasElement(options.width, options.height);
    const ctx = createCustomContext(canvasEl.getContext('2d'));

    mountCanvasToDOM(canvasEl, options.mount);
    setCanvasPxDensity(canvasEl, options.dpr);

    return {
        ctx,
        element: {
            el: canvasEl,
            setPXDensity(density) {
                setCanvasPxDensity(canvasEl, density);
            },
        },
    };
}
