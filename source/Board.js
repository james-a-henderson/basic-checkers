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

    if(startEmpty){
        for(let i = 0; i < 8; i++){
            this.board[i] = [];
            for(let j = 0; j < 8; j++){
                if((i + j) % 2 == 0){
                    this.board[i][j] = boardSpaceEnum.UNREACHABLE;
                } else{
                    this.board[i][j] = boardSpaceEnum.EMPTY;
                }
            }
        }
    } else {
        for(let i = 0; i < 8; i++){
            this.board[i] = [];
            for(let j = 0; j < 8; j++){
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
}