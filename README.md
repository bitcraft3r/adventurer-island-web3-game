# Adventurer Island

Adventurer Island is an top-down RPG.

Choose your favorite class - Swordsman, Archer, or Wizard - and embark on an epic adventure filled with monsters to defeat and treasure to collect.

Play: https://adventurer-game.vercel.app

[*ADVENTURER (**$ADV**) NFT*](https://opensea.io/collection/adventurer-eth) holders can connect Metamask to use their ADV's stats to generate their in-game character.

![Adventurer Island Trailer](https://user-images.githubusercontent.com/8282076/206637745-2afe189b-f498-4a0b-9495-f536dde357f9.gif)

## Goals & Motivations

1. Demonstrate creativity, and knowledge and skills in HTML/CSS/JS and Solidity/Web3 - to showcase in Portfolio
2. Practice Solidity and Web3 programming
3. Brush up on less familiar topics like CSS and DOM manipulation

## Technologies

- HTML, CSS, JavaScript
- [HTML Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for game graphics
- [Howler](https://cdnjs.com/libraries/howler) for audio
- [GSAP](https://greensock.com/docs/) for animations
- Google Font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)
- [Web3.js](https://github.com/web3/web3.js/blob/1.x/README.md) for Ethereum JS API
- [Solidity](https://docs.soliditylang.org/en/v0.8.17/) for EVM smart contracts

## Tutorials

- [Pokémon JavaScript Game Tutorial with HTML Canvas](https://youtu.be/yP5DKzriqXA)
- [Display NFTs (Web3.js) Tutorial](https://youtu.be/7P2nnpU-HoQ)

## Approach

Three main JS files: `index.js`, `battleScene.js`, `classes.js` that handle logic for the game, animations and UI, and factory for creating characters.

Key Highlights:

1. `Classes` provide a DRY method of creating the same type of object e.g. players, monsters, games/rounds.
2. Using `Objects` with `key: value` pairs as arguments/inputs to a function can be useful e.g. for large number of inputs, because there's no need to know the order/index.

## Installation

Run `index.html` to start the game.

No external libraries required.

Deployed with [Vercel](https://vercel.com/).

## Unsolved Problems and TODOs

- When click on `(View)` to load NFTs more than once, the same nft is loaded multiple times.
- CSS/design can be improved
- Mobile experience and resolution (16:9) not ideal
- Game mechanics improvements
    - level 5-6 is too difficult
    - nothing new beyond level 6
    - add new attacks, new monsters, different attack animatinos
    - more utility for attributes e.g. STR for armor, AGI for evade, WIS for critical hit
- Button and hotkey to open Bag (B), Gear (G), Stats (T)
- Storage chest
- NPC
- Other activities, e.g. chopping trees, mining, fishing, farming, etc.
- Enter house...

## Challenges

Integrating the UI from the tutorial with my own game mechanics was the biggest challenge. 
I struggled to understand the existing code base and how to add new features without creating a lot of repetitive code. 
My lack of game design pattern knowledge made it difficult to implement scalable solutions to the problems I faced. 
Overall, I wasn't sure how to effectively deal with these challenges.