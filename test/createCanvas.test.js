import { createCanvas } from '../src/cx';

describe('CX', () => {
    describe('Create new instance', () => {
        it('Returns an object', () => {
            const customCanvas = createCanvas();

            expect(customCanvas).not.toBeFalsy();
        });
    });
});
