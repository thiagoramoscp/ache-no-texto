const regex = {
    duplicatedWords: /\b([A-Z]+)\s+\1\b/gi,
    deselect: /<span class="regexSelection">.+<\/span>/gi,
    selectedEndingTag: /<\/span>(?<=<span class="regexSelection">.+)/gi,
    begginingTag: /<span class="regexSelection">/g
};
// const testex = document.getElementsByTagName('span');
// console.log(testex);
// testex.forEach(element => {
//     element.addEventListener('click', event => console.log(event));
// });

// function teste(e) {

// }

function findOnText(regularExpression) {


    let updatedText = document.getElementById('editor').innerHTML
        .replace(regularExpression, (selectedMatch) => {
            return `<span class="regexSelection" >${selectedMatch}</span>`
        });


    document.getElementById('output').innerHTML = updatedText;


    if (document.getElementsByClassName('regexSelection').length > 0) {

        document.getElementById('output').addEventListener('click', function(e) {
            if (e.target.className === 'regexSelection') {
                e.target.classList.remove('regexSelection');
            }
        });

        document.getElementById('output').addEventListener('keydown', function(e) {
            if (e.target.className === 'regexSelection') {
                e.target.classList.remove('regexSelection');
            }
        });



        // document.getElementsByTagName('span')
        //     .forEach(item => item.addEventListener('keydown', function(e) {
        //         console.log('oi');
        //     }));

    }

    //on keydown/press/up ou on prompt: fazer (span class="selection") sumir.. 
};