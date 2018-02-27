"use strict"

let boardSpaceEnum = {
    PLAYER1: 1,
    PLAYER1KING: 2,
    PLAYER2: 3,
    PLAYER2KING : 4,
    EMPTY: 5,
    UNREACHABLE: 6,
};

let playerEnum = {
    PLAYER1: 1,
    PLAYER2: 2,
}

function Board(startEmpty) {
    this.board = [];
    let height = 8;
    let width = 8;

    if(startEmpty){ //allow board to start empty for test purposes
        for(let i = 0; i < height; i++){
            this.board[i] = [];
            for(let j = 0; j < width; j++){
                if((i + j) % 2 == 0){
                    this.board[i][j] = boardSpaceEnum.UNREACHABLE;
                } else{
                    this.board[i][j] = boardSpaceEnum.EMPTY;
                }
            }
        }
    } else {
        for(let i = 0; i < height; i++){
            this.board[i] = [];
            for(let j = 0; j < width; j++){
                if((i + j) % 2 == 0){
                    this.board[i][j] = boardSpaceEnum.UNREACHABLE;
                } else if(i <= 2){
                    this.board[i][j] = boardSpaceEnum.PLAYER1;
                } else if(i >= 5){
                    this.board[i][j] = boardSpaceEnum.PLAYER2;
                } else{
                    this.board[i][j] = boardSpaceEnum.EMPTY;
                }
            }
        }
    }

    //for test purposes
    this.addPiece = function(row, column, pieceType) {
        if(row < 0 || row >= this.board.length || column < 0 || column >= this.board[0].length){
            throw 'Cannot place peice outside of board';
        }

        if(this.board[row][column] === boardSpaceEnum.UNREACHABLE) {
            throw 'Cannot place peice on unreachable space';
        }

        if(this.board[row][column] != boardSpaceEnum.EMPTY) {
            throw 'Piece already at location';
        }

        if(pieceType < 1 || pieceType > 4){
            throw 'Invalid piece type';
        }

        this.board[row][column] = pieceType;
    }


    //todo: refactor this mess
    //todo: enable chain jumps
    this.availableMovesForPiece = function(row, column) {
        let output = {
            hasJumps: false,
            moves: [],
        };

        let currentPiece = this.board[row][column];

        if(currentPiece === boardSpaceEnum.EMPTY || currentPiece === boardSpaceEnum.UNREACHABLE){
            return output;
        }

        let friendlyPieces = [];
        let hostilePieces = [];

        if(currentPiece === boardSpaceEnum.PLAYER1 || currentPiece === boardSpaceEnum.PLAYER1KING){
            friendlyPieces = [boardSpaceEnum.PLAYER1, boardSpaceEnum.PLAYER1KING];
            hostilePieces = [boardSpaceEnum.PLAYER2, boardSpaceEnum.PLAYER2KING];
        } else if(currentPiece === boardSpaceEnum.PLAYER2 || currentPiece === boardSpaceEnum.PLAYER2KING){
            friendlyPieces = [boardSpaceEnum.PLAYER2, boardSpaceEnum.PLAYER2KING];
            hostilePieces = [boardSpaceEnum.PLAYER1, boardSpaceEnum.PLAYER1KING];
        } else {
            return output;
        }

        //check for moves above
        if(currentPiece !== boardSpaceEnum.PLAYER1){
            if(row > 0){
                if(column > 0){

                    let checkedRow = row - 1;
                    let checkedColumn = column - 1;

                    if(this.board[checkedRow][checkedColumn] === boardSpaceEnum.EMPTY){

                        if(!output.hasJumps){  //do not add regular moves if jumps are available
                            output.moves.push([checkedRow, checkedColumn]);
                        }                  
                    } else if(checkedRow > 0 && checkedColumn > 0){  //check to see if a jump is available

                        if(hostilePieces.includes(this.board[checkedRow][checkedColumn])){

                            if(this.board[checkedRow - 1][checkedColumn - 1] === boardSpaceEnum.EMPTY){
                                output = cleanOutput(output);
                                output.moves.push([checkedRow - 1, checkedColumn - 1]);
                            }
    
                        }
                    }
                    
                }

                if(column < this.board[row].length - 1){
                    let checkedRow = row - 1;
                    let checkedColumn = column + 1;

                    if(this.board[checkedRow][checkedColumn] === boardSpaceEnum.EMPTY){

                        if(!output.hasJumps){  //do not add regular moves if jumps are available
                            output.moves.push([checkedRow, checkedColumn]);
                        }                  
                    } else if(checkedRow > 0 && checkedColumn < this.board[row].length - 1){ //check to see if a jump is available

                        if(hostilePieces.includes(this.board[checkedRow][checkedColumn])){

                            if(this.board[checkedRow - 1][checkedColumn + 1] === boardSpaceEnum.EMPTY){
                                output = cleanOutput(output);
                                output.moves.push([checkedRow - 1, checkedColumn + 1]);
                            }
    
                        }
                    }
                }
            }
        }

        //check for moves below
        if(currentPiece !== boardSpaceEnum.PLAYER2){
            if(row < this.board.length - 1){
                if(column > 0){

                    let checkedRow = row + 1;
                    let checkedColumn = column - 1;

                    if(this.board[checkedRow][checkedColumn] === boardSpaceEnum.EMPTY){

                        if(!output.hasJumps){  //do not add regular moves if jumps are available
                            output.moves.push([checkedRow, checkedColumn]);
                        }                  
                    } else if(checkedRow < this.board.length - 1 && checkedColumn > 0){ //check to see if a jump is available

                        if(hostilePieces.includes(this.board[checkedRow][checkedColumn])){

                            if(this.board[checkedRow + 1][checkedColumn - 1] === boardSpaceEnum.EMPTY){
                                output = cleanOutput(output);
                                output.moves.push([checkedRow + 1, checkedColumn - 1]);
                            }
    
                        }
                    }
                }

                if(column < this.board[row].length - 1){

                    let checkedRow = row + 1;
                    let checkedColumn = column + 1;

                    if(this.board[checkedRow][checkedColumn] === boardSpaceEnum.EMPTY){

                        if(!output.hasJumps){  //do not add regular moves if jumps are available
                            output.moves.push([checkedRow, checkedColumn]);
                        }                  
                    } else if(checkedRow < this.board.length - 1 && checkedColumn < this.board[row].length - 1){ //check to see if a jump is available

                        if(hostilePieces.includes(this.board[checkedRow][checkedColumn])){

                            if(this.board[checkedRow + 1][checkedColumn + 1] === boardSpaceEnum.EMPTY){
                                output = cleanOutput(output);
                                output.moves.push([checkedRow + 1, checkedColumn + 1]);
                            }
    
                        }
                    }
                }
            }
        }

        return output;
    }

    function cleanOutput(output){
        if(output.hasJumps){
            return output;
        }

        output.moves = [];
        output.hasJumps = true;

        return output;
    }
}