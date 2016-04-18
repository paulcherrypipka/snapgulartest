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

        this.sectionItem.setElementRef(this.elementRef);
        this.initializeDragAndDrop(this.questionsContainer(), '.move-form-question-button', 'questions');
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
            this.sectionItem.questions.sortBySelectorsOrder();
        });
    }

    questionsContainer() {
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        return $(this.elementRef.nativeElement).find('.questions');
    }
}