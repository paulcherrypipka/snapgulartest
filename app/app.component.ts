//noinspection TypeScriptCheckImport
import {Component, OnInit} from 'angular2/core';

import {QuestionnaireService} from './services/questionnaire.service';
import {Answer} from "./entity/answer";
import {Section} from "./entity/section";
import {Question} from "./entity/question";

import {SectionComponent} from './section.component';

@Component({
    selector: 'questionnaire',
    templateUrl: 'app/templates/questionnaire-main.html',
    providers: [
        QuestionnaireService,
    ],
    directives: [
        SectionComponent
    ]
})

export class AppComponent implements OnInit {

    private id = null;
    private cid = 'test';
    private name = null;
    private formula = null;
    private fractionLength = 2;
    private displayingFormat = null;

    private qsections: Section[];

    constructor(
        private _questionnaireService: QuestionnaireService
    ) {}

    // Events click define:
    addSectionClick() {
        console.log('addSectionClick working');
        this._questionnaireService.addSection();
    }

    addQuestionnaireQuestionClick() {
        console.log('addQuestionnaireQuestionClick working');
    }

    importClick() {
        console.log('importClick working');
    }

    saveQuestionnaireClick() {
        console.log('saveQuestionnaireClick working');
    }

    ngOnInit() {
        console.log('AppComponent init');

        // Test add sections and questions
        console.log('test 007 get instance => ', this._questionnaireService.getQuestionnaire());

        var sec = this._questionnaireService.addSection();

        var q1 = sec.addQuestion();
        var q2 = sec.addQuestion();
        var q3 = sec.addQuestion();

        q1.addAnswer();
        q1.addAnswer();
        q1.addAnswer();

        q2.addAnswer();
        q2.addAnswer();
        q2.addAnswer();

        q3.addAnswer();
        q3.addAnswer();
        q3.addAnswer();

        var qq1 = this._questionnaireService.addQuestion();
        var qq2 = this._questionnaireService.addQuestion();

        qq1.addAnswer();
        qq1.addAnswer();

        qq2.addAnswer();
        qq2.addAnswer();

        console.log('test get sections => ', this._questionnaireService.getSections());
        console.log('test get questions => ', this._questionnaireService.getQuestions());

        //this.qsections = this._questionnaireService.getSections();
    }
}