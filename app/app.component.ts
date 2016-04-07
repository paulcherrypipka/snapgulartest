//noinspection TypeScriptCheckImport
import {Component, OnInit} from 'angular2/core';

import {QuestionnaireService} from './services/questionnaire.service';
import {SectionService} from './services/section.service';
import {QuestionService} from './services/question.service';
import {AnswerService} from './services/answer.service';
import {Answer} from "./entity/answer";
import {QuestionnaireService} from "./services/questionnaire.service";
import {Section} from "./entity/section";
import {Question} from "./entity/question";

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
        //////////////////////////////////////
        /*console.log('AppComponent init');
         console.log('test 007 get instance => ', this._questionnaireService.getQuestionnaire());

         var sec = new Section();
         var question = new Question();
         question.addAnswer();
         question.addAnswer();
         question.addAnswer();
         sec.addQuestion(question);
         sec.addQuestion(question);
         sec.addQuestion(question);
         this._questionnaireService.addSection(sec);

         var question = new Question();
         question.addAnswer();
         question.addAnswer();
         this._questionnaireService.addQuestion(question);
         this._questionnaireService.addQuestion(question);

         console.log('test get sections => ', this._questionnaireService.getSections());
         console.log('test get questions => ', this._questionnaireService.getQuestions());*/
    }
}