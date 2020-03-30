function createCustomContext(context) {
    const customCtx = {
        base: context,
    };

    for (const prop in context) {
        Object.defineProperty(customCtx, prop, {
            get() {
                return typeof customCtx.base[prop] === 'function'
                    ? customCtx.base[prop].bind(context)
                    : customCtx.base[prop];
            },
            set(value) {
                customCtx.base[prop] = value;
            },
        });
    }

    customCtx.registerCustomMethod = function(key, value) {
        customCtx[key] = function() {
            return value(customCtx.base, ...arguments);
        };
    };

    return customCtx;
}

export { createCustomContext };
