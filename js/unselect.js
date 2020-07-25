    const config = { subtree: true, characterData: true };

    const observerCallback = (mutationsList, observer) => {
        const editor = document.getElementById('editor');

        if (mutationsList[0].type == 'characterData') {

            console.log(mutationsList[0].target.parentNode)
            console.log(mutationsList[0].target)
            console.log(mutationsList[0])
            let selectionEl = mutationsList[0].target.parentElement;
            editor.insertBefore(mutationsList[0].target, selectionEl);
            editor.removeChild(selectionEl);

            // let selection = mutationsList[0].target.parentNode;
            // // console.log(selection);
            // // console.log(mutation.target);
            // selection.parentNode.insertBefore(selection.firstChild, selection);
            // selection.parentNode.removeChild(selection);

            //$(mutation.target.firstChild).unwrap();
            editor.normalize();

        }

    }
    let observer = new MutationObserver(observerCallback);


    export const watchToUnselect = (editor, selectionCollection) => {


        observer.disconnect();

        if (selectionCollection.length > 0) {

            editor.addEventListener('click', e => {
                //console.log(editor.children)
                if (e.target.className === 'regexSelection') {
                    //observer.disconnect();

                    // //console.log(e.target.parentNode)
                    // //estava só editor
                    // editor.insertBefore(e.target.firstChild, e.target);
                    // editor.removeChild(e.target);
                    // editor.normalize();

                    observer.disconnect(); // so when text is normalized Mut.Obs. does not screw up stuff 
                    $(e.target.firstChild).unwrap();
                    editor.normalize();
                    // reinserting observer on leftover selection tags
                    for (let i = 0; i < selectionCollection.length; i++) {
                        observer.observe(selectionCollection[i], config);
                    }
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
                //estava só selectionCollection[0]
                selectionCollection[0].parentNode.insertBefore(selectionCollection[0].firstChild, selectionCollection[0]);
                selectionCollection[0].parentNode.removeChild(selectionCollection[0]);
                editor.normalize();
            }
        }

    }









    // tirei (attributes: true, subtree: true, childlist: true) do m.o. config