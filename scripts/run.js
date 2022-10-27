const main = async () => {
    // compiles contract and places it in artifacts directory
    const WaveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // Creates local ethereum network and deploys contract
    const waveContract = await WaveContractFactory.deploy();
    // await for completed deployment
    // Constract constructor runs in the process
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);

    let waveCount = await waveContract.getTotalWaves();
    console.log("totalWaves", waveCount.toNumber());

    let waveTxn = await waveContract.wave("Some message");
    await waveTxn.wait();  // wait for txn to be mined

    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).wave("Some other message");
    await waveTxn.wait(); // wait for txn to be mined

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
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
