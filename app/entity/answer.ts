import {Guid} from '../utils/guid';
import {applyMixins} from 'app/utils/mixins';

import {ElementKeeperTrait} from "app/mixins/element-keeper.trait";

export class Answer implements ElementKeeperTrait {

    id: string;
    text: string;
    score: number;
    cid: string;

    collapsed: boolean;

    elementRef: any;

    constructor(data: any = new Object()) {
        this.id = data.id || null;
        this.text = data.text || null;
        this.score = data.score || null;
        this.cid = Guid.guid();
        this.collapsed = false;
    }

    collapse() {
        this.collapsed = !this.collapsed;
    }

    toJSON(): any {
        return {
            id: this.id,
            text: this.text,
            score: this.score
        };
    }

    setElementRef: (ref: any) => void;
    getElementRef: () => any;
}

applyMixins(Answer, [ElementKeeperTrait]);