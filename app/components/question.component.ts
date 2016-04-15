import {Component, Input} from 'angular2/core';

import {Question} from "app/entity/question";
import {Questionnaire} from "app/entity/questionnaire";

import {AnswerComponent} from "app/components/answer.component";

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