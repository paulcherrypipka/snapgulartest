import {SectionCollection} from "../collections/section-collection";
import {QuestionCollection} from "../collections/question-collection";
import {Section} from "./section";
import {Question} from "./question";
import {Section} from "./section";
import {QuestionnaireService} from "../questionnaire.service";
import {IQuestionKeeper} from "../interfaces/question-keeper.interface";
import {ISectionKeeper} from "../interfaces/section-keeper.interface";
import {Guid} from '../utils/guid';

import {Image} from "./image";

import {ImageKeeperTrait} from "../mixins/image.trait";

export class Questionnaire implements ISectionKeeper, IQuestionKeeper, ImageKeeperTrait {

    id: number;
    name: string;
    formula: string;
    fractionLength: number;
    displayingFormat: any; //null,
    //alertOptions: any; //new AlertOptionsModel(),
    sections: SectionCollection; //new SectionCollection(),
    questions: QuestionCollection; //new QuestionCollection(),
    cid: string;
    image: Image; //new ImageModel()

    constructor() {
        this.id = null;
        this.name = null;
        this.formula = null;
        this.fractionLength = 2;
        this.displayingFormat = null;
        //this.alertOptions: any; //new AlertOptionsModel(),
        this.sections = new SectionCollection();
        this.questions = new QuestionCollection();
        this.cid = Guid.guid();
        this.image = new Image(); //new ImageModel()
    }

    addSection(item: Section = null): Section {

        if (item == undefined) {
            item = new Section();
        }
        this.sections.addItem(item);
        return item;
    }

    getSections() {
        return this.sections.getAll();
    }

    getSection(id: number) {
        return this.sections.get(id);
    }

    removeSection(item: Section) {
        this.sections.removeItem(item);
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
applyMixins(Questionnaire ,[ImageKeeperTrait]);