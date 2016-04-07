//noinspection TypeScriptCheckImport
import {Injectable} from 'angular2/core';

// Storage with questionnaire's data
import {QUESTIONNAIRE} from '../mocks/questionnaire-storage';

import {Section} from "../entity/section";
import {Question} from "../entity/question";

@Injectable()
export class QuestionnaireService {

    getQuestionnaire() {
        return QUESTIONNAIRE;
    }

    addSection(item: Section = null): Section {
        console.log('Add section in questionnaire service!');
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
}