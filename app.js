let test = document.querySelector('#p1-name');
console.log(test)

const gameBoard = (() => {
    let multiArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    const cells = document.getElementsByClassName('squares');
    const cellsArray = Array.from(cells);
    let gameSetupForm = document.querySelector('.player-form');


    function hideForm() {
        const playButton = document.querySelector('.play-button');
        playButton.addEventListener('click', () => {
            gameSetupForm.style.display = 'none';
        })
    }

    function showForm() {
        const gameSettingsButton = document.querySelector('.game-settings-button');
        gameSettingsButton.addEventListener('click', () => {
            gameSetupForm.style.display = 'flex';
        })
    }


    const createParagraph = () => {
        return document.createElement('p');
    }

    for (let i = 0; i < cellsArray.length; i++) {
        cellsArray[i].appendChild(createParagraph());
    }

    function clearBoard(nodeArray = document.getElementsByClassName('squares'), turns = document.querySelector('.turns-sp')) {
        turns.textContent = 0;

        for (let j = 0; j < nodeArray.length; j++) {
            nodeArray[j].lastChild.textContent = '';
        }



    }

    function refreshArray(twoDimensionArray, arr) {
        let counter = 0;

        if (twoDimensionArray.length > 0 && arr.length > 0) {
            for (let i = 0; i < twoDimensionArray.length; i++) {
                for (let j = 0; j < twoDimensionArray[i].length; j++) {
                    twoDimensionArray[i][j] = '';

                }
            }

            for (let i = 0; i < twoDimensionArray.length; i++) {

                for (let j = 0; j < twoDimensionArray[i].length; j++) {
                    twoDimensionArray[i][j] = arr[counter]
                    arr[counter].id = counter;
                    counter++;
                }
            }
        }
        return twoDimensionArray;
    }


    return { multiArray, cellsArray, refreshArray, clearBoard, hideForm, showForm };



})();

const playerFactory = (name, symbol) => {
    name = name.value
    let arr = Array.from(symbol);
    arr.forEach(element =>{
        if(element.checked){
            console.log(element);
            symbol = element.nextElementSibling;
        }
    })

    return { name, symbol };
}

const displayController = (() => {
    gameBoard.hideForm();
    gameBoard.showForm();
    const getP1Name = document.querySelector('#p1-name');
    const getP1Symbol = document.querySelector('.rating-form1')
    const getP2Name = document.querySelector('#p2-name');
    const getP2Symbol = document.querySelector('.rating-form2')
    const p1 = playerFactory(getP1Name, getP1Symbol);
    const p2 = playerFactory(getP2Name, getP2Symbol);
    console.log(p1.name);
    console.log(p2.name);
    console.log(p1.symbol)
    console.log(p2.symbol)


    let numberOfTurns;
    const clearButton = document.querySelector('.clear-button').addEventListener('click', () => {
        gameBoard.clearBoard(document.getElementsByClassName('squares'), numberOfTurns);

    })

    let twoDimArray = gameBoard.refreshArray(gameBoard.multiArray, gameBoard.cellsArray);
    let domArray = gameBoard.cellsArray;

    let isThereAWinner;
    let currentPlayer;

    function getPlayerSymbol(player) {
        return player.symbol;
    }

    function getLastChildTextContent(param) {
        return param.lastChild.textContent;
    }


    winCondition = (player, arr, turns) => {

        if (arr[0][0].lastChild.textContent === player.symbol &&
            arr[0][1].lastChild.textContent === player.symbol &&
            arr[0][2].lastChild.textContent === player.symbol) {
            console.log(`The winner is ${player.name}. They got 3 TOP across on the ${turns} turn`);
            return true;
        }
        if (arr[1][0].lastChild.textContent === player.symbol &&
            arr[1][1].lastChild.textContent === player.symbol &&
            arr[1][2].lastChild.textContent === player.symbol) {
            console.log(`The winner is ${player.name}. They got 3 MIDDLE across on the ${turns} turn`);
            return true;


        }
        if (arr[2][0].lastChild.textContent === player.symbol &&
            arr[2][1].lastChild.textContent === player.symbol &&
            arr[2][2].lastChild.textContent === player.symbol) {
            console.log(`The winner is ${player.name}. They got 3 BOTTOM across on the ${turns} turn`);
            return true;


        }
        if (arr[0][0].lastChild.textContent === player.symbol &&
            arr[1][1].lastChild.textContent === player.symbol &&
            arr[2][2].lastChild.textContent === player.symbol) {
            console.log(`The winnder is ${player.name}. They got 3 DIAGONALLY on the ${turns} turn`)
            return true;
        }

        if (arr[0][2].lastChild.textContent === player.symbol &&
            arr[1][1].lastChild.textContent === player.symbol &&
            arr[2][0].lastChild.textContent === player.symbol) {
            console.log(`The winnder is ${player.name}. They got 3 DIAGONALLY on the ${turns} turn`)
            return true;
        }


        if (arr[0][0].lastChild.textContent === player.symbol &&
            arr[1][0].lastChild.textContent === player.symbol &&
            arr[2][0].lastChild.textContent === player.symbol) {
            console.log(`The winnder is ${player.name}. They got 3 VERTICALLY on the ${turns} turn`)
            return true;
        }
        if (arr[0][1].lastChild.textContent === player.symbol &&
            arr[1][1].lastChild.textContent === player.symbol &&
            arr[2][1].lastChild.textContent === player.symbol) {
            console.log(`The winnder is ${player.name}. They got 3 VERTICALLY on the ${turns} turn`)
            return true;
        }
        if (arr[0][2].lastChild.textContent === player.symbol &&
            arr[1][2].lastChild.textContent === player.symbol &&
            arr[2][2].lastChild.textContent === player.symbol) {
            console.log(`The winnder is ${player.name}. They got 3 VERTICALLY on the ${turns} turn`)
            return true;
        }

    }

    twoDimArray.forEach(arr => arr.forEach(e => e.addEventListener('click', () => {
        numberOfTurns = document.querySelector('.turns-sp');
        console.log(numberOfTurns);
        if (numberOfTurns.textContent % 2 === 0 &&
            e.lastChild.textContent !== getPlayerSymbol(p1) &&
            e.lastChild.textContent !== getPlayerSymbol(p2)) {

            currentPlayer = p1;
            e.lastChild.appendChild(getPlayerSymbol(p1));
            twoDimArray = gameBoard.refreshArray(twoDimArray, domArray);
            numberOfTurns.textContent++;
            if (numberOfTurns.textContent > 3) {
                isThereAWinner = winCondition(p1, twoDimArray, numberOfTurns);

            }
        } else if (numberOfTurns.textContent % 2 === 1 &&
            e.lastChild.textContent !== getPlayerSymbol(p1) &&
            e.lastChild.textContent !== getPlayerSymbol(p2)) {

            currentPlayer = p2;
            e.lastChild.textContent = getPlayerSymbol(p2);
            twoDimArray = gameBoard.refreshArray(twoDimArray, domArray);
            numberOfTurns.textContent++;
            if (numberOfTurns.textContent > 3) {
                isThereAWinner = winCondition(p1, twoDimArray, numberOfTurns.textContent);

            }

        }

        if (isThereAWinner) {
            isThereAWinner = false;
            alert(`${currentPlayer.name.toUpperCase()} won the game`)
            gameBoard.clearBoard();
            console.log(numberOfTurns)
        } else if (!isThereAWinner && numberOfTurns.textContent === '9') {
            alert(`THIS WAS A TIE`)
            gameBoard.clearBoard();
        }

    })))


})();




