//noinspection TypeScriptCheckImport
import {Component, OnInit, ElementRef} from 'angular2/core';

import {QuestionnaireService} from 'app/services/questionnaire.service';
import {Answer} from "app/entity/answer";
import {Section} from "app/entity/section";
import {Question} from "app/entity/question";

import {Questionnaire} from "app/entity/questionnaire";

import {SectionComponent} from "app/components/section.component";
import {QuestionComponent} from "app/components/question.component";

@Component({
    selector: 'div#questionnaire',
    templateUrl: 'app/templates/questionnaire-main.html',
    providers: [
        QuestionnaireService,
    ],
    directives: [
        SectionComponent,
        QuestionComponent
    ]
})

export class QuestionnaireComponent implements OnInit {

    questionnaire: Questionnaire;
    qsections: Section[];
    qquestions: Question[];

    elementRef: ElementRef;

    constructor(
        private _questionnaireService: QuestionnaireService,
        elementRef: ElementRef
    ) {
        this.questionnaire = this._questionnaireService.getQuestionnaire();
        this.qsections = this.questionnaire.getSections();
        this.qquestions = this.questionnaire.getQuestions();

        this.elementRef = elementRef;
    }

    // Events click define:
    addSectionClick() {
        this._questionnaireService.addSection();
    }

    addQuestionnaireQuestionClick() {
        this._questionnaireService.addQuestion();
    }

    importClick() {
        // @todo import
        console.log('importClick');
    }

    saveQuestionnaireClick() {
        // @todo save Questionnaire
        console.log('saveQuestionnaireClick');
        console.log('questionnaire => ', this._questionnaireService.getQuestionnaire());
    }


    ngOnInit() {
        console.log('AppComponent init');
        console.log('elementRef => ', this.elementRef);

        // Test add sections and questions
        //var sec = this._questionnaireService.addSection();

        //var q1 = sec.addQuestion();
        //var q2 = sec.addQuestion();
        //var q3 = sec.addQuestion();
        //q1.addAnswer();
        //q1.addAnswer();
        //q1.addAnswer();
        //q2.addAnswer();
        //q2.addAnswer();
        //q2.addAnswer();
        //q3.addAnswer();
        //q3.addAnswer();
        //q3.addAnswer();

        //var qq1 = this._questionnaireService.addQuestion();
        //var qq2 = this._questionnaireService.addQuestion();
        //qq1.addAnswer();
        //qq1.addAnswer();
        //qq2.addAnswer();
        //qq2.addAnswer();

    }
}