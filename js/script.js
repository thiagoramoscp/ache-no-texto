//import está fazendo findOnText ficar undefined
//import { cleanEverySelection } from 'unselect';

const regex = {
    duplicatedWords: /\b([A-Z]+)\s+\1\b/gi,
    email: /([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/gi,
    brazilianZipCode: /\b[0-9]{5}-[0-9]{3}\b/g,
    deselect: /<span class="regexSelection">.+<\/span>/gi,
    selectedEndingTag: /<\/span>(?<=<span class="regexSelection">.+)/gi,
    begginingTag: /<span class="regexSelection">/g
};

const editor = document.getElementById('editor');
const selectionCollection = document.getElementsByClassName('regexSelection');


function findOnText(regularExpression) {

    if (selectionCollection.length > 0) {
        for (let i = selectionCollection.length; i > 0; i--) {
            console.log(selectionCollection[0])
            editor.insertBefore(selectionCollection[0].firstChild, selectionCollection[0]);
            editor.removeChild(selectionCollection[0]);
        }
    }

    let updatedText = editor.textContent
        .replace(regularExpression, (selectedMatch) => {
            return `<span class="regexSelection">${selectedMatch}</span>`
        });

    editor.innerHTML = updatedText;

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



};