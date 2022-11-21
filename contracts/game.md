# Game.sol

## Contract address

TX: https://mumbai.polygonscan.com/tx/0x43308e85afc641b80100579e149677a9d40c80606e2d1818422230d6b807c9ce

Contract Address: https://mumbai.polygonscan.com/address/0xf205a351189f2f7126c197de45be9493bdf38a54

## Verify contract

## Playing the game

### 2. battle(_index)

TX: https://mumbai.polygonscan.com/tx/0xecde3f5cf8d82aa49d3893026f9d7e6b668b62a5a5420a4daceea770cceffe4c

NOTES:
- If unable to battle (error creating tx), try changing the name input. input should not have spaces.
- If unable to view stats, refresh etherscan page

### View results

#### WIN case

![Adventurer stats after 1 battle](https://user-images.githubusercontent.com/8282076/202961193-cf3c8c1c-6e2a-4171-af0b-604bc1cf9ff2.png)

![Spawn stats after 1 battle](https://user-images.githubusercontent.com/8282076/202961211-4001b323-4f63-431a-a1b5-648b0a26313a.png)

![Game Score after 1 battle](https://user-images.githubusercontent.com/8282076/202961228-a60b00e6-589e-4e6f-9bfe-0daf5a6c2c8b.png)

#### LOSE case

![Adventurer stats after 1 battle](https://user-images.githubusercontent.com/8282076/202961352-20d3bc95-2081-416f-92e2-43f3219e62ea.png)

![Spawn stats after 1 battle](https://user-images.githubusercontent.com/8282076/202961364-c1758524-b941-4733-a8ab-455fa1f38c14.png)

![Game Score after 1 battle](https://user-images.githubusercontent.com/8282076/202961377-dee51a6f-0766-4463-9b50-7a1104f30d16.png)

#### TIE case

![Adventurer stats after 1 battle](https://user-images.githubusercontent.com/8282076/202961427-650d6488-1d0c-4188-b316-e23b4c95d54f.png)

![Spawn stats after 1 battle](https://user-images.githubusercontent.com/8282076/202961437-5642a690-4cfe-489d-830e-f496f34cb239.png)

![Game Score after 1 battle](https://user-images.githubusercontent.com/8282076/202961445-81f3eaad-caec-4d0e-839c-ed9168f63018.png)

#### BUG?

For Index = 2,
Player was left with 100 HP.

![Bug? Player and Spawn stats after 1 battle](https://user-images.githubusercontent.com/8282076/202961570-e10eef2f-3cdd-416e-ae22-7b45fdb0da26.png)