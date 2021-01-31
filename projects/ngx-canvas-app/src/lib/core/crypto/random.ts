export namespace Random {
    const crypto = window.crypto;

    export function randomNumber(): string {
        const array = new Uint32Array(8);
        return crypto.getRandomValues(array).join('');
    }
}
