const levels = [
  'Level 1: What is a stock?',
  'Level 2: Bulls vs Bears market trends',
  'Level 3: Risk management basics',
  'Level 4: Reading candlesticks',
  'Level 5: Building a simple strategy'
];

const state = {
  balance: 10000,
  completedLevels: 0
};

const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const levelsList = document.getElementById('levels');
const walletEl = document.getElementById('wallet');
const tradeForm = document.getElementById('trade-form');
const resultEl = document.getElementById('trade-result');

function renderLevels() {
  levelsList.innerHTML = '';
  levels.forEach((title, i) => {
    const li = document.createElement('li');
    li.className = `level ${i < state.completedLevels ? 'done' : ''}`;
    li.textContent = `${i < state.completedLevels ? '✅' : '⬜'} ${title}`;
    li.addEventListener('click', () => {
      if (state.completedLevels === i) {
        state.completedLevels += 1;
        renderLevels();
      }
    });
    levelsList.appendChild(li);
  });
}

function renderWallet() {
  walletEl.textContent = state.balance.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const mascot = document.querySelector('input[name="mascot"]:checked').value;
  const language = document.getElementById('language').value;

  document.getElementById('welcome').textContent = `Welcome, ${name}`;
  document.getElementById('profile-line').textContent = `Mascot: ${mascot} | Language: ${language}`;

  loginScreen.classList.remove('active');
  dashboardScreen.classList.add('active');

  renderLevels();
  renderWallet();
});

tradeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const move = document.getElementById('move').value;
  const amount = Number(document.getElementById('amount').value);

  if (!Number.isFinite(amount) || amount <= 0 || amount > state.balance) {
    resultEl.textContent = 'Enter a valid amount not greater than your wallet.';
    resultEl.className = 'result bad';
    return;
  }

  const pnl = move === 'up' ? amount * 0.05 : amount * -0.05;
  state.balance += pnl;
  renderWallet();

  resultEl.textContent = `Trade result: ${pnl >= 0 ? '+' : ''}${pnl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
  resultEl.className = `result ${pnl >= 0 ? 'good' : 'bad'}`;
});
