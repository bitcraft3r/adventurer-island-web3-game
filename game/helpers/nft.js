let account = null;
let contract = null;
let tokens = [];

const connect = async () => {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);

        const currentChainId = await web3.eth.getChainId();
        if (currentChainId != 1) {
            // return alert("Switch to Ethereum Mainnet");
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x1" }] // hexadecimal of the chainId 80001

            })
            params
        }

        let accounts = await web3.eth.getAccounts();
        account = accounts[0];
    } else {
        alert('Metamask not detected');
    }
}

let selectedStatsArr = [];

const main = async () => {
    await connect();

    // show loading spinner

    // create the spinner element
    let spinner = document.createElement("div");
    spinner.className = "spinner";

    // add the spinner to the page
    document.querySelector("#selectedNft").appendChild(spinner);

    // show the spinner
    spinner.style.display = "block";

    // once connected, variables become available: web3 (obj) and account
    contract = new web3.eth.Contract(ABI, ADDRESS);

    const balance = Number(await contract.methods.balanceOf(account).call());
    for (let i=0; i<balance; i++ ){
        const tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call();
        const tokenURI = await contract.methods.tokenURI(tokenId).call();
        tokens.push({tokenId, tokenURI});
    }

    for (let i=0; i<tokens.length; i++){
        const token = tokens[i];
        const metadataResponse = await fetch(`${token.tokenURI}`);
        const metadata = await metadataResponse.json();
        token.metadata = metadata;
    }
    
    // create DIVs for every adv nft owned by the user by calling the createElement()
    document.getElementById("showNfts").innerHTML = tokens.map(createElement).join("");

    // AWAIT (#userNft) DIVs to be created
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("NFTs loaded! Select one to create your game character."), 5000)
    });
    let result = await promise; // wait until the promise resolves (*)
    alert(result); // "done!"

    // hide the spinner
    spinner.style.display = "none";

    // get attribute stats of the selected nft
    let nftsObject = document.getElementsByClassName("userNft");
    console.log(nftsObject)
    // let selectedStatsArr = [];
    let selectedNftName = "";
    // loop through the selected nft div's elements (object)
    // https://masteringjs.io/tutorials/fundamentals/foreach-object
    Object.keys(nftsObject).forEach(key => {

        // add event listener to ALL newly created #userNft DIVs
        nftsObject[key].addEventListener("click", (e)=>{

            // when click on the DIV, get the NFT NAME at the first child of div
            selectedNftName = e.currentTarget.firstElementChild.innerHTML;

            // when click on the DIV, get the STR/AGI/WIS attributes at the last child of div
            selectedStatsArr = []; // empty the array
            // loop through the selected div containing 3 divs of STR/AGI/WIS (object)
            let attrObject = e.currentTarget.lastElementChild.children;
            console.log(attrObject);

            for (let i=0; i<3; i++){
                selectedStatsArr.push(Number(attrObject[i].innerHTML));
                
            }
            console.log(selectedStatsArr);

            // print details of selected nft to screen
            document.querySelector("#selectedNft").innerHTML = `
                <h4>Selected Adventurer:</h4>
                <div>
                    <p>ID: ${selectedNftName}</p>
                    <p>STR: <span id="selectStr">${selectedStatsArr[0]}</span>, AGI: <span id="selectAgi">${selectedStatsArr[1]}</span>, WIS: <span id="selectWis">${selectedStatsArr[2]}</span></p>
                </div>
            `;
        });
    });
}

function createElement(token){
    return `<div class="userNft">
    <h4 id="userNftName">${token.metadata.name}</h4>
    <img id="userNftImage" src="${token.metadata.image}" alt="">
    <div id="userNftAttr">
        <div id="selectedNftStr">${token.metadata.attributes[0].value}</div>
        <div id="selectedNftAgi">${token.metadata.attributes[1].value}</div>
        <div id="selectedNftWis">${token.metadata.attributes[2].value}</div>
    </div>
</div>`
}

const ABI = [
    {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getAgility","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getChest","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getFoot","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getHead","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getLanguage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getStrength","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getWeapon","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getWisdom","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getZodiac","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerClaim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}
];
const ADDRESS = "0x4b8f5913f1dd81ae68ac8d332635cbb4c7436f2a"; // adventurer nft contract address