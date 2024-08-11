// script.js

// Possible bets and their payout multipliers
const betTypes = [
    { name: "Straight Up", payout: 35, type: "straight", chips: 0 },
    { name: "Split", payout: 17, type: "split", chips: 0 },
    { name: "Street", payout: 11, type: "street", chips: 0 },
    { name: "Corner", payout: 8, type: "corner", chips: 0 },
    { name: "Six Line", payout: 5, type: "six-line", chips: 0 },
];

let winningNumber = null;
let totalPayout = 0;
let maxChips = 10; // Default maximum chips

// Generate a random number between 0 and max (inclusive)
function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

// Generate random bets and calculate the payout
function generateBet() {
    winningNumber = getRandomInt(36);
    totalPayout = 0;

    // Read the max chips value from user input
    maxChips = parseInt(document.getElementById('max-chips').value);

    let betDescription = `Winning Number: ${winningNumber}\n\n`;
    
    // Randomly assign chips to each bet type based on the max chips
    betTypes.forEach(bet => {
        bet.chips = getRandomInt(maxChips);
        betDescription += `${bet.chips} chips on ${bet.name}\n`;

        // Calculate payout for this bet if it wins
        totalPayout += bet.chips * bet.payout;
    });

    // Display the bet details
    document.getElementById('bet-display').innerText = betDescription;

    // Reset the input field and result display
    document.getElementById('payout').value = '';
    document.getElementById('result').innerText = '';
}

// Handle form submission
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

// Initialize the first bet with default max chips
generateBet();
