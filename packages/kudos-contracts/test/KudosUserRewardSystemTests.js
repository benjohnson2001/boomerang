const BigNumber = web3.BigNumber;


require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Kudos = artifacts.require("Kudos");

contract("KudosUserRewardSystemTests", function([deployerAddress, userAddress, workerAddress, businessAddress]) {

  let kudos;

  beforeEach(async function() {

    kudos = await Kudos.new();
    // kudos = await Kudos.at('0x6a5fd45fdbdf3da997c4222df7f197eeb4155ecc');
  });

  it("user should be able to register worker reward system", async function() {

    const numberOfRewardSteps = 3;
    const numberOfRewardCycles = 4;
    const numberOfRewardLevels = 5;
    const levelRewards = [300, 400, 500, 600, 700];
    const ratingRewards = [0, 25, 50, 75, 100];
    const ipfsHash = "0x7aec552a65bfd833319cecd80cb10be136a35c9da94a8c899f2536c371293b93";

    await kudos.registerWorkerRewardSystem(businessAddress, numberOfRewardSteps, numberOfRewardCycles, numberOfRewardLevels, levelRewards, ratingRewards, ipfsHash);

    const businessAddress = "0xd0a287acbc9b2b4222c5ea38dc0f8f1031b0e5ce";
    const workerRewardSystemStruct = await kudos.getWorkerRewardSystem(businessAddress);
    console.log(workerRewardSystemStruct);
  });
});
