"use strict"

describe("Tests", function() {

    let startingBoard;
    let emptyBoard;

    beforeEach(function() {
        emptyBoard = [
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
            [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
            [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
            [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
            [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
        ];
        
        startingBoard = [
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1],
            [boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1],
            [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
            [boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE],
            [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2],
            [boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE],
        ];
    });

    function assertBoardsAreEqual(resultBoard, expectedBoard){
        for(let i = 0; i < resultBoard.length; i++){
            for(let j = 0; j < resultBoard[i].length; j++){
                assert.equal(resultBoard[i][j], expectedBoard[i][j], `Space at position ${i}, ${j}; Expected: ${expectedBoard[i][j]} Actual: ${resultBoard[i][j]}`);
            }
        }
    }

    describe("New Board", function() {

        it("Empty board correct demensions", function() {
            let b = new Board(true);
            
            assert.equal(b.board.length, 8);
            for(let i = 0; i < b.board.length; i++){
                assert.equal(b.board[i].length, 8);
            }
        });
    
        it("Empty board generated correctly", function() {
            let b = new Board(true);
            assertBoardsAreEqual(b.board, emptyBoard);
        });
    
        it("Board with starting pieces correct demensions", function() {
            let b = new Board(false);
            
            assert.equal(b.board.length, 8);
            for(let i = 0; i < b.board.length; i++){
                assert.equal(b.board[i].length, 8);
            }
        });
    
        it("Board with starting pieces generated correctly", function() {
    
            let b = new Board(false);
            assertBoardsAreEqual(b.board, startingBoard);
        });
    });
    
    describe("Add piece", function() {

        function makeAddPieceTest(row, column, piece) {
            it(`Piece placed at ${row}, ${column} properly`, function() {
                let b = new Board(true);
    
                let expected = emptyBoard;
                expected[row][column] = piece;
                b.addPiece(row, column, piece);
    
                assertBoardsAreEqual(b.board, expected);
            });
        }

        makeAddPieceTest(0, 1, boardSpaceEnum.PLAYER1);
        makeAddPieceTest(7, 6, boardSpaceEnum.PLAYER2);
        makeAddPieceTest(3, 2, boardSpaceEnum.PLAYER1KING);
        makeAddPieceTest(4, 7, boardSpaceEnum.PLAYER2KING);

        it("Multiple pieces placed", function() {
            let b = new Board(true);

            let expected = emptyBoard;
            expected[0][1] = boardSpaceEnum.PLAYER1;
            b.addPiece(0, 1, boardSpaceEnum.PLAYER1);
            assertBoardsAreEqual(b.board, expected);

            expected[1][2] = boardSpaceEnum.PLAYER2;
            b.addPiece(1, 2, boardSpaceEnum.PLAYER2);
            assertBoardsAreEqual(b.board, expected);

            expected[7][6] = boardSpaceEnum.PLAYER2KING;
            b.addPiece(7, 6, boardSpaceEnum.PLAYER2KING);
            assertBoardsAreEqual(b.board, expected);

            expected[5][0] = boardSpaceEnum.PLAYER1KING;
            b.addPiece(5, 0, boardSpaceEnum.PLAYER1KING);
            assertBoardsAreEqual(b.board, expected);
        });

        it("Piece placed on unreachable space throws exception", function() {
            let b = new Board(true);
            chai.expect(b.addPiece.bind(b, 0, 0, boardSpaceEnum.PLAYER1)).to.throw('Cannot place peice on unreachable space');
        });

        it("Attempting to place an invalid peice throws exception", function() {
            let b = new Board(true);
            chai.expect(b.addPiece.bind(b, 0, 1, boardSpaceEnum.EMPTY)).to.throw('Invalid piece type');
            chai.expect(b.addPiece.bind(b, 0, 1, boardSpaceEnum.UNREACHABLE)).to.throw('Invalid piece type');
            chai.expect(b.addPiece.bind(b, 0, 1, 9)).to.throw('Invalid piece type');
        })

        it("Attempting to place a piece on the same space of another peice throws exception", function() {
            let b = new Board(true);
            b.addPiece(0, 1, boardSpaceEnum.PLAYER1);
            chai.expect(b.addPiece.bind(b, 0, 1, boardSpaceEnum.PLAYER2)).to.throw('Piece already at location');
        })

        it("Piece placed outside board throws exception", function() {
            let b = new Board(true);
            chai.expect(b.addPiece.bind(b, 0, -1, boardSpaceEnum.PLAYER1)).to.throw('Cannot place peice outside of board');
            chai.expect(b.addPiece.bind(b, -1, 0, boardSpaceEnum.PLAYER1)).to.throw('Cannot place peice outside of board');
            chai.expect(b.addPiece.bind(b, 8, 0, boardSpaceEnum.PLAYER1)).to.throw('Cannot place peice outside of board');
            chai.expect(b.addPiece.bind(b, 0, 8, boardSpaceEnum.PLAYER1)).to.throw('Cannot place peice outside of board');
        });
    });
});