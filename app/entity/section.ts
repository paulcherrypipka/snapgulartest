import {QuestionCollection} from "../collections/question-collection";
import {Question} from "./question";
import {IQuestionKeeper} from "../interfaces/question-keeper.interface";
import {Image} from './image';

import {Guid} from '../utils/guid';

import {ImageKeeperTrait} from "../mixins/image.trait";

export class Section implements IQuestionKeeper, ImageKeeperTrait {

    id: number; //null,
    name: string; //'Name',
    formula: string; //null,
    enabled: boolean; //true,
    minRequired: any; //null,
    // @todo implements field section -> alertOptions
    //alertOptions: any; //new AlertOptionsModel(),
    questions: any; //new QuestionCollection(),
    image: Image; //new ImageModel()
    cid: string;

    constructor() {

        this.id = null,
        this.name = 'Name',
        this.formula = null,
        this.enabled = true,
        this.minRequired = null,
        //this.alertOptions: any; //new AlertOptionsModel(),
        this.questions = new QuestionCollection();
        this.image = new Image(); //new ImageModel()
        this.cid = Guid.guid();
    }

    addQuestion(item: Question = null): Question {

        if (item == undefined) {
            item = new Question();
        }
        this.questions.addItem(item);
        return item;
    }

    getQuestions() {
        return this.questions.getAll();
    }

    getQuestion(id: number) {
        return this.questions.get(id);
    }

    removeQuestion(item: Question) {
        this.questions.removeItem(item);
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
applyMixins(Section, [ImageKeeperTrait]);