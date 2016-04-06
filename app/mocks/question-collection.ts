import {Question} from '../entity/question';

export class QuestionCollection {

    private items: Question[] = [];

    constructor() {
        this.items = [];
    }

    get(id: number) {
        return this.items.filter(item => item.id === id)[0];
    }

    getAll() {
        return this.items;
    }

    addItem(item: Question) {
        this.items.push(item);
    }
}