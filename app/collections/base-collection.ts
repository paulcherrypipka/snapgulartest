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

    sort(containerJqueryElement: any) {

        let data = containerJqueryElement.find('.q-answer');
        let answerMapping = [];

        for(let ndx = 0; ndx < data.length; ndx ++) {

            console.log('data[ndx] => ', data[ndx]);
            answerMapping.push(data[ndx]);
        }

        console.log('data => ', data);

        console.log('containerJqueryElement => ', containerJqueryElement);

        this.items = this.items.sort((el1: any, el2: any) => {
            console.log('ell => ', el1);
            console.log('el2 => ', el2);
        });
    }

}