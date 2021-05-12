export function updateWordCount(textEl, idOfElToUpdate) {
    let text = textEl.innerText;
    if (text.match(/\b/g) !== null) {
        let wordCount = text.match(/\b/g).length / 2;
        document.getElementById(idOfElToUpdate).innerText = wordCount;
    } else {
        document.getElementById(idOfElToUpdate).innerText = 0;
    }
    // let wordCount = text.trim().replace(/\s+/g, ' ').split(' ').length; //essa estrutura considera [-.,/] como palavras.
    // para funcionar, esta função precisa responder ao evento de input de uma caixa de texto
}

export function updateCharacterCount(textEl, idOfElToUpdate) {
    let text = textEl.textContent;
    document.getElementById(idOfElToUpdate).textContent = text.length;
}

export function updateLineCount(textEl, idOfElToUpdate) {
    let text = textEl.innerText;
    let lineCount = text.split(/\r*\n/).filter(item => item !== "").length;
    document.getElementById(idOfElToUpdate).textContent = lineCount;
    //não sei pq não está funcionando sem o .filter()
}