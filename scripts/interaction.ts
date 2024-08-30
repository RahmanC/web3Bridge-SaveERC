import { ethers } from "hardhat";

async function main() {
  const web3CXITokenAddress = "0xF8aCE15199481c4e3AEda410fC309C38840B8249";
  const web3CXI = await ethers.getContractAt("IERC20", web3CXITokenAddress);

  const saveERC20ContractAddress = "0x6237a8A3d3CE4cc0e82c5cc7fC344f9b2D20709c";
  const saveERC20 = await ethers.getContractAt(
    "ISaveERC20",
    saveERC20ContractAddress
  );

  // Approve savings contract to spend token
  const approvalAmount = ethers.parseUnits("1000", 18);

  const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
  approveTx.wait();

  const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
  console.log("Contract balance before :::", contractBalanceBeforeDeposit);

  const depositAmount = ethers.parseUnits("150", 18);
  const depositTx = await saveERC20.deposit(depositAmount);

  console.log(depositTx);

  depositTx.wait();

  const contractBalanceAfterDeposit = await saveERC20.getContractBalance();

  console.log("Contract balance after :::", contractBalanceAfterDeposit);

  // Withdrawal Interaction

  const contractBalanceBeforeWithdraw = await saveERC20.getContractBalance();
  console.log("Contract balance before :::", contractBalanceBeforeWithdraw);

  const withdrawAmount = ethers.parseUnits("100", 18);
  const withdrawTx = await saveERC20.withdraw(withdrawAmount);

  console.log(withdrawTx);

  withdrawTx.wait();

  const contractBalanceAfterWithdraw = await saveERC20.getContractBalance();

  console.log("Contract balance after :::", contractBalanceAfterWithdraw);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
