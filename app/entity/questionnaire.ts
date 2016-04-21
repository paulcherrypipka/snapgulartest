import {Section} from "./section";
import {Question} from "./question";
import {SectionCollection} from "../collections/section-collection";
import {QuestionCollection} from "../collections/question-collection";
import {Image} from "./image";
import {AlertOptions} from './alertoptions';

import {Guid} from '../utils/guid';

import {SectionKeeperTrait} from "../mixins/sectionkeeper.trait";
import {QuestionKeeperTrait} from "../mixins/questionkeeper.trait";
import {ImageKeeperTrait} from "../mixins/image.trait";

export class Questionnaire implements SectionKeeperTrait, QuestionKeeperTrait, ImageKeeperTrait {

    id: number;
    name: string;
    formula: string;
    fractionLength: number;
    displayingFormat: any;
    alertOptions: AlertOptions;
    sections: SectionCollection;
    questions: QuestionCollection;
    cid: string;
    image: Image;

    haveEqualIdError: boolean;
    haveFormulaError: boolean;

    constructor(data: any = new Object()) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.formula = data.formula || null;
        this.fractionLength = data.fractionLength || 2;
        this.displayingFormat = data.displayingFormat || null;
        this.alertOptions = data.alertOptions || new AlertOptions();
        this.sections = data.sections || new SectionCollection();
        this.questions = data.questions || new QuestionCollection();
        this.cid = Guid.guid();
        this.image = data.image || new Image();
        this.haveEqualIdError = false;
        this.haveFormulaError = false;
    }

    toJSON(): string {
        let questionnaireJson = {};
        questionnaireJson['id'] = this.id;
        questionnaireJson['name'] = this.name;
        questionnaireJson['formula'] = this.formula;
        questionnaireJson['fractionLength'] = this.fractionLength;
        questionnaireJson['displayingFormat'] = this.displayingFormat;
        questionnaireJson['alertOptions'] = this.alertOptions.toJSON();
        questionnaireJson['sections'] = this.sections.toJSON();
        questionnaireJson['questions'] = this.questions.toJSON();
        questionnaireJson['image'] = this.image.toJSON();
        return JSON.stringify(questionnaireJson);
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