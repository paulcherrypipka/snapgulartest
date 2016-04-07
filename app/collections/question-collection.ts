import {Question} from '../entity/question';
import {ICollection} from "../interfaces/collection.interface";
import {BaseCollection} from "./base-collection";

export class QuestionCollection extends BaseCollection {

    private items: Question[];

}