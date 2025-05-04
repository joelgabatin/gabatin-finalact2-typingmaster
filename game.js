let words = [];
let score = 0;

// Load the word list from words.json
fetch('words.json')
  .then(response => response.json())
  .then(data => {
    words = data; // Data is a JSON array
    startGame();
  })
  .catch(error => console.error('Error loading words:', error));

function startGame() {
  setInterval(createWord, 2000);
}

function createWord() {
  if (words.length === 0) return;
  const wordElement = document.createElement('div');
  wordElement.className = 'word';
  // Select a random word from the array
  wordElement.innerText = words[Math.floor(Math.random() * words.length)];
  wordElement.style.top = '0px';
  wordElement.style.left = `${Math.random() * 250}px`;
  document.getElementById('game-container').appendChild(wordElement);
  moveWord(wordElement);
}

function moveWord(wordElement) {
  let top = 0;
  const interval = setInterval(() => {
    if (top >= 380) {
      clearInterval(interval);
      wordElement.remove();
      return;
    }
    top += 2;
    wordElement.style.top = top + 'px';
  }, 50);
}

document.getElementById('typing-input').addEventListener('input', (e) => {
  const input = e.target.value.trim();
  const wordsOnScreen = document.querySelectorAll('.word');
  wordsOnScreen.forEach(wordElement => {
    if (wordElement.innerText === input) {
      score += 10;
      document.getElementById('score').innerText = score;
      wordElement.remove();
      e.target.value = '';
    }
  });
});

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('service-worker.js');
// }
