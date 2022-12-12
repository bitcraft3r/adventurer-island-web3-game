import React, { useState } from 'react';
import { ethers } from 'ethers';
import Vault_abi from './data/Vault_ABI.json';
import GOLD_abi from './data/GOLD_ABI.json';
import SILVER_Vault_abi from './data/SILVER_VAULT_ABI.json';
import SILVER_abi from './data/SILVER_ABI.json';

const Vault = () => {

    const contractAddressGoldToken = '0xc4be0798e5b5b1C15edA36d9B2D8c1A60717fA92';
    const contractAddressGoldVault = '0x7e43050Ec19bc2c0b0DB829B20E3b2912e0BEf9d';
    const contractAddressSilverToken = '0x92971764D12B04b3e3fD7BA670e57d9E8DB06B67';
    const contractAddressSilverVault = '0x6B3bEc378E2C93d4e3F9e5350a8Ec3bee34E6B9D';

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connectButtonText, setConnectButtonText] = useState('Connect Wallet');
    
    // const [currentContractDetails, setCurrentContractDetails] = useState(null);
    const [userGoldBalance, setUserGoldBalance] = useState(null);
    const [userIBGoldBalance, setUserIBGoldBalance] = useState(null);
    const [userPercentShareOfTotal, setUserPercentShareOfTotal] = useState(null);

    const [userGoldBalanceString, setUserGoldBalanceString] = useState(null);
    const [userIBGoldBalanceString, setUserIBGoldBalanceString] = useState(null);
    const [userPercentShareOfTotalString, setUserPercentShareOfTotalString] = useState(null);

    const [userSilverBalance, setUserSilverBalance] = useState(null);
    const [userIBSilverBalance, setUserIBSilverBalance] = useState(null);
    const [userIBSilverPercentShareOfTotal, setUserIBSilverPercentShareOfTotal] = useState(null);

    const [userSilverBalanceString, setUserSilverBalanceString] = useState(null);
    const [userIBSilverBalanceString, setUserIBSilverBalanceString] = useState(null);
    const [userIBSilverPercentShareOfTotalString, setUserIBSilverPercentShareOfTotalString] = useState(null);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contractGoldToken, setContractGoldToken] = useState(null);
    const [contract, setContract] = useState(null);
    const [contractSilverToken, setContractSilverToken] = useState(null);
    const [contractSilverVault, setContractSilverVault] = useState(null);

    const connectWalletHandler = () => {
        if (window.ethereum) {
            // https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(result => {
                accountChangedHandler(result[0]);
                setConnectButtonText('Wallet Connected');
                document.querySelector("#userAddress").style.display = "block";
                document.querySelector("#vaultHeading").style.display = "block";
                document.querySelector("#container").style.display = "flex";
                document.querySelector("#ibGold").style.display = "block";
                document.querySelector("#ibSilver").style.display = "block";
            })
        } else {
            setErrorMessage('Need to install MetaMask!');
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount.slice(0, 5) + "..." + newAccount.slice(newAccount.length-4));
        updateEthers();
    }

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        let tempContract = new ethers.Contract(contractAddressGoldVault, Vault_abi, tempSigner);
        setContract(tempContract);

        let goldTokenContract = new ethers.Contract(contractAddressGoldToken, GOLD_abi, tempSigner);
        setContractGoldToken(goldTokenContract);

        let silverVaultContract = new ethers.Contract(contractAddressSilverVault, SILVER_Vault_abi, tempSigner);
        setContractSilverVault(silverVaultContract);

        let silverTokenContract = new ethers.Contract(contractAddressSilverToken, SILVER_abi, tempSigner);
        setContractSilverToken(silverTokenContract);
    }

    const getContractDetails = async () => {
        // let name = await contract.name();
        // let symbol = await contract.symbol();
        let thisUserGoldBalance = await contract.userGoldBalance();
        let thisUserIBGoldBalance = await contract.userIBGoldBalance();
        let totalGoldBalance = await contract.totalGoldBalance();
        let totalIBGoldBalance = await contract.totalIBGoldSupply();
        let thisUserPercentShareOfTotal = await contract.userPercentShareOfTotal();

        setUserGoldBalance(thisUserGoldBalance);
        setUserIBGoldBalance(thisUserIBGoldBalance);
        setUserPercentShareOfTotal(thisUserPercentShareOfTotal);

        // setCurrentContractDetails(`${name} (${symbol})`);
        setUserGoldBalanceString(`${(thisUserGoldBalance / (10**18)).toFixed(4)} GOLD / ${(totalGoldBalance / (10**18)).toFixed(4)} TOTAL`);
        setUserIBGoldBalanceString(`${(thisUserIBGoldBalance  / (10**18)).toFixed(4)} ibGOLD / ${(totalIBGoldBalance / (10**18)).toFixed(4)} TOTAL`);
        setUserPercentShareOfTotalString(`Share of Total: ${thisUserPercentShareOfTotal}%`);
    }

    const getContractDetailsSilver = async () => {
        let thisUserSilverBalance = await contractSilverVault.userSilverBalance();
        let thisUserIBSilverBalance = await contractSilverVault.userIBSilverBalance();
        let totalSilverBalance = await contractSilverVault.totalSilverBalance();
        let totalIBSilverBalance = await contractSilverVault.totalIBSilverSupply();
        let thisUserIBSilverPercentShareOfTotal = await contractSilverVault.userPercentShareOfTotal();

        setUserSilverBalance(thisUserSilverBalance);
        setUserIBSilverBalance(thisUserIBSilverBalance);
        setUserIBSilverPercentShareOfTotal(thisUserIBSilverPercentShareOfTotal);

        setUserSilverBalanceString(`${(thisUserSilverBalance / (10**18)).toFixed(2)} SILVER / ${(totalSilverBalance / (10**18)).toFixed(2)} TOTAL`);
        setUserIBSilverBalanceString(`${(thisUserIBSilverBalance  / (10**18)).toFixed(2)} ibSILVER / ${(totalIBSilverBalance / (10**18)).toFixed(2)} TOTAL`);
        setUserIBSilverPercentShareOfTotalString(`Share of Total: ${thisUserIBSilverPercentShareOfTotal}%`);
    }

    const approveSpend = async () => {
        contractGoldToken.approve(contractAddressGoldVault, ethers.utils.parseEther("10000000"));
    }

    const approveSpendSilver = async () => {
        contractSilverToken.approve(contractAddressSilverVault, ethers.utils.parseEther("9000000000"));
    }
    
    // TODO: BUG as this userGoldBalance is showing user's balance IN THE VAULT. should be using contractGoldToken.balanceOf(signer);
    // const inputMaxGold = async () => {
    //     let userGoldBalance = await contract.userGoldBalance();
    //     setUserGoldBalance(userGoldBalance);

    //     document.querySelector("#depositGold").value = userGoldBalance / (10**18);
    // }
    
    const depositGold = (event) => {
        event.preventDefault();
        contract.enter(ethers.utils.parseEther(event.target.depositGold.value));
    }

    const inputMaxIBGold = async () => {
        let userIBGoldBalance = await contract.userIBGoldBalance();
        setUserIBGoldBalance(userIBGoldBalance);

        document.querySelector("#withdrawGold").value = userIBGoldBalance / (10**18);
    }

    const withdrawIBGold = (event) => {
        event.preventDefault();
        contract.leave(ethers.utils.parseEther(event.target.withdrawGold.value));
    }

    // button to use max amount of SILVER user has and input into depositSilver field

    const depositSilver = (event) => {
        event.preventDefault();
        contractSilverVault.enter(ethers.utils.parseEther(event.target.depositSilver.value));
    }

    const inputMaxIBSilver = async () => {
        let userIBSilverBalance = await contractSilverVault.userIBSilverBalance();
        setUserIBSilverBalance(userIBSilverBalance);

        document.querySelector("#withdrawSilver").value = userIBSilverBalance / (10**18);
    }

    const withdrawIBSilver = (event) => {
        event.preventDefault();
        contractSilverVault.leave(ethers.utils.parseEther(event.target.withdrawSilver.value));
    }

    return (
        <div>
            <h1>{"Adv3nturer.xyz"}</h1>
            <button onClick={connectWalletHandler}>{connectButtonText}</button>
            <h3 id="userAddress">Address: {defaultAccount}</h3>
            {errorMessage}

            <hr />

            <h2 id="vaultHeading">{"Vaults"}</h2>

            <div id="container">


                <div id="ibGold">
                    <h2>ibGOLD Vault</h2>
                    <button onClick={getContractDetails}>Show My Vault Balance</button>
                    <br/>
                    <br/>
                    {userGoldBalanceString} 
                    <br/>
                    {userIBGoldBalanceString} 
                    <br/>
                    {userPercentShareOfTotalString} 

                    <br />

                    <h3>Approve Vault as Spender</h3>
                    <button onClick={approveSpend}>Approve</button>


                    <h3>Deposit GOLD</h3>
                    <form onSubmit={depositGold}>
                        <input id="depositGold" type="number" step="0.0001" placeholder="1000" />
                        {/* <button type={"button"} onClick={inputMaxGold}>Max</button> */}
                        <button type={"submit"}>Deposit</button>
                    </form>

                    <br />

                    <h3>Withdraw ibGOLD</h3>
                    <form onSubmit={withdrawIBGold}>
                        <input id="withdrawGold" type="number" step="0.0001" placeholder="998.7654" />
                        <button type={"button"} onClick={inputMaxIBGold}>Max</button>
                        <button type={"submit"}>Withdraw</button>
                    </form>

                </div>
                
                <div id="ibSilver">
                    <h2>SILVER Vault</h2>
                    <button onClick={getContractDetailsSilver}>Show My Vault Balance</button>
                    <br/>
                    <br/>
                    {userSilverBalanceString} 
                    <br/>
                    {userIBSilverBalanceString} 
                    <br/>
                    {userIBSilverPercentShareOfTotalString} 

                    <br />

                    <h3>Approve Vault as Spender</h3>
                    <button onClick={approveSpendSilver}>Approve</button>


                    <h3>Deposit SILVER</h3>
                    <form onSubmit={depositSilver}>
                        <input id="depositSilver" type="number" step="0.01" placeholder="100000" />
                        {/* <button type={"button"} onClick={inputMaxSilver}>Max</button> */}
                        <button type={"submit"}>Deposit</button>
                    </form>

                    <br />

                    <h3>Withdraw ibSILVER</h3>
                    <form onSubmit={withdrawIBSilver}>
                        <input id="withdrawSilver" type="number" step="0.0001" placeholder="99998.7654" />
                        <button type={"button"} onClick={inputMaxIBSilver}>Max</button>
                        <button type={"submit"}>Withdraw</button>
                    </form>

                </div>

            </div>


            

        </div>

    )
}

export default Vault;