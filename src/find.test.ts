import find from "./find";

interface User {
    user: string;
    age: number;
    active: boolean;
}

const users: User[] = [
    { user: 'barney', age: 36, active: true },
    { user: 'fred', age: 40, active: false },
    { user: 'pebbles', age: 1, active: true }
]

describe('find function', () => {
    test('finds item with a matching predicate function', () => {
        const result = find(users, o => o.age === 1);
        expect(result).toEqual({ user: 'pebbles', age: 1, active: true });
    });

    test('finds item with a matching predicate object', () => {
        const result = find(users, { age: 36, active: true });
        expect(result).toEqual({ user: 'barney', age: 36, active: true });
    });

    test('finds item with a matching predicate array', () => {
        const result = find(users, ['active', false]);
        expect(result).toEqual({ user: 'fred', age: 40, active: false });
    });

    test('finds item with a matching predicate string', () => {
        const result = find(users, 'active');
        expect(result).toEqual({ user: 'barney', age: 36, active: true });
    });

    test('returns undefined if no matching item is found', () => {
        const result = find(users, o => o.age === 100);
        expect(result).toBeUndefined();
    });

    test('works with different data types in the array', () => {
        const mixedArray = [1, 'two', { a: 3 }, true];
        expect(find(mixedArray, item => typeof item === 'string')).toBe('two');
        expect(find(mixedArray, item => typeof item === 'number')).toBe(1);
        expect(find(mixedArray, { a: 3 })).toEqual({ a: 3 });
        expect(find(mixedArray, item => item === true)).toBe(true);
    });
});