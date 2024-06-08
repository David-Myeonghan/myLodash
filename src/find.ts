export default function find<T>(collection: T[], predicate: (item: T) => boolean ): T | undefined {
    for (let element of collection) {
        if (predicate(element)) {
            return element;
        }
    }
    return undefined;
}
