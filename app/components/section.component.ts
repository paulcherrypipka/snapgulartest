import {Component, Input, OnInit, ElementRef} from 'angular2/core';

import {Section} from 'app/entity/section'
import {Questionnaire} from "app/entity/questionnaire";

import {QuestionComponent} from "app/components/question.component";

import {DraggableComponentTrait} from "app/mixins/draggable.component.trait";

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

    constructor(elementRef: ElementRef) {
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