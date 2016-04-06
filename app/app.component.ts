//noinspection TypeScriptCheckImport
import {Component, OnInit} from 'angular2/core';

import {QuestionnaireService} from './questionnaire.service';
import {SectionService} from './section.service';
import {QuestionService} from './question.service';
import {AnswerService} from './answer.service';
import {Answer} from "./entity/answer";
import {QuestionnaireService} from "./questionnaire.service";
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
        private _questionnaireService: QuestionnaireService,
        private _sectionService: SectionService,
        private _questionService: QuestionService,
        private _answerService: AnswerService
    ) {

    }

    ngOnInit() {
        console.log('AppComponent init');
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
        console.log('test get questions => ', this._questionnaireService.getQuestions());
    }
}