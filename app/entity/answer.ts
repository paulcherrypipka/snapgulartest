import {Guid} from '../utils/guid';

export class Answer {

    id: string;
    text: string;
    score: number;
    cid: string;

    collapsed: boolean;

    elementRef: any;

    constructor() {
        this.id = null;
        this.text = null;
        this.score = null;
        this.cid = Guid.guid();
        this.collapsed = false;
    }

    collapse() {
        this.collapsed = !this.collapsed;
    }

    setElementRef(ref: any) {
        this.elementRef = ref;
    }

    getElementRef() {
        return this.elementRef;
    }
}
