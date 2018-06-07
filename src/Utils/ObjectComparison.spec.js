import {objectsAreEqual} from './ObjectComparison';

describe('object-comparison', () => {
    it('determines two seperate object with identical props to be equal', () => {
        const obj1 = { prop1: 'a', prop2: 'b'};
        const obj2 = {prop1: 'a', prop2: 'b'};
        const result = objectsAreEqual(obj1, obj2);

        expect(result).toEqual(true);
    });
});