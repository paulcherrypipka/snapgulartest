import {QuestionnaireComponent} from "../components/questionnaire.component";
import {Section} from "../entity/section";
import {Question} from "../entity/question";

export class QuestionnaireValidate {

    component: any;

    constructor() { }

    isIdExist(questionnaireComponent: QuestionnaireComponent, targetComponent: any): void {

        this.component = questionnaireComponent;

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
            if (!this.idCheckExistHelper(parsedId)) {
                invalidIds.push(parsedId);
                isValid = false;
            }
        }

        if (!isValid) {
            console.log('event => ', event);
            targetComponent.item.haveFormulaError = true;
            targetComponent.invalidIdentifiers = invalidIds.join(', ');
            questionnaireComponent.isGlobalError = true;
        }
    }

    isIdUnique(component: QuestionnaireComponent): void {

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
            this.checkQuestions(section, inputedId).forEach((question) => {
                equallyIdElements.push(question);
            })
        });

        //Check Q Questions
        this.checkQuestions(component.item, inputedId).forEach((question) => {
            equallyIdElements.push(question);
        });

        if (equallyIdElements.length > 1) {
            console.log('!!! SHOW ERROR MESSAGE !!!');
            component.isGlobalError = true;
            equallyIdElements.forEach((elem: any) => {
                elem.haveEqualIdError = true;
            });
        }
    }

    private idCheckExistHelper(id: string): boolean {

        let result = false;
        if (this.component.item.id == id) {
            return true;
        }

        // Check Sections
        let findedSection = this.component.item.getSection(id);
        if (findedSection !== undefined) {
            result = true;
        }

        // Check Q Questions
        let findedQuestion = this.component.item.getQuestion(id);
        if (findedQuestion !== undefined) {
            result = true;
        }

        // Check Q Q Answers
        this.component.item.getQuestions().forEach((question: Question) => {

            let answer = question.getAnswer(id);
            if (answer !== undefined) {
                result = true;
                return false; // forEach() => break;
            }
        });


        this.component.item.getSections().forEach((section: Section) => {

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