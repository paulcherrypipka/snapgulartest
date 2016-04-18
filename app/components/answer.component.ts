import {Component, Input, OnInit, ElementRef} from 'angular2/core';

import {Answer} from 'app/entity/answer'
import {Question} from "app/entity/question";

@Component({
    selector: 'answer',
    templateUrl: 'app/templates/answer-item.html'
})

export class AnswerComponent implements OnInit {

    @Input() item: Answer;
    @Input() parentQuestion: Question;

    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        console.log('Answer OnINit');
        console.log('elementRef => ', this.elementRef);

        this.item.setElementRef(this.elementRef);
    }
}