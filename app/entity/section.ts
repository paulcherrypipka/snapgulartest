import {Question} from "./question";
import {QuestionCollection} from "../collections/question-collection";
import {Image} from './image';
import {AlertOptions} from './alertoptions';

import {Guid} from '../utils/guid';

import {ImageKeeperTrait} from "../mixins/image.trait";
import {QuestionKeeperTrait} from "../mixins/questionkeeper.trait";

export class Section implements QuestionKeeperTrait, ImageKeeperTrait {

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

    constructor() {

        this.id = null,
        this.name = 'Name',
        this.formula = null,
        this.enabled = true,
        this.minRequired = null,
        this.alertOptions = new AlertOptions();
        this.questions = new QuestionCollection();
        this.image = new Image();
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
applyMixins(Section, [QuestionKeeperTrait, ImageKeeperTrait]);