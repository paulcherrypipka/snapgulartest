import {Component, Input, OnInit, ElementRef} from 'angular2/core';

import {Question} from "app/entity/question";
import {Questionnaire} from "app/entity/questionnaire";

import {AnswerComponent} from "app/components/answer.component";

import {DraggableComponentTrait} from "app/mixins/draggable.component.trait";

@Component({
    selector: 'question',
    templateUrl: 'app/templates/question-item.html',
    directives: [
        AnswerComponent
    ]
})

export class QuestionComponent implements OnInit, DraggableComponentTrait {

    @Input() item: Question;
    @Input() parentEntity: any;

    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        this.item.setElementRef(this.elementRef);
        this.initializeDragAndDrop(this.answersContainer(), '.move-form-answer-button', 'answers');
    }

    answersContainer() {
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        return $(this.elementRef.nativeElement).find('.answers');
    }

    initializeDragAndDrop: (container: string, selectorMove: string, collectionName: string) => void;
}

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}
applyMixins(QuestionComponent, [DraggableComponentTrait]);