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

    elementRef: ElementRef;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        console.log('Section OnINit');
        console.log('elementRef => ', this.elementRef);

        this.item.setElementRef(this.elementRef);
        this.initializeDragAndDrop(this.questionsContainer(), '.move-form-question-button', 'questions');
    }

    questionsContainer() {
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