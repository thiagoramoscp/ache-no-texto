import { cleanEverySelection, unselect } from './unselect.js';
import { updateWordCount, updateCharacterCount, updateLineCount } from './text-info-functions.js';

//excluir as regexes que não estão sendo usadas
const regex = {
    duplicatedWord: /\b([A-Z]+)\s+\1\b/gi,
    email: /([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/gi,
    brazilianZipCode: /\b[0-9]{5}-[0-9]{3}\b/g,
    enderecoIp: /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g,
    data: /\b(0?[1-9]|[12][0-9]|3[01])([ \/\-])(0?[1-9]|1[012])\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?\b/g,
    deselect: /<span class="regexSelection">.+<\/span>/gi,
    selectedEndingTag: /<\/span>(?<=<span class="regexSelection">.+)/gi,
    begginingTag: /<span class="regexSelection">/g
};

const editor = document.getElementById('editor');
const selectionCollection = document.getElementsByClassName('regexSelection');

const duplicatedWord = document.getElementById('duplicatedWord');
const email = document.getElementById('email');
const brazilianZipCode = document.getElementById('brazilianZipCode');
const enderecoIp = document.getElementById('enderecoIp');
const data = document.getElementById('data');
const w = document.getElementById('w');
const y = document.getElementById('y');
const z = document.getElementById('z');

// PAINEL DE INFORMAÇÕES SOBRE O TEXTO

editor.addEventListener('input', (e) => {
    updateWordCount(editor, 'words');

    updateCharacterCount(editor, 'characters');

    updateLineCount(editor, 'lines');
});


// BOTÕES DE PESQUISA NO TEXTO

duplicatedWord.addEventListener('click', (e) => {
    findOnText(regex.duplicatedWord);
})
email.addEventListener('click', (e) => {
    findOnText(regex.email);
})
brazilianZipCode.addEventListener('click', (e) => {
    findOnText(regex.brazilianZipCode);
})
enderecoIp.addEventListener('click', (e) => {
    findOnText(regex.enderecoIp);
})
data.addEventListener('click', (e) => {
        findOnText(regex.data);
    })
    // w.addEventListener('click', (e) => {
    //     findOnText(regex.w);
    // })
    // y.addEventListener('click', (e) => {
    //     findOnText(regex.y);
    // })
    // z.addEventListener('click', (e) => {
    //     findOnText(regex.z);
    // })





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

    cleanEverySelection(selectionCollection);

    let range = new Range();
    range.selectNodeContents(editor);

    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

});