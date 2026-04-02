import { ethers } from "ethers";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // Replace with your deployed contract address

const abi = [
  "function addTask(string memory _content)",
  "function taskCount() view returns (uint)",
  "function tasks(uint) view returns (string,bool)",
];

export const getContract = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(contractAddress, abi, signer);
};
