import {Component, Input} from 'angular2/core';

import {Answer} from './entity/answer'
import {Question} from "./entity/question";

@Component({
    selector: 'answer',
    templateUrl: 'app/templates/answer-item.html'
})

export class AnswerComponent {

    @Input() answerItem: Answer;
    @Input() parentQuestion: Question;

}