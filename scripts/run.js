const main = async () => {
    // compiles contract and places it in artifacts directory
    const WaveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // Creates local ethereum network and deploys contract
    // Funds the contract with 0.1 eth
    const waveContract = await WaveContractFactory.deploy({
	value: hre.ethers.utils.parseEther("0.1"),
    });
    // await for completed deployment
    // Constract constructor runs in the process
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);

    // get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(
	waveContract.address
    );

    console.log(
	"Contract balance before wave:",
	hre.ethers.utils.formatEther(contractBalance)
    );

    // send wave
    let waveTxn = await waveContract.wave("Some message");
    await waveTxn.wait();  // wait for txn to be mined

    // See what happened to balance
    contractBalance = await hre.ethers.provider.getBalance(
	waveContract.address
    );
    console.log(
	"Contract balance after wave:",
	hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount = await waveContract.getTotalWaves();
    console.log("totalWaves", waveCount.toNumber());

    let allWaves = await waveContract.getAllWaves();
    console.log("all waves", allWaves);
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
