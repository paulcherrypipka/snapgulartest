import {Component, Input} from 'angular2/core';

import {Question} from "./entity/question";
import {Questionnaire} from "./entity/questionnaire";

import {AnswerComponent} from "./answer.component";

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