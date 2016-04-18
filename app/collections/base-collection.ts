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

    sortBySelectorsOrder() {
        this.items = this.items.sort((elemFirst: any, elemSecond: any) => {

            //noinspection TypeScriptUnresolvedFunction
            let ndxFirst = $(elemFirst.getElementRef().nativeElement).parent().index();
            //noinspection TypeScriptUnresolvedFunction
            let ndxSecond = $(elemSecond.getElementRef().nativeElement).parent().index();

            if (ndxFirst > ndxSecond)
                return 1;
            if (ndxFirst === ndxSecond)
                return 0;
            return -1;
        });
    }

    toJSON() {
        let itemsData = [];

        this.items.forEach((item) => {
            itemsData.push(item.toJSON());
        });

        return itemsData;
    }
}