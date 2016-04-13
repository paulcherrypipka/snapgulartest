import {Component, Input} from 'angular2/core';

import {Question} from './entity/question';
import {QuestionnaireService} from './services/questionnaire.service';
import {Answer} from "./entity/answer";

@Component({
    selector: 'qquestions-view',
    templateUrl: 'app/templates/qquestion-container.html',
    providers: [
        QuestionnaireService
    ]
})

export class QQuestionComponent {

    qquestions: Question[] = this._questionnaireService.getQuestions();

    constructor(
        private _questionnaireService: QuestionnaireService
    ) {}


    removeQQuestionClick(qq: Question) {
        this._questionnaireService.removeQuestion(qq);
    }
}