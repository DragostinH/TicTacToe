const gameBoard = (() => {
    let multiArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    const cells = document.getElementsByClassName('squares');
    const cellsArray = Array.from(cells);
    cellsArray.forEach(e=>{e.addEventListener('click',()=>{
        console.log(`you clicked ${e.textContent}`);
    })})
    console.log(cells);
    console.log(cellsArray);

    for (let i = 0; i < multiArray.length; i++) {
        let counter = 0;
        for (let j = 0; j < multiArray[i].length; j++) {
            multiArray[i][j] = cellsArray[counter]; 
        }        
    }

    return { multiArray };



})();

console.log(gameBoard.multiArray);



// game starts -> board is loaded -> players loaded -> P1 turn -> click on square -> event fires -