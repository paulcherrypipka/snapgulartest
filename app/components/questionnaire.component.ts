//noinspection TypeScriptCheckImport
import {Component, OnInit, ElementRef} from 'angular2/core';
import {applyMixins} from 'app/utils/mixins';

import {QuestionnaireService} from 'app/services/questionnaire.service';
import {QuestionnaireValidate} from 'app/utils/questionnaire.validate';

import {Answer} from "app/entity/answer";
import {Section} from "app/entity/section";
import {Question} from "app/entity/question";

import {Questionnaire} from "app/entity/questionnaire";

import {SectionComponent} from "app/components/section.component";
import {QuestionComponent} from "app/components/question.component";
import {ImportComponent} from "app/components/import.component";

import {DraggableComponentTrait} from "app/mixins/draggable.component.trait";

@Component({
    selector: 'body',
    templateUrl: 'app/templates/questionnaire-main.html',
    providers: [
        QuestionnaireService,
    ],
    directives: [
        SectionComponent,
        QuestionComponent,
        ImportComponent
    ]
})

export class QuestionnaireComponent implements OnInit, DraggableComponentTrait {

    item: Questionnaire;
    qsections: Section[];
    qquestions: Question[];

    elementRef: ElementRef;

    invalidIdentifiers: string;

    isGlobalError: boolean;

    constructor(
        private _questionnaireService: QuestionnaireService,
        elementRef: ElementRef
    ) {
        this.item = this._questionnaireService.getQuestionnaire();
        this._questionnaireService.component = this;

        this.qsections = this.item.getSections();
        this.qquestions = this.item.getQuestions();

        this.elementRef = elementRef;
        this.isGlobalError = false;
    }

    // Events click define:
    addSectionClick(): void {
        this._questionnaireService.addSection();
    }

    addQuestionnaireQuestionClick(): void {
        this._questionnaireService.addQuestion();
    }

    importClick(): void {
        let openedClass = 'modal-open';
        //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
        let bodyMainView = $(this.elementRef.nativeElement);
        bodyMainView.find('.modal').addClass('in').slideDown(1000);
        bodyMainView.addClass(openedClass);
        //noinspection TypeScriptUnresolvedFunction
        bodyMainView.find('.modal').after($('<div>').addClass('modal-backdrop fade in'));
    }

    saveQuestionnaireClick(): void {
        this._questionnaireService.exportQuestionnaire();
    }


    ngOnInit() {
        this.initializeDragAndDrop(this.sectionsContainer(), '.move-form-section-button', 'sections');
        this.initializeDragAndDrop(this.questionsContainer(), '.move-form-question-button', 'questions');
    }

    validateIdExists(event: any) {
        (new QuestionnaireValidate()).isIdExist(this, this);
    }

    validateIdUnique(event: any) {
        (new QuestionnaireValidate()).isIdUnique(this);
    }

    questionsContainer(): any {
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        return $(this.elementRef.nativeElement).find('#questions');
    }

    sectionsContainer(): any {
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        return $(this.elementRef.nativeElement).find('#sections');
    }

    initializeDragAndDrop: (container: string, selectorMove: string, collectionName: string) => void;
}

applyMixins(QuestionnaireComponent, [DraggableComponentTrait]);