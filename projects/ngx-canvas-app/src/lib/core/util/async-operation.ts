export class AsyncOperation<T = any> extends Promise<T> {
    private _resolve: (value?: T | PromiseLike<T>) => void;
    private _reject: (reason?: string) => void;

    private _value: T;
    private _reason: string;

    public get value(): T {
        return this._value;
    }

    public get reason(): string {
        return this._reason;
    }

    public constructor() {
        let resolveFn: (value?: T) => void;
        let rejectFn: (reason?: string) => void;
        super((resolve, reject) => {
            resolveFn = resolve;
            rejectFn = reject;
        });
        this._resolve = resolveFn;
        this._reject = rejectFn;
    }

    public async resolve(value?: T): Promise<void> {
        this._value = value;
        this._resolve(value);
    }

    public async reject(reason?: string): Promise<void> {
        this._reason = reason;
        this._reject();
    }
}
