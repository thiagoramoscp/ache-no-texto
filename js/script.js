import { cleanEverySelection, unselect } from './unselect.js';

//excluir as regexes que não estão sendo usadas
const regex = {
    duplicatedWord: /\b([A-Z]+)\s+\1\b/gi,
    email: /([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/gi,
    brazilianZipCode: /\b[0-9]{5}-[0-9]{3}\b/g,
    deselect: /<span class="regexSelection">.+<\/span>/gi,
    selectedEndingTag: /<\/span>(?<=<span class="regexSelection">.+)/gi,
    begginingTag: /<span class="regexSelection">/g
};

const editor = document.getElementById('editor');
const selectionCollection = document.getElementsByClassName('regexSelection');

const duplicatedWord = document.getElementById('duplicatedWord');
const email = document.getElementById('email');
const brazilianZipCode = document.getElementById('brazilianZipCode');




duplicatedWord.addEventListener('click', (e) => {
    findOnText(regex.duplicatedWord);
})
email.addEventListener('click', (e) => {
    findOnText(regex.email);
})
brazilianZipCode.addEventListener('click', (e) => {
    findOnText(regex.brazilianZipCode);
})





function findOnText(regularExpression) {

    cleanEverySelection(selectionCollection);

    let updatedText = editor.textContent
        .replace(regularExpression, (selectedMatch) => {
            return `<span class="regexSelection">${selectedMatch}</span>`
        });

    editor.innerHTML = updatedText;

    unselect(selectionCollection);

};




// copy to clipboard button functionallity

const copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', (e) => {
    let range = new Range();
    range.selectNodeContents(editor);

    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

});