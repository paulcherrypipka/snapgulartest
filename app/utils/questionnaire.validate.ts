import {QuestionnaireComponent} from "../components/questionnaire.component";
import {Section} from "../entity/section";
import {Question} from "../entity/question";

export class QuestionnaireValidate {

    static Component: any;

    static isIdExist(questionnaireComponent: QuestionnaireComponent, targetComponent: any): void {

        QuestionnaireValidate.Component = questionnaireComponent;

        // Refresh error status
        targetComponent.item.haveFormulaError = false;
        questionnaireComponent.isGlobalError = false;

        //noinspection TypeScriptUnresolvedVariable
        let inputedFormula = event.target.value;
        let idExpr = /{([^{}]+)}/g;

        let matches,
            parsedId,
            isValid = true,
            invalidIds = [];

        while (matches = idExpr.exec(inputedFormula)) {
            parsedId = matches[1];
            if (!QuestionnaireValidate.idCheckExistHelper(parsedId)) {
                invalidIds.push(parsedId);
                isValid = false;
            }
        }

        if (!isValid) {
            targetComponent.item.haveFormulaError = true;
            targetComponent.invalidIdentifiers = invalidIds.join(', ');
            questionnaireComponent.isGlobalError = true;
            QuestionnaireValidate.initGlobalErrorLabel();
        }
    }

    static isIdUnique(component: QuestionnaireComponent): void {

        //noinspection TypeScriptUnresolvedVariable
        let inputedId = event.target.value;
        let equallyIdElements = [];

        // Check questionnaire
        component.item.haveEqualIdError = false;
        component.isGlobalError = false;
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

            // Check Section's Questions
            QuestionnaireValidate.checkQuestions(section, inputedId).forEach((question) => {
                equallyIdElements.push(question);
            })
        });

        //Check Q Questions
        QuestionnaireValidate.checkQuestions(component.item, inputedId).forEach((question) => {
            equallyIdElements.push(question);
        });

        if (equallyIdElements.length > 1) {
            component.isGlobalError = true;
            QuestionnaireValidate.initGlobalErrorLabel();
            equallyIdElements.forEach((elem: any) => {
                elem.haveEqualIdError = true;
            });
        }
    }

    private static idCheckExistHelper(id: string): boolean {

        let result = false;
        if (QuestionnaireValidate.Component.item.id == id) {
            return true;
        }

        // Check Sections
        let findedSection = QuestionnaireValidate.Component.item.getSection(id);
        if (findedSection !== undefined) {
            result = true;
        }

        // Check Q Questions
        let findedQuestion = QuestionnaireValidate.Component.item.getQuestion(id);
        if (findedQuestion !== undefined) {
            result = true;
        }

        // Check Q Q Answers
        QuestionnaireValidate.Component.item.getQuestions().forEach((question: Question) => {

            let answer = question.getAnswer(id);
            if (answer !== undefined) {
                result = true;
                return false; // forEach() => break;
            }
        });


        QuestionnaireValidate.Component.item.getSections().forEach((section: Section) => {

            // Check section's Question
            let question = section.getQuestion(id);
            if (question !== undefined) {
                result = true;
                return false; // break;
            }

            section.getQuestions().forEach((question: Question) => {

                // Check Sec Question's answers
                let answer = question.getAnswer(id);
                if (answer !== undefined) {
                    result = true;
                    return false; // break;
                }
            })
        });
        return result;
    }

    private static initGlobalErrorLabel() {
        let indexError = 0;
        var clickWarn = function() {
            //noinspection TypeScriptUnresolvedFunction
            var errorInputs = $('.form-group.has-error input');
            errorInputs[indexError % errorInputs.length].focus();
            indexError ++;
            return false;
        }
        //noinspection TypeScriptUnresolvedFunction
        $('#ic-global-error-notice-container').unbind('click').bind('click', clickWarn);
    }

    private static checkQuestions(parentQuestions: any, inputedId: string): Question[] {

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