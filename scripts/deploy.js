import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
  const Todo = await ethers.getContractFactory("Todo");
  const todo = await Todo.deploy();

  await todo.waitForDeployment();

  console.log("Contract deployed to:", await todo.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
