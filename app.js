const gameBoard = (() => {
    let multiArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    const cells = document.getElementsByClassName('squares');
    const cellsArray = Array.from(cells);



    const addDivsToArray = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                arr[i][j] = '';
            }
        }

        for (let i = 0; i < arr.length; i++) {
            let counter = 0;
            for (let j = 0; j < arr[i].length; j++) {
                arr[i][j] = cellsArray[counter]
                cellsArray[counter].id = counter;
            }
        }

        return arr;
    }

    return { multiArray, cellsArray, addDivsToArray };



})();

const playerFactory = (name, symbol) => {
    return { name, symbol };
}

const displayController = (() => {
    const playerOne = playerFactory('jeff', 'X');
    const playerTwo = playerFactory('tom', 'O');
    let twoDimArray = gameBoard.multiArray;
    let currentPlayer;
    let numberOfTurns = 4;

    gameBoard.cellsArray.forEach(e => e.addEventListener('click', () => {
        if (numberOfTurns % 2 === 0) {
            e.textContent = playerOne.symbol
            numberOfTurns--
            gameBoard.addDivsToArray(twoDimArray);
            console.log(twoDimArray);
        } else {
            numberOfTurns--
            e.textContent = playerTwo.symbol;
        }


        // numberOfTurns % 2 === 0 ? e.textContent = playerOne.symbol : e.textContent = playerTwo.symbol;

    }))


})();




