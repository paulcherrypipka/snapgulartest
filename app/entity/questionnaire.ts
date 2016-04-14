import {SectionCollection} from "../collections/section-collection";
import {QuestionCollection} from "../collections/question-collection";
import {Section} from "./section";
import {Question} from "./question";
import {Section} from "./section";
import {QuestionnaireService} from "../questionnaire.service";
import {Guid} from '../utils/guid';

import {Image} from "./image";

import {ImageKeeperTrait} from "../mixins/image.trait";
import {QuestionKeeperTrait} from "../mixins/questionkeeper.trait";
import {SectionKeeperTrait} from "../mixins/sectionkeeper.trait";

export class Questionnaire implements SectionKeeperTrait, QuestionKeeperTrait, ImageKeeperTrait {

    id: number;
    name: string;
    formula: string;
    fractionLength: number;
    displayingFormat: any;
    //alertOptions: any; //new AlertOptionsModel(),
    sections: SectionCollection;
    questions: QuestionCollection;
    cid: string;
    image: Image;

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
        this.image = new Image();
    }

    addSection: (item: Section = null) => Section;
    getSections: () => Section[];
    getSection: (id: number) => Section;
    removeSection: (item: Section) => void;

    addQuestion:(item: Question = null) => Question;
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
applyMixins(Questionnaire ,[SectionKeeperTrait, QuestionKeeperTrait, ImageKeeperTrait]);