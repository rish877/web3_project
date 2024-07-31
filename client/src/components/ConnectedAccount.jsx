import { useWeb3Context } from "../contexts/useWeb3Context";
import "./connectedAccount.css"; // Import the CSS file for styling

const ConnectedAccount = () => {
  const { web3State } = useWeb3Context();
  const { selectedAccount } = web3State;

  return (
    <div className="connected-account">
      <p className="account-info">
        Connected Account: <span>{selectedAccount}</span>
      </p>
    </div>
  );
};

export default ConnectedAccount;
