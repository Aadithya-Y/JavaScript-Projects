const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cards = [...cardValues, ...cardValues];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

// Shuffle cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create the cards on the grid
function createCardGrid() {
  const cardGrid = document.getElementById('card-grid');
  shuffle(cards);

  cards.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    cardGrid.appendChild(card);
  });
}

// Flip the card
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      document.getElementById('moves').textContent = `Moves: ${moves}`;
      checkMatch();
    }
  }
}

// Check if the flipped cards match
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    matchedPairs++;
    if (matchedPairs === cardValues.length) {
      setTimeout(() => alert(`You won! Total moves: ${moves}`), 500);
    }
    flippedCards = [];
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

// Restart the game
function restartGame() {
  document.getElementById('card-grid').innerHTML = '';
  matchedPairs = 0;
  moves = 0;
  document.getElementById('moves').textContent = `Moves: 0`;
  createCardGrid();
}

document.getElementById('restart-btn').addEventListener('click', restartGame);

// Initialize the game
createCardGrid();
