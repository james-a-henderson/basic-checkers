"use strict"

let selectionEnum = {
    PIECE_SELECT: 1,
    MOVE_SELECT: 2,
};

function ProcessInput(board, display){

    this.count = 0;
    this.board = board;
    this.display = display;

    this.selectMode = selectionEnum.PIECE_SELECT;
    this.selectedPiece = null;
    this.availablePieceSelections = board.getPiecesWithAvailableMoves(board.currentPlayer);
    this.availableMoves = null;
    
    registerTable(this.display.table, this);

    //initialize display
    this.display.displayBoard(board.board);
    this.display.updateCurrentPlayer(board.currentPlayer)
    this.display.highlightSpaces(board.board, this.availablePieceSelections);

    this.cellProcess = function(row, column){
        if(this.selectMode === selectionEnum.PIECE_SELECT){
            this.selectPiece(row, column);
        } else {
            this.makeMove(row, column);
        }
    }

    this.selectPiece = function(row, column){
        //return if piece cannot be selected
        if(!verifyArrayContainsSpace(this.availablePieceSelections, row, column)){
            return;
        }

        this.selectedPiece = [row, column];
        this.availableMoves = this.board.availableMovesForPiece(row, column).moves;
        this.display.highlightSpaces(this.board.board, this.availableMoves);
        this.display.selectPiece(this.board.board, row, column);
        
        this.selectMode = selectionEnum.MOVE_SELECT;
    }

    this.makeMove = function(row, column){
        if(this.selectedPiece == null){
            throw 'Attempting to make move when no piece is selected';
        }

        if(this.selectedPiece[0] === row && this.selectedPiece[1] === column){
            this.removeSelection();
            return;
        }

        if(!verifyArrayContainsSpace(this.availableMoves, row, column)){
            return;
        }

        this.board.makeMove(this.selectedPiece[0], this.selectedPiece[1], row, column);
        this.display.displayBoard(this.board.board);
        this.availableMoves = null;
        this.availablePieceSelections = this.board.getPiecesWithAvailableMoves(this.board.currentPlayer);
        this.display.highlightSpaces(this.board.board, this.availablePieceSelections);

        this.selectMode = selectionEnum.PIECE_SELECT;
        this.display.updateCurrentPlayer(this.board.currentPlayer);
    }

    this.removeSelection = function(){
        this.display.clearSelection(this.board.board);
        this.selectedPiece = null;
        this.display.highlightSpaces(this.board.board, this.availablePieceSelections);

        this.selectMode = selectionEnum.PIECE_SELECT;
    }
}

function verifyArrayContainsSpace(spaces, row, column){
    if(spaces == null){
        return false;
    }

    let filteredPieces = spaces.filter(thisPiece =>(thisPiece[0] === row && thisPiece[1] === column));
    if(filteredPieces.length === 0){
        return false;
    }

    return true;
}

//Adds an onclick Event to 
function registerTable(table, processInput){
    if(table === null){
        throw 'table not initialized';
    }

    for(let i = 0; i < table.rows.length; i++){
        for(let j = 0; j < table.rows[i].cells.length; j++){

            (function(row, column, processInput){
                table.rows[i].cells[j].onclick = function(){
                    processInput.cellProcess(row, column);
                }
            })(i, j, processInput);
        }
    }
}