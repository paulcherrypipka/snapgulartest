import {Answer} from "./answer";
import {AnswerCollection} from "../collections/answer-collection";
import {Image} from "./image";
import {AlertOptions} from './alertoptions';

import {Guid} from '../utils/guid';
import {Image} from "./image";

import {IAnswerKeeper} from "../interfaces/answer-keeper.interface";
import {ImageKeeperTrait} from "../mixins/image.trait";
import {ElementKeeperTrait} from "app/mixins/element-keeper.trait";

export class Question implements IAnswerKeeper, ImageKeeperTrait, ElementKeeperTrait {

    public static CHOISE_TYPE_MULTIPLY = 'm';
    public static CHOISE_TYPE_SINGLE = 's';

    id: number;
    choiseType: any;
    formula: string;
    text: string;
    required: boolean;
    enabled: boolean;
    alertOptions: AlertOptions;
    answers: AnswerCollection;
    image: Image;
    cid: string;
    collapsed: boolean;

    elementRef: any;

    constructor() {
        this.id = null;
        this.choiseType = Question.CHOISE_TYPE_SINGLE;
        this.formula = null;
        this.text = null;
        this.required = true;
        this.enabled = true;
        this.alertOptions = new AlertOptions();
        this.answers = new AnswerCollection();
        this.image = new Image();
        this.cid = Guid.guid();
        this.collapsed = false;
    }

    addAnswer(item: Answer = null): Answer {

        if (item == undefined) {
            item = new Answer();
        }
        this.answers.addItem(item);
        return item;
    }

    getAnswers() {
        return this.answers.getAll();
    }

    getAnswer(id: number) {
        return this.answers.get(id);
    }

    removeAnswer(item: Answer) {
        this.answers.removeItem(item);
    }

    collapse(event) {
        this.collapsed = !this.collapsed;
    }

    setElementRef: (ref: any) => void;
    getElementRef: () => any;

    imageFileChange: (event: any) => void;
    imageFileClear: (event: any) => void;
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
applyMixins(Question, [ImageKeeperTrait, ElementKeeperTrait]);