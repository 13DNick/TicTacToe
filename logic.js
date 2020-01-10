const container = document.querySelector("#container");
let roundCount = 0;

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



//copy array without reference
let array = JSON.parse(JSON.stringify(gameBoardObject.gameBoardArray));
const tileClicked = (buttonID) => {
    roundCount++;

    if(array[buttonID].returnMarker() == ""){
        let div = document.getElementById(buttonID);
        let marker = "";

        if(roundCount % 2 == 0){
            div.style.backgroundImage = "url('oMarker.jpg')";
            marker = "O";
        } else{
            div.style.backgroundImage = "url('xMarker.png')";
            marker = "X";
        }

        array[buttonID].placeMarker(marker);
    }
}


const restartGame = () => {
    array = JSON.parse(JSON.stringify(gameBoardObject.gameBoardArray));
    roundCount = 0;

    for(i = 0; i < array.length; i++){
        console.log(array[i].returnMarker());
    }
}


//TODO
//finish retart game button
//game logic to see who wins the game
//fix X's and O's