export class ElementKeeperTrait {

    elementRef: any;

    setElementRef(ref: any): void {
        this.elementRef = ref;
    }

    getElementRef(): any {
        return this.elementRef;
    }

}