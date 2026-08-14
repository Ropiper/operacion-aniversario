const Screens = {
  splash: {
    render() {
      return `
        <div class="screen splash-screen">
          <div class="splash-content">
            <h1>OPERACIÓN</h1>
            <h2>02 / 02</h2>
            
            <div class="info-grid">
              <div class="info-item">
                <label>ESTADO</label>
                <span>REGALO DESAPARECIDO</span>
              </div>
              <div class="info-item">
                <label>DIFICULTAD</label>
                <span class="difficulty-bar">███████░░░</span>
              </div>
              <div class="info-item">
                <label>TIEMPO ESTIMADO</label>
                <span>10 MIN</span>
              </div>
            </div>

            <button class="btn-primary" onclick="handleStartGame()">
              INICIAR MISIÓN
            </button>
          </div>
        </div>
      `;
    }
  },

  loadingSequence: {
    render() {
      return `
        <div class="screen loading-screen">
          <div class="loading-content">
            <h2>INICIALIZANDO SISTEMA...</h2>
            <div class="terminal">
              <p class="terminal-line">▸ Buscando recuerdos...</p>
              <p class="terminal-line" style="animation-delay: 0.3s">▸ Analizando relación...</p>
              <p class="terminal-line success" style="animation-delay: 0.6s">✓ Compatibilidad encontrada: 100% ❤️</p>
            </div>
          </div>
        </div>
      `;
    }
  },

  challenge1: {
    render() {
      return `
        <div class="screen challenge-screen">
          <div class="challenge-header">
            <h2>ARCHIVO 1 DE 4</h2>
            <div class="progress-bar">
              <div class="progress" style="width: 20%"></div>
            </div>
          </div>

          <div class="challenge-content">
            <h3>PRIMER ARCHIVO ENCONTRADO</h3>
            <p>Para continuar necesito una contraseña.</p>
            <p>No es una contraseña cualquiera.</p>
            <p><strong>Es el día en el que comenzó nuestra historia.</strong></p>
            <p class="hint">Introduce la fecha en formato: DDMMYYYY</p>

            <div id="challenge1-result" class="result-area"></div>

            <div class="numeric-keypad">
              ${Array.from({length: 10}, (_, i) => 
                `<button class="key" onclick="addDigit(${i})">${i}</button>`
              ).join('')}
              <button class="key key-backspace" onclick="removeDigit()">⌫</button>
              <button class="key key-clear" onclick="clearInput()">LIMPIAR</button>
            </div>

            <div class="input-display">
              <input type="text" id="passwordInput" readonly maxlength="8">
              <button class="btn-primary" onclick="submitChallenge1()">
                VERIFICAR
              </button>
            </div>
          </div>
        </div>
      `;
    }
  },

  challenge2: {
    render() {
      const currentRound = GAME_CONFIG.challenge2.rounds[gameState.currentChallenge2Round];
      const totalRounds = GAME_CONFIG.challenge2.rounds.length;
      const progressPercent = ((gameState.challenge2RoundsCompleted + 1) / (totalRounds + 1)) * 100;

      if (!currentRound) {
        return `
          <div class="screen challenge-screen">
            <div class="challenge-content">
              <h3>🎉 ¡Archivo 2 completado!</h3>
              <p>Has descodificado todos nuestros recuerdos juntos.</p>
              <button class="btn-primary" onclick="proceedToChallenge3()">
                SIGUIENTE PRUEBA
              </button>
            </div>
          </div>
        `;
      }

      return `
        <div class="screen challenge-screen challenge2-screen">
          <div class="challenge-header">
            <h2>ARCHIVO 2 DE 4 - RECUERDOS</h2>
            <div class="progress-bar">
              <div class="progress" style="width: ${progressPercent}%"></div>
            </div>
            <p class="round-counter">Recuerdo ${gameState.challenge2RoundsCompleted + 1} de ${totalRounds}</p>
          </div>

          <div class="challenge-content">
            <h3>${currentRound.question}</h3>

            <div id="challenge2-result" class="result-area"></div>

            <div class="photos-grid">
              ${currentRound.photos.map(photo => `
                <div 
                  class="photo-card" 
                  onclick="selectPhoto(${photo.id}, ${photo.order}, '${currentRound.correctId}')"
                  data-photo-id="${photo.id}"
                >
                  <div class="photo-placeholder">
                    <img src="${photo.src}" alt="Recuerdo">
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
  },

  challenge3: {
    render() {
      const currentRound = GAME_CONFIG.challenge3.rounds[gameState.currentChallenge3Round];
      const totalRounds = GAME_CONFIG.challenge3.rounds.length;
      const progressPercent = ((gameState.challenge3RoundsCompleted + 1) / (totalRounds + 1)) * 100;

      if (!currentRound) {
        return `
          <div class="screen challenge-screen">
            <div class="challenge-content">
              <h3>🎉 ¡Archivo 3 completado!</h3>
              <p>Siempre un equipo.</p>
              <button class="btn-primary" onclick="proceedToChallenge4()">
                SIGUIENTE PRUEBA
              </button>
            </div>
          </div>
        `;
      }

      const hasOptionC = currentRound.optionC !== undefined;
      const optionsCount = hasOptionC ? 3 : 2;

      return `
        <div class="screen challenge-screen challenge3-screen">
          <div class="challenge-header">
            <h2>ARCHIVO 3 DE 4 - PREGUNTAS</h2>
            <div class="progress-bar">
              <div class="progress" style="width: ${progressPercent}%"></div>
            </div>
            <p class="round-counter">Pregunta ${gameState.challenge3RoundsCompleted + 1} de ${totalRounds}</p>
          </div>

          <div class="challenge-content">
            <h3>${currentRound.question}</h3>

            <div id="challenge3-result" class="result-area"></div>

            <div class="options-container options-${optionsCount}">
              <button class="option-btn" onclick="selectChallenge3Option('A', '${currentRound.correctAnswer}', '${currentRound.explanation}')">
                <span class="option-letter">A</span>
                <span class="option-text">${currentRound.optionA}</span>
              </button>
              <button class="option-btn" onclick="selectChallenge3Option('B', '${currentRound.correctAnswer}', '${currentRound.explanation}')">
                <span class="option-letter">B</span>
                <span class="option-text">${currentRound.optionB}</span>
              </button>
              ${hasOptionC ? `
                <button class="option-btn" onclick="selectChallenge3Option('C', '${currentRound.correctAnswer}', '${currentRound.explanation}')">
                  <span class="option-letter">C</span>
                  <span class="option-text">${currentRound.optionC}</span>
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }
  },

  challenge5: {
    render() {
      return `
        <div class="screen challenge-screen challenge5-screen">
          <div class="challenge-header">
            <h2>ARCHIVO 4 DE 4 - FINAL</h2>
            <div class="progress-bar">
              <div class="progress" style="width: 80%"></div>
            </div>
          </div>

          <div class="challenge-content">
            <h3>${GAME_CONFIG.challenge5.question}</h3>
            <p class="hint">${GAME_CONFIG.challenge5.hint}</p>

            <div id="challenge5-result" class="result-area"></div>

            <div class="numeric-input-container">
              <input type="number" id="daysInput" placeholder="Introduce el número de días" min="0" max="9999">
              <button class="btn-primary" onclick="submitChallenge5()">
                VERIFICAR
              </button>
            </div>
          </div>
        </div>
      `;
    }
  },

  locationReveal: {
    render() {
      return `
        <div class="screen location-screen">
          <div class="location-content">
            <h1>${GAME_CONFIG.locationReveal.title}</h1>
            <p class="location-subtitle">${GAME_CONFIG.locationReveal.message}</p>
            
            <div class="location-card">
              <p class="location-label">${GAME_CONFIG.locationReveal.locationText}</p>
              <h2 class="location-highlight">${GAME_CONFIG.locationReveal.location}</h2>
              <p class="location-instructions">${GAME_CONFIG.locationReveal.instructions}</p>
            </div>

            <button class="btn-primary" onclick="goToSecondPhaseInput()">
              TENGO EL CÓDIGO
            </button>
          </div>
        </div>
      `;
    }
  },

  finalPhase: {
    render() {
      return `
        <div class="screen challenge-screen final-phase-screen">
          <div class="challenge-header">
            <h2>CÓDIGO FINAL</h2>
            <div class="progress-bar">
              <div class="progress" style="width: 100%"></div>
            </div>
          </div>

          <div class="challenge-content">
            <h3>¡Casi lo tenemos!</h3>
            <p>Abre la tarjeta del regalo y introduce el código que encontraste.</p>
            <p class="hint">Formato: XXX-XXX-XXX (sin espacios)</p>

            <div id="final-result" class="result-area"></div>

            <div class="code-input-container">
              <input type="text" id="finalCodeInput" placeholder="Introduce el código" maxlength="11">
              <button class="btn-primary" onclick="submitFinalCode()">
                VERIFICAR
              </button>
            </div>
          </div>
        </div>
      `;
    }
  },

  victory: {
    render() {
      return `
        <div class="screen victory-screen">
          <audio id="victoryMusic" loop>
            <source src="./assets/audio/tal_para_cual.mp3" type="audio/mpeg">
            Tu navegador no soporta el elemento de audio.
          </audio>
          
          <div class="victory-content">
            <h1>🎉 ¡LO HICISTE!</h1>
            <p class="victory-subtitle">Misión completada exitosamente</p>
            
            <div class="victory-message">
              <p>${GAME_CONFIG.finalMessage}</p>
            </div>

            <div class="victory-photos">
              ${GAME_CONFIG.finalPhotos.map((photo, index) => `
                <div class="final-photo" style="animation-delay: ${index * 0.2}s">
                  <img src="${photo}" alt="Recuerdo final">
                </div>
              `).join('')}
            </div>

            <button class="btn-primary" onclick="resetToStart()">
              VOLVER AL INICIO
            </button>
          </div>
        </div>
      `;
    },

    init() {
      const audio = document.getElementById("victoryMusic");
      if (audio) {
        audio.volume = 0.5; // Volumen al 50%
        audio.play().catch(err => console.log("No se pudo reproducir la música:", err));
      }

      // Generar confeti
      generateConfetti();
      
      // Generar corazones flotantes
      generateFloatingHearts();
    }
  }
};