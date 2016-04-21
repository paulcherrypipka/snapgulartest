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

    id: string;
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
    haveEqualIdError: boolean;
    haveFormulaError: boolean;

    elementRef: any;

    constructor(data: any = new Object()) {
        this.id = data.id || null;
        this.choiseType = data.choiseType || Question.CHOISE_TYPE_SINGLE;
        this.formula = data.formula || null;
        this.text = data.text || null;
        this.required = data.required || true;
        this.enabled = data.enabled || true;
        this.alertOptions = data.alertOptions || new AlertOptions();
        this.answers = data.answers || new AnswerCollection();
        this.image = data.image || new Image();
        this.cid = Guid.guid();
        this.collapsed = false;
        this.haveEqualIdError = false;
        this.haveFormulaError = false;
    }

    addAnswer(item: Answer = null): Answer {

        if (item == undefined) {
            item = new Answer();
        }
        this.answers.addItem(item);
        return item;
    }

    getAnswers(): Answer[] {
        return this.answers.getAll();
    }

    getAnswer(id: string): Answer {
        return this.answers.get(id);
    }

    removeAnswer(item: Answer): void {
        this.answers.removeItem(item);
    }

    collapse(event): void {
        this.collapsed = !this.collapsed;
    }

    toJSON(): any {
        return {
            id: this.id,
            choiseType: this.choiseType,
            formula: this.formula,
            text: this.text,
            required: this.required,
            enabled: this.enabled,
            alertOptions: this.alertOptions.toJSON(),
            answers: this.answers.toJSON(),
            image: this.image.toJSON()
        };
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