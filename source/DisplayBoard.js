"use strict"

function DisplayBoard(outputTable) {

    //constants
    const imgWidth = 50;
    const imgHeight = 50;


    this.table = outputTable;
    this.higlightedSpaces = [];
    this.selectedPieceRow = -1;
    this.selectedPieceColumn = -1;

    this.displayBoard = function(board){
        for(let i = 0; i < board.length; i++){
            let row = this.table.rows[i];

            for(let j = 0; j < board[i].length; j++) {
                let cell = row.cells[j];

                clearCell(cell)
                
                let img = document.createElement("img");
                img.width = imgWidth;
                img.height = 50;
                
                switch(board[i][j]){
                    case boardSpaceEnum.EMPTY:
                        img.src = "../Empty.png";
                        break;
                    case boardSpaceEnum.UNREACHABLE:
                        img.src = "../Unreachable.png";
                        break;
                    case boardSpaceEnum.PLAYER1:
                        img.src = "../Player1.png";
                        break;
                    case boardSpaceEnum.PLAYER2:
                        img.src = "../Player2.png";
                        break;
                    case boardSpaceEnum.PLAYER1KING:
                        img.src = "../Player1King.png";
                        break;
                    case boardSpaceEnum.PLAYER2KING:
                        img.src = "../Player2King.png";
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

            img.width = imgWidth;
            img.height = imgHeight;
            
            switch(board[coordinate[0]][coordinate[1]]){
                case boardSpaceEnum.EMPTY:
                        img.src = "../Empty.png";
                        break;
                    case boardSpaceEnum.UNREACHABLE:
                        img.src = "../Unreachable.png";
                        break;
                    case boardSpaceEnum.PLAYER1:
                        img.src = "../Player1.png";
                        break;
                    case boardSpaceEnum.PLAYER2:
                        img.src = "../Player2.png";
                        break;
                    case boardSpaceEnum.PLAYER1KING:
                        img.src = "../Player1King.png";
                        break;
                    case boardSpaceEnum.PLAYER2KING:
                        img.src = "../Player2King.png";
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

            img.width = imgWidth;
            img.height = imgHeight;
            
            switch(board[coordinate[0]][coordinate[1]]){
                case boardSpaceEnum.PLAYER1:
                    img.src = "../Player1_Highlight.png";
                    break;
                case boardSpaceEnum.PLAYER2:
                    img.src = "../Player2_Highlight.png";
                    break;
                case boardSpaceEnum.PLAYER1KING:
                    img.src = "../Player1King_Highlight.png";
                    break;
                case boardSpaceEnum.PLAYER2KING:
                    img.src = "../Player2King_Highlight.png";
                    break;
                case boardSpaceEnum.EMPTY:
                    img.src = "../Highlight.png";
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

        img.width = imgWidth;
        img.height = imgHeight;

        switch(board[pieceRow][pieceColumn]){
            case boardSpaceEnum.PLAYER1:
                img.src = "../Player1_Selected.png";
                break;
            case boardSpaceEnum.PLAYER2:
                img.src = "../Player2_Selected.png";
                break;
            case boardSpaceEnum.PLAYER1KING:
                img.src = "../Player1King_Selected.png";
                break;
            case boardSpaceEnum.PLAYER2KING:
                img.src = "../Player2King_Selected.png";
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

        img.width = imgWidth;
        img.height = imgHeight;

        switch(board[this.selectedPieceRow][this.selectedPieceColumn]){
            case boardSpaceEnum.PLAYER1:
                img.src = "../Player1.png";
                break;
            case boardSpaceEnum.PLAYER2:
                img.src = "../Player2.png";
                break;
            case boardSpaceEnum.PLAYER1KING:
                img.src = "../Player1King.png";
                break;
            case boardSpaceEnum.PLAYER2KING:
                img.src = "../Player2King.png";
                break;
            default:
                throw `Space type with code ${board[this.selectedPieceRow][this.selectedPieceColumn]} cannot be selected`
        }

        cell.appendChild(img);

        this.selectedPieceRow = -1;
        this.selectedPieceColumn = -1;
    }

    function clearCell(cell){
        while(cell.hasChildNodes()) {
            cell.removeChild(cell.lastChild);
        }
    }
}