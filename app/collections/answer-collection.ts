import {Answer} from '../entity/answer';
import {ICollection} from "../interfaces/collection.interface";
import {BaseCollection} from "./base-collection";

export class AnswerCollection extends BaseCollection {

    private items: Answer[];

}
