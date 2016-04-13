import {AnswerCollection} from "../collections/answer-collection";
import {Answer} from "./answer";
import {Answer} from "./answer";
import {IAnswerKeeper} from "../interfaces/answer-keeper.interface";

import {Guid} from '../utils/guid';

export class Question implements IAnswerKeeper {

    public static CHOISE_TYPE_MULTIPLY = 'm';
    public static CHOISE_TYPE_SINGLE = 's';

    id: number; //null,
    choiseType: any; //this.constructor.CHOICE_TYPE_SINGLE,
    formula: string; //null,
    text: string; //null,
    required: boolean; //true,
    enabled: boolean; //true,
    // @todo implement field question -> alertOptions
    //alertOptions: any; //new AlertOptionsModel(),
    answers: AnswerCollection; //new AnswerCollection(),
    // @todo implement field question -> image
    //image: any; //new ImageModel()
    cid: string;

    constructor() {
        this.id = null;
        this.choiseType = Question.CHOISE_TYPE_SINGLE;
        this.formula = null;
        this.text = null;
        this.required = true;
        this.enabled = true;
        //this.alertOptions = '';
        this.answers = new AnswerCollection();
        //this.image = '';
        this.cid = Guid.guid();
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
}