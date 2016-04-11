import {ICollection} from "../interfaces/collection.interface";

export abstract class BaseCollection implements ICollection {

    private items: any[];

    constructor() {
        this.items = [];
    }

    get(id: number) {
        return this.items.filter(item => item.id === id)[0];
    }

    getAll() {
        return this.items;
    }

    addItem(item: any) {
        this.items.push(item);
    }

    removeItem(item: any) {
        let ndx = this.items.indexOf(item);
        this.items.splice(ndx, 1);
    }

}