const expect = require('chai').expect;
const GameEngine = require('../GameEngine')

describe('Index.js', () => {
    it('should return "Missing required arguments n or m." error if N and M values not present', () => {
        const errorMessage = 'Missing required arguments n or m.'
        try {
            let game = new GameEngine();
        } catch (error) {
            console.log(error);
            expect(error.message).to.equal(errorMessage);
        }
    });

    it('should return "Invalid arguments n or m." error if N and M values is not Number', () => {
        const errorMessage = 'Invalid arguments n or m.'
        try {
            let game = new GameEngine('hello', 'world');
        } catch (error) {
            console.log(error);
            expect(error.message).to.equal(errorMessage);
        }
    });

    it('should return players table and playing order', () => {
        let game = new GameEngine(5, 10);
        const playersTable = Object.values(game.playersTable);
        expect(playersTable).to.have.length(5);
        const playingOrder = game.playingOrder;
        expect(playingOrder).to.have.length(5);
    });

    it('should return 9', () => {
        expect(3 * 3).to.equal(9);
    });
});


describe('GameEngine.js', () => {
    let game

    before(function () {
        game = new GameEngine(5, 10);
    });

    it('should return players table and playing order', () => {
        const playersTable = Object.values(game.playersTable);
        expect(playersTable).to.have.length(5);
        const playingOrder = game.playingOrder;
        expect(playingOrder).to.have.length(5);
    });
});

