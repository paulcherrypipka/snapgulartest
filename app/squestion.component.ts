import {Component} from 'angular2/core';

import {Question} from './entity/question';
import {QuestionnaireService} from './services/questionnaire.service';
import {Section} from "./entity/section";
import {Question} from "./entity/question";


@Component({
    selector: 'squestions-view',
    templateUrl: 'app/templates/squestion-container.html',
    providers: [
        QuestionnaireService
    ]
})

export class SQuestionComponent {

    wersquestions: Question[] = this._questionnaireService.getSections()[0].getQuestions();
    squestions: Question[] = this._questionnaireService.getSections()[0].getQuestions();

    constructor(
        private _questionnaireService: QuestionnaireService
    ) {}
}