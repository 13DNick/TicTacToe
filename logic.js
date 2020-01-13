const container = document.querySelector("#container");
let roundCount = 0;

//all winning combos
const winningCombosArray = [[0,1,2],[0,4,8],[0,3,6],[1,4,7],
    [2,1,0],[2,4,6],[2,5,8],[3,4,5],[5,4,3],[6,3,0],[6,4,2],
    [6,7,8],[7,4,1],[8,5,2],[8,4,0],[8,7,6]];

//keeps track of currently marked tiles for either marker    
let markedXTilesArray = [];
let markedOTilesArray = [];

//tile object factory
const tileFactory = (buttonID) => {
    let empty = true;
    let currentMarker = "";
    const id = buttonID;

    const placeMarker = (placedMarker) => {
        empty = false;
        currentMarker = placedMarker;
    }

    const clearTile = () => {
        empty = true; 
        currentMarker = "";
    }

    const isEmpty = () => {
        return empty;
    }

    const returnMarker = () => {
        return currentMarker;
    }

    const returnID = () => {
        return id;
    }

    return {placeMarker, clearTile, isEmpty, returnMarker, returnID};
}

//player object factory
const playerFactory = (playerName, playerMarker) => {
    const name = playerName;
    const marker = playerMarker;

    return {name, marker};
}

//create players
const player1 = playerFactory("Player 1", "X");
const player2 = playerFactory("Player 2", "O");

const gameBoardObject = {
    //make array that stores a tile object with two properties...
    //full or empty --- X or O
    gameBoardArray : []
};

//IFFE (instantly executes)
(() => {

    const makeGrid = () => {
        
        //create divs, buttons, and tiles and add to container
        for(i = 0; i < 9; i++){
            let div = document.createElement("div");
            div.classList.add("tileDiv");
            div.id = i;

            let button = document.createElement("button");
            button.id = i;
            button.style.height = "100%";
            button.style.width = "100%";
            button.style.opacity = "0%";
            
            
            div.appendChild(button);
            div.style.border = "solid"; 
            container.appendChild(div);
                        
            

            //create tile object
            const tile = tileFactory(i);
            
            //add to gameboard array
            gameBoardObject.gameBoardArray.push(tile);

            button.onclick = () =>{
                tileClicked(button.id);
            }
        }
        
    }

    makeGrid();
    
})();

const tileClicked = (buttonID) => {
    
    if(gameBoardObject.gameBoardArray[buttonID].returnMarker() == ""){
        let div = document.getElementById(buttonID);
        let marker = "";
        roundCount++;
        
        if(roundCount % 2 == 0){
            div.style.backgroundImage = "url('oMarker.jpg')";
            marker = "O";
            markedOTilesArray.push(buttonID);
            //console.table(markedOTilesArray);
            checkForWin("O");
        } else{
            div.style.backgroundImage = "url('xMarker.png')";
            marker = "X";
            markedXTilesArray.push(buttonID);
            //console.table(markedXTilesArray);
            checkForWin("X");
        }

        gameBoardObject.gameBoardArray[buttonID].placeMarker(marker);
    }
}

const restartGame = () => {
    //clear tiles
    const tileDivs = document.querySelectorAll(".tileDiv");
    tileDivs.forEach(tile => tile.style.backgroundImage = "");

    roundCount = 0;
    
    //remove markers from tile object
    for(i = 0; i < gameBoardObject.gameBoardArray.length; i++){
        gameBoardObject.gameBoardArray[i].clearTile();
    } 

    for(n = 0; n < markedXTilesArray.length; n++){
        markedXTilesArray.splice(n); 
    }

    for(z = 0; z < markedOTilesArray.length; z++){
        markedOTilesArray.splice(z); 
    }
}

const checkForWin = (marker) => {
    if(roundCount >= 5){
        console.log("checking");
        if(marker == "X"){
           loop1: 
            for(j = 0; j < winningCombosArray.length; j++){
                let winningCount = 0; 
               loop2:
                for(k = 0; k < winningCombosArray[j].length; k++){
                    console.log(winningCombosArray[j][k]);
                    if(markedXTilesArray.includes(winningCombosArray[j][k].toString())){
                        console.log("includes");
                        winningCount++;
                    } else{
                        console.log(" does not include");
                        break loop2; 
                    }

                    if(winningCount == 3){
                        gameWinner("X");
                    }
                }
                console.log(markedXTilesArray);
            }
        } else{
            loop1: 
            for(i = 0; i < winningCombosArray.length; i++){
                let winningCount = 0; 
               loop2:
                for(n = 0; n < winningCombosArray[i].length; n++){
                    console.log(winningCombosArray[i][n]);
                    if(markedOTilesArray.includes(winningCombosArray[i][n].toString())){
                        console.log("includes");
                        winningCount++;
                    } else{
                        console.log(" does not include");
                        break loop2; 
                    }

                    if(winningCount == 3){
                        gameWinner("O");
                    }
                }
            } 
        }
    }
}

const gameWinner = (marker) => {
    if(marker == "X"){
        alert("Player 1 has won the game!")
    } else{
        alert("Player 2 has won the game!")
    }
    restartGame();
}


//TODO
//game tie logic
//clean up UI
//play against AI
//unbeatable AI