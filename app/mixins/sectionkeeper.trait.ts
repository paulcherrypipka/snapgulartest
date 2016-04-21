import {Section} from '../entity/section';
import {SectionCollection} from '../collections/section-collection';
import {ISectionKeeper} from "../interfaces/section-keeper.interface";

export class SectionKeeperTrait implements ISectionKeeper {

    sections: SectionCollection;

    addSection(item: Section = null): Section {

        if (item == undefined) {
            item = new Section();
        }
        this.sections.addItem(item);
        return item;
    }

    getSections(): Section[] {
        return this.sections.getAll();
    }

    getSection(id: string): Section {
        return this.sections.get(id);
    }

    removeSection(item: Section): void {
        this.sections.removeItem(item);
    }
}