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

@Injectable()
export class QuestionnaireService {

    component: QuestionnaireComponent;

    getQuestionnaire() {
        return QUESTIONNAIRE;
    }

    addSection(item: Section = null): Section {
        return QUESTIONNAIRE.addSection(item);
    }

    addQuestion(item: Question = null): Question {
        return QUESTIONNAIRE.addQuestion(item);
    }

    getSections() {
        return QUESTIONNAIRE.getSections();
    }

    getQuestions() {
        return QUESTIONNAIRE.getQuestions();
    }

    removeQuestion(question: Question) {
        QUESTIONNAIRE.removeQuestion(question);
    }

    removeSection(section: Section) {
        QUESTIONNAIRE.removeSection(section);
    }

    buildQuestionnaire(dataJson: string) {
        // @todo import service operation
        //console.log('importClick event => ', event);
        //noinspection TypeScriptUnresolvedFunction
        //let jsZip = new JSZip();
        let parsedQuestionnaireData = JSON.parse(dataJson);
        let questionnaire = new Questionnaire({
            id: parsedQuestionnaireData.id,
            name: parsedQuestionnaireData.name,
            formula: parsedQuestionnaireData.formula,
            fractionLength: parsedQuestionnaireData.fractionLength,
            displayingFormat: parsedQuestionnaireData.displayingFormat,
            alertOptions: parsedQuestionnaireData.alertOptions,
            sections: this.buildSections(parsedQuestionnaireData.sections),
            questions: this.buildQuestions(parsedQuestionnaireData.questions)
        });
        QUESTIONNAIRE = questionnaire;

        // Refresh component view
        this.component.item = QUESTIONNAIRE;
        this.component.qsections = QUESTIONNAIRE.getSections();
        this.component.qquestions = QUESTIONNAIRE.getQuestions();
    }

    buildAnswers(dataAnswers: any) {
        console.log('Answers => ', dataAnswers);
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

    buildQuestions(dataQuestions: any) {
        console.log('dataQuestions => ', dataQuestions);
        let questionCollection = new QuestionCollection();
        dataQuestions.forEach((data) => {
            questionCollection.addItem(new Question({
                id: data.id,
                choiseType: data.choiseType,
                formula: data.formula,
                text: data.text,
                required: data.required,
                enabled: data.enabled,
                alertOptions: data.alertOptions,
                answers: this.buildAnswers(data.answers),
                // @todo implements image field import
                image: new Image()
            }));
        });
        return questionCollection;
    }

    buildSections(dataSections: any) {
        console.log('dataSections => ', dataSections);
        let sectionCollection = new SectionCollection();
        dataSections.forEach((data) => {
            sectionCollection.addItem(new Section({
                id: data.id,
                name: data.name,
                formula: data.formula,
                enabled: data.enabled,
                minRequired: data.minRequired,
                alertOptions: data.alertOptions,
                questions: this.buildQuestions(data.questions),
                // @todo implements image field import
                image: new Image()
            }));
        });
        return sectionCollection;
    }
}