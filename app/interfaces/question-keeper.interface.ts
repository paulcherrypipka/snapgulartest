import {Question} from "../entity/question";

export interface IQuestionKeeper {

    addQuestion(item: Question = null): Question;
    getQuestions(): Question[];
    getQuestion(id: number): Question;
    removeQuestion(item: Question);
}