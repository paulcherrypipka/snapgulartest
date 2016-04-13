import {QuestionCollection} from "../collections/question-collection";
import {Question} from "./question";
import {IQuestionKeeper} from "../interfaces/question-keeper.interface";
import {Image} from './image';

import {Guid} from '../utils/guid';

export class Section implements IQuestionKeeper {

    id: number; //null,
    name: string; //'Name',
    formula: string; //null,
    enabled: boolean; //true,
    minRequired: any; //null,
    // @todo implements field section -> alertOptions
    //alertOptions: any; //new AlertOptionsModel(),
    questions: any; //new QuestionCollection(),
    image: Image; //new ImageModel()
    cid: string;

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

    imageFileChange(event) {
        if (event.srcElement.files[0] instanceof File) {

            if (!event.srcElement.files[0].type.match('image.*')) {
                this.image.source = '';
                return;
            }

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