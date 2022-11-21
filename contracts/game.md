# Game.sol

## Contract address

TX: https://mumbai.polygonscan.com/tx/0x10e629f47b422ec64d6f60cbd7af4e6e2cd3fe7129fc48a16bfdd2f30c7ca467

Contract Address: https://mumbai.polygonscan.com/address/0xb710fda663ca2921fbb86979c554ac36c0a15017

## Verify contract

## Playing the game

### Write > battle(_index)

NOTES:
- If unable to battle (error creating tx), try changing the name input.
- If unable to view stats, refresh polygonscan page

### View results

- getHero(index)
- getSpawn (index)
- roundDetails(index)
- attackDetails(attackIndex)

#### WIN case

roundIndex: 1

![Game Score after win game](https://user-images.githubusercontent.com/8282076/202982582-864dec40-7f22-4fb1-9634-6a64b6473e89.png)

![Adventurer stats win game](https://user-images.githubusercontent.com/8282076/202982640-96dc495a-839f-4f7d-937d-731506fb0a47.png)

![Spawn stats after win game](https://user-images.githubusercontent.com/8282076/202982699-9f2779de-6cf4-44e3-9619-edf20b9844ef.png)

![attackDetails firstAttackIndex](https://user-images.githubusercontent.com/8282076/202982950-af5ae491-38ee-468e-942f-1ff5fefbc69f.png)

![attackDetails lastAttackIndex](https://user-images.githubusercontent.com/8282076/202982986-d4c5f516-4352-4fce-bcc9-9bbd2fb75bdb.png)

#### LOSE case

roundIndex: 0 

![Game Score after 1 battle](https://user-images.githubusercontent.com/8282076/202982413-01fdee59-c6a5-48da-83a6-bd74c5892c43.png)

#### TIE case

roundIndex: 9

![Game Score after tie game](https://user-images.githubusercontent.com/8282076/202982316-1a5d6ff5-19fa-45ba-bef7-73657e892e6b.png)

## NEW CONTRACT - Add getter for lastGameIndex()

- Contract: https://mumbai.polygonscan.com/address/0x8e7d87357f4dd4da2b3c33fb381d8d40385dcfc1

NOTES: Calling battle() also returns index of battle's round.

## NEW CONTRACT - Add passive pray() skill

- Contract: https://mumbai.polygonscan.com/address/0x0a02d6d14af21063d478c90a2ed876489c2a0b94

Gives player better chance to win enemies that are slightly stronger