import {AnswerCollection} from "../collections/answer-collection";
import {Answer} from "./answer";
import {Answer} from "./answer";
import {IAnswerKeeper} from "../interfaces/answer-keeper.interface";

export class Question implements IAnswerKeeper {

    id: number; //null,
    //choiceType: any; //this.constructor.CHOICE_TYPE_SINGLE,
    formula: string; //null,
    text: string; //null,
    required: boolean; //true,
    enabled: boolean; //true,
    //alertOptions: any; //new AlertOptionsModel(),
    answers: AnswerCollection; //new AnswerCollection(),
    //image: any; //new ImageModel()

    constructor() {
        this.id = null;
        //this.choiceType = '';
        this.formula = null;
        this.text = null;
        this.required = true;
        this.enabled = true;
        //this.alertOptions = '';
        this.answers = new AnswerCollection();
        //this.image = '';
    }

    addAnswer(item: Answer = null): Answer {

        console.log('Add answer to question => ', this);
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
}