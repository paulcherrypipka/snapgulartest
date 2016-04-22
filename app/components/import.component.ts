import {Component, ElementRef} from "angular2/core";

import {QuestionnaireService} from "../services/questionnaire.service";

@Component({
    selector: 'import-modal',
    templateUrl: 'app/templates/import.html'
})

export class ImportComponent {

    elementRef: ElementRef;
    selectedImportFileContent: string;
    isValid: boolean;
    images: Object[];

    constructor(private _questionnaireService: QuestionnaireService, elementRef: ElementRef) {
        this.elementRef = elementRef;
        this.isValid = false;
        this.images = [];
    }

    closeModalClick(): void {
        //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
        let modalComponentElement = $(this.elementRef.nativeElement);
        let elementMainBody = modalComponentElement.parents('body');
        modalComponentElement.parent().removeClass('in').slideUp(1000);
        elementMainBody.removeClass('modal-open').find('.modal-backdrop').remove();
    }

    importActionClick(event: any): void {
        if (this.isValid) {
            this._questionnaireService.buildQuestionnaire(this.selectedImportFileContent, this.images);
            this.closeModalClick();
        }
    }

    selectImportFile(event: any): void {

        if (event.srcElement.files[0] instanceof File) {

            // Get extension helper
            let getExtension = (filename) => { return filename.split('.').pop() };
            if (getExtension(event.srcElement.files[0].name) == "zip") {

                let FR = new FileReader();
                FR.onload = (e) => {

                    // !!!WARNING!!! - use jszip v.2.6.0 (version) npm package
                    //
                    //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
                    let zip = new JSZip(e.target.result);

                    for (let filename in zip.files) {

                        let file = zip.files[filename];

                        if (filename == "data.json") {
                            this.selectedImportFileContent = file.asText();
                            this.isValid = true;
                        } else {
                            // If file haven't name then data.json - that meen image
                            this.images[filename] = {
                                name: filename,
                                source: 'data:image/jpeg;base64,' + btoa(file.asBinary())
                            };
                        }
                    }
                };

                FR.readAsBinaryString(event.srcElement.files[0]);
            }
            if (getExtension(event.srcElement.files[0].name) == "json") {
                let FR = new FileReader();
                FR.onload = (e) => {

                    //noinspection TypeScriptUnresolvedVariable
                    this.selectedImportFileContent = e.target.result;
                };
                FR.readAsText(event.srcElement.files[0]);
                this.isValid = true;
            }
        }
    }
}