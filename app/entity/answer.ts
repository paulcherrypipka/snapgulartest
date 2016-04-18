import {Guid} from '../utils/guid';

import {ElementKeeperTrait} from "app/mixins/element-keeper.trait";

export class Answer implements ElementKeeperTrait {

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

    setElementRef: (ref: any) => void;
    getElementRef: () => any;
}

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}
applyMixins(Answer, [ElementKeeperTrait]);