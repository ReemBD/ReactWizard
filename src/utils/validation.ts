export class Validators {
    static minLength(minLength: number) {
        return (str: string) => str.length < minLength;
    }

    static maxLength(maxLength: number) {
        return (str: string) => str.length > maxLength;
    }

    static empty() {
        return (str: string): str is '' => !str.length;
    }
}