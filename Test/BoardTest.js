"use strict"

describe("New Board", function() {

    it("Empty board correct demensions", function() {
        let b = new Board(true);
        
        assert.equal(b.board.length, 8);
        for(let i = 0; i < b.board.length; i++){
            assert.equal(b.board[i].length, 8);
        }
    });

    it("Empty board generated correctly", function() {
        let expectedBoard = [
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
            [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
            [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
            [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
            [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
        ];
        let b = new Board(true);
        for(let i = 0; i < b.board.length; i++){
            for(let j = 0; j < b.board[i].length; j++){
                assert.equal(b.board[i][j], expectedBoard[i][j], `Space at position ${i}, ${j}; Expected: ${expectedBoard[i][j]} Actual: ${b.board[i][j]}`);
            }
        }
    });

    it("Board with starting pieces correct demensions", function() {
        let b = new Board(false);
        
        assert.equal(b.board.length, 8);
        for(let i = 0; i < b.board.length; i++){
            assert.equal(b.board[i].length, 8);
        }
    });

    it("Board with starting pieces generated correctly", function() {
        let expectedBoard = [
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1],
            [boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1],
            [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
            [boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2],
            [boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE],
        ];
        let b = new Board(false);
        for(let i = 0; i < b.board.length; i++){
            for(let j = 0; j < b.board[i].length; j++){
                assert.equal(b.board[i][j], expectedBoard[i][j], `Space at position ${i}, ${j}; Expected: ${expectedBoard[i][j]} Actual: ${b.board[i][j]}`);
            }
        }
    });
});