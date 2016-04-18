export interface ICollection {

    items: any;
    addItem(item: any): any;
    get(id: number): any;
    getAll(): any[];
    removeItem(item: any);
    sortBySelectorsOrder(): void;

}