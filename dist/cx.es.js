function createCanvasElement(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function setCanvasPxDensity(canvas, density = 1) {
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

function createCustomContext(context) {
  const customCtx = {
    base: context
  };

  for (const prop in context) {
    Object.defineProperty(customCtx, prop, {
      get() {
        return typeof customCtx.base[prop] === 'function' ? customCtx.base[prop].bind(context) : customCtx.base[prop];
      },

      set(value) {
        customCtx.base[prop] = value;
      }

    });
  }

  customCtx.registerCustomMethod = function (key, value) {
    customCtx[key] = function () {
      return value(customCtx.base, ...arguments);
    };
  };

  return customCtx;
}

const DEFAULTS = {
  width: 640,
  height: 480,
  mount: document.body
};
function createCanvas(opts) {
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
    }

  };
}

export { createCanvas };
