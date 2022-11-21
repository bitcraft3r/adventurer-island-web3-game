# Game.sol

## Contract address

TX: https://mumbai.polygonscan.com/tx/0x6144c68b96964508dc50cb660d8700ca6897cb09100cc33396641392dcfc1019

Contract Address: https://mumbai.polygonscan.com/address/0xd6983c07fe3f65ab21689fb5373efadd7b8a5e70

## Playing the game

### **Write -> battle(_index)**

NOTES:
- If unable to battle (error creating tx), try changing the name input.
- If unable to view stats, refresh polygonscan page

## View results

### **Read ->**

- getHero(index)
- getSpawn (index)
- roundDetails(index)
- attackDetails(attackIndex)
- lastGameIndex()

### WIN case

> roundIndex: 0

#### **roundDetails(0)**

![Game Score after win game](https://user-images.githubusercontent.com/8282076/203008424-bacafa86-7faa-43f1-8609-27e3ec705b6d.png)
- 0: Round Index number
- 7: Total Attacks in this round
- 0: Index of first attack in this round
- 6: Index of last attack in this round
- true: Result of the round, true if win, false if lose
- 20: Coins won = 20 if win, 5 if tie

#### **getHero(0)**

![Adventurer stats win game](https://user-images.githubusercontent.com/8282076/203008491-36954df7-2818-42d5-aac5-00ab993cdf90.png)
- adv0: Player Name
- 37: Player HP (at the end of battle)
- 7: STR
- 7: AGI
- 7: IS

#### **getSpawn(0)**

![Spawn stats after win game](https://user-images.githubusercontent.com/8282076/203008523-59a01715-833b-4cf6-9685-35dff8c286c0.png)
- -5: Spawn HP (at the end of battle)
- 7: STR
- 8: AGI
- 1: WIS

#### **attackDetails(0)**

![attackDetails firstAttackIndex](https://user-images.githubusercontent.com/8282076/203008588-274fdbb2-0c25-49a1-a2cb-9ea4c5a72c5c.png)
- 0: Index of Round
- 0: Index of the attack within the round (attackCount - resets every battle)
- 91: Player HP (at the end of battle)
- 15: Damage dealt by Player this round
- 85: Spawn HP (at the end of battle)
- 9: Damage dealt by Spawn this round

#### **attackDetails(6)**

![attackDetails lastAttackIndex](https://user-images.githubusercontent.com/8282076/203008678-1ea5b0e8-489e-423a-b14e-e75a70412020.png)

### LOSE case

> roundIndex: 7 

### TIE case

> roundIndex: 1