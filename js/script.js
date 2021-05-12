import { cleanEverySelection, watchToUnselect } from './unselect.js';
import { updateWordCount, updateCharacterCount, updateLineCount } from './text-info-functions.js';

//excluir as regexes que não estão sendo usadas
const regex = {
    duplicatedWord: /\b([A-Z]+)\s+\1\b/gi,
    email: /([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/gi,
    brazilianZipCode: /\b[0-9]{5}-[0-9]{3}\b/g,
    ipv4: /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g,
    ipv6: /\b(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\b/g,
    data: /\b(0?[1-9]|[12][0-9]|3[01])([ \/\-])(0?[1-9]|1[012])\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?\b/g,
    cpf: /\b\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}\b/g,
    url: /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/gi,
    deselect: /<span class="regexSelection">.+<\/span>/gi,
    selectedEndingTag: /<\/span>(?<=<span class="regexSelection">.+)/gi,
    begginingTag: /<span class="regexSelection">/g
};

const editor = document.getElementById('editor');
const selectionCollection = document.getElementsByClassName('regexSelection');

const duplicatedWord = document.getElementById('duplicatedWord');
const email = document.getElementById('email');
const brazilianZipCode = document.getElementById('brazilianZipCode');
const ipv4 = document.getElementById('ipv4');
const ipv6 = document.getElementById('ipv6');
const data = document.getElementById('data');
const cpf = document.getElementById('cpf');
const url = document.getElementById('url');


// PAINEL DE INFORMAÇÕES SOBRE O TEXTO

//const numberOfMatches = document.getElementById('numberOfMatches');

editor.addEventListener('input', (e) => {

    updateWordCount(editor, 'words');
    updateCharacterCount(editor, 'characters');
    updateLineCount(editor, 'lines');

    // let text = editor.innerHTML;
    // console.log(text)
    // console.log(editor.children)

    // //let childElements = text.children.length;
    // document.getElementById('numberOfMatches').textContent = 'Resultado: ' + childElements;
});


// BOTÕES DE PESQUISA NO TEXTO

duplicatedWord.addEventListener('click', (e) => {
    findOnText(regex.duplicatedWord);
});
email.addEventListener('click', (e) => {
    findOnText(regex.email);
});
brazilianZipCode.addEventListener('click', (e) => {
    findOnText(regex.brazilianZipCode);
});
ipv4.addEventListener('click', (e) => {
    findOnText(regex.ipv4);
});
ipv6.addEventListener('click', (e) => {
    findOnText(regex.ipv6);
});
data.addEventListener('click', (e) => {
    findOnText(regex.data);
});
cpf.addEventListener('click', (e) => {
    findOnText(regex.cpf);
});
url.addEventListener('click', (e) => {
    findOnText(regex.url);
});
// z.addEventListener('click', (e) => {
//     findOnText(regex.z);
// });




function findOnText(regularExpression) {

    cleanEverySelection(selectionCollection);

    let updatedText = editor.innerHTML
        .replace(regularExpression, (selectedMatch) => {
            return `<span class="regexSelection">${selectedMatch}</span>`
        });

    editor.innerHTML = updatedText;

    watchToUnselect(editor, selectionCollection);

};

// colar da área de tranferência para o #editor apenas texto, sem rich content

editor.addEventListener('paste', (e) => {
    e.preventDefault();
    let text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
});

//quando copio sem usar o botão ele copia com a seleção e depois buga tudo quando colo

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

// FOOTER

const footerYear = document.getElementById('footerYear');
const currentYear = new Date().getFullYear().toString();
footerYear.textContent = currentYear;