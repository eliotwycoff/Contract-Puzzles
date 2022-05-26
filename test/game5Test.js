const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    let wallet, address;

    // Search for an address that begins with 0x00.
    while (!wallet || address.slice(2,4) != "00") {
      wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      address = await wallet.getAddress();
    }

    // Send that address some ether so that it can interact with the contract.
    const signer = ethers.provider.getSigner(0);
    const tx = await signer.sendTransaction({ 
      to: address,
      value: ethers.utils.parseEther("1")
    });

    await tx.wait();

    // Use that address to win.
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
