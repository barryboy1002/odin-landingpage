const GameBoard = () => {
    const moves = { x: [], o: [] };

    const winningCombos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // cols
        [1, 5, 9], [3, 5, 7]              // diagonals
    ];

    const checkMove = (position) => {
        return !(moves.x.includes(position) || moves.o.includes(position));
    };

    const move = (symbol, position) => {
        if (checkMove(position)) {
            moves[symbol].push(position);
            return true;
        } else {
            return false;
        }
    };

    const checkWin = (symbol) => {
        return winningCombos.some(combo =>
            combo.every(pos => moves[symbol].includes(pos))
        );
    };

    const isTie = () => moves.x.length + moves.o.length === 9;

    const reset = () => {
        moves.x = [];
        moves.o = [];
    };

    const getMoves = (symbol) => moves[symbol];

    return { move, checkWin, isTie, reset, getMoves };
};

const board = GameBoard();

const Player = (name, symbol, isAI = false) => {
    const makeMove = (position) => board.move(symbol, position);
    return { name, symbol, isAI, makeMove };
};

const playGame = (player1, player2, onMove, onWin, onTie) => {
    let currentPlayer = player1;
    const players = [player1, player2];

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const makeMove = (position) => {
        if (currentPlayer.makeMove(position)) {
            onMove(position, currentPlayer.symbol);
            if (board.checkWin(currentPlayer.symbol)) {
                onWin(currentPlayer.name);
                return;
            } else if (board.isTie()) {
                onTie();
                return;
            }
            switchTurn();
            if (currentPlayer.isAI) {
                setTimeout(() => aiMove(), 500); // Delay for AI
            }
        }
    };

    const aiMove = () => {
        const available = [1,2,3,4,5,6,7,8,9].filter(pos => board.getMoves('x').concat(board.getMoves('o')).indexOf(pos) === -1);
        if (available.length > 0) {
            const randomPos = available[Math.floor(Math.random() * available.length)];
            makeMove(randomPos);
        }
    };

    return { makeMove };
};

const Barry = Player("Human", "x");
const Computer = Player("Computer", "o", true);
const game = playGame(Barry, Computer,
    (pos, sym) => updateBoard(pos, sym),
    (winner) => displayMessage(`${winner} wins!`),
    () => displayMessage("It's a tie!")
);

// DOM interaction functions (assumes HTML elements exist)
function updateBoard(position, symbol) {
    const cell = document.getElementById(`cell-${position}`);
    cell.textContent = symbol.toUpperCase();
    cell.classList.add('taken');
}

function displayMessage(msg) {
    document.getElementById('message').textContent = msg;
}

function restartGame() {
    board.reset();
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    displayMessage('');
    // Reset game state if needed
}

// Attach event listeners in HTML