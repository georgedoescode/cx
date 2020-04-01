import { createCanvas } from '../src/cx';

describe('CX Library', () => {
    describe('Create a new canvas instance', () => {
        it('Returns an object shaped { ctx, element }', () => {
            const instance = createCanvas();

            expect(Object.keys(instance)).toEqual(['ctx', 'element']);
        });
    });

    describe('Scale instance to screen resolution', () => {
        it('Sets the canvas dimension styles and actual width relative to DPR', () => {
            const { element } = createCanvas({
                width: 400,
                height: 400,
                mount: document.body,
            });

            element.el.getBoundingClientRect = jest.fn(() => ({
                width: 400,
                height: 400,
            }));

            element.setPXDensity(2);

            expect(element.el.width).toBe(800);
            expect(element.el.height).toBe(800);
            expect(element.el.style.width).toBe('400px');
            expect(element.el.style.height).toBe('400px');
        });
    });

    describe('Creates a custom canvas context', () => {
        it('Custom context can call native canvas context methods', () => {
            const { ctx } = createCanvas();
            const normalCtx = document.createElement('canvas').getContext('2d');

            ctx.moveTo(0, 0);
            ctx.lineTo(100, 100);
            ctx.fillRect(0, 0, 50, 50);

            normalCtx.moveTo(0, 0);
            normalCtx.lineTo(100, 100);
            normalCtx.fillRect(0, 0, 50, 50);

            expect(ctx._base.__getPath()).toEqual(normalCtx.__getPath());
        });

        it('ctx getters return values from _base context if they are defined there', () => {
            const { ctx } = createCanvas();

            expect(ctx._lineWidthStack).not.toBeFalsy();
        });

        it('Proxies native canvas context sets to the context _base', () => {
            const { ctx } = createCanvas();

            ctx._lineWidthStack = 3;

            expect(ctx._base._lineWidthStack).toEqual(3);
        });

        it('Registers custom drawing methods', () => {
            const { ctx } = createCanvas();

            ctx.registerCustomMethod('test', ctx => {});

            expect(() => ctx.test()).not.toThrow();
        });
    });
});
