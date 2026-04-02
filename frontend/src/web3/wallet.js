export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log("Connected account:", accounts);

  return accounts[0];
};

export const disconnectWallet = async () => {
  if(window.ethereum && window.ethereum.isMetaMask) {
    try{await window.ethereum.request({
      method: "wallet_revokePermissions",
      params: [{ eth_accounts: {} }],
    });
    console.log("Disconnected wallet");
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
  }
  } else {
    console.warn("MetaMask is not available. Cannot disconnect wallet.");
  }
}
