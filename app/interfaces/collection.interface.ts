export interface ICollection {

    items: any;
    addItem(item: any): any;
    get(id: string): any;
    getAll(): any[];
    removeItem(item: any);
    sortBySelectorsOrder(): void;
    toJSON(): any[];

}