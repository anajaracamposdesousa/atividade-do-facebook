const board = document.getElementById('board');
let currentPlayer = 'black';

var sourceCell = null;
var targetCell = null;

// Função para criar o tabuleiro
function createBoard()
{
    for (let i = 0; i < 64; i++)
    {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if ((i + Math.floor(i / 8)) % 2 !== 0)
        {
            cell.classList.add('dark');
        }
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

// Função para criar as peças
function createPieces() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        if (cell.classList.contains('dark') && cell.dataset.index < 24) {piece.classList.add('black');}
        else if (cell.classList.contains('dark') && cell.dataset.index > 39) {piece.classList.add('white');}
        else {return;}
        cell.appendChild(piece);
    });
}

// Função para obter os movimentos possíveis para uma peça selecionada
function getValidMoves(selectedCell) {
    console.log(selectedCell);
    const index = parseInt(selectedCell.dataset.index);
    const row = Math.floor(index / 8);
    const col = index % 8;
    const possibleMoves = [];

    // Verifica os movimentos possíveis dependendo do jogador
    if (currentPlayer === 'black') {
        if (row < 7 && col > 0) {possibleMoves.push(index + 7);}
        if (row < 7 && col < 7) {possibleMoves.push(index + 9);}
    }
    else 
    {
        if (row > 0 && col > 0) {possibleMoves.push(index - 9);}
        if (row > 0 && col < 7) {possibleMoves.push(index - 7);}
    }
    return possibleMoves.filter(move => {
        const targetCell = document.querySelector(`.cell[data-index='${move}']`);
        return targetCell && !targetCell.querySelector('.piece');
    });
}

// Função para lidar com o clique nas células
function handleCellClick(event) {
    if(sourceCell){
        targetCell = event.target;
        if (targetCell != sourceCell) movePiece();
        return;
    }

    const selectedCell = event.target;
    const selectedPiece = selectedCell.querySelector('.piece');
    
    if(selectedPiece) sourceCell = selectedCell;

    const cells = document.querySelectorAll('.cell');
    // Remove a peça selecionada
    // cells.forEach(cell => cell.classList.remove('selected'));
    // Se houver uma peça e for a vez do jogador, seleciona a peça
    if (selectedPiece && selectedPiece.classList.contains(currentPlayer))
    {
        // selectedCell.classList.add('selected');
        // Chama a função para obter os movimentos possíveis para a peça selecionada
        const possibleMoves = getValidMoves(selectedCell);
        console.log(possibleMoves);
        // Adiciona a classe 'valid-move' às células para onde a peça pode se mover
        possibleMoves.forEach(move => {cells[move].classList.add('valid-move');});
    }
}

// Função para mover a peça para uma nova célula
function movePiece() {
    // Move a peça para a nova célula
    const piece = sourceCell.querySelector('.piece');
    sourceCell.removeChild(piece);
    targetCell.appendChild(piece);
    // Troca o jogador atual
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    sourceCell = null;
    targetCell = null;
}

// Inicializa o jogo
function startGame() {
    createBoard();
    createPieces();
}

startGame();


