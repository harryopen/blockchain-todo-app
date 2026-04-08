import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constant";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("Install MetaMask");

  // Force BNB Testnet
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x61" }],
  });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(contractAddress, contractABI, signer);
};

// Add Todo
export const addTodo = async (text) => {
  const contract = await getContract();
  console.log("harry", contract.target);
  const tx = await contract.addTodo(text);
  await tx.wait();
};

// Get Todos
export const getTodos = async () => {
  const contract = await getContract();
  console.log("log contract from getTodos",contract);
  return await contract.getTodos();
};

export const toggleTodos = async (index)=>{
  const contract = await getContract();
  const tx = await contract.toggleTodo(index);
  console.log("log contract from toggle",tx);
  await tx.wait();
}