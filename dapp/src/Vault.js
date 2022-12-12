import React, { useState } from 'react';
import { ethers } from 'ethers';
import Vault_abi from './data/Vault_ABI.json';
import GOLD_abi from './data/GOLD_ABI.json';

const Vault = () => {

    const contractAddressGoldToken = '0x4b8f5913f1dd81ae68ac8d332635cbb4c7436f2a';
    const contractAddressGoldVault = '0xd47A584727c8C84559073859567F5d6300fd24B6';

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

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contractGoldToken, setContractGoldToken] = useState(null);
    const [contract, setContract] = useState(null);

    const connectWalletHandler = () => {
        if (window.ethereum) {
            // https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(result => {
                accountChangedHandler(result[0]);
                setConnectButtonText('Wallet Connected');
                document.querySelector("#userAddress").style.display = "block";
                document.querySelector("#ibGold").style.display = "block";
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

    const approveSpend = async () => {
        contractGoldToken.approve(contractAddressGoldVault, ethers.utils.parseEther("10000000"));
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

    return (
        <div>
            <h2>{"Adv3nturer Vaults"}</h2>
            <button onClick={connectWalletHandler}>{connectButtonText}</button>
            <h3 id="userAddress">Address: {defaultAccount}</h3>

            <hr />

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
            

            {errorMessage}

        </div>

    )
}

export default Vault;