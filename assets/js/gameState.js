class GameState {
  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    const saved = localStorage.getItem("operacionAniversario");
    if (saved) {
      const state = JSON.parse(saved);
      Object.assign(this, state);
    } else {
      this.currentScreen = "splash";
      this.completedChallenges = [];
      this.currentChallenge2Round = 0;
      this.challenge2RoundsCompleted = 0;
      this.currentChallenge3Round = 0;
      this.challenge3RoundsCompleted = 0;
      this.unlockedSecondPhase = false;
      this.finalCodeEntered = null;
      this.save();
    }
  }

  save() {
    localStorage.setItem("operacionAniversario", JSON.stringify(this));
  }

  goToScreen(screenName) {
    this.currentScreen = screenName;
    this.save();
  }

  completeChallenge(challengeNumber) {
    if (!this.completedChallenges.includes(challengeNumber)) {
      this.completedChallenges.push(challengeNumber);
      this.save();
    }
  }

  incrementChallenge2Round() {
    this.currentChallenge2Round++;
    this.challenge2RoundsCompleted++;
    this.save();
  }

  incrementChallenge3Round() {
    this.currentChallenge3Round++;
    this.challenge3RoundsCompleted++;
    this.save();
  }

  unlockSecondPhase() {
    this.unlockedSecondPhase = true;
    this.save();
  }

  reset() {
    this.currentScreen = "splash";
    this.completedChallenges = [];
    this.currentChallenge2Round = 0;
    this.challenge2RoundsCompleted = 0;
    this.currentChallenge3Round = 0;
    this.challenge3RoundsCompleted = 0;
    this.unlockedSecondPhase = false;
    this.finalCodeEntered = null;
    this.save();
  }
}