//noinspection TypeScriptCheckImport
import {Component, OnInit, ElementRef} from 'angular2/core';

import {QuestionnaireService} from 'app/services/questionnaire.service';
import {Answer} from "app/entity/answer";
import {Section} from "app/entity/section";
import {Question} from "app/entity/question";

import {Questionnaire} from "app/entity/questionnaire";

import {SectionComponent} from "app/components/section.component";
import {QuestionComponent} from "app/components/question.component";

import {DraggableComponentTrait} from "app/mixins/draggable.component.trait";

@Component({
    selector: 'div#questionnaire',
    templateUrl: 'app/templates/questionnaire-main.html',
    providers: [
        QuestionnaireService,
    ],
    directives: [
        SectionComponent,
        QuestionComponent
    ]
})

export class QuestionnaireComponent implements OnInit, DraggableComponentTrait {

    item: Questionnaire;
    qsections: Section[];
    qquestions: Question[];

    elementRef: ElementRef;

    constructor(
        private _questionnaireService: QuestionnaireService,
        elementRef: ElementRef
    ) {
        this.item = this._questionnaireService.getQuestionnaire();
        this.qsections = this.item.getSections();
        this.qquestions = this.item.getQuestions();

        this.elementRef = elementRef;
    }

    // Events click define:
    addSectionClick() {
        this._questionnaireService.addSection();
    }

    addQuestionnaireQuestionClick() {
        this._questionnaireService.addQuestion();
    }

    importClick() {
        // @todo import
        console.log('importClick');
    }

    saveQuestionnaireClick() {

        let formData = this._questionnaireService.getQuestionnaire().toJSON();
        let fileName = 'export_questionnaire' + (new Date).getTime() + '.json';

        //noinspection TypeScriptUnresolvedFunction
        let zip = new JSZip();
        zip.file(fileName, formData);
        // @todo export/save images to questionnaire archive
        zip.generateAsync({type: "blob"}).then((blob) => {
            let downloadUrl = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            //document.body.appendChild(a);
            a.style = "display: none";
            a.href = downloadUrl;
            console.log('this.item => ', this.item);
            a.download = (this.item.name || 'questionnaire') + '_' + (new Date).getTime() + '.zip';
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
        });

        // Example from git
        /*var zip = new JSZip();
         zip.file("Hello.txt", "Hello World\n");
         var img = zip.folder("images");
         img.file("smile.gif", imgData, {base64: true});
         zip.generateAsync({type:"blob"})
         .then(function(content) {
         // see FileSaver.js
         saveAs(content, "example.zip");
         });*/
    }


    ngOnInit() {
        console.log('AppComponent init');
        console.log('elementRef => ', this.elementRef);

        this.initializeDragAndDrop(this.sectionsContainer(), '.move-form-section-button', 'sections');
        this.initializeDragAndDrop(this.questionsContainer(), '.move-form-question-button', 'questions');

        // Test add sections and questions
        //var sec = this._questionnaireService.addSection();

        //var q1 = sec.addQuestion();
        //var q2 = sec.addQuestion();
        //var q3 = sec.addQuestion();
        //q1.addAnswer();
        //q1.addAnswer();
        //q1.addAnswer();
        //q2.addAnswer();
        //q2.addAnswer();
        //q2.addAnswer();
        //q3.addAnswer();
        //q3.addAnswer();
        //q3.addAnswer();

        //var qq1 = this._questionnaireService.addQuestion();
        //var qq2 = this._questionnaireService.addQuestion();
        //qq1.addAnswer();
        //qq1.addAnswer();
        //qq2.addAnswer();
        //qq2.addAnswer();
    }

    questionsContainer() {
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        return $(this.elementRef.nativeElement).find('#questions');
    }

    sectionsContainer() {
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