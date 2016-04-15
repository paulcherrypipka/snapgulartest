import {Component, Input} from 'angular2/core';

import {Question} from "./entity/question";
import {Section} from './entity/section'
import {AnswerComponent} from "./answer.component";
import {Questionnaire} from "../.__back/app/entity/questionnaire";

@Component({
    selector: 'question',
    templateUrl: 'app/templates/question-item.html',
    directives: [
        AnswerComponent
    ]
})

export class QuestionComponent {

    @Input() questionItem: Question;

    @Input() parentEntity: any;
}