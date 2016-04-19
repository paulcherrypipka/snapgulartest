import {Component, OnInit, ElementRef} from "angular2/core";

import {QuestionnaireService} from "../services/questionnaire.service";

@Component({
    selector: 'import-modal',
    templateUrl: 'app/templates/import.html'
})

export class ImportComponent implements OnInit {

    elementRef: ElementRef;
    selectedImportFileContent: string;
    isValid: boolean;

    constructor(private _questionnaireService: QuestionnaireService, elementRef: ElementRef) {
        this.elementRef = elementRef;
        this.isValid = false;
    }

    closeModalClick() {
        //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
        let modalComponentElement = $(this.elementRef.nativeElement);
        let elementMainBody = modalComponentElement.parents('body');
        modalComponentElement.parent().removeClass('in').slideUp(1000);
        elementMainBody.removeClass('modal-open').find('.modal-backdrop').remove();
    }

    importActionClick(event) {
        if (this.isValid) {
            this._questionnaireService.buildQuestionnaire(this.selectedImportFileContent);
            this.closeModalClick();
        }
    }

    selectImportFile(event: any) {
        if (event.srcElement.files[0] instanceof File) {
            console.log('Selected file => ', event.srcElement.files[0]);
            let FR = new FileReader();
            FR.onload = (e) => {
                //noinspection TypeScriptUnresolvedVariable
                this.selectedImportFileContent = e.target.result;
            };
            FR.readAsText(event.srcElement.files[0]);
            this.isValid = true;
        }
    }

    ngOnInit() {
        console.log('Import component init');
    }
}