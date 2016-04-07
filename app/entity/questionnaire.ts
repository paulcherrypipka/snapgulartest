import {SectionCollection} from "../collections/section-collection";
import {QuestionCollection} from "../collections/question-collection";
import {Section} from "./section";
import {Question} from "./question";
import {Section} from "./section";
import {QuestionnaireService} from "../questionnaire.service";
import {IQuestionKeeper} from "../interfaces/question-keeper.interface";
import {ISectionKeeper} from "../interfaces/section-keeper.interface";

export class Questionnaire implements IQuestionKeeper, ISectionKeeper {

    id: number;
    name: string;
    formula: string;
    fractionLength: number;
    displayingFormat: any; //null,
    //alertOptions: any; //new AlertOptionsModel(),
    sections: SectionCollection; //new SectionCollection(),
    questions: QuestionCollection; //new QuestionCollection(),
    //image: any; //new ImageModel()

    constructor() {
        this.id = null;
        this.name = null;
        this.formula = null;
        this.fractionLength = 2;
        this.displayingFormat = null;
        //this.alertOptions: any; //new AlertOptionsModel(),
        this.sections = new SectionCollection();
        this.questions = new QuestionCollection();
        //this.image: any; //new ImageModel()
    }

    addSection(item: Section = null): Section {

        console.log('Add section in Questionnaire entity');

        if (item == undefined) {
            item = new Section();
        }
        this.sections.addItem(item);
        return item;
    }

    addQuestion(item: Question = null): Question {
        if (item == undefined) {
            item = new Question();
        }
        this.questions.addItem(item);
        return item;
    }

    getSections() {
        return this.sections.getAll();
    }

    getSection(id: number) {
        return this.sections.get(id);
    }

    getQuestions() {
        return this.questions.getAll();
    }

    getQuestion(id: number) {
        return this.questions.get(id);
    }
}