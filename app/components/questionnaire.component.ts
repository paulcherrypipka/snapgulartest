//noinspection TypeScriptCheckImport
import {Component, OnInit, ElementRef} from 'angular2/core';

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

    constructor(
        private _questionnaireService: QuestionnaireService,
        elementRef: ElementRef
    ) {
        this.item = this._questionnaireService.getQuestionnaire();
        this._questionnaireService.component = this;

        this.qsections = this.item.getSections();
        this.qquestions = this.item.getQuestions();

        this.elementRef = elementRef;
    }

    // Events click define:
    addSectionClick(): void {
        this._questionnaireService.addSection();
    }

    addQuestionnaireQuestionClick(): void {
        this._questionnaireService.addQuestion();
    }

    importClick(): void {
        console.log('Import start in questionnaire component');

        let openedClass = 'modal-open';
        //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
        let bodyMainView = $(this.elementRef.nativeElement);
        bodyMainView.find('.modal').addClass('in').slideDown(1000);
        bodyMainView.addClass(openedClass);
        //noinspection TypeScriptUnresolvedFunction
        bodyMainView.find('.modal').after($('<div>').addClass('modal-backdrop fade in'));
    }

    saveQuestionnaireClick(): void {

        let formData = this._questionnaireService.getQuestionnaire().toJSON();
        let fileName = 'data.json';
        let allImages = [];

        let quesionnaire = this._questionnaireService.getQuestionnaire();

        if (quesionnaire.image.name)
            allImages.push(quesionnaire.image);

        quesionnaire.getQuestions().forEach((question: Question) => {
            if (question.image)
                allImages.push(question.image);
        });
        quesionnaire.getSections().forEach((section: Section) => {
            if (section.image.name)
                allImages.push(section.image);
            section.getQuestions().forEach((question: Question) => {
                if (question.image.name)
                    allImages.push(question.image);
            })
        });

        //noinspection TypeScriptUnresolvedFunction
        let zip = new JSZip();
        zip.file(fileName, formData);
        // Add images to archive
        allImages.forEach((image) => {
            let raw = atob(image.source.split('base64,')[1]);
            let rawLength = raw.length;
            var imageContent = new Uint8Array(new ArrayBuffer(rawLength));
            for(let i = 0; i < rawLength; i ++) {
                imageContent[i] = raw.charCodeAt(i);
            }
            zip.file(image.name, imageContent);
        });

        let content = zip.generate();
        //location.href="data:application/zip;base64," + content;
        let a = document.createElement("a");
        a.style = "display: none";
        a.href = "data:application/zip;base64," + content;
        a.download = (this.item.name || 'questionnaire') + '_' + (new Date).getTime() + '.zip';
        a.click();
    }


    ngOnInit() {
        console.log('AppComponent init');
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

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}

applyMixins(QuestionnaireComponent, [DraggableComponentTrait]);