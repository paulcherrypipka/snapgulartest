import {Component, Input, OnInit, ElementRef, Inject, forwardRef} from 'angular2/core';

import {Question} from "app/entity/question";
import {Questionnaire} from "app/entity/questionnaire";

import {AnswerComponent} from "app/components/answer.component";

import {DraggableComponentTrait} from "app/mixins/draggable.component.trait";
import {QuestionnaireValidate} from "../utils/questionnaire.validate";
import {QuestionnaireComponent} from "./questionnaire.component";

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

    constructor(
        elementRef: ElementRef,
        @Inject(forwardRef(() => QuestionnaireComponent)) private _parentComponent
    ) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        this.item.setElementRef(this.elementRef);
        this.initializeDragAndDrop(this.answersContainer(), '.move-form-answer-button', 'answers');
    }

    validateIdExists(event: any) {
        (new QuestionnaireValidate()).isIdExist(this._parentComponent);
    }

    validateIdUnique(event: any) {
        (new QuestionnaireValidate()).isIdUnique(this._parentComponent);
    }

    answersContainer(): any {
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