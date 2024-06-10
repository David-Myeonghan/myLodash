type Predicate<T> = ((item: T) => boolean) | Partial<T> | [keyof T, unknown] | keyof T;

export default function find<T>(collection: T[] | { [key: string]: T }, predicate: Predicate<T>): T | undefined {
    const iterateeFunc = iteratee(predicate);

    if (Array.isArray(collection)) {
        for (const element of collection) {
            if (iterateeFunc(element)) {
                return element;
            }
        }
    } else {
        for (const key in collection) {
            if (iterateeFunc(collection[key])) {
                return collection[key];
            }
        }
    }
    return undefined;
}

function iteratee<T>(predicate: Predicate<T>): (item: T) => boolean {
    if (typeof predicate === 'function') {
        return predicate as (item: T) => boolean;
    } else if (typeof predicate === 'object' && !Array.isArray(predicate)) {
        return (item: T) => isMatch(item, predicate as Partial<T>);
    } else if (Array.isArray(predicate) && predicate.length === 2) {
        const [key, value] = predicate as [keyof T, unknown];
        return (item: T) => item[key] === value;
    } else if (typeof predicate === 'string') {
        return (item: T) => Boolean(item[predicate as keyof T]);
    }
    return (_: T) => false;
}

function isMatch<T>(item: T, predicate: Partial<T>): boolean {
    for (const key in predicate) {
        if (predicate[key] !== item[key]) {
            return false;
        }
    }
    return true;
}