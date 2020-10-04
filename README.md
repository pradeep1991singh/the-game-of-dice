# The Game of Dice

## About Application
- It Builds Players table.
- Generate random Playing order.
- Expose `play` method to play the game.
- Handle `6` point and `consecute 1s` point.
- Print Players table on each dice roll.
- Print Next player name.
- Print points achieved by each player after their turn.
- Call out if a player gets luckcy (achieved `6`) or skipped turn (`consecute 1s`).
- Update ranking when a player completes required points.
- Exclude player if received Rank.
- Print `Game Completed` when all player achieves required points.

## Run standalone program

```sh
# Enter to nodejs Repl
$ node

# Require program
> const GameEngine = require('./GameEngine')

# Create Game application
# It takes N=number_of_playes, M=points_for_game_completion
> let game = new GameEngine(5, 10)

# Play game
> game.play()
```

## Run test

```sh
$ npm test
```

