import {Question} from "../entity/question";

export interface IQuestionKeeper {

    addQuestion(item: Question = null): Question;
    getQuestions(): Question[];
    getQuestion(id: string): Question;
    removeQuestion(item: Question): void;
}