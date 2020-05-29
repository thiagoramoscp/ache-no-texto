const regex = {
    duplicatedWords: /\b([A-Z]+)\s+\1\b/gi,
    deselect: /<span class="regexSelection">.+<\/span>/gi,
    selectedEndingTag: /<\/span>(?<=<span class="regexSelection">.+)/gi,
    begginingTag: /<span class="regexSelection">/g
};

const editor = document.getElementById('editor');
const output = document.getElementById('output');
const selectionCollection = document.getElementsByClassName('regexSelection');


function findOnText(regularExpression) {


    let updatedText = editor.innerHTML
        .replace(regularExpression, (selectedMatch) => {
            return `<div class="regexSelection">${selectedMatch}</div>`
        });


    output.innerHTML = updatedText;


    if (selectionCollection.length > 0) {

        output.addEventListener('click', e => {
            if (e.target.className === 'regexSelection') {
                let selectionText = e.target.textContent;
                output.insertBefore(e.target.firstChild, e.target);
                output.removeChild(e.target);
            }
        });

    }
    const config = { attributes: true, childList: true, subtree: true, characterData: true };
    const observerCallback = (mutationsList, observer) => {
        console.log(mutationsList);
        for (let mutation of mutationsList) {
            if (mutation.type == 'characterData') {
                console.log(mutation.target.parentElement)
                let selection = mutation.target.parentElement;
                output.insertBefore(selection.firstChild, selection);
                output.removeChild(selection);
            }
        }
    }
    let observer = new MutationObserver(observerCallback);
    observer.observe(output.firstElementChild, config);





};



// unwrapp todos os b elements:

// $(e.target).contents().unwrap();

// ou:
// var b = document.getElementsByTagName('b');

// while(b.length) {
//     var parent = b[ 0 ].parentNode;
//     while( b[ 0 ].firstChild ) {
//         parent.insertBefore(  b[ 0 ].firstChild, b[ 0 ] );
//     }
//      parent.removeChild( b[ 0 ] );
// }