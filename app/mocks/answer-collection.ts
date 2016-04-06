import {Answer} from '../entity/answer';

export class AnswerCollection {

    private items: Answer[];

    constructor() {
        this.items = [];
    }

    get(id: number) {
        return this.items.filter(item => item.id === id)[0];
    }

    getAll() {
        return this.items;
    }

    addItem(item: Answer) {
        this.items.push(item);
    }

}
