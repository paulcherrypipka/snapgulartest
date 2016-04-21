import {Question} from '../entity/question';
import {QuestionCollection} from "../collections/question-collection";
import {IQuestionKeeper} from "../interfaces/question-keeper.interface";

export class QuestionKeeperTrait implements IQuestionKeeper {

    questions: QuestionCollection;

    addQuestion(item: Question = null): Question {

        if (item == undefined) {
            item = new Question();
        }
        this.questions.addItem(item);
        return item;
    }

    getQuestions(): Question[] {
        return this.questions.getAll();
    }

    getQuestion(id: string): Question {
        return this.questions.get(id);
    }

    removeQuestion(item: Question): void {
        this.questions.removeItem(item);
    }
}