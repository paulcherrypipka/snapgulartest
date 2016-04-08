import {Component} from 'angular2/core';

import {Section} from './entity/section';
import {QuestionnaireService} from './services/questionnaire.service';
//import {SQuestionComponent} from "./squestion.component";

@Component({
    selector: 'qsections-view',
    templateUrl: 'app/templates/section-container.html',
    providers: [
        QuestionnaireService
    ]
    //directives: [
    //    SQuestionComponent
    //]
})

export class SectionComponent {

    qsections: Section[] = this._questionnaireService.getSections();
    sectionNdx: number;

    constructor(
        private _questionnaireService: QuestionnaireService
    ) {

        console.log('secnumindex => ', this.sectionNdx);
    }
}