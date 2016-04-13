import {AnswerCollection} from "../collections/answer-collection";
import {Answer} from "./answer";
import {IAnswerKeeper} from "../interfaces/answer-keeper.interface";
import {Image} from "./image";

import {Guid} from '../utils/guid';
import {Image} from "./image";

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
    image: Image;
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
        this.image = new Image();
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

    imageFileChange(event) {
        if (event.srcElement.files[0] instanceof File) {

            if (!event.srcElement.files[0].type.match('image.*')) {
                this.image = new Image();
                return;
            }

            this.image = new Image();
            this.image.name = event.srcElement.files[0].name;

            let FR = new FileReader();
            FR.onload = (e) => {

                //noinspection TypeScriptUnresolvedVariable
                this.image.source = e.target.result;
            };
            FR.readAsDataURL(event.srcElement.files[0]);
        }
    }

    imageFileClear(event) {
        this.image = new Image();
    }
}