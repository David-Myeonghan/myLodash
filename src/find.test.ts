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
        expect(result).toEqual(users[2]);
    });

    // test('finds item with a matching predicate object', () => {
    //     const result = find(users, {age: 36, active: true});
    //     expect(result).toEqual(users[0])
    // })

    // test('finds item with a matching predicate array', () => {
    //     const result = find(users, ['acitve', false]);
    //     expect(result).toEqual(users[1])
    // })
})