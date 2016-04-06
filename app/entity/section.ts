import {QuestionCollection} from "../mocks/question-collection";
import {Question} from "./question";

export class Section {

    id: number; //null,
    name: string; //'Name',
    formula: string; //null,
    enabled: boolean; //true,
    minRequired: any; //null,
    //alertOptions: any; //new AlertOptionsModel(),
    questions: any; //new QuestionCollection(),
    //image: any; //new ImageModel()

    constructor() {

        console.log('Point section constructor!');

        this.id = null,
        this.name = 'Name',
        this.formula = null,
        this.enabled = true,
        this.minRequired = null,
        //this.alertOptions: any; //new AlertOptionsModel(),
        this.questions = new QuestionCollection();
        //this.image: any; //new ImageModel()
    }

    addQuestion(item: Question = null) {
        if (item == undefined) {
            item = new Question();
        }
        this.questions.addItem(item);
    }

    getQuestions() {
        return this.questions.getAll();
    }

    getQuestion(id: number) {
        return this.questions.get(id);
    }
}