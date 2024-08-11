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
let streakCount = 0; // Initialize streak counter

// Generate a random number between 0 and max (inclusive)
function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

let betStartTime = null; // Variable to store the start time of the bet

// Generate random bets and calculate the payout
function generateBet() {
    winningNumber = getRandomInt(36);
    totalPayout = 0;

    // Capture the start time when the bet is generated
    betStartTime = new Date();

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

    // Capture the time of submission
    const betEndTime = new Date();
    const timeTaken = (betEndTime - betStartTime) / 1000; // Time taken in seconds

    // Check if the user input matches the calculated payout
    const isCorrect = userPayout === totalPayout;

    if (isCorrect) {
        document.getElementById('result').innerText = "Correct!";
        document.getElementById('result').style.color = "green";
        streakCount++;
    } else {
        document.getElementById('result').innerText = `Incorrect. The correct payout was ${totalPayout}.`;
        document.getElementById('result').style.color = "red";
        streakCount = 0; // Reset streak counter if wrong
    }

    // Update streak count display
    document.getElementById('streak-count').innerText = streakCount;

    // Record the previous bet and result, including the time taken
    const betSummary = `Correct Payout: ${totalPayout} | Your Answer: ${userPayout} | Result: ${isCorrect ? 'Correct' : 'Incorrect'} | Time Taken: ${timeTaken} seconds`;
    const betList = document.getElementById('bets-list');
    const newListItem = document.createElement('li');
    newListItem.innerText = betSummary;
    betList.insertBefore(newListItem, betList.firstChild); // Add new item at the top of the list
});

// Initialize the first bet with default max chips
generateBet();
