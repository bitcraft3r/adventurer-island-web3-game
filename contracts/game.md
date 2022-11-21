# Game.sol

## Contract address

TX: https://mumbai.polygonscan.com/tx/0xb7617031b95ad512ab70f239c64fe7d34457add0407b102805528b4fce65d8b2

Contract Address: https://mumbai.polygonscan.com/address/0x166992350969c893577bfa6649bf0d4a10ccc071#readContract

## Verify contract

## Playing the game

### 2. battle(_index)

TX: https://mumbai.polygonscan.com/tx/0x76284a49e200ba114584fa9a7b32d5cd0f58f3f48fe235066a12a60438e0d5f4

### View results

#### WIN case

![Adventurer stats after 1 battle](https://user-images.githubusercontent.com/8282076/202947219-26af0318-e155-44da-add3-55a690b30dc4.png)

![Spawn stats after 1 battle](https://user-images.githubusercontent.com/8282076/202947318-2d997913-72a4-446a-8135-ece76c634390.png)

![Game Score after 1 battle](https://user-images.githubusercontent.com/8282076/202947388-7b157643-0099-446a-9f4d-2e79bc7ed58c.png)

#### BUG?

For Index = 4,
Player was left with 100 HP.

![Bug? Player and Spawn stats after 1 battle](https://user-images.githubusercontent.com/8282076/202949859-12e7c467-1ac3-485b-a2d6-23cd351563d3.png)


Contract broke after Index = 6?
Can't create index=7:

![Bug? Cannot create the next game](https://user-images.githubusercontent.com/8282076/202950722-6a143776-64dd-4818-9d36-889c58b551ad.png)


<!-- 
#### LOSE case

![Adventurer stats after 1 battle]()

![Spawn stats after 1 battle]()

![Game Score after 1 battle]()

#### TIE case

![Adventurer stats after 1 battle]()

![Spawn stats after 1 battle]()

![Game Score after 1 battle]() -->