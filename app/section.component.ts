import {Component} from 'angular2/core';

import {Section} from './entity/section';
import {QuestionnaireService} from './services/questionnaire.service';
import {AnswerComponent} from "./answer.component";

//import {SQuestionComponent} from "./squestion.component";

@Component({
    selector: 'qsections-view',
    templateUrl: 'app/templates/section-container.html',
    providers: [
        QuestionnaireService
    ],
    directives: [
        AnswerComponent
    ]
})

export class SectionComponent {

    qsections: Section[] = this._questionnaireService.getSections();

    constructor(
        private _questionnaireService: QuestionnaireService
    ) {}

    removeSectionClick(section: Section) {
        this._questionnaireService.removeSection(section);
    }
}