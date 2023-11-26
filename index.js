function createBoard() {
    const board = [
        ["E", "E", "E"],
        ["E", "E", "E"],
        ["E", "E", "E"]
    ];

    return {
        board,
        updateBoard: function (row, col, player, board) {

            if (row >= 0 && row < board.length && col >= 0 && col < board[0].length
                && board[row][col] === "E") {
                board[row][col] = player;
            }

            // Check for a winner
            // Check rows and columns
            for (let i = 0; i < 3; i++) {
                if (
                    (board[i][0] !== "E" && board[i][0] === board[i][1] && board[i][1] === board[i][2]) ||
                    (board[0][i] !== "E" && board[0][i] === board[1][i] && board[1][i] === board[2][i])
                ) {
                    return board[i][0]; // Return the winning symbol (X or O)
                }
            }

            // Check diagonals
            if (
                (board[0][0] !== "E" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
                (board[0][2] !== "E" && board[0][2] === board[1][1] && board[1][1] === board[2][0])
            ) {
                return board[1][1]; // Return the winning symbol (X or O)
            }

            return null; // No winner
        },
        resetBoard: function () {
            this.board = [
                ["E", "E", "E"],
                ["E", "E", "E"],
                ["E", "E", "E"]
            ];
        }
    };
}

function displayBoard() {
    return {
        redrawBoard: function (board) {
            // update the html
            let gameBoard = document.querySelector(".game-board"); // Use querySelector to get the first element with the class
            gameBoard.innerHTML = "";


            // for loop through the board, each one create a div and append
            for (let row = 0; row < board.length; row++) {
                for (let col = 0; col < board[0].length; col++) {
                    let newCell = document.createElement("div");
                    newCell.className = "game-board-cell";
                    newCell.addEventListener("click", () => ticTacToe.playOneTurn(row, col));
                    if (board[row][col] !== "E") {
                        newCell.textContent = board[row][col];
                    }

                    gameBoard.appendChild(newCell);
                }
            }
        },
        displayWinner: function (winner) {
            let winningMessage = document.querySelector(".winning-message");
            if (winner === "X" || winner === "O") {
                winningMessage.textContent = "Player " + winner + " won!";
            } else {
                winningMessage.textContent = "";
            }
        }
    };
}

function game() {
    let player_turn = "X";
    const board = createBoard();
    const drawBoard = displayBoard();
    let winner = null;

    return {
        board,
        playOneTurn: function (row, col) {
            if (!winner) {
                let result = board.updateBoard(row, col, player_turn, board.board);
                if (result === "O" || result === "X") {
                    winner = result;
                    drawBoard.displayWinner(winner);
                }

                if (player_turn === "X") {
                    player_turn = "O";
                } else {
                    player_turn = "X";
                }
            }
            drawBoard.redrawBoard(board.board);
        },
        resetBoard: function () {
            board.resetBoard();
            winner = null;
            result = null;
            drawBoard.redrawBoard(board.board);
            drawBoard.displayWinner(winner);
        }
    };
}

let ticTacToe = game();
