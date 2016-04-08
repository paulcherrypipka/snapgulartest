import {Component, Input} from 'angular2/core';

import {Section} from './entity/section';
import {QuestionnaireService} from './services/questionnaire.service';


@Component({
    selector: 'qsections-view',
    templateUrl: 'app/templates/section-main.html',
    providers: [
        QuestionnaireService
    ]
})

export class SectionComponent {

    qsections: Section[] = this._questionnaireService.getSections();

    constructor(
        private _questionnaireService: QuestionnaireService
    ) {}

}