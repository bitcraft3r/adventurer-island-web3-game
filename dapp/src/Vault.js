import React, { useState } from 'react';

const Vault = () => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connectButtonText, setConnectButtonText] = useState('Connect Wallet');
    
    const [currentContractVal, setCurrentContractVal] = useState(null);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    const connectWalletHandler = () => {

    }

    return (
        <div>
            <h3>{"Adv3nturer Vaults"}</h3>
            <button onClick={connectWalletHandler}>{connectButtonText}</button>

        </div>

    )
}

export default Vault;