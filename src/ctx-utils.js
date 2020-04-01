function createCustomContext(context) {
    const customCtx = {
        _base: context,
    };

    for (const prop in context) {
        Object.defineProperty(customCtx, prop, {
            get() {
                return typeof customCtx._base[prop] === 'function'
                    ? customCtx._base[prop].bind(context)
                    : customCtx._base[prop];
            },
            set(value) {
                customCtx._base[prop] = value;
            },
        });
    }

    customCtx.registerCustomMethod = function(key, value) {
        customCtx[key] = function() {
            return value(customCtx._base, ...arguments);
        };
    };

    return customCtx;
}

export { createCustomContext };
