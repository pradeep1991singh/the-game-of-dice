// The Game of Dice
const GameEngine = require('./GameEngine')

const args = process.argv.slice(2)
let game = new GameEngine(args[0], args[1])
