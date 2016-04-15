import {Component, Input} from 'angular2/core';

import {Section} from './entity/section'
import {Questionnaire} from "./entity/questionnaire";

import {QuestionComponent} from "./question.component";

@Component({
    selector: 'section',
    templateUrl: 'app/templates/section-item.html',
    directives: [
        QuestionComponent
    ]
})

export class SectionComponent {

    @Input() sectionItem: Section;

    @Input() parentEntity: any;
}