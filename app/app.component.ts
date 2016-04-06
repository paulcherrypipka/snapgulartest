//noinspection TypeScriptCheckImport
import {Component, OnInit} from 'angular2/core';

import {QuestionnaireService} from './questionnaire.service';
import {SectionService} from './section.service';
import {QuestionService} from './question.service';
import {AnswerService} from './answer.service';
import {Answer} from "./entity/answer";
import {QuestionnaireService} from "./questionnaire.service";

@Component({
    selector: 'snap-app',
    template: `
    <h1>placeholder hello snap</h1>
    `,
    providers: [
        QuestionnaireService,
        SectionService,
        QuestionService,
        AnswerService
    ]
})

export class AppComponent implements OnInit {

    constructor(
        private _questionnaireService: QuestionnaireService
    ) {

    }

    ngOnInit() {
        console.log('AppComponent init');
        console.log('test 007 get instance => ', this._questionnaireService.getQuestionnaire());

        this._questionnaireService.addSection();
        this._questionnaireService.addSection();
        console.log('test get sections => ', this._questionnaireService.getSections());

        this._questionnaireService.addQuestion();
        this._questionnaireService.addQuestion();
        console.log('test get questions => ', this._questionnaireService.getQuestions());

    }
}