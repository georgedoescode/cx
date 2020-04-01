function createCanvasElement(width, height) {
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    return canvas;
}

function setCanvasPxDensity(canvas, density) {
    const canvasRect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    canvas.width = canvasRect.width * density;
    canvas.height = canvasRect.height * density;

    canvas.style.width = canvasRect.width + 'px';
    canvas.style.height = canvasRect.height + 'px';

    ctx.scale(density, density);
}

function mountCanvasToDOM(canvas, mount) {
    mount.appendChild(canvas);
}

export { createCanvasElement, setCanvasPxDensity, mountCanvasToDOM };
