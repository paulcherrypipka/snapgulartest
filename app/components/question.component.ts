import {Component, Input, OnInit, ElementRef} from 'angular2/core';

import {Question} from "app/entity/question";
import {Questionnaire} from "app/entity/questionnaire";

import {AnswerComponent} from "app/components/answer.component";

@Component({
    selector: 'question',
    templateUrl: 'app/templates/question-item.html',
    directives: [
        AnswerComponent
    ]
})

export class QuestionComponent implements OnInit {

    @Input() item: Question;
    @Input() parentEntity: any;

    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        console.log('Question OnInit');
        console.log('elementRef => ', this.elementRef);

        this.item.setElementRef(this.elementRef);
        this.initializeDragAndDrop(this.answersContainer(), '.move-form-answer-button', 'answers');
    }

    initializeDragAndDrop(container, selectorMove, collectionName) {
        //noinspection TypeScriptUnresolvedFunction
        let elemDrake = dragula(container.toArray(), {
            moves: function (el, source, handle) {
                //noinspection TypeScriptUnresolvedFunction
                let aButton = $(handle).closest(selectorMove);
                return aButton.length;
            },
            direction: 'vertical',
            ignoreInputTextSelection: true
        });
        elemDrake.on('drop', el => {
            this.item[collectionName].sortBySelectorsOrder();
        });
    }

    answersContainer() {
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        return $(this.elementRef.nativeElement).find('.answers');
    }
}