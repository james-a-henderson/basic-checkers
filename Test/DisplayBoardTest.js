"use strict"

describe("Board Display Tests", function(){

    function generateTable(rowCount, columnCount){

        let table = document.createElement("TABLE");

        for(let i = 0; i < rowCount; i++) {
            let row = table.insertRow(i);

            for(let j = 0; j < columnCount; j++) {
                let cell = row.insertCell(j);
            }
        }

        return table;
    }

    describe("Verify each space type displayed correctly", function(){
        it("Unreachable", function(){
            let table = generateTable(1, 1);
    
            let board = [
                [boardSpaceEnum.UNREACHABLE]
            ];
            
            let display = new DisplayBoard(table);
    
            display.displayBoard(board);
    
            assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Unreachable.png'));
        });

        it("Empty", function(){
            let table = generateTable(1, 1);
    
            let board = [
                [boardSpaceEnum.EMPTY]
            ];
            
            let display = new DisplayBoard(table);
    
            display.displayBoard(board);
    
            assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Empty.png'));
        });

        it("Player 1", function(){
            let table = generateTable(1, 1);
    
            let board = [
                [boardSpaceEnum.PLAYER1]
            ];
            
            let display = new DisplayBoard(table);
    
            display.displayBoard(board);
    
            assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player1.png'));
        });

        it("Player 1 King", function(){
            let table = generateTable(1, 1);
    
            let board = [
                [boardSpaceEnum.PLAYER1KING]
            ];
            
            let display = new DisplayBoard(table);
    
            display.displayBoard(board);
    
            assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player1King.png'));
        });

        it("Player 2", function(){
            let table = generateTable(1, 1);
    
            let board = [
                [boardSpaceEnum.PLAYER2]
            ];
            
            let display = new DisplayBoard(table);
    
            display.displayBoard(board);
    
            assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player2.png'));
        });

        it("Player 2 King", function(){
            let table = generateTable(1, 1);
    
            let board = [
                [boardSpaceEnum.PLAYER2KING]
            ];
            
            let display = new DisplayBoard(table);
    
            display.displayBoard(board);
    
            assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player2King.png'));
        });
    });
    
    describe("Multiple spaces display correctly", function(){

        it("Board with every space type", function(){
            let table = generateTable(2, 3);
    
            let board = [
                [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.PLAYER1],
                [boardSpaceEnum.PLAYER1KING, boardSpaceEnum.PLAYER2, boardSpaceEnum.PLAYER2KING]
            ];
            
            let display = new DisplayBoard(table);
    
            display.displayBoard(board);
    
            assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Unreachable.png'));
            assert(display.table.rows[0].cells[1].firstChild.src.endsWith('Empty.png'));
            assert(display.table.rows[0].cells[2].firstChild.src.endsWith('Player1.png'));
            assert(display.table.rows[1].cells[0].firstChild.src.endsWith('Player1King.png'));
            assert(display.table.rows[1].cells[1].firstChild.src.endsWith('Player2.png'));
            assert(display.table.rows[1].cells[2].firstChild.src.endsWith('Player2King.png'));
        });

        it("Default starting board displays correctly", function(){
            let table = generateTable(8, 8);

            let startingBoard = [
                [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1],
                [boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE],
                [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1],
                [boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE],
                [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.EMPTY],
                [boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE],
                [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2],
                [boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER2, boardSpaceEnum.UNREACHABLE],
            ];

            let display = new DisplayBoard(table);
            display.displayBoard(startingBoard);

            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){

                    let img = display.table.rows[i].cells[j].firstChild.src;

                    if((i + j) % 2 == 0){
                        assert(img.endsWith('Unreachable.png'), `Image at position ${i}, ${j}; Expected to end with: 'Unreachable.png' Actual: ${img}`);
                    } else if(i <= 2){
                        assert(img.endsWith('Player1.png'), `Image at position ${i}, ${j}; Expected to end with: 'Player1.png' Actual: ${img}`);
                    } else if(i >= 5){
                        assert(img.endsWith('Player2.png'), `Image at position ${i}, ${j}; Expected to end with: 'Player2.png' Actual: ${img}`);
                    } else{
                        assert(img.endsWith('Empty.png'), `Image at position ${i}, ${j}; Expected to end with: 'Empty.png' Actual: ${img}`);
                    }
                }
            }
        });
    });

    describe("Space Highlighting", function(){

        describe("Verify each space type highlights correctly", function(){

            it("Player 1", function(){
                let table = generateTable(1, 1);
        
                let board = [
                    [boardSpaceEnum.PLAYER1]
                ];

                let pieces = [[0, 0]];
                
                let display = new DisplayBoard(table);
        
                display.displayBoard(board);
                display.highlightPieces(board, pieces);
        
                assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player1_Highlight.png'));
            });

            it("Player 1 King", function(){
                let table = generateTable(1, 1);
        
                let board = [
                    [boardSpaceEnum.PLAYER1KING]
                ];

                let pieces = [[0, 0]];
                
                let display = new DisplayBoard(table);
        
                display.displayBoard(board);
                display.highlightPieces(board, pieces);
        
                assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player1King_Highlight.png'));
            });

            it("Player 2", function(){
                let table = generateTable(1, 1);
        
                let board = [
                    [boardSpaceEnum.PLAYER2]
                ];

                let pieces = [[0, 0]];
                
                let display = new DisplayBoard(table);
        
                display.displayBoard(board);
                display.highlightPieces(board, pieces);
        
                assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player2_Highlight.png'));
            });

            it("Player 2 King", function(){
                let table = generateTable(1, 1);
        
                let board = [
                    [boardSpaceEnum.PLAYER2KING]
                ];

                let pieces = [[0, 0]];
                
                let display = new DisplayBoard(table);
        
                display.displayBoard(board);
                display.highlightPieces(board, pieces);
        
                assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player2King_Highlight.png'));
            });
        });

        describe("Highlight multiple spaces", function(){
            it("Multiple player 1 pieces", function(){
                let table = generateTable(1, 3);
        
                let board = [
                    [boardSpaceEnum.PLAYER1, boardSpaceEnum.EMPTY, boardSpaceEnum.PLAYER1KING]
                ];

                let pieces = [[0, 0], [0, 2]];
                
                let display = new DisplayBoard(table);
        
                display.displayBoard(board);
                display.highlightPieces(board, pieces);
        
                assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player1_Highlight.png'));
                assert(display.table.rows[0].cells[2].firstChild.src.endsWith('Player1King_Highlight.png'));
            });

            it("Multiple player 2 pieces", function(){
                let table = generateTable(1, 3);
        
                let board = [
                    [boardSpaceEnum.PLAYER2, boardSpaceEnum.EMPTY, boardSpaceEnum.PLAYER2KING]
                ];

                let pieces = [[0, 0], [0, 2]];
                
                let display = new DisplayBoard(table);
        
                display.displayBoard(board);
                display.highlightPieces(board, pieces);
        
                assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player2_Highlight.png'));
                assert(display.table.rows[0].cells[2].firstChild.src.endsWith('Player2King_Highlight.png'));
            });

            it("Pieces not specified aren't highlighted", function(){
                let table = generateTable(2, 2);
        
                let board = [
                    [boardSpaceEnum.PLAYER1, boardSpaceEnum.PLAYER2],
                    [boardSpaceEnum.PLAYER2, boardSpaceEnum.PLAYER1KING]
                ];

                let pieces = [[0, 1], [1, 0]];
                
                let display = new DisplayBoard(table);
        
                display.displayBoard(board);
                display.highlightPieces(board, pieces);
        
                assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player1.png'));
                assert(display.table.rows[1].cells[1].firstChild.src.endsWith('Player1King.png'));
            })
        });

        describe("Clear highlights", function(){

            it("Clearing highlights functions correctly single highlight", function(){
                let table = generateTable(1, 1);
        
                let board = [
                    [boardSpaceEnum.PLAYER1]
                ];

                let pieces = [[0, 0]];
                
                let display = new DisplayBoard(table);
        
                display.displayBoard(board);
                display.highlightPieces(board, pieces);
                display.clearHighlights(board);
        
                assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player1.png'));

            });

            it("Multiple highlights cleared", function(){
                let table = generateTable(2, 2);
        
                let board = [
                    [boardSpaceEnum.PLAYER1, boardSpaceEnum.EMPTY],
                    [boardSpaceEnum.UNREACHABLE, boardSpaceEnum.PLAYER1KING]
                ];

                let pieces = [[0, 0], [1, 1]];
                
                let display = new DisplayBoard(table);
        
                display.displayBoard(board);
                display.highlightPieces(board, pieces);
                display.clearHighlights(board);
        
                assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player1.png'));
                assert(display.table.rows[1].cells[1].firstChild.src.endsWith('Player1King.png'));
            });

            it("Highlights cleared when new pieces are highlighted", function(){
                let table = generateTable(2, 2);
        
                let board = [
                    [boardSpaceEnum.PLAYER1, boardSpaceEnum.PLAYER2],
                    [boardSpaceEnum.PLAYER2, boardSpaceEnum.PLAYER1KING]
                ];

                let pieces1 = [[0, 1], [1, 0]];
                let pieces2 = [[0, 0], [1, 1]];
                
                let display = new DisplayBoard(table);
        
                display.displayBoard(board);
                display.highlightPieces(board, pieces1);
                display.highlightPieces(board, pieces2);
        
                assert(display.table.rows[0].cells[0].firstChild.src.endsWith('Player1_Highlight.png'));
                assert(display.table.rows[0].cells[1].firstChild.src.endsWith('Player2.png'));
                assert(display.table.rows[1].cells[1].firstChild.src.endsWith('Player1King_Highlight.png'));
                assert(display.table.rows[1].cells[0].firstChild.src.endsWith('Player2.png'));
            });

        });
    });

});