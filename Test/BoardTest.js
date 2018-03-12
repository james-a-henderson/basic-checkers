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

    describe("Available Moves for Individual Piece", function() {
        
        it("No available moves for Empty space", function() {
            let b = new Board(true);

            let result = b.availableMovesForPiece(3, 2);

            assert.equal(result.hasJumps, false);
            assert.equal(result.moves.length, 0);
        });

        it("No available moves for Unreachable space", function() {
            let b = new Board(true);

            let result = b.availableMovesForPiece(3, 3);

            assert.equal(result.hasJumps, false);
            assert.equal(result.moves.length, 0);
        });


        describe("Single piece on otherwise empty board", function() {

            function makeSinglePieceTest(row, column, pieceType, expected) {
                let pieceString = "";

                switch(pieceType) {
                    case boardSpaceEnum.PLAYER1:
                        pieceString = "Player 1";
                        break;
                    case boardSpaceEnum.PLAYER1KING:
                        pieceString = "Player 1 King";
                        break;
                    case boardSpaceEnum.PLAYER2:
                        pieceString = "Player 2";
                        break;
                    case boardSpaceEnum.PLAYER2KING:
                        pieceString = "Player 2 King";
                        break;
                }
                
                it(`${pieceString} at location ${row}, ${column}`, function() {
                    let b = new Board(true);
                    b.addPiece(row, column, pieceType);

                    let result = b.availableMovesForPiece(row, column);
                    assert.equal(result.hasJumps, false, 'Should not have jumps on otherwise empty board');
                    assert.deepEqual(result.moves, expected);
                });
            }

            makeSinglePieceTest(3, 2, boardSpaceEnum.PLAYER1, [[4, 1], [4, 3]]);
            makeSinglePieceTest(0, 3, boardSpaceEnum.PLAYER1, [[1, 2], [1, 4]]);
            makeSinglePieceTest(1, 0, boardSpaceEnum.PLAYER1, [[2, 1]]);
            makeSinglePieceTest(4, 7, boardSpaceEnum.PLAYER1, [[5, 6]]);
            makeSinglePieceTest(4, 5, boardSpaceEnum.PLAYER2, [[3, 4], [3, 6]]);
            makeSinglePieceTest(7, 4, boardSpaceEnum.PLAYER2, [[6, 3], [6, 5]]);
            makeSinglePieceTest(5, 0, boardSpaceEnum.PLAYER2, [[4, 1]]);
            makeSinglePieceTest(4, 7, boardSpaceEnum.PLAYER2, [[3, 6]]);
            makeSinglePieceTest(5, 6, boardSpaceEnum.PLAYER1KING, [[4, 5], [4, 7], [6, 5], [6, 7]]);
            makeSinglePieceTest(7, 0, boardSpaceEnum.PLAYER1KING, [[6, 1]]);
            makeSinglePieceTest(0, 5, boardSpaceEnum.PLAYER1KING, [[1, 4], [1, 6]]);
            makeSinglePieceTest(4, 7, boardSpaceEnum.PLAYER1KING, [[3, 6], [5, 6]]);
            makeSinglePieceTest(4, 1, boardSpaceEnum.PLAYER2KING, [[3, 0], [3, 2], [5, 0], [5, 2]]);
            makeSinglePieceTest(3, 0, boardSpaceEnum.PLAYER2KING, [[2, 1], [4, 1]]);
            makeSinglePieceTest(0, 1, boardSpaceEnum.PLAYER2KING, [[1, 0], [1, 2]]);
            makeSinglePieceTest(4, 7, boardSpaceEnum.PLAYER2KING, [[3, 6], [5, 6]]);
        });

        describe("Piece with single jump move", function() {
            //when a jump is available, only list that move, as the player must jump

            it("Player 1 piece with jump", function() {
                let b = new Board(true);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER1);
                b.addPiece(5, 4, boardSpaceEnum.PLAYER2);

                let expected = [[6, 5]];
                let result = b.availableMovesForPiece(4, 3);
                assert.equal(result.hasJumps, true);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 2 piece with jump", function() {
                let b = new Board(true);
                b.addPiece(7, 2, boardSpaceEnum.PLAYER2);
                b.addPiece(6, 1, boardSpaceEnum.PLAYER1KING);

                let expected = [[5, 0]];
                let result = b.availableMovesForPiece(7, 2);
                assert.equal(result.hasJumps, true);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 1 King with jump", function() {
                let b = new Board(true);
                b.addPiece(3, 4, boardSpaceEnum.PLAYER1KING);
                b.addPiece(2, 3, boardSpaceEnum.PLAYER2);

                let expected = [[1, 2]];
                let result = b.availableMovesForPiece(3, 4);
                assert.equal(result.hasJumps, true);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 2 King with jump", function() {
                let b = new Board(true);
                b.addPiece(0, 7, boardSpaceEnum.PLAYER2KING);
                b.addPiece(1, 6, boardSpaceEnum.PLAYER1KING);

                let expected = [[2, 5]];
                let result = b.availableMovesForPiece(0, 7);
                assert.equal(result.hasJumps, true);
                assert.deepEqual(result.moves, expected);
            });
        });

        describe("Piece with moves blocked by friendly pieces", function() {
            it("Player 1 piece partialy blocked", function() {
                let b = new Board(true);
                b.addPiece(2, 1, boardSpaceEnum.PLAYER1);
                b.addPiece(3, 0, boardSpaceEnum.PLAYER1KING);

                let expected = [[3, 2]];
                let result = b.availableMovesForPiece(2, 1);
                assert.equal(result.hasJumps, false);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 1 piece fully blocked", function() {
                let b = new Board(true);
                b.addPiece(3, 4, boardSpaceEnum.PLAYER1);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER1KING);
                b.addPiece(4, 5, boardSpaceEnum.PLAYER1);

                let expected = [];
                let result = b.availableMovesForPiece(2, 1);
                assert.equal(result.hasJumps, false);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 2 piece partialy blocked", function() {
                let b = new Board(true);
                b.addPiece(7, 2, boardSpaceEnum.PLAYER2);
                b.addPiece(6, 1, boardSpaceEnum.PLAYER2KING);

                let expected = [[6, 3]];
                let result = b.availableMovesForPiece(7, 2);
                assert.equal(result.hasJumps, false);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 2 piece fully blocked", function() {
                let b = new Board(true);
                b.addPiece(7, 0, boardSpaceEnum.PLAYER2);
                b.addPiece(6, 1, boardSpaceEnum.PLAYER2);

                let expected = [];
                let result = b.availableMovesForPiece(7, 0);
                assert.equal(result.hasJumps, false);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 1 King partialy blocked", function() {
                let b = new Board(true);
                b.addPiece(2, 1, boardSpaceEnum.PLAYER1KING);
                b.addPiece(3, 0, boardSpaceEnum.PLAYER1KING);
                b.addPiece(1, 0, boardSpaceEnum.PLAYER1);

                let expected = [[1, 2],[3, 2]];
                let result = b.availableMovesForPiece(2, 1);
                assert.equal(result.hasJumps, false);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 2 King fully blocked", function() {
                let b = new Board(true);
                b.addPiece(3, 4, boardSpaceEnum.PLAYER2KING);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER2KING);
                b.addPiece(4, 5, boardSpaceEnum.PLAYER2);
                b.addPiece(2, 3, boardSpaceEnum.PLAYER2);
                b.addPiece(2, 5, boardSpaceEnum.PLAYER2KING);

                let expected = [];
                let result = b.availableMovesForPiece(2, 1);
                assert.equal(result.hasJumps, false);
                assert.deepEqual(result.moves, expected);
            });
        });

        describe("Piece with potential jumps blocked", function() {
            it("Player 1 piece jump blocked by edge of board", function() {
                let b = new Board(true);
                b.addPiece(4, 1, boardSpaceEnum.PLAYER1);
                b.addPiece(5, 0, boardSpaceEnum.PLAYER2);

                let expected = [[5, 2]];
                let result = b.availableMovesForPiece(4, 1);

                assert.equal(result.hasJumps, false);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 2 King jump blocked by friendly piece", function() {
                let b = new Board(true);
                b.addPiece(3, 4, boardSpaceEnum.PLAYER2KING);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER1);
                b.addPiece(5, 2, boardSpaceEnum.PLAYER2KING);

                let expected = [[2, 3], [2, 5], [4, 5]];
                let result = b.availableMovesForPiece(3, 4);

                assert.equal(result.hasJumps, false);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 2 piece jump blocked by opponent's piece", function() {
                let b = new Board(true);
                b.addPiece(3, 4, boardSpaceEnum.PLAYER2KING);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER1);
                b.addPiece(5, 2, boardSpaceEnum.PLAYER1KING);

                let expected = [[2, 3], [2, 5], [4, 5]];
                let result = b.availableMovesForPiece(3, 4);

                assert.equal(result.hasJumps, false);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 1 King two jumps one blocked", function() {
                let b = new Board(true);
                b.addPiece(1, 2, boardSpaceEnum.PLAYER1KING);
                b.addPiece(0, 1, boardSpaceEnum.PLAYER2);
                b.addPiece(2, 3, boardSpaceEnum.PLAYER2KING);

                let expected = [[3, 4]];
                let result = b.availableMovesForPiece(1, 2);

                assert.equal(result.hasJumps, true);
                assert.deepEqual(result.moves, expected);
            });
        });

        describe("Piece with multiple jump options", function() {
            it("Player 1 piece with multiple jump options", function() {
                let b = new Board(true);
                b.addPiece(4, 5, boardSpaceEnum.PLAYER1);
                b.addPiece(5, 4, boardSpaceEnum.PLAYER2);
                b.addPiece(5, 6, boardSpaceEnum.PLAYER2KING);

                let expected = [[6, 3], [6, 7]];
                let result = b.availableMovesForPiece(4, 5);
                assert.equal(result.hasJumps, true);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 2 piece with multiple jump options", function() {
                let b = new Board(true);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER2);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER1);
                b.addPiece(3, 4, boardSpaceEnum.PLAYER1KING);

                let expected = [[2, 1], [2, 5]];
                let result = b.availableMovesForPiece(4, 3);
                assert.equal(result.hasJumps, true);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 1 king with multiple jump options", function() {
                let b = new Board(true);
                b.addPiece(4, 5, boardSpaceEnum.PLAYER1KING);
                b.addPiece(5, 4, boardSpaceEnum.PLAYER2);
                b.addPiece(3, 4, boardSpaceEnum.PLAYER2KING);
                b.addPiece(3, 6, boardSpaceEnum.PLAYER2);

                let expected = [[2, 3],[2, 7],[6, 3]];
                let result = b.availableMovesForPiece(4, 5);
                assert.equal(result.hasJumps, true);
                assert.deepEqual(result.moves, expected);
            });

            it("Player 2 king with multiple jump options", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER2KING);
                b.addPiece(2, 1, boardSpaceEnum.PLAYER1);
                b.addPiece(2, 3, boardSpaceEnum.PLAYER1KING);
                b.addPiece(4, 1, boardSpaceEnum.PLAYER1KING);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER1);

                let expected = [[1, 0], [1, 4], [5, 0], [5, 4]];
                let result = b.availableMovesForPiece(3, 2);
                assert.equal(result.hasJumps, true);
                assert.deepEqual(result.moves, expected);
            });
        });
    });

    describe("Get all moves", function() {

        it("Invalid player throws exception; Player Value: 0", function () {
            let b = new Board(false);
            chai.expect(b.getPiecesWithAvailableMoves.bind(b, -1)).to.throw('Invalid Player');
        });

        it("Invalid player throws exception; Player Value: 3", function () {
            let b = new Board(false);
            chai.expect(b.getPiecesWithAvailableMoves.bind(b, 3)).to.throw('Invalid Player');
        });

        it("Player 1 starting moves", function () {
            let b = new Board(false);

            let expected = [[2, 1], [2, 3], [2, 5], [2, 7]];
            let result = b.getPiecesWithAvailableMoves(playerEnum.PLAYER1);
            assert.deepEqual(result, expected);
        });

        it("Player 2 moves without jumps", function () {
            let b = new Board(true);
            b.addPiece(0, 1, boardSpaceEnum.PLAYER2);
            b.addPiece(0, 3, boardSpaceEnum.PLAYER2KING);
            b.addPiece(1, 0, boardSpaceEnum.PLAYER2KING);
            b.addPiece(1, 2, boardSpaceEnum.PLAYER2KING);
            b.addPiece(3, 2, boardSpaceEnum.PLAYER2);
            b.addPiece(5, 4, boardSpaceEnum.PLAYER1);
            b.addPiece(6, 3, boardSpaceEnum.PLAYER1KING);
            b.addPiece(6, 5, boardSpaceEnum.PLAYER1);

            let expected = [[0, 3], [1, 0], [1, 2], [3, 2]];
            let result = b.getPiecesWithAvailableMoves(playerEnum.PLAYER2);
            assert.deepEqual(result, expected);
        });

        it("Player 1 no available moves", function() {
            let b = new Board(true);
            b.addPiece(0, 7, boardSpaceEnum.PLAYER1);
            b.addPiece(1, 6, boardSpaceEnum.PLAYER2);
            b.addPiece(2, 5, boardSpaceEnum.PLAYER2KING);

            let expected = [];
            let result = b.getPiecesWithAvailableMoves(playerEnum.PLAYER1);
            assert.deepEqual(result, expected);
        });

        it("Player 2 no available moves", function() {
            let b = new Board(true);
            b.addPiece(3, 2, boardSpaceEnum.PLAYER2);
            b.addPiece(2, 1, boardSpaceEnum.PLAYER1KING);
            b.addPiece(1, 0, boardSpaceEnum.PLAYER2KING);
            b.addPiece(0, 1, boardSpaceEnum.PLAYER2KING);
            b.addPiece(1, 2, boardSpaceEnum.PLAYER1);
            b.addPiece(2, 3, boardSpaceEnum.PLAYER1);
            b.addPiece(1, 4, boardSpaceEnum.PLAYER1KING);
            b.addPiece(4, 1, boardSpaceEnum.PLAYER1);
            b.addPiece(5, 0, boardSpaceEnum.PLAYER1KING);
            b.addPiece(4, 3, boardSpaceEnum.PLAYER1);
            b.addPiece(5, 4, boardSpaceEnum.PLAYER1KING);

            let expected = [];
            let result = b.getPiecesWithAvailableMoves(playerEnum.PLAYER2);
            assert.deepEqual(result, expected);
        });

        it("Player 1 only jumps listed", function() {
            let b = new Board(true);
            b.addPiece(4, 3, boardSpaceEnum.PLAYER1KING);
            b.addPiece(3, 2, boardSpaceEnum.PLAYER2);
            b.addPiece(6, 3, boardSpaceEnum.PLAYER1);

            let expected = [[4, 3]];
            let result = b.getPiecesWithAvailableMoves(playerEnum.PLAYER1);
            assert.deepEqual(result, expected);
        })

        it("Player 2 only jumps listed", function() {
            let b = new Board(true);
            b.addPiece(3, 2, boardSpaceEnum.PLAYER2);
            b.addPiece(3, 4, boardSpaceEnum.PLAYER2KING);
            b.addPiece(2, 3, boardSpaceEnum.PLAYER1);
            b.addPiece(1, 2, boardSpaceEnum.PLAYER2);
            b.addPiece(6, 7, boardSpaceEnum.PLAYER2);
            b.addPiece(5, 6, boardSpaceEnum.PLAYER1KING);

            let expected = [[3, 2], [6, 7]];
            let result = b.getPiecesWithAvailableMoves(playerEnum.PLAYER2);
            assert.deepEqual(result, expected);
            
        });
    });

    describe("Make move", function() {

        describe("Valid move without jumps", function() {
            it("Player 1 move on empty board", function() {
                let b = new Board(true);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER1);
                b.makeMove(4, 3, 5, 2);

                let expected = emptyBoard;
                expected[5][2] = boardSpaceEnum.PLAYER1;
                assertBoardsAreEqual(b.board, expected);
            });

            it("Player 1 King move on empty board", function() {
                let b = new Board(true);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER1KING);
                b.makeMove(4, 3, 3, 2);

                let expected = emptyBoard;
                expected[3][2] = boardSpaceEnum.PLAYER1KING;
                assertBoardsAreEqual(b.board, expected);
            });

            it("Player 2 move on empty board", function() {
                let b = new Board(true);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER2);
                b.currentPlayer = playerEnum.PLAYER2;
                b.makeMove(4, 3, 3, 2);

                let expected = emptyBoard;
                expected[3][2] = boardSpaceEnum.PLAYER2;
                assertBoardsAreEqual(b.board, expected);
            });

            it("Player 2 King move on empty board", function() {
                let b = new Board(true);
                b.addPiece(4, 3, boardSpaceEnum.PLAYER2KING);
                b.currentPlayer = playerEnum.PLAYER2;
                b.makeMove(4, 3, 5, 2);

                let expected = emptyBoard;
                expected[5][2] = boardSpaceEnum.PLAYER2KING;
                assertBoardsAreEqual(b.board, expected);
            });
        });

        describe("Invalid inputs", function() {
            it("Empty space selected throws exception", function() {
                let b = new Board(true);
                chai.expect(b.makeMove.bind(b, 3, 2, 2, 1)).to.throw('No piece on selected space');
            });

            it("Unreachable space selected throws exception", function() {
                let b = new Board(true);
                chai.expect(b.makeMove.bind(b, 4, 2, 3, 1)).to.throw('No piece on selected space');
            });

            it("Player 2 piece selected on player 1's turn throws exception", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER2);
                chai.expect(b.makeMove.bind(b, 3, 2, 2, 1)).to.throw("Piece is not current player's");
            });

            it("Player 1 piece selected on player 2's turn throws exception", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER1);
                b.currentPlayer = playerEnum.PLAYER2;
                chai.expect(b.makeMove.bind(b, 3, 2, 4, 1)).to.throw("Piece is not current player's");
            });

            it("Player 2 King selected on player 1's turn throws exception", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER2KING);
                chai.expect(b.makeMove.bind(b, 3, 2, 2, 1)).to.throw("Piece is not current player's");
            });

            it("Player 1 King selected on player 2's turn throws exception", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER1KING);
                b.currentPlayer = playerEnum.PLAYER2;
                chai.expect(b.makeMove.bind(b, 3, 2, 4, 1)).to.throw("Piece is not current player's");
            });

            it("Invalid Move for Player 1 piece throws exception", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER1);
                chai.expect(b.makeMove.bind(b, 3, 2, 2, 1)).to.throw('Invalid Move');
            });

            it("Invalid Move for Player 2 piece throws exception", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER2);
                b.currentPlayer = playerEnum.PLAYER2;
                chai.expect(b.makeMove.bind(b, 3, 2, 4, 1)).to.throw('Invalid Move');
            });

            it("Invalid Move for Player 1 King throws exception", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER1);
                chai.expect(b.makeMove.bind(b, 3, 2, 0, 1)).to.throw('Invalid Move');
            });

            it("Invalid Move for Player 2 King throws exception", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER2);
                b.currentPlayer = playerEnum.PLAYER2;
                chai.expect(b.makeMove.bind(b, 3, 2, 7, 2)).to.throw('Invalid Move');
            });

            it("Piece destination outside bounds piece throws exception", function() {
                let b = new Board(true);
                b.addPiece(5, 0, boardSpaceEnum.PLAYER1);
                chai.expect(b.makeMove.bind(b, 5, 0, -1, 6)).to.throw('Invalid Move');
            });

            it("Piece with no jumps selected when jumps available throws exception", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER1KING);
                b.addPiece(6, 3, boardSpaceEnum.PLAYER1);
                b.addPiece(2, 3, boardSpaceEnum.PLAYER2);

                chai.expect(b.makeMove.bind(b, 6, 3, 7, 4)).to.throw('Invalid Piece selection');
            });
        });

        describe("Current player switches after move", function() {
            it("Player 1 switches to player 2 after normal move", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER1);
                b.makeMove(3, 2, 4, 1);

                assert.equal(b.currentPlayer, playerEnum.PLAYER2)
            });

            it("Player 2 switches to player 1 after normal move", function() {
                let b = new Board(true);
                b.addPiece(3, 2, boardSpaceEnum.PLAYER2KING);
                b.currentPlayer = playerEnum.PLAYER2;
                b.makeMove(3, 2, 4, 1);

                assert.equal(b.currentPlayer, playerEnum.PLAYER1)
            });
        });
    });
});