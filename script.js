// script.js

const betTypes = [
    { name: "Straight Up", payout: 35, type: "straight", chips: 0 },
    { name: "Split", payout: 17, type: "split", chips: 0 },
    { name: "Street", payout: 11, type: "street", chips: 0 },
    { name: "Corner", payout: 8, type: "corner", chips: 0 },
    { name: "Six Line", payout: 5, type: "six-line", chips: 0 },
];

let winningNumber = null;
let totalPayout = 0;
let maxChips = 10;

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function getBoardIndex(num) {
    const col = Math.floor((num - 1) / 3);
    const row = 2 - (num - 1) % 3;
    return row * 13 + col + 1;
}

function placeChip(board, index, chips, type) {
    const cell = board.children[index];
    const chip = document.createElement('div');
    chip.classList.add('chip');
    chip.style.position = 'absolute';

    // Position the chip based on bet type
    if (type === 'straight') {
        chip.style.top = '10px';
        chip.style.left = '10px';
    } else if (type === 'split') {
        chip.style.top = '0px';
        chip.style.left = '0px';
    } else if (type === 'street') {
        chip.style.top = '0px';
        chip.style.left = '0px';
    } else if (type === 'corner') {
        chip.style.top = '10px';
        chip.style.left = '10px';
    } else if (type === 'six-line') {
        chip.style.top = '0px';
        chip.style.left = '0px';
    }

    const chipText = document.createElement('div');
    chipText.classList.add('chip-text');
    chipText.innerText = chips;
    chip.appendChild(chipText);

    cell.appendChild(chip);
}

function generateBet() {
    winningNumber = getRandomInt(36);
    totalPayout = 0;
    maxChips = parseInt(document.getElementById('max-chips').value);
    const board = document.getElementById('roulette-board');

    // Clear previous board
    board.innerHTML = '';

    // Create Roulette Board Layout
    const numbers = [
        '0', '3', '6', '9', '12', '15', '18', '21', '24', '27', '30', '33', '36',
        '0', '2', '5', '8', '11', '14', '17', '20', '23', '26', '29', '32', '35',
        '0', '1', '4', '7', '10', '13', '16', '19', '22', '25', '28', '31', '34'
    ];

    numbers.forEach((num, index) => {
        const cell = document.createElement('div');
        cell.classList.add('roulette-cell');
        if (num === '0') {
            cell.classList.add('green');
        } else if (parseInt(num) % 2 === 0) {
            cell.classList.add('black');
        } else {
            cell.classList.add('red');
        }

        cell.innerText = num;
        board.appendChild(cell);
    });

    // Assign Bets and Place Chips on the Board
    betTypes.forEach(bet => {
        bet.chips = getRandomInt(maxChips);

        if (bet.chips > 0) {
            let chipPlacementIndices = [];
            switch (bet.type) {
                case "straight":
                    chipPlacementIndices.push(getBoardIndex(winningNumber));
                    break;
                case "split":
                    chipPlacementIndices.push(getBoardIndex(winningNumber), getBoardIndex(winningNumber - 1));
                    break;
                case "street":
                    const baseStreet = Math.floor((winningNumber - 1) / 3) * 3 + 1;
                    chipPlacementIndices.push(getBoardIndex(baseStreet), getBoardIndex(baseStreet + 1), getBoardIndex(baseStreet + 2));
                    break;
                case "corner":
                    if (winningNumber > 1 && winningNumber % 3 !== 1) {
                        chipPlacementIndices.push(getBoardIndex(winningNumber), getBoardIndex(winningNumber - 1), getBoardIndex(winningNumber - 3), getBoardIndex(winningNumber - 4));
                    }
                    break;
                case "six-line":
                    if (winningNumber > 3) {
                        const baseSixLine = Math.floor((winningNumber - 1) / 3) * 3 + 1;
                        chipPlacementIndices.push(
                            getBoardIndex(baseSixLine), getBoardIndex(baseSixLine + 1), getBoardIndex(baseSixLine + 2),
                            getBoardIndex(baseSixLine - 3), getBoardIndex(baseSixLine - 2), getBoardIndex(baseSixLine - 1)
                        );
                    }
                    break;
            }

            chipPlacementIndices.forEach(index => {
                placeChip(board, index, bet.chips, bet.type);
            });

            totalPayout += bet.chips * bet.payout;
        }
    });

    // Display the winning number
    document.getElementById('winner').innerText = `Winning Number: ${winningNumber}`;

    document.getElementById('payout').value = '';
    document.getElementById('result').innerText = '';
}

document.getElementById('payout-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const userPayout = parseInt(document.getElementById('payout').value);

    if (userPayout === totalPayout) {
        document.getElementById('result').innerText = "Correct!";
        document.getElementById('result').style.color = "green";
    } else {
        document.getElementById('result').innerText = `Incorrect. The correct payout was ${totalPayout}.`;
        document.getElementById('result').style.color = "red";
    }
});

// Event listener for the new bet button
document.getElementById('new-bet').addEventListener('click', function () {
    generateBet();
});

// Initial call to generate a bet when the page loads
generateBet();
