import React, { useEffect } from "react";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const navigateTo = useNavigate();
  const { updateWeb3State, web3State } = useWeb3Context();
  const { selectedAccount } = web3State;

  useEffect(() => {
    if (selectedAccount) {
      navigateTo("/home");
    }
  }, [selectedAccount, navigateTo]);

  const handleWalletConnection = async () => {
    const { contractInstance, selectedAccount } = await connectWallet();
    updateWeb3State({ contractInstance, selectedAccount });
  };

  return (
    <>
      <style>
        {`
          .wallet-container {
            position: absolute;
            inset: 0;
            z-index: -10;
            height: 100vh;
            width: 100%;
            background: linear-gradient(to right, #1e1e1e 1px, transparent 1px),
                        linear-gradient(to bottom, #1e1e1e 1px, transparent 1px);
            background-size: 6rem 4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #121212;
          }

          .wallet-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle 500px at 50% 200px, #343a40, transparent);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
          }

          .wallet-title {
            font-weight: bold;
            font-size: 42px;
            background: linear-gradient(to right, #00b4d8, #5e60ce);
            -webkit-background-clip: text;
            color: transparent;
            transition: color 0.3s ease-in-out;
          }

          .wallet-button {
            position: relative;
            padding: 12px 24px;
            color: #ffffff;
            background-color: #0077b6;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 119, 182, 0.3);
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .wallet-button:hover {
            background-color: #00b4d8;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 180, 216, 0.5);
          }

          .wallet-button:active {
            background-color: #005f73;
            transform: translateY(0);
            box-shadow: 0 3px 10px rgba(0, 95, 115, 0.3);
          }
        `}
      </style>

      <div className="wallet-container">
        <div className="wallet-background">
          <h1 className="wallet-title">Crypted Blockchain Vault</h1>
          <button
            className="wallet-button"
            onClick={handleWalletConnection}
          >
            Connect Metamask Wallet
          </button>
        </div>
      </div>
    </>
  );
};

export default Wallet;
