//noinspection TypeScriptCheckImport
import {Injectable} from 'angular2/core';

// Storage with questionnaire's data
import {QUESTIONNAIRE} from '../mocks/questionnaire-storage';

import {Section} from "../entity/section";
import {Question} from "../entity/question";
import {Questionnaire} from "app/entity/questionnaire";
import {QuestionnaireComponent} from "../components/questionnaire.component";

import {SectionCollection} from "../collections/section-collection";
import {QuestionCollection} from "../collections/question-collection";
import {AnswerCollection} from "../collections/answer-collection";
import {Answer} from "../entity/answer";
import {AlertOptions} from "../entity/alertoptions";
import {Image} from "../entity/image";

@Injectable()
export class QuestionnaireService {

    component: QuestionnaireComponent;

    getQuestionnaire(): Questionnaire {
        return QUESTIONNAIRE;
    }

    addSection(item: Section = null): Section {
        return QUESTIONNAIRE.addSection(item);
    }

    addQuestion(item: Question = null): Question {
        return QUESTIONNAIRE.addQuestion(item);
    }

    getSections(): Section[] {
        return QUESTIONNAIRE.getSections();
    }

    getQuestions(): Question[] {
        return QUESTIONNAIRE.getQuestions();
    }

    removeQuestion(question: Question): void {
        QUESTIONNAIRE.removeQuestion(question);
    }

    removeSection(section: Section): void {
        QUESTIONNAIRE.removeSection(section);
    }

    buildQuestionnaire(dataJson: string, images: any[]): void {

        let parsedQuestionnaireData = JSON.parse(dataJson);
        let questionnaire = new Questionnaire({
            id: parsedQuestionnaireData.id,
            name: parsedQuestionnaireData.name,
            formula: parsedQuestionnaireData.formula,
            fractionLength: parsedQuestionnaireData.fractionLength,
            displayingFormat: parsedQuestionnaireData.displayingFormat,
            alertOptions: new AlertOptions({
                type: parsedQuestionnaireData.alertOptions.type,
                text: parsedQuestionnaireData.alertOptions.text,
                severity: parsedQuestionnaireData.alertOptions.severity,
                condition: parsedQuestionnaireData.alertOptions.condition
            }),
            sections: this.buildSections(parsedQuestionnaireData.sections, images),
            questions: this.buildQuestions(parsedQuestionnaireData.questions, images),
            image: new Image(images[parsedQuestionnaireData.image])
        });
        QUESTIONNAIRE = questionnaire;

        // Refresh component view
        this.component.item = QUESTIONNAIRE;
        this.component.qsections = QUESTIONNAIRE.getSections();
        this.component.qquestions = QUESTIONNAIRE.getQuestions();
    }

    buildAnswers(dataAnswers: any): AnswerCollection {
        let answerCollection = new AnswerCollection();
        dataAnswers.forEach((data) => {
            answerCollection.addItem(new Answer({
                id: data.id,
                text: data.text,
                score: data.score
            }));
        });
        return answerCollection;
    }

    buildQuestions(dataQuestions: any, images: any[]): QuestionCollection {
        let questionCollection = new QuestionCollection();
        dataQuestions.forEach((data) => {
            questionCollection.addItem(new Question({
                id: data.id,
                choiseType: data.choiseType,
                formula: data.formula,
                text: data.text,
                required: data.required,
                enabled: data.enabled,
                alertOptions: this.buildAlertOptions(data.alertOptions),
                answers: this.buildAnswers(data.answers),
                image: new Image(images[data.image])
            }));
        });
        return questionCollection;
    }

    buildSections(dataSections: any, images: any[]): SectionCollection {
        let sectionCollection = new SectionCollection();
        dataSections.forEach((data) => {
            sectionCollection.addItem(new Section({
                id: data.id,
                name: data.name,
                formula: data.formula,
                enabled: data.enabled,
                minRequired: data.minRequired,
                alertOptions: this.buildAlertOptions(data.alertOptions),
                questions: this.buildQuestions(data.questions, images),
                image: new Image(images[data.image])
            }));
        });
        return sectionCollection;
    }

    buildAlertOptions(dataAlertOptions: any): AlertOptions {
        let alertOptions = new AlertOptions({
            type: dataAlertOptions.type,
            text: dataAlertOptions.text,
            severity: dataAlertOptions.severity,
            condition: dataAlertOptions.condition
        });
        return alertOptions;
    }
}