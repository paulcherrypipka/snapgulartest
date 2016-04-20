export class Image {

    file: File;
    name: string;
    source: string;
    hasError: boolean;

    constructor(data: any = new Object()) {
        this.file = null;
        this.name = data.name || null;
        this.source = data.source || null;
        this.hasError = false;
    }

    toJSON(): string {
        return this.name;
    }
}