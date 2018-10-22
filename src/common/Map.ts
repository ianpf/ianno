export class Map<K extends {toString(): string}, V> {
    private data = {} as {[key: string]: V};
    private dataArray: [K, V][] = [];
    private static objectKeyTypes = ['string', 'symbol', 'number'];

    public get(key: K, defaultValue: V): V;
    public get(key: K): V | undefined;
    public get(key: K, defaultValue?: V) {
        if (Map.objectKeyTypes.includes(typeof key)) {
            return this.data[key.toString()] || defaultValue;
        } else {
            
        }
    }

    public put(key: K, value: V): void {
        this.data[key.toString()] = value;
    }
}
