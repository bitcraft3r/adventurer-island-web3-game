// To interact w contract, need 2 things: address, contract abi
const gameContractAddress = "0xd6983c07fe3f65ab21689fb5373efadd7b8a5e70";
const gameContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "_strength",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "_agility",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "_wisdom",
				"type": "int256"
			}
		],
		"name": "battle",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "attackDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getHero",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getSpawn",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastGameIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "roundDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

async function connectMetamask (){
    if(typeof window.ethereum !== "undefined"){
        try
        {
            await ethereum.request({ method: "eth_requestAccounts" });
        }
        catch (error) {
            console.log(error);
        }
       
        document.getElementById("connectButton").innerHTML = "Connected";
        
        const accounts = await ethereum.request({ method: "eth_accounts" });
        console.log(accounts);
    }
    else {
        document.getElementById("connectButton").innerHTML ="Please install MetaMask";
      }
}
async function getLastGameIndex(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const gameContract = new ethers.Contract(gameContractAddress, gameContractABI, provider);

    const latestGameIndex = await gameContract.lastGameIndex();
    document.querySelector("#gameIndex").innerText += ` ${latestGameIndex}`;
    console.log(latestGameIndex.toString());
}

async function startBattle(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const gameContract = new ethers.Contract(gameContractAddress, gameContractABI, provider.getSigner());

    const battle = await gameContract.battle("Webventurer", 7, 7, 7);
    console.log(`battle!`);
}

async function getRoundDetails(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const gameContract = new ethers.Contract(gameContractAddress, gameContractABI, provider);

    const roundDetails = await gameContract.roundDetails(9);
    document.querySelector("#round").innerText += ` ${roundDetails}`;
    console.log( roundDetails.toString() );
}

async function getHeroDetails(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const gameContract = new ethers.Contract(gameContractAddress, gameContractABI, provider);

    const heroDetails = await gameContract.getHero(9);
    document.querySelector("#hero").innerText += ` ${heroDetails}`;
    console.log( heroDetails.toString() );
}

async function getSpawnDetails(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const gameContract = new ethers.Contract(gameContractAddress, gameContractABI, provider);

    const spawnDetails = await gameContract.getSpawn(9);
    document.querySelector("#spawn").innerText += ` ${spawnDetails}`;
    console.log( spawnDetails.toString() );
}

// const stats = document.querySelector["#stats"];
// stats.innerText = latestGameIndex;

// const webSpawnDetails = "";
// document.querySelector("p").innerText = spawnDetails.toString()