task("create-hero", "creates and mints a new hero based on a seed and name w/ random stats")
  .addParam('contract', 'The address of the SaberNFT contract that you want to call')
  .addParam('name', 'the hero name of the new nft')
  .addParam('seed', 'user-provided seed to generate random number for stats')
  .setAction( async taskArgs => {
    const contractAddress = taskArgs.contract
    const name = taskArgs.name
    const seed = taskArgs.seed
    const networkName = network.name

    console.log('Create new hero', name, 'using SaberNFT contract', contractAddress, 'on network', networkName)

    const SaberNFT = await ethers.getContractFactory('SaberNFT')

    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const contractInstance = new ethers.Contract(contractAddress, SaberNFT.interface, signer)
    const result = await contractInstance.requestNewRandomHero(name, seed)

    console.log('waiting for transaction to be finalized...')
    // wait for the transaction to be finalized
    await result.wait()
    console.log(result)
    console.log('transaction finished...')


  })
