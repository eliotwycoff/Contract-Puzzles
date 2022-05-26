const { assert } = require("chai");

describe("Game3", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();
    await game.deployed();

    // three addresses, three balances
    // you'll need to update the mapping to win this stage

    // hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer1 = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1);
    const signer3 = ethers.provider.getSigner(2);
    const address1 = await signer1.getAddress();
    const address2 = await signer2.getAddress();
    const address3 = await signer3.getAddress();

    // to call a contract as a signer you can use contract.connect
    await game.connect(signer1).buy({ value: "1" });
    await game.connect(signer2).buy({ value: "2" });
    await game.connect(signer3).buy({ value: "3" });

    // TODO: win expects three arguments
    await game.win(address2, address3, address1);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
