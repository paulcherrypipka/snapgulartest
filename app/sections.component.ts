import {Component} from 'angular2/core';

import {Section} from './entity/section';
import {QuestionnaireService} from './services/questionnaire.service';
import {Questionnaire} from "../.__back/app/entity/questionnaire";

import {SectionComponent} from "./section.component";

@Component({
    selector: 'qsections-view',
    templateUrl: 'app/templates/section-container.html',
    providers: [
        QuestionnaireService
    ],
    directives: [
        SectionComponent
    ]
})

export class SectionsComponent {

    qsections: Section[] = this._questionnaireService.getSections();
    questionnaire: Questionnaire = this._questionnaireService.getQuestionnaire();

    constructor(
        private _questionnaireService: QuestionnaireService
    ) {}
}