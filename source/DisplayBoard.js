"use strict"

function DisplayBoard(outputTable) {

    //constants
    const IMG_WIDTH = 50;
    const IMG_HEIGHT = 50;

    //image files
    const EMPTY_FILE = "../Images/Empty.png";
    const UNREACHABLE_FILE = "../Images/Unreachable.png";
    const PLAYER1_FILE = "../Images/Player1.png";
    const PLAYER2_FILE = "../Images/Player2.png";
    const PLAYER1KING_FILE = "../Images/Player1King.png";
    const PLAYER2KING_FILE = "../Images/Player2King.png";
    const EMPTY_HIGHLIGHT_FILE = "../Images/Highlight.png";
    const PLAYER1_HIGHLIGHT_FILE = "../Images/Player1_Highlight.png";
    const PLAYER2_HIGHLIGHT_FILE = "../Images/Player2_Highlight.png";
    const PLAYER1KING_HIGHLIGHT_FILE = "../Images/Player1King_Highlight.png";
    const PLAYER2KING_HIGHLIGHT_FILE = "../Images/Player2King_Highlight.png";
    const PLAYER1_SELECTED_FILE = "../Images/Player1_Selected.png";
    const PLAYER2_SELECTED_FILE = "../Images/Player2_Selected.png";
    const PLAYER1KING_SELECTED_FILE = "../Images/Player1King_Selected.png";
    const PLAYER2KING_SELECTED_FILE = "../Images/Player2King_Selected.png";

    this.table = outputTable;
    this.higlightedSpaces = [];
    this.selectedPieceRow = -1;
    this.selectedPieceColumn = -1;
    this.currentPlayerDiv = document.getElementById("CurrentPlayer");

    this.displayBoard = function(board){

        //clear any selections
        this.higlightedSpaces = [];
        this.selectedPieceRow = -1;
        this.selectedPieceColumn = -1;

        for(let i = 0; i < board.length; i++){
            let row = this.table.rows[i];

            for(let j = 0; j < board[i].length; j++) {
                let cell = row.cells[j];

                clearCell(cell)
                
                let img = document.createElement("img");
                img.width = IMG_WIDTH;
                img.height = 50;
                
                switch(board[i][j]){
                    case boardSpaceEnum.EMPTY:
                        img.src = EMPTY_FILE;
                        break;
                    case boardSpaceEnum.UNREACHABLE:
                        img.src = UNREACHABLE_FILE;
                        break;
                    case boardSpaceEnum.PLAYER1:
                        img.src = PLAYER1_FILE;
                        break;
                    case boardSpaceEnum.PLAYER2:
                        img.src = PLAYER2_FILE;
                        break;
                    case boardSpaceEnum.PLAYER1KING:
                        img.src = PLAYER1KING_FILE;
                        break;
                    case boardSpaceEnum.PLAYER2KING:
                        img.src = PLAYER2KING_FILE;
                        break;
                }

                cell.appendChild(img);
            }
        }
    }

    this.clearHighlights = function(board){
        for(let coordinate of this.higlightedSpaces){
            let cell = this.table.rows[coordinate[0]].cells[coordinate[1]];

            clearCell(cell)
            let img = document.createElement("img");

            img.width = IMG_WIDTH;
            img.height = IMG_HEIGHT;
            
            switch(board[coordinate[0]][coordinate[1]]){
                case boardSpaceEnum.EMPTY:
                        img.src = EMPTY_FILE;
                        break;
                    case boardSpaceEnum.UNREACHABLE:
                        img.src = UNREACHABLE_FILE;
                        break;
                    case boardSpaceEnum.PLAYER1:
                        img.src = PLAYER1_FILE;
                        break;
                    case boardSpaceEnum.PLAYER2:
                        img.src = PLAYER2_FILE;
                        break;
                    case boardSpaceEnum.PLAYER1KING:
                        img.src = PLAYER1KING_FILE;
                        break;
                    case boardSpaceEnum.PLAYER2KING:
                        img.src = PLAYER2KING_FILE;
                        break;
            }

            cell.appendChild(img);
        }

        this.higlightedSpaces = [];
    }

    this.highlightSpaces = function(board, pieces){

        this.clearHighlights(board);

        for(let coordinate of pieces){
            let cell = this.table.rows[coordinate[0]].cells[coordinate[1]];
            this.higlightedSpaces.push([coordinate[0], coordinate[1]]);

            clearCell(cell)
            let img = document.createElement("img");

            img.width = IMG_WIDTH;
            img.height = IMG_HEIGHT;
            
            switch(board[coordinate[0]][coordinate[1]]){
                case boardSpaceEnum.PLAYER1:
                    img.src = PLAYER1_HIGHLIGHT_FILE;
                    break;
                case boardSpaceEnum.PLAYER2:
                    img.src = PLAYER2_HIGHLIGHT_FILE;
                    break;
                case boardSpaceEnum.PLAYER1KING:
                    img.src = PLAYER1KING_HIGHLIGHT_FILE;
                    break;
                case boardSpaceEnum.PLAYER2KING:
                    img.src = PLAYER2KING_HIGHLIGHT_FILE;
                    break;
                case boardSpaceEnum.EMPTY:
                    img.src = EMPTY_HIGHLIGHT_FILE;
                    break;
                default:
                    throw `Space type with code ${board[coordinate[0]][coordinate[1]]} cannot be highlighted`
            }

            cell.appendChild(img);
        }
    }

    this.selectPiece = function(board, pieceRow, pieceColumn){
        this.clearSelection(board);

        let cell = this.table.rows[pieceRow].cells[pieceColumn];
        this.selectedPieceRow = pieceRow;
        this.selectedPieceColumn = pieceColumn;

        clearCell(cell);
        let img = document.createElement("img");

        img.width = IMG_WIDTH;
        img.height = IMG_HEIGHT;

        switch(board[pieceRow][pieceColumn]){
            case boardSpaceEnum.PLAYER1:
                img.src = PLAYER1_SELECTED_FILE;
                break;
            case boardSpaceEnum.PLAYER2:
                img.src = PLAYER2_SELECTED_FILE;
                break;
            case boardSpaceEnum.PLAYER1KING:
                img.src = PLAYER1KING_SELECTED_FILE;
                break;
            case boardSpaceEnum.PLAYER2KING:
                img.src = PLAYER2KING_SELECTED_FILE;
                break;
            default:
                throw `Space type with code ${board[pieceRow][pieceColumn]} cannot be selected`
        }

        cell.appendChild(img);
    }

    this.clearSelection = function(board){

        if(this.selectedPieceRow < 0 || this.selectedPieceColumn < 0){
            return;
        }

        let cell = this.table.rows[this.selectedPieceRow].cells[this.selectedPieceColumn];

        clearCell(cell);
        let img = document.createElement("img");

        img.width = IMG_WIDTH;
        img.height = IMG_HEIGHT;

        switch(board[this.selectedPieceRow][this.selectedPieceColumn]){
            case boardSpaceEnum.PLAYER1:
                img.src = PLAYER1_FILE;
                break;
            case boardSpaceEnum.PLAYER2:
                img.src = PLAYER2_FILE;
                break;
            case boardSpaceEnum.PLAYER1KING:
                img.src = PLAYER1KING_FILE;
                break;
            case boardSpaceEnum.PLAYER2KING:
                img.src = PLAYER2KING_FILE;
                break;
            default:
                throw `Space type with code ${board[this.selectedPieceRow][this.selectedPieceColumn]} cannot be selected`
        }

        cell.appendChild(img);

        this.selectedPieceRow = -1;
        this.selectedPieceColumn = -1;
    }

    this.updateCurrentPlayer = function(player){
        if(player === playerEnum.PLAYER1){
            this.currentPlayerDiv.innerHTML = "Player 1";
        } else if (player === playerEnum.PLAYER2){
            this.currentPlayerDiv.innerHTML = "Player 2";
        } else {
            throw `Invalid Player: ${player}`;
        }
    }

    function clearCell(cell){
        while(cell.hasChildNodes()) {
            cell.removeChild(cell.lastChild);
        }
    }
}