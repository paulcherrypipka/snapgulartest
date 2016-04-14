import {QuestionCollection} from "../collections/question-collection";
import {Question} from "./question";
import {Image} from './image';

import {Guid} from '../utils/guid';

import {ImageKeeperTrait} from "../mixins/image.trait";
import {QuestionKeeperTrait} from "../mixins/questionkeeper.trait";

export class Section implements QuestionKeeperTrait, ImageKeeperTrait {

    id: number;
    name: string;
    formula: string;
    enabled: boolean;
    minRequired: any;
    // @todo implements field section -> alertOptions
    //alertOptions: any; //new AlertOptionsModel(),
    questions: any;
    image: Image;
    cid: string;
    collapsed: boolean;

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
        this.collapsed = false;
    }

    collapse() {
        this.collapsed = !this.collapsed;
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