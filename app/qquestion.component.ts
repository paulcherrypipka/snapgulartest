import {Component, Input} from 'angular2/core';

import {Question} from './entity/question';
import {QuestionnaireService} from './services/questionnaire.service';
import {Answer} from "./entity/answer";
import {AnswerComponent} from "./answer.component";
import {QuestionComponent} from "./question.component";
import {Questionnaire} from "../.__back/app/entity/questionnaire";

@Component({
    selector: 'qquestions-view',
    templateUrl: 'app/templates/qquestion-container.html',
    providers: [
        QuestionnaireService
    ],
    directives: [
        QuestionComponent
    ]
})

export class QQuestionComponent {

    qquestions: Question[] = this._questionnaireService.getQuestions();
    questionnaire: Questionnaire = this._questionnaireService.getQuestionnaire();

    constructor(
        private _questionnaireService: QuestionnaireService
    ) {}
}