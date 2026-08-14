let gameState;
let isLoadingSequenceActive = false;
let challenge2SelectionLocked = false;
let challenge3SelectionLocked = false;

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
  gameState = new GameState();
  renderCurrentScreen();
});

// RENDERIZAR PANTALLA ACTUAL
function renderCurrentScreen() {
  const app = document.getElementById("app");
  const screen = Screens[gameState.currentScreen];
  
  if (!screen) {
    console.error(`Pantalla no encontrada: ${gameState.currentScreen}`);
    return;
  }

  app.innerHTML = screen.render();
  
  // Ejecutar lógica específica de la pantalla si existe
  if (screen.init) screen.init();
}

// MANEJO DE INICIO DE JUEGO
function handleStartGame() {
  isLoadingSequenceActive = true;
  gameState.goToScreen("loadingSequence");
  renderCurrentScreen();

  setTimeout(() => {
    gameState.goToScreen("challenge1");
    renderCurrentScreen();
    setupChallenge1();
  }, 2500);
}

// ==================== CHALLENGE 1 ====================
let currentPasswordInput = "";

function addDigit(digit) {
  if (currentPasswordInput.length < 8) {
    currentPasswordInput += digit;
    updatePasswordDisplay();
  }
}

function removeDigit() {
  currentPasswordInput = currentPasswordInput.slice(0, -1);
  updatePasswordDisplay();
}

function clearInput() {
  currentPasswordInput = "";
  updatePasswordDisplay();
  clearResultArea();
}

function updatePasswordDisplay() {
  const input = document.getElementById("passwordInput");
  if (input) {
    input.value = currentPasswordInput;
  }
}

function submitChallenge1() {
  const resultArea = document.getElementById("challenge1-result");
  const correctPassword = GAME_CONFIG.challenge1.password;

  if (currentPasswordInput === correctPassword) {
    resultArea.innerHTML = `
      <div class="result success">
        <h3>🔓 ACCESO CONCEDIDO</h3>
        <p>${GAME_CONFIG.challenge1.successMessages[0]}</p>
        <p>${GAME_CONFIG.challenge1.successMessages[1]}</p>
        <button class="btn-primary" onclick="proceedToChallenge2()">
          CONTINUAR
        </button>
      </div>
    `;
    gameState.completeChallenge(1);
  } else {
    resultArea.innerHTML = `
      <div class="result failure">
        <h3>❌ Incorrecto.</h3>
        <p>Pista: <strong>${GAME_CONFIG.challenge1.hint}</strong></p>
        <button class="btn-secondary" onclick="clearInput()">
          REINTENTAR
        </button>
      </div>
    `;
  }
}

function proceedToChallenge2() {
  gameState.goToScreen("challenge2");
  gameState.currentChallenge2Round = 0;
  gameState.challenge2RoundsCompleted = 0;
  renderCurrentScreen();
  setupChallenge2();
}

function setupChallenge1() {
  currentPasswordInput = "";
  updatePasswordDisplay();
}

function clearResultArea() {
  const resultArea = document.getElementById("challenge1-result");
  if (resultArea) resultArea.innerHTML = "";
}

// ==================== CHALLENGE 2 ====================
let selectedPhotoCard = null;

function selectPhoto(photoId, correctOrder, expectedCorrectId) {
  if (challenge2SelectionLocked) return;

  if (selectedPhotoCard) {
    selectedPhotoCard.classList.remove("selected");
  }

  const photoCard = document.querySelector(`[data-photo-id="${photoId}"]`);
  photoCard.classList.add("selected");
  selectedPhotoCard = photoCard;

  challenge2SelectionLocked = true;

  setTimeout(() => {
    validateChallenge2Selection(photoId, expectedCorrectId);
  }, 500);
}

function validateChallenge2Selection(photoId, expectedCorrectId) {
  const resultArea = document.getElementById("challenge2-result");
  const currentRound = GAME_CONFIG.challenge2.rounds[gameState.currentChallenge2Round];

  if (photoId == expectedCorrectId) {
    resultArea.innerHTML = `
      <div class="result success">
        <h3>✅ Correcto ❤️</h3>
        <div class="memory-unlock">
          <p class="memory-title">📜 ARCHIVO DESBLOQUEADO</p>
          <p class="memory-text">${currentRound.memoryText}</p>
        </div>
        <button class="btn-primary" onclick="nextChallenge2Round()">
          SIGUIENTE RECUERDO
        </button>
      </div>
    `;
    gameState.completeChallenge(2);
  } else {
    resultArea.innerHTML = `
      <div class="result failure">
        <h3>❌ Incorrecto.</h3>
        <p>¿Ves cómo no me quieres? 😭</p>
        <button class="btn-secondary" onclick="resetChallenge2Selection()">
          REINTENTAR
        </button>
      </div>
    `;
  }
}

function nextChallenge2Round() {
  gameState.incrementChallenge2Round();
  challenge2SelectionLocked = false;
  selectedPhotoCard = null;
  renderCurrentScreen();
  setupChallenge2();
}

function resetChallenge2Selection() {
  if (selectedPhotoCard) {
    selectedPhotoCard.classList.remove("selected");
    selectedPhotoCard = null;
  }
  const resultArea = document.getElementById("challenge2-result");
  if (resultArea) resultArea.innerHTML = "";
  challenge2SelectionLocked = false;
}

function setupChallenge2() {
  challenge2SelectionLocked = false;
  selectedPhotoCard = null;
}

function proceedToChallenge3() {
  gameState.goToScreen("challenge3");
  gameState.currentChallenge3Round = 0;
  gameState.challenge3RoundsCompleted = 0;
  renderCurrentScreen();
  setupChallenge3();
}

// ==================== CHALLENGE 3 ====================
function selectChallenge3Option(selectedOption, correctAnswer, explanation) {
  if (challenge3SelectionLocked) return;

  challenge3SelectionLocked = true;
  const resultArea = document.getElementById("challenge3-result");

  if (selectedOption === correctAnswer) {
    // ÉXITO
    resultArea.innerHTML = `
      <div class="result success">
        <h3>✅ ¡Acertaste!</h3>
        <p>${explanation}</p>
        <button class="btn-primary" onclick="nextChallenge3Round()">
          SIGUIENTE PREGUNTA
        </button>
      </div>
    `;
    gameState.completeChallenge(3);
  } else {
    // FALLO
    resultArea.innerHTML = `
      <div class="result failure">
        <h3>❌ Incorrecto.</h3>
        <p>La respuesta correcta era: <strong>${correctAnswer === 'A' ? 'A' : 'B'}</strong></p>
        <p>${explanation}</p>
        <button class="btn-secondary" onclick="resetChallenge3Selection()">
          REINTENTAR
        </button>
      </div>
    `;
  }
}

function nextChallenge3Round() {
  gameState.incrementChallenge3Round();
  challenge3SelectionLocked = false;
  renderCurrentScreen();
  setupChallenge3();
}

function resetChallenge3Selection() {
  const resultArea = document.getElementById("challenge3-result");
  if (resultArea) resultArea.innerHTML = "";
  challenge3SelectionLocked = false;
}

function setupChallenge3() {
  challenge3SelectionLocked = false;
}

// ==================== CHALLENGE 5 ====================
function submitChallenge5() {
  const resultArea = document.getElementById("challenge5-result");
  const daysInput = parseInt(document.getElementById("daysInput").value);
  const correctAnswer = GAME_CONFIG.challenge5.correctAnswer;
  const tolerance = GAME_CONFIG.challenge5.tolerance;

  if (isNaN(daysInput)) {
    resultArea.innerHTML = `
      <div class="result failure">
        <h3>❌ Por favor introduce un número válido.</h3>
      </div>
    `;
    return;
  }

  if (Math.abs(daysInput - correctAnswer) <= tolerance) {
    // ÉXITO
    resultArea.innerHTML = `
      <div class="result success">
        <h3>✅ ¡Correcto! ${daysInput} días</h3>
        <div class="memory-unlock">
          <p class="memory-title">🎯 ÚLTIMO ARCHIVO DESBLOQUEADO</p>
          <p class="memory-text">${GAME_CONFIG.challenge5.successMessages[0]}</p>
          <p class="memory-text">${GAME_CONFIG.challenge5.successMessages[1]}</p>
        </div>
        <button class="btn-primary" onclick="proceedToLocationReveal()">
          REVELAR UBICACIÓN
        </button>
      </div>
    `;
    gameState.completeChallenge(5);
  } else {
    // FALLO
    const difference = Math.abs(daysInput - correctAnswer);
    let hint = "";
    if (daysInput < correctAnswer) {
      hint = "Creo que son más días...";
    } else {
      hint = "Creo que son menos días...";
    }

    resultArea.innerHTML = `
      <div class="result failure">
        <h3>❌ Incorrecto.</h3>
        <p>${hint}</p>
        <p>Pista: La diferencia es de ${difference} días.</p>
        <button class="btn-secondary" onclick="clearChallenge5Input()">
          REINTENTAR
        </button>
      </div>
    `;
  }
}

function clearChallenge5Input() {
  document.getElementById("daysInput").value = "";
  const resultArea = document.getElementById("challenge5-result");
  if (resultArea) resultArea.innerHTML = "";
}

function proceedToLocationReveal() {
  gameState.goToScreen("locationReveal");
  gameState.unlockSecondPhase();
  renderCurrentScreen();
}

function proceedToChallenge4() {
  gameState.goToScreen("challenge5");
  renderCurrentScreen();
}

function goToSecondPhaseInput() {
  gameState.goToScreen("finalPhase");
  renderCurrentScreen();
}

// ==================== FINAL PHASE ====================
function submitFinalCode() {
  const resultArea = document.getElementById("final-result");
  const finalCodeInput = document.getElementById("finalCodeInput").value.toUpperCase();
  const correctCode = GAME_CONFIG.finalCode.toUpperCase();

  if (finalCodeInput === correctCode) {
    // ÉXITO - VICTORIA
    resultArea.innerHTML = `
      <div class="result success">
        <h3>✅ ¡CÓDIGO CORRECTO!</h3>
        <p>¡Lo hiciste! Decodificaste toda la operación.</p>
        <button class="btn-primary" onclick="goToVictory()">
          VER FINAL
        </button>
      </div>
    `;
    gameState.finalCodeEntered = finalCodeInput;
    gameState.save();
  } else {
    // FALLO
    resultArea.innerHTML = `
      <div class="result failure">
        <h3>❌ Código incorrecto.</h3>
        <p>Revisa bien el código de la tarjeta.</p>
        <button class="btn-secondary" onclick="clearFinalCodeInput()">
          REINTENTAR
        </button>
      </div>
    `;
  }
}

function clearFinalCodeInput() {
  document.getElementById("finalCodeInput").value = "";
  const resultArea = document.getElementById("final-result");
  if (resultArea) resultArea.innerHTML = "";
}

function goToVictory() {
  gameState.goToScreen("victory");
  renderCurrentScreen();
}

function resetToStart() {
  gameState.reset();
  renderCurrentScreen();
}

// ==================== EFECTOS VISUALES ====================

// CONFETI
function generateConfetti() {
  const colors = ['#FF1744', '#F50057', '#D500F9', '#651FFF', '#2979F3', '#00B0FF', '#00E5FF', '#1DE9B6', '#00E676', '#76FF03', '#FFEA00', '#FFC400', '#FF9100', '#FF3D00', '#FFD700'];
  const confettiCount = 80;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animation = `fall ${3 + Math.random() * 2}s linear forwards`;
    confetti.style.animationDelay = Math.random() * 0.8 + 's';
    
    document.body.appendChild(confetti);

    // Eliminar confeti después de la animación
    setTimeout(() => confetti.remove(), 5000);
  }
}

// CORAZONES FLOTANTES
function generateFloatingHearts() {
  const heartCount = 15;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-20px';
    
    const animationDuration = 4 + Math.random() * 2;
    const isLeftAnimation = Math.random() > 0.5;
    const animationName = isLeftAnimation ? 'floatLeft' : 'float';
    
    heart.style.animation = `${animationName} ${animationDuration}s ease-in forwards`;
    heart.style.animationDelay = Math.random() * 1.5 + 's';
    
    document.body.appendChild(heart);

    // Eliminar corazón después de la animación
    setTimeout(() => heart.remove(), (animationDuration + 1.5) * 1000);
  }
}