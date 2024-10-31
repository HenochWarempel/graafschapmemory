const images = [
    { id: 'logo1', src: 'https://i.imgur.com/o3mQa2h.png' },
    { id: 'logo2', src: 'https://i.imgur.com/EjLq8KO.png' },
    { id: 'logo3', src: 'https://i.imgur.com/4tpOG78.png' },
    { id: 'logo4', src: 'https://i.imgur.com/veM0uit.jpeg' },
    { id: 'word1', text: 'AI' },
    { id: 'word2', text: 'ChatGPT' },
    { id: 'word3', text: 'Superboeren' },
    { id: 'word4', text: "D'RAN" }
];

const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;

function updateScoreDisplay() {
    scoreDisplay.textContent = `${score}/8`;
    if (score > 8) {
        scoreDisplay.style.color = 'orange';
    } else {
        scoreDisplay.style.color = '#07B6D5';
    }
}

function createCardContent(content) {
    const front = document.createElement('div');
    front.classList.add('card-front');
    front.textContent = '?';
    
    const back = document.createElement('div');
    back.classList.add('card-back');
    
    if (content.src) {
        const img = document.createElement('img');
        img.src = content.src;
        back.appendChild(img);
    } else {
        back.textContent = content.text;
    }
    
    return { front, back };
}

function createCard(content) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = content.id;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const { front, back } = createCardContent(content);
    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);

    card.addEventListener('click', () => handleCardClick(card));
    return card;
}

function handleCardClick(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.id === card2.dataset.id) {
        matchedPairs++;
        score++;
        updateScoreDisplay();
        flippedCards = [];
        if (matchedPairs === images.length) {
            setTimeout(() => {
                alert('Gefeliciteerd! Je hebt het spel gewonnen!');
                showRestartButton();
            }, 500);
        }
    } else {
        score++;
        updateScoreDisplay();
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function showRestartButton() {
    restartButton.style.display = 'block';
}

function restartGame() {
    gameBoard.innerHTML = '';
    restartButton.style.display = 'none';
    score = 0;
    matchedPairs = 0;
    updateScoreDisplay();
    startGame();
}

restartButton.addEventListener('click', restartGame);

function startGame() {
    const doubledImages = [...images, ...images];
    doubledImages.sort(() => Math.random() - 0.5);

    doubledImages.forEach(content => {
        const card = createCard(content);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

startGame();
