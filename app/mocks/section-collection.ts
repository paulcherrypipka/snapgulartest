import {Section} from '../entity/section';

export class SectionCollection {

    private items: Section[] = [];

    constructor() {
        this.items = [];
    }

    get(id: number) {
        return this.items.filter(item => item.id === id)[0];
    }

    getAll() {
        return this.items;
    }

    addItem(item: Section) {

        console.log('Add section in collection item => ', item);

        this.items.push(item);
    }

}