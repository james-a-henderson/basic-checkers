"use strict"

function DisplayBoard(outputTable) {

    this.table = outputTable;
    this.higlightedSpaces = [];

    this.displayBoard = function(board){
        for(let i = 0; i < board.length; i++){
            let row = this.table.rows[i];

            for(let j = 0; j < board[i].length; j++) {
                let cell = row.cells[j];

                clearCell(cell)
                
                let img = document.createElement("img");
                img.width = 50;
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

            img.width = 50;
            img.height = 50;
            
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

    this.highlightPieces = function(board, pieces){

        this.clearHighlights(board);

        for(let coordinate of pieces){
            let cell = this.table.rows[coordinate[0]].cells[coordinate[1]];
            this.higlightedSpaces.push([coordinate[0], coordinate[1]]);

            clearCell(cell)
            let img = document.createElement("img");

            img.width = 50;
            img.height = 50;
            
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
            }

            cell.appendChild(img);
        }
    }

    function clearCell(cell){
        while(cell.hasChildNodes()) {
            cell.removeChild(cell.lastChild);
        }
    }
}