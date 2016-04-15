import {Component, Input} from 'angular2/core';

import {Answer} from 'app/entity/answer'
import {Question} from "app/entity/question";

@Component({
    selector: 'answer',
    templateUrl: 'app/templates/answer-item.html'
})

export class AnswerComponent {

    @Input() answerItem: Answer;
    @Input() parentQuestion: Question;

}