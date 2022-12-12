import React, { useState } from 'react';
import { ethers } from 'ethers';
import Vault_abi from './Vault_ABI.json';

const Vault = () => {

    const contractAddress = '0xd47A584727c8C84559073859567F5d6300fd24B6';

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connectButtonText, setConnectButtonText] = useState('Connect Wallet');
    
    const [currentContractDetails, setCurrentContractDetails] = useState(null);
    const [userGoldBalance, setUserGoldBalance] = useState(null);
    const [userIBGoldBalance, setUserIBGoldBalance] = useState(null);
    const [userPercentShareOfTotal, setUserPercentShareOfTotal] = useState(null);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
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

        let tempContract = new ethers.Contract(contractAddress, Vault_abi, tempSigner);
        setContract(tempContract);
    }
    
    const getContractDetails = async () => {
        let name = await contract.name();
        let symbol = await contract.symbol();
        let userGoldBalance = await contract.userGoldBalance();
        let userIBGoldBalance = await contract.userIBGoldBalance();
        let totalGoldBalance = await contract.totalGoldBalance();
        let totalIBGoldBalance = await contract.totalIBGoldSupply();
        let userPercentShareOfTotal = await contract.userPercentShareOfTotal();

        setCurrentContractDetails(`${name} (${symbol})`);
        setUserGoldBalance(`${userGoldBalance / (10**18)} GOLD / ${totalGoldBalance / (10**18)} TOTAL`);
        setUserIBGoldBalance(`${userIBGoldBalance  / (10**18)} ibGOLD / ${totalIBGoldBalance / (10**18)} TOTAL`);
        setUserPercentShareOfTotal(`Share of Total: ${userPercentShareOfTotal}%`);
    }

    const depositGold = (event) => {
        event.preventDefault();
        contract.enter(ethers.utils.parseEther(event.target.setText.value));
    }

    const withdrawIBGold = (event) => {
        event.preventDefault();
        contract.leave(ethers.utils.parseEther(event.target.setText.value));
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
                {userGoldBalance} 
                <br/>
                {userIBGoldBalance} 
                <br/>
                {userPercentShareOfTotal} 

                <br />

                <h3>Deposit GOLD</h3>
                <form onSubmit={depositGold}>
                    <input id="setText" type="number" step="0.0001" placeholder="1000" />
                    <button type={"submit"}>Deposit</button>
                </form>

                <br />

                <h3>Withdraw ibGOLD</h3>
                <form onSubmit={withdrawIBGold}>
                    <input id="setText" type="number" step="0.0001" placeholder="998.7654" />
                    <button type={"submit"}>Withdraw</button>
                </form>

            </div>
            

            {errorMessage}

        </div>

    )
}

export default Vault;