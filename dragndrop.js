// TODO: keyboard controls, accessibility labels, modularize as class

var dragGroup;
var dragChildren;

function dragParent(element) {
    element.draggable = false;
    element.parentElement.draggable = true;
    dragGroup = element.parentElement.dataset.dragGroup;
    dragChildren = element.parentElement.dataset.dragChildren;
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    var elem;
    if (dragChildren) {
        elem = getParentWithClass(event.target, "drag-container");
        
        for (let dataContainer of [...document.querySelectorAll(".drag-container")])
            dataContainer.classList.remove("target");
        
        if (!elem.querySelector(`[data-drag-group="${dragGroup}"]`))
            return;
        
        elem.classList.add("target");
    } else {
        elem = getParentWithClass(event.target, "drag-target");

        document.querySelectorAll(`[data-drag-group="${dragGroup}"]`).forEach(e => {
            e.classList.remove("target");
        });

        if (elem.dataset.dragGroup !== dragGroup)
            return;

        elem.classList.add("target");
    }
}

function getParentWithClass(elem, className) {
    return elem && (elem.classList.contains(className) ? elem : getParentWithClass(elem.parentElement, className));
}

function dragEnd(event) {
    event.target.style.opacity = 1;
    let dropTarget = document.querySelector(".target");
    const dropSource = dragChildren ?
        getParentWithClass(event.target, "drag-container") :
        getParentWithClass(event.target, "drag-target");
    const sourceTextArea = dropSource?.querySelector(`*[data-drag-group="${dragGroup}"] textarea`);

    if (!sourceTextArea)
        return;

    if (dropTarget) {
        const targetTextArea = dropTarget.querySelector("textarea");
        if (targetTextArea?.dataset.dragGroup === sourceTextArea.dataset.dragGroup) {
            swapText(sourceTextArea, targetTextArea);
            if (dragChildren) {
                const sourceChildren = [...dropSource.querySelectorAll(`*[data-drag-group="${dragChildren}"] textarea`)];
                const targetChildren = [...dropTarget.querySelectorAll(`*[data-drag-group="${dragChildren}"] textarea`)];
                if (sourceChildren.length !== targetChildren.length) {
                    console.warn("Could not swap child element text because the list of child elements were different lengths.");
                } else {
                    for (let i = 0; i < sourceChildren.length; i++) {
                        swapText(sourceChildren[i], targetChildren[i]);
                    }
                }
            }
        }
        dropTarget.classList.remove("target");
    }
    event.target.draggable = false;
    for (let dragHandle of [...document.querySelectorAll(".drag-handle")])
        dragHandle.draggable = true;
}

function swapText(textArea1, textArea2) {
    // Contents switch instead of shifting to help overall preservation of grouping with parents.
    const inBetween = textArea1.value;
    textArea1.value = textArea2.value;
    textArea2.value = inBetween;
}