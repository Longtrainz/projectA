const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let result = isRealString(5);
        expect(result).toNotBe(true);
    });

    it('should reject string with only spaces', () => {
        let result = isRealString('    ');
        expect(result).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        let result = isRealString(' string  ');
        expect(result).toBe(true);
    });
});