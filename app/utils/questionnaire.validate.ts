import {QuestionnaireComponent} from "../components/questionnaire.component";
import {Section} from "../entity/section";
import {Question} from "../entity/question";

export class QuestionnaireValidate {

    constructor() { }

    // @todo implements validate isIdExist
    isIdExist(component: QuestionnaireComponent): boolean {
        console.log('Validate: isIdExist');

        return true;
    }

    // @todo implements validate isIdUnique
    isIdUnique(component: QuestionnaireComponent): any[] {
        console.log('Validate: isIdUnique eventObj => ', component);

        //noinspection TypeScriptUnresolvedVariable
        let inputedId = event.target.value;
        console.log('inputedId => ', inputedId);

        let equallyIdElements = [];

        // Check questionnaire
        component.item.haveEqualIdError = false;
        //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
        if ($(component.elementRef.nativeElement).find('input#q-id').val() === inputedId) {
            equallyIdElements.push(component.item);
        }

        // Check sections
        component.item.getSections().forEach((section: Section) => {

            //noinspection TypeScriptUnresolvedFunction
            let sectionId = $(section.elementRef.nativeElement).find('input.q-section-id').val();

            section.haveEqualIdError = false;
            if (inputedId === sectionId) {
                equallyIdElements.push(section);
            }

            // Check Section Questions
            this.checkQuestions(section, inputedId).forEach((question) => {
                equallyIdElements.push(question);
            })
        });

        //Check Q Questions
        this.checkQuestions(component.item, inputedId).forEach((question) => {
            equallyIdElements.push(question);
        })

        console.log('equallyIdElemets => ', equallyIdElements);
        if (equallyIdElements.length > 1) {
            console.log('!!! SHOW ERROR MESSAGE !!!');
            equallyIdElements.forEach((elem: any) => {
                elem.haveEqualIdError = true;
            });
        }

        // Must return array of components that have equally ids
        return equallyIdElements;
    }

    private checkQuestions(parentQuestions: any, inputedId: string): Question[] {

        let equallyIdElements = [];

        parentQuestions.getQuestions().forEach((question: Question) => {

            //noinspection TypeScriptUnresolvedFunction
            let questionId = $(question.elementRef.nativeElement).find('input.q-question-id').val();

            question.haveEqualIdError = false;
            if (inputedId === questionId) {
                equallyIdElements.push(question);
            }
        });
        return equallyIdElements;
    }
}