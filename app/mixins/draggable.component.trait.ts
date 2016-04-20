export class DraggableComponentTrait {

    item: any;

    initializeDragAndDrop(container, selectorMove, collectionName): void {
        //noinspection TypeScriptUnresolvedFunction
        let elemDrake = dragula(container.toArray(), {
            moves: function (el, source, handle) {
                //noinspection TypeScriptUnresolvedFunction
                let aButton = $(handle).closest(selectorMove);
                return aButton.length;
            },
            direction: 'vertical',
            ignoreInputTextSelection: true
        });
        elemDrake.on('drop', el => {
            this.item[collectionName].sortBySelectorsOrder();
        });
    }
}