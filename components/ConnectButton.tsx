import React from "react";
import { useAccount } from "wagmi";

const ConnectButton = () => {
  const { isConnected, address } = useAccount();

  return (
    <div>
      {isConnected && address ? (
        <div className="flex gap-1">
          <w3m-network-button />
          <w3m-account-button />
        </div>
      ) : (
        <w3m-connect-button />
      )}
    </div>
  );
};

export default ConnectButton;
