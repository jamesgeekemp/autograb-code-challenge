import { app } from "./index.ts";

describe('app', () => {
    describe('given 1 1', () => {
        it('should return 2', () => {
            expect(app(1, 1)).toBe(2);
        })

    })
})