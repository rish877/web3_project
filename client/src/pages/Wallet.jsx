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
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #121212;
            overflow: hidden;
          }

          .wallet-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('https://img.freepik.com/premium-photo/abstract-3d-rendering-black-cubes-with-red-neon-lights-dark-background-closeup-red-glowing-blockchain-network-with-interconnected-blocks-data-fields-featuring-ai-generated_585735-4602.jpg') no-repeat center center;
            background-size: cover;
           
            animation: background-animation 10s infinite alternate;
          }

          @keyframes background-animation {
            0% {
              transform: scale(1);
              
            }
            50% {
              transform: scale(1.1);
            
            }
            100% {
              transform: scale(1);
             
            }
          }

          .wallet-title {
            font-weight: bold;
            font-size: 42px;
            background: linear-gradient(to right, white, #5e60ce);
            -webkit-background-clip: text;
            color: transparent;
            transition: color 0.3s ease-in-out;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
          }

          .wallet-button {
          
            position: relative;
            padding: 12px 24px;
            color: white;
            background-color: black;
            border: none;
            border-radius: 8px;
            font-weight: 700;
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

          .wallet-content {
            position: relative;
            z-index: 1;
            text-align: center;
          }
        `}
      </style>

      <div className="wallet-container">
        <div className="wallet-background"></div>
        <div className="wallet-content">
          <h1 className="wallet-title">Decentralized Image Uploader</h1>
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
