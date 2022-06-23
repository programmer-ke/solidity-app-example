const main = async () => {
    // compiles contract and places it in artifacts directory
    const WaveContractFactory = await hre.ethers.getContractFactory("WavePortal");

    // Creates local ethereum network and deploys contract
    const waveContract = await WaveContractFactory.deploy();

    // await for completed deployment
    // Constract constructor runs in the process
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
};

const runMain = async () => {
    try {
	await main();
	process.exit(0);
    } catch (error) {
	console.log(error);
	process.exit(1);
    }
};

runMain();
