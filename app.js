//Définir des variables des éléments qui vont être séléctionnés
let firstSelectedElement;
let secondSelectedElement;

//Définir une fonction qui créée deux tableaux de cartes
function getValuesArray(cards) {
    const values = [];
    const totalValues = cards.length / 2;

    for (let i = 1; i <= totalValues; i++) {
        values.push(i);
        values.push(i);
    }

    return values;
}

//Définir une fonction qui renvoie un nombre aléatoire
function getRandomNumber(max){
    return Math.floor(Math.random() * (max + 1));
}

//Définir une fonction qui distribue les cartes : on se sert des valeurs des cartes définies dans la première fonction, on leur attribue un nombre aléatoire avec dataset. On déclare un tableau d'images et l'accès à ces images, puis on les attribue à chaque carte.
function distributeValues(cards) {
    const images = Array.from({ length: 15 }, (_, index) => `./assets/images/image${index + 1}.png`);
    let values = getValuesArray(cards);

    cards.forEach(card => {
        const valueIndex = getRandomNumber(values.length - 1);
        const imageIndex = values[valueIndex] - 1;

        card.dataset.value = values[valueIndex];
        card.style.backgroundImage = `url('${images[imageIndex]}')`;

        values.splice(valueIndex, 1);
    });
}


//On définit une fonction qui va reset les éléments : on enlève les class "selected" et on set nos variables sur null
function resetSelectedElements() {
    if (firstSelectedElement) {
        firstSelectedElement.classList.remove('board_card--selected');
    }
    if (secondSelectedElement) {
        secondSelectedElement.classList.remove('board_card--selected');
    }
    firstSelectedElement = null;
    secondSelectedElement = null;
}
//Définir une fonction qui définit les règles :
function initialisation(cards) {
    //Pour chaque carte, quand on clique dessus,
    cards.forEach(card => {
        card.addEventListener('click', () => {
            //si ce n'est pas le premier élément séléctionné,
            if (!firstSelectedElement) {
                //alors ça le devient et on affiche la class "selected".
                firstSelectedElement = card;
                firstSelectedElement.classList.add('board_card--selected');
                //Sinon, si c'est le premier élément séléctionné et que le deuxième élément séléctionné est différent,
            } else if (firstSelectedElement && !secondSelectedElement) {
                //le second élément devient la deuxième carte séléctionnée et on affiche la class 'selected'
                secondSelectedElement = card;
                secondSelectedElement.classList.add('board_card--selected');

                //Si le premier éléent séléctionné est différent du second et si la valeur est la même (en gros si c'est bien deux cartes différentes mais avec la même valeur)
                if (firstSelectedElement !== secondSelectedElement && firstSelectedElement.dataset.value === secondSelectedElement.dataset.value) {
                    //On leur attribue la class "hidden".
                    firstSelectedElement.classList.add('board_card--hidden');
                    secondSelectedElement.classList.add('board_card--hidden');
                    resetSelectedElements();
                    //Sinon, après un délai d'une seconde, la valeur de la carte disparait
                } else {
                    setTimeout(resetSelectedElements, 1000); 
                }
                //Sinon, on reset les éléments, on définit la carte séléctionnée comme la première
            } else {
                resetSelectedElements();
                firstSelectedElement = card;
                firstSelectedElement.classList.add('board_card--selected');
            }
        });
    });

    //Appel de la fonction distribue les cartes
    distributeValues(cards);

    //Appel de la fonction reset
    resetSelectedElements();
}

//Appel de la fonction initialisation
initialisation(document.querySelectorAll('.board_card'));
