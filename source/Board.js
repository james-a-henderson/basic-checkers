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
    this.currentPlayer = playerEnum.PLAYER1;
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

        let currentPiece = this.board[row][column];

        if(currentPiece === boardSpaceEnum.EMPTY || currentPiece === boardSpaceEnum.UNREACHABLE){
            return output;
        }

        let hostilePieces = [];

        //determine which pieces are hostile
        if(currentPiece === boardSpaceEnum.PLAYER1 || currentPiece === boardSpaceEnum.PLAYER1KING){
            hostilePieces = [boardSpaceEnum.PLAYER2, boardSpaceEnum.PLAYER2KING];
        } else if(currentPiece === boardSpaceEnum.PLAYER2 || currentPiece === boardSpaceEnum.PLAYER2KING){
            hostilePieces = [boardSpaceEnum.PLAYER1, boardSpaceEnum.PLAYER1KING];
        } else {
            return output;
        }

        //check for moves above
        if(currentPiece !== boardSpaceEnum.PLAYER1){
            this.checkSpace(output, currentPiece, hostilePieces, row, column, -1, -1);
            this.checkSpace(output, currentPiece, hostilePieces, row, column, -1, 1);
        }

        //check for moves below
        if(currentPiece !== boardSpaceEnum.PLAYER2){
            this.checkSpace(output, currentPiece, hostilePieces, row, column, 1, -1);
            this.checkSpace(output, currentPiece, hostilePieces, row, column, 1, 1);
        }

        return output;
    }

    this.checkSpace = function(output, currentPiece, hostilePieces, row, column, rowDirection, columnDirection){

        let checkedRow = row + rowDirection;
        let checkedColumn = column + columnDirection;

        //if checked space is outside of board
        if(checkedRow < 0 || checkedRow >= this.board.length || checkedColumn < 0 || checkedColumn >= this.board[checkedRow].length){
            return;
        }

        if(this.board[checkedRow][checkedColumn] === boardSpaceEnum.EMPTY){

            if(!output.hasJumps){  //do not add regular moves if jumps are available
                output.moves.push([checkedRow, checkedColumn]);
            }                  
        } else if(checkedRow < this.board.length - 1 && checkedRow > 0 && checkedColumn && checkedColumn < this.board[row].length - 1 && checkedColumn > 0){ //check to see if a jump is available

            if(hostilePieces.includes(this.board[checkedRow][checkedColumn])){

                if(this.board[checkedRow + rowDirection][checkedColumn + columnDirection] === boardSpaceEnum.EMPTY){
                    output = cleanOutput(output);
                    output.moves.push([checkedRow + rowDirection, checkedColumn + columnDirection]);
                }

            }
        }
    }

    this.getPiecesWithAvailableMoves = function(player){
        if(player !== playerEnum.PLAYER1 && player !== playerEnum.PLAYER2) {
            throw 'Invalid Player';
        }

        let playerPieces = [];
        let piecesWithMoves = [];
        let jumpsAvailable = false;

        //get array of player's pieces
        if(player === playerEnum.PLAYER1){
            playerPieces = [boardSpaceEnum.PLAYER1, boardSpaceEnum.PLAYER1KING];
        } else{
            playerPieces = [boardSpaceEnum.PLAYER2, boardSpaceEnum.PLAYER2KING];
        }

        for(let i = 0; i < this.board.length; i++){
            for(let j = 0; j < this.board[i].length; j++) {
                if(!playerPieces.includes(this.board[i][j])){
                    continue;
                }

                let availabeMoves = this.availableMovesForPiece(i, j);

                if(availabeMoves.moves.length <= 0){
                    continue;
                }
                
                //jumps found; only pieces with jumps are added
                if(jumpsAvailable) {
                    if(availabeMoves.hasJumps){
                        piecesWithMoves.push([i, j]);
                    }
                } else {  //jumps not found

                    //if piece has jumps with no other jumps found, clear previously found moves
                    if(availabeMoves.hasJumps) {  
                        jumpsAvailable = true;
                        piecesWithMoves = [];
                        piecesWithMoves.push([i, j]);
                    } else{
                        piecesWithMoves.push([i, j]);
                    }
                }
            }
        }

        return piecesWithMoves;
    }

    function cleanOutput(output){
        if(output.hasJumps){
            return output;
        }

        output.moves = [];
        output.hasJumps = true;

        return output;
    }

    //todo: enable chaining jumps
    this.makeMove = function(startRow, startColumn, destinationRow, destinationColumn){
        //ensure selected piece is an actual piece
        if(this.board[startRow][startColumn] === boardSpaceEnum.EMPTY || this.board[startRow][startColumn] === boardSpaceEnum.UNREACHABLE){
            throw 'No piece on selected space';
        }

        //ensure selected piece is one of current player's pieces
        if(this.currentPlayer === playerEnum.PLAYER1){
            if(this.board[startRow][startColumn] !== boardSpaceEnum.PLAYER1 && this.board[startRow][startColumn] !== boardSpaceEnum.PLAYER1KING){
                throw "Piece is not current player's";
            }
        } else if(this.currentPlayer === playerEnum.PLAYER2) {
            if(this.board[startRow][startColumn] !== boardSpaceEnum.PLAYER2 && this.board[startRow][startColumn] !== boardSpaceEnum.PLAYER2KING){
                throw "Piece is not current player's";
            }
        }

        let piecesWithMoves = this.getPiecesWithAvailableMoves(this.currentPlayer);
        if(!verifyPieceSelectionIsValid(piecesWithMoves, startRow, startColumn)){
            throw 'Invalid Piece selection';
        }

        let pieceMoves = this.availableMovesForPiece(startRow, startColumn);
        if(!verifyMoveIsValid(pieceMoves, destinationRow, destinationColumn)){
            throw 'Invalid Move';
        }
        
        this.board[destinationRow][destinationColumn] = this.board[startRow][startColumn];
        this.board[startRow][startColumn] = boardSpaceEnum.EMPTY;

        //If a jump was available, only jumps are valid
        if(pieceMoves.hasJumps) {
            //remove piece in between the start and destination spaces
            let jumpedRow = (startRow + destinationRow) / 2;
            let jumpedColumn = (startColumn + destinationColumn) / 2;

            this.board[jumpedRow][jumpedColumn] = boardSpaceEnum.EMPTY;
        }

        //promote piece
        if(this.currentPlayer === playerEnum.PLAYER1 && destinationRow === this.board.length - 1){
            this.board[destinationRow][destinationColumn] = boardSpaceEnum.PLAYER1KING;
        } else if(this.currentPlayer === playerEnum.PLAYER2 && destinationRow === 0) {
            this.board[destinationRow][destinationColumn] = boardSpaceEnum.PLAYER2KING;
        }

        this.swapCurrentPlayer();
    }

    function verifyPieceSelectionIsValid(piecesWithMoves, startRow, startColumn){
        let filteredPieces = piecesWithMoves.filter(thisPiece =>(thisPiece[0] === startRow && thisPiece[1] === startColumn));
        if(filteredPieces.length === 0){
            return false;
        }

        return true;
    }

    function verifyMoveIsValid(pieceMoves, destinationRow, destinationColumn){
        let filteredMoves = pieceMoves.moves.filter(thisMove => (thisMove[0] === destinationRow && thisMove[1] === destinationColumn));
        if(filteredMoves.length === 0){
            return false
        }

        return true;
    }

    this.swapCurrentPlayer = function(){
        if(this.currentPlayer === playerEnum.PLAYER1){
            this.currentPlayer = playerEnum.PLAYER2;
        } else{
            this.currentPlayer = playerEnum.PLAYER1;
        }
    }
}