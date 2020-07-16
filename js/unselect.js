export const unselect = (selectionCollection) => {


    const config = { attributes: true, childList: true, subtree: true, characterData: true };

    const observerCallback = (mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type == 'characterData') {
                let selection = mutation.target.parentElement;
                editor.insertBefore(selection.firstChild, selection);
                editor.removeChild(selection);
            }
        }
    }

    let observer = new MutationObserver(observerCallback);

    if (selectionCollection.length > 0) {

        editor.addEventListener('click', e => {
            if (e.target.className === 'regexSelection') {
                let selectionText = e.target.textContent;
                editor.insertBefore(e.target.firstChild, e.target);
                editor.removeChild(e.target);
            }
        });

        for (let i = 0; i < selectionCollection.length; i++) {
            observer.observe(selectionCollection[i], config);
        }

    }
}

export function cleanEverySelection(selectionCollection) {
    if (selectionCollection.length > 0) {
        for (let i = selectionCollection.length; i > 0; i--) {
            editor.insertBefore(selectionCollection[0].firstChild, selectionCollection[0]);
            editor.removeChild(selectionCollection[0]);
        }
    }
}