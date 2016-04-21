import {Answer} from "../entity/answer";

export interface IAnswerKeeper {

    addAnswer(item: Answer = null): Answer;
    getAnswers(): Answer[];
    getAnswer(id: string) : Answer;
    removeAnswer(item: Answer): void;

}