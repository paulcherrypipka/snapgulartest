import {AnswerCollection} from "../collections/answer-collection";
import {Answer} from "./answer";
import {IAnswerKeeper} from "../interfaces/answer-keeper.interface";
import {Image} from "./image";

import {Guid} from '../utils/guid';
import {Image} from "./image";

import {ImageKeeperTrait} from "../mixins/image.trait";

export class Question implements IAnswerKeeper, ImageKeeperTrait {

    public static CHOISE_TYPE_MULTIPLY = 'm';
    public static CHOISE_TYPE_SINGLE = 's';

    id: number;
    choiseType: any;
    formula: string;
    text: string;
    required: boolean;
    enabled: boolean;
    // @todo implement field question -> alertOptions
    //alertOptions: any; //new AlertOptionsModel(),
    answers: AnswerCollection;
    image: Image;
    cid: string;
    collapsed: boolean;

    constructor() {
        this.id = null;
        this.choiseType = Question.CHOISE_TYPE_SINGLE;
        this.formula = null;
        this.text = null;
        this.required = true;
        this.enabled = true;
        //this.alertOptions = '';
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

    collapse() {
        this.collapsed = !this.collapsed;
    }

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
applyMixins(Question, [ImageKeeperTrait]);