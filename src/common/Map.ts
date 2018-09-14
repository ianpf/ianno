export class Map<K extends {toString(): string}, V> {
    private data = {} as {[key: string]: V};

    public get(key: K, defaultValue?: V): V {
        return this.data[key.toString()] || defaultValue;
    }

    public put(key: K, value: V): void {
        this.data[key.toString()] = value;
    }
}
