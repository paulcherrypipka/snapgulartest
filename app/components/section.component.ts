import {Component, Input, OnInit, ElementRef} from 'angular2/core';

import {Section} from 'app/entity/section'
import {Questionnaire} from "app/entity/questionnaire";

import {QuestionComponent} from "app/components/question.component";

@Component({
    selector: 'section',
    templateUrl: 'app/templates/section-item.html',
    directives: [
        QuestionComponent
    ]
})

export class SectionComponent implements OnInit {

    @Input() sectionItem: Section;
    @Input() parentEntity: any;

    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        console.log('Section OnINit');
        console.log('elementRef => ', this.elementRef);
    }
}