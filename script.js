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
let streakCount = 0;
let correctCount = 0;
let incorrectCount = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

let betStartTime = null;

function generateBet() {
    winningNumber = getRandomInt(36);
    totalPayout = 0;

    betStartTime = new Date();

    maxChips = parseInt(document.getElementById('max-chips').value);

    let betDescription = `Winning Number: ${winningNumber}\n\n`;
    
    betTypes.forEach(bet => {
        bet.chips = getRandomInt(maxChips);
        betDescription += `${bet.chips} chips on ${bet.name}\n`;

        totalPayout += bet.chips * bet.payout;
    });

    document.getElementById('bet-display').innerText = betDescription;

    document.getElementById('payout').value = '';
    document.getElementById('result').innerText = '';
}

function reset() {
    document.getElementById('result').innerText = '';
    document.getElementById('payout').value = '';

    streakCount = 0;
    correctCount = 0;
    incorrectCount = 0;
    document.getElementById('streak-count').innerText = 0;
    document.getElementById('correct-count').innerText = 0;
    document.getElementById('incorrect-count').innerText = 0;
    document.getElementById('bets-list').innerHTML = '';
}

document.getElementById('payout-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const userPayout = parseInt(document.getElementById('payout').value);

    const betEndTime = new Date();
    const timeTaken = (betEndTime - betStartTime) / 1000;

    const isCorrect = userPayout === totalPayout;

    if (isCorrect) {
        document.getElementById('result').innerText = "Correct!";
        document.getElementById('result').style.color = "green";
        streakCount++;
        correctCount++;
    } else {
        document.getElementById('result').innerText = `Incorrect. The correct payout was ${totalPayout}.`;
        document.getElementById('result').style.color = "red";
        streakCount = 0;
        incorrectCount++;
    }

    document.getElementById('streak-count').innerText = streakCount;

    document.getElementById('correct-count').innerText = correctCount;
    document.getElementById('incorrect-count').innerText = incorrectCount;

    const betSummary = `Correct Payout: ${totalPayout} | Your Answer: ${userPayout} | Result: <span style="color: ${isCorrect ? 'green' : 'red'};">${isCorrect ? 'Correct' : 'Incorrect'}</span> | Time Taken: ${timeTaken} seconds`;
    const betList = document.getElementById('bets-list');
    const newListItem = document.createElement('li');
    newListItem.innerHTML = betSummary;
    betList.insertBefore(newListItem, betList.firstChild);

});

generateBet();
