import {Section} from "../entity/section";

export interface ISectionKeeper {

    addSection(item: Section = null): Section;
    getSections(): Section[];
    getSection(id: number): Section;

}