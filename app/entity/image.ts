export class Image {

    file: File;
    name: string;
    source: string;
    hasError: boolean;

    constructor() {
        this.file = null;
        this.name = null;
        this.source = null;
        this.hasError = false;
    }

    toJSON() {
        return this.source;
    }
}