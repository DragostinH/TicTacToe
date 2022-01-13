


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
            clearBoard();
            gameSetupForm.style.display = 'none';
        })
    }

    function showForm() {
        const gameSettingsButton = document.querySelector('.game-settings-button');
        gameSettingsButton.addEventListener('click', () => {
            gameSetupForm.style.display = 'flex';
        })
    }


    function clearBoard(nodeArray = document.getElementsByClassName('squares'), turns = document.querySelector('.turns-sp')) {
        turns.textContent = 0;

        for (let j = 0; j < nodeArray.length; j++) {
            while (nodeArray[j].hasChildNodes()) {

                nodeArray[j].removeChild(nodeArray[j].lastChild);
            }
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

const playerFactory = (name, nodeList) => {
    name = name.value
    let symbol;
    // let arr = Array.from(nodeList);
    for (let i = 0; i < nodeList.length; i++) {
        const element = nodeList[i];
        if (element.checked) {
            console.log(element.checked);
            symbol = element.nextElementSibling;
        }
    }

    return { name, symbol };
}

const displayController = (() => {
    // let playerOne;
    // let playerTwo;
    const getP1Name = document.querySelector('#p1-name');
    const getP1Symbol = document.querySelector('.rating-form1')
    const getP2Name = document.querySelector('#p2-name');
    const getP2Symbol = document.querySelector('.rating-form2')
    let arrOne = Array.from(getP1Symbol);
    let arrTwo = Array.from(getP2Symbol)
    let playerOne = playerFactory(getP1Name, arrOne);
    let playerTwo = playerFactory(getP2Name, arrTwo);

    arrOne.forEach(e => e.addEventListener('change', () => {
        playerOne.symbol = e.nextElementSibling

    }))
    arrTwo.forEach(e => e.addEventListener('change', () => {
        playerTwo.symbol = e.nextElementSibling

    }))

    getP1Name.addEventListener('keyup', ()=>{
        playerOne.name = document.querySelector('#p1-name').value;
    })
    getP2Name.addEventListener('keyup', ()=>{
        playerTwo.name = document.querySelector('#p2-name').value;
    })


    gameBoard.hideForm();
    gameBoard.showForm();
    let clonedSymbol;
    console.log(playerOne);
    console.log(playerTwo);


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


    winCondition = (player, arr, turns) => {
        console.log(arr);
        console.log(player.symbol.innerHTML);


        if (
            arr[0][2].lastChild !== null &&
            arr[0][0].lastChild !== null &&
            arr[0][1].lastChild !== null &&
            arr[0][0].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[0][1].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[0][2].lastChild.innerHTML === player.symbol.innerHTML
        ) {
            console.log(`The winner is ${player.name}. They got 3 TOP across on the ${turns} turn`);
            return true;
        }
        if (
            arr[1][0].lastChild !== null &&
            arr[1][2].lastChild !== null &&
            arr[1][1].lastChild !== null &&
            arr[1][0].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[1][1].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[1][2].lastChild.innerHTML === player.symbol.innerHTML
        ) {
            console.log(`The winner is ${player.name}. They got 3 MIDDLE across on the ${turns} turn`);
            return true;
        }
        if (
            arr[2][0].lastChild !== null &&
            arr[2][1].lastChild !== null &&
            arr[2][2].lastChild !== null &&
            arr[2][0].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[2][1].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[2][2].lastChild.innerHTML === player.symbol.innerHTML
        ) {
            console.log(`The winner is ${player.name}. They got 3 BOTTOM across on the ${turns} turn`);
            return true;


        }
        if (
            arr[0][0].lastChild !== null &&
            arr[1][1].lastChild !== null &&
            arr[2][2].lastChild !== null &&
            arr[0][0].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[1][1].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[2][2].lastChild.innerHTML === player.symbol.innerHTML
        ) {
            console.log(`The winnder is ${player.name}. They got 3 DIAGONALLY on the ${turns} turn`)
            return true;
        }

        if (
            arr[0][2].lastChild !== null &&
            arr[2][0].lastChild !== null &&
            arr[1][1].lastChild !== null &&
            arr[0][2].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[2][0].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[1][1].lastChild.innerHTML === player.symbol.innerHTML
        ) {
            console.log(`The winnder is ${player.name}. They got 3 DIAGONALLY on the ${turns} turn`)
            return true;
        }


        if (
            arr[0][0].lastChild !== null &&
            arr[1][0].lastChild !== null &&
            arr[2][0].lastChild !== null &&
            arr[0][0].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[1][0].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[2][0].lastChild.innerHTML === player.symbol.innerHTML
        ) {
            console.log(`The winnder is ${player.name}. They got 3 VERTICALLY on the ${turns} turn`)
            return true;
        }
        if (
            arr[0][1].lastChild !== null &&
            arr[1][1].lastChild !== null &&
            arr[2][1].lastChild !== null &&
            arr[0][1].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[1][1].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[2][1].lastChild.innerHTML === player.symbol.innerHTML
        ) {
            console.log(`The winnder is ${player.name}. They got 3 VERTICALLY on the ${turns} turn`)
            return true;
        }
        if (
            arr[0][2].lastChild !== null &&
            arr[1][2].lastChild !== null &&
            arr[2][2].lastChild !== null &&
            arr[0][2].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[1][2].lastChild.innerHTML === player.symbol.innerHTML &&
            arr[2][2].lastChild.innerHTML === player.symbol.innerHTML
        ) {
            console.log(`The winnder is ${player.name}. They got 3 VERTICALLY on the ${turns} turn`)
            return true;
        }

    }

    twoDimArray.forEach(arr => arr.forEach(e => e.addEventListener('click', () => {
        numberOfTurns = document.querySelector('.turns-sp');
        if (numberOfTurns.textContent % 2 === 0 &&
            e.lastChild === null) {


            currentPlayer = playerOne;
            clonedSymbol = playerOne.symbol.cloneNode(playerOne.symbol);
            console.log(clonedSymbol);
            clonedSymbol.id = Math.ceil(Math.random() * 100);
            e.appendChild(clonedSymbol);
            twoDimArray = gameBoard.refreshArray(twoDimArray, domArray);
            numberOfTurns.textContent++;
            if (numberOfTurns.textContent > 3) {
                isThereAWinner = winCondition(playerOne, twoDimArray, numberOfTurns.textContent);

            }
        } else if (numberOfTurns.textContent % 2 === 1 &&
            e.lastChild === null) {

            currentPlayer = playerTwo;
            clonedSymbol = playerTwo.symbol.cloneNode(playerTwo.symbol);
            clonedSymbol.id = Math.ceil(Math.random() * 100);
            e.appendChild(clonedSymbol);

            twoDimArray = gameBoard.refreshArray(twoDimArray, domArray);
            numberOfTurns.textContent++;

            if (numberOfTurns.textContent > 3) {
                isThereAWinner = winCondition(playerTwo, twoDimArray, numberOfTurns.textContent);

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




