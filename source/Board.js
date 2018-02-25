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

    this.availableMovesForPiece = function(row, column) {
        let output = {
            hasJumps: false,
            moves: [],
        };

        if(this.board[row][column] === boardSpaceEnum.EMPTY || this.board[row][column] === boardSpaceEnum.UNREACHABLE){
            return output;
        }

        //check for moves above
        if(this.board[row][column] !== boardSpaceEnum.PLAYER1){
            if(row > 0){
                if(column > 0){
                    output.moves.push([row - 1, column - 1]);
                }

                if(column < this.board[row].length - 1){
                    output.moves.push([row - 1, column + 1]);
                }
            }
        }

        //check for moves below
        if(this.board[row][column] !== boardSpaceEnum.PLAYER2){
            if(row < this.board.length - 1){
                if(column > 0){
                    output.moves.push([row + 1, column - 1]);
                }

                if(column < this.board[row].length - 1){
                    output.moves.push([row + 1, column + 1])
                }
            }
        }

        return output;
    }
}