import {Section} from "../entity/section";

export interface ISectionKeeper {

    addSection(item: Section = null): Section;
    getSections(): Section[];
    getSection(id: string): Section;
    removeSection(item: Section): void;
}