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

        // @todo implements - import from archive with IMAGES
        if (event.srcElement.files[0] instanceof File) {

            // Get extension helper
            let getExtension = (filename) => { return filename.split('.').pop() };
            if (getExtension(event.srcElement.files[0].name) == "zip") {

                console.log('IMport components getting ZIP archive');

                let FR = new FileReader();
                //noinspection TypeScriptUnresolvedFunction
                FR.onload = (e) => {

                    // !!!WARNING!!! - use jszip v.2.6.0 (version) npm package
                    //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
                    let zip = new JSZip(e.target.result);
                    for (let filename in zip.files) {
                        let file = zip.files[filename];

                        console.log('Checked filename => ', filename);

                        if (filename == "data.json") {

                            console.log('Found data.json file in archive');

                            this.selectedImportFileContent = file.asText();
                            this.isValid = true;
                        }
                    }
                };
                //FR.readAsBinaryString(event.srcElement.files[0]);
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

    ngOnInit() {
        console.log('Import component init');
    }
}