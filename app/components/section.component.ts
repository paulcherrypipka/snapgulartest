import {Component, Input, OnInit, ElementRef, Inject, forwardRef} from 'angular2/core';

import {Section} from 'app/entity/section'
import {Questionnaire} from "app/entity/questionnaire";

import {QuestionComponent} from "app/components/question.component";

import {DraggableComponentTrait} from "app/mixins/draggable.component.trait";
import {QuestionnaireValidate} from "../utils/questionnaire.validate";
import {QuestionnaireComponent} from "./questionnaire.component";

@Component({
    selector: 'section',
    templateUrl: 'app/templates/section-item.html',
    directives: [
        QuestionComponent
    ]
})

export class SectionComponent implements OnInit, DraggableComponentTrait {

    @Input() item: Section;
    @Input() parentEntity: any;
    tooltipText: string;

    elementRef: ElementRef;

    invalidIdentifiers: string;

    constructor(
        elementRef: ElementRef,
        @Inject(forwardRef(() => QuestionnaireComponent)) private _parentComponent
    ) {
        this.elementRef = elementRef;
        this.tooltipText = 'Additional variables: ANSWERED  - will be replaced with count of answered questions';
    }

    ngOnInit() {
        this.item.setElementRef(this.elementRef);
        this.initializeDragAndDrop(this.questionsContainer(), '.move-form-question-button', 'questions');
        this.initializeTooltip();
    }

    initializeTooltip(): void {
        //noinspection TypeScriptUnresolvedFunction
        let tooltipElement = $('<i class="glyphicon glyphicon-info-sign" data-toggle="tooltip"></i>')
            .attr('title', this.tooltipText)
            .attr('data-placement', 'top').tooltip();
        //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
        $(this.elementRef.nativeElement).find('.form-group input.q-section-formula').parent().prev().prepend(tooltipElement);
    }

    validateIdExists(event: any) {
        (new QuestionnaireValidate()).isIdExist(this._parentComponent, this);
    }

    validateIdUnique(event: any) {
        (new QuestionnaireValidate()).isIdUnique(this._parentComponent);
    }

    questionsContainer(): any {
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        return $(this.elementRef.nativeElement).find('.questions');
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

applyMixins(SectionComponent, [DraggableComponentTrait]);