// The Game of Dice
class GameEngine {
  constructor(n, m) {
    if (!n || !m) {
      throw new Error('Missing required arguments n or m.');
    }
    if (typeof n === 'string' || typeof m === 'string') {
      throw new Error('Invalid arguments n or m.');
    }
    this.playersCount = n;
    this.gameSetPoints = m;
    this.playersTable = {};
    this.playingOrder = [];
    this._currentPlayerId = 0;
    this._currentPlayingOrderIdx = 0;
    this._penalizedIds = [];
    this._nextRank = 0;
    this.buildPlayersTable();
    this.printGameState();
    this.printNextPlayer();
  }

  buildPlayersTable() {
    for (let i = 1; i <= this.playersCount; i++) {
      this.playersTable[i] = {
        id: i,
        name: `Player-${i}`,
        rank: 0,
        points: 0,
        lastPoint: 0,
        turns: 0
      }
    }
    this.generatePlayingOrder();
  }

  generatePlayingOrder () {
    while (this.playingOrder.length < this.playersCount) {
      let order = Math.floor(Math.random() * this.playersCount) + 1;
      if (this.playingOrder.indexOf(order) === -1) {
        this.playingOrder.push(order);
      }
    }
    this._currentPlayerId = this.playingOrder[0]
  }

  printGameState () {
    this.printOutput('Players Table', Object.values(this.playersTable));
    if (this.playingOrder.length) {
      this.printOutput('Playing Order', this.playingOrder);
    }
  }

  printNextPlayer () {
    const currentPlayer = this.getPlayer();
    this.printOutput(`${currentPlayer.name} its your turn (execute ‘game.play()’ to roll the dice)`)
  }

  play () {
    let currentPlayer = this.getPlayer()
    const penalty = this.checkPenalizedPlayerId()
    if (penalty[1]) {
      this._penalizedIds.splice(penalty[0], 1);
      this.printOutput(`${currentPlayer.name} is penalized for two 1s, so skipping turn.`)
    } else {
      let point = this.randomDiceValue();
      this.handlePenalty(point);
      this.updatePlayerPoints(point);
      while (point === 6) {
        this.printOutput(`${currentPlayer.name} got lucky and got another chance to Roll the Dice.`)
        point = this.randomDiceValue();
        this.updatePlayerPoints(point);
      }
    }
    this.nextPlayer()
  }

  randomDiceValue () {
    // this.randomDiceRoll();
    return Math.ceil(Math.random() * 6);
  }

  randomDiceRoll () {
    for (let i = 1; i <= 6; i++) {
      this.printOutput(Math.ceil(Math.random() * 6))
    }
  }

  handlePenalty (point) {
    let currentPlayer = this.getPlayer()
    if (point === 1) {
      if (currentPlayer.lastPoint === 1) {
        this._penalizedIds.push(this._currentPlayerId)
      }
    }
  }

  checkPenalizedPlayerId () {
    const penaltyIdx = this._penalizedIds.findIndex(playerId => playerId === this._currentPlayerId);
    if (penaltyIdx >= 0) {
      return [penaltyIdx, true]
    }
    return [-1, false]
  }

  updatePlayerPoints (point) {
    const currentPlayer = this.getPlayer();
    this.printOutput(`${currentPlayer.name} has achieved ${point}`);
    this.playersTable[this._currentPlayerId].points += point;
    this.playersTable[this._currentPlayerId].lastPoint = point;
    this.playersTable[this._currentPlayerId].turns += 1 ;
    this.handlePlayerState()
  }

  handlePlayerState () {
    let currentPlayer = this.getPlayer();
    if (currentPlayer.points >= this.gameSetPoints && !currentPlayer.rank) {
      const rank = ++this._nextRank;
      currentPlayer.rank = rank;
      const playingOrderIdx = this.playingOrder.findIndex(playerId => playerId === this._currentPlayerId)
      this.playingOrder.splice(playingOrderIdx, 1);
      this.printOutput(`${currentPlayer.name} has completed game and ranked ${currentPlayer.rank}`)
    }
  }

  nextPlayer () {
    this.printGameState()
    if (!this.playingOrder.length) {
      this.printOutput('Game Completed, Start new Game!');
      // this.newGame()
      return;
    }
    const playingOrderIdx = this.nextPlayingOrderIdx();
    let nextPlayerId = this.playingOrder[playingOrderIdx];
    if (nextPlayerId === this._currentPlayerId) {
      nextPlayerId = this.playingOrder[playingOrderIdx + 1] || this.playingOrder[0];
    }
    this._currentPlayerId = nextPlayerId;
    const currentPlayer = this.getPlayer();
    this.printNextPlayer()
  }

  newGame () {
    this.buildPlayersTable();
    this.generatePlayingOrder();
    this.printGameState();
    this.printNextPlayer();
  }

  nextPlayingOrderIdx() {
    if (this._currentPlayingOrderIdx < this.playingOrder.length - 1) {
      return ++this._currentPlayingOrderIdx;
    }
    return 0
  }

  getPlayer () {
    return this.playersTable[this._currentPlayerId];
  }

  printOutput (label, output) {
    console.log('===>', label);
    console.table(output);
  }
}

module.exports = GameEngine
