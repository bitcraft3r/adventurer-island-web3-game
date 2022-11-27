# Adventurer

Adventurer is an on-chain RPG.

### References

- [Ethers JS Tutorial](https://youtu.be/_gdfX2mPgRc)
- [Web3JS Official Documentation](https://github.com/web3/web3.js/blob/1.x/README.md)
- [Display NFTs (Web3JS) Tutorial](https://youtu.be/7P2nnpU-HoQ)

#### Test metamask connection (web3js)
- `main()` in console; metamask should pop up to connect
- `account` in console; show your connected account address
- `contract` in console; show the contract object
    - `await contract.methods.balanceOf(account).call()` check balance of account w.r.t. the nft contract

#### Check token metadata
In console:
- `main` will return the URLs of the metadata of each token; click to open
- `tokens` returns array of tokens (objects)
    - `tokens[0]` to access first token
    - `tokens[0].metadata` to access first token's metadata e.g. `tokens[0].metadata.image` and `tokens[0].metadata.attributes[0].value` for strength.
- `result = await fetch("url-here")`
- `await result.json()` returns the metadata as a json object

### Resources

#### Design patterns for turn-based strategy games

> The answer is twofold: give players many quick-wins throughout the game, and give players deep but manageable strategic options to choose from.

Source: https://www.reddit.com/r/gamedev/comments/1wxofc/game_design_patterns_and_antipatterns_for/

> - How to Make an RPG: Stats: http://howtomakeanrpg.com/a/how-to-make-an-rpg-stats.html
> - Syllabus: Game Development Studio: http://robert.zubek.net/docs/games-studio-2022/

> I also have a couple of other links that might be helpful for you.
> - Scripted abilities/effects: https://www.gridsagegames.com/blog/2016/09/ability-effect-systems-scripted-content/
> - Data driven and event based equipment/stats, also gives example of an attack: https://www.youtube.com/watch?v=U03XXzcThGU&t=571s
> - This reddit question about the same thing, lots of good info here: https://www.reddit.com/r/gamedev/comments/50rrcs/code_design_for_an_ability_status_effect_system/

> I recommend reading through Eric Lippert's [Wizards and Warriors](https://ericlippert.com/2015/04/27/wizards-and-warriors-part-one/) blog posts. He approaches a similar problem from a few angles and examines the consequences of each design. Hopefully it gives you some ideas for your particular situation.

Source: https://www.reddit.com/r/gamedev/comments/70kodf/design_pattern_for_attacks_as_well_as/

> https://designpatternsgame.com/patterns
> https://www.haroldserrano.com/blog/design-patterns-in-game-engine-development
> Saving game in browser localStorage: https://www.freecodecamp.org/news/learning-javascript-by-making-a-game-4aca51ad9030/

#### Videos:
- https://www.youtube.com/watch?v=fyi4vfbKEeo
- https://www.youtube.com/watch?v=W4SVdtY6wZs
- https://www.youtube.com/watch?v=R1S_NhKkvGA