import {Question} from "./question";
import {QuestionCollection} from "../collections/question-collection";
import {Image} from './image';
import {AlertOptions} from './alertoptions';

import {Guid} from '../utils/guid';

import {ImageKeeperTrait} from "../mixins/image.trait";
import {QuestionKeeperTrait} from "../mixins/questionkeeper.trait";
import {ElementKeeperTrait} from "app/mixins/element-keeper.trait";


export class Section implements QuestionKeeperTrait, ImageKeeperTrait, ElementKeeperTrait {

    id: number;
    name: string;
    formula: string;
    enabled: boolean;
    minRequired: any;
    alertOptions: AlertOptions;
    questions: any;
    image: Image;
    cid: string;
    collapsed: boolean;

    elementRef: any;

    constructor(data: any = new Object()) {

        this.id = data.id || null,
        this.name = data.name || 'Name',
        this.formula = data.formula || null,
        this.enabled = data.enabled || true,
        this.minRequired = data.minRequired || null,
        this.alertOptions = data.alertOptions || new AlertOptions();
        this.questions = data.questions || new QuestionCollection();
        this.image = data.image || new Image();
        this.cid = Guid.guid();
        this.collapsed = false;
    }

    collapse() {
        this.collapsed = !this.collapsed;
    }

    toJSON(): any {
        return {
            id: this.id,
            name: this.name,
            formula: this.formula,
            enabled: this.enabled,
            minRequired: this.minRequired,
            alertOptions: this.alertOptions.toJSON(),
            questions: this.questions.toJSON(),
            image: this.image.toJSON()
        };
    }

    setElementRef: (ref: any) => void;
    getElementRef: () => any;

    addQuestion: (item: Question = null) => Question;
    getQuestions: () => Question[];
    getQuestion: (id: number) => Question;
    removeQuestion: (item: Question) => void;

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
applyMixins(Section, [QuestionKeeperTrait, ImageKeeperTrait, ElementKeeperTrait]);