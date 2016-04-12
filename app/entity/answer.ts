import {Guid} from '../utils/guid';

export class Answer {

    id: string;
    text: string;
    score: number;
    cid: string;

    collapsed: boolean;

    constructor() {
        this.id = null;
        this.text = null;
        this.score = null;
        this.cid = Guid.guid();
        this.collapsed = true;

        if (this.id) {
            this.collapsed = false;
        }
    }

    collapse() {
        console.log('entity collapse');
        this.collapsed = true;
    }

    expand() {
        console.log('entity expand');
        this.collapsed = false;
    }

    isCollapsed(): boolean {
        return this.collapsed;
    }
}
