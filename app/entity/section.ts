import {QuestionCollection} from "../collections/question-collection";
import {Question} from "./question";
import {IQuestionKeeper} from "../interfaces/question-keeper.interface";

import {Guid} from '../utils/guid';

export class Section implements IQuestionKeeper {

    id: number; //null,
    name: string; //'Name',
    formula: string; //null,
    enabled: boolean; //true,
    minRequired: any; //null,
    //alertOptions: any; //new AlertOptionsModel(),
    questions: any; //new QuestionCollection(),
    //image: any; //new ImageModel()
    output: string;
    cid: string;

    constructor() {

        this.id = null,
        this.name = 'Name',
        this.formula = null,
        this.enabled = true,
        this.minRequired = null,
        //this.alertOptions: any; //new AlertOptionsModel(),
        this.questions = new QuestionCollection();
        //this.image: any; //new ImageModel()
        this.output = null;
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
}