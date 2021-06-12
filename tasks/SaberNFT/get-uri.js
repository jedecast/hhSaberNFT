//creates meta data json files, sets the name, image, and attributes
//puts it into IPFS and pins it using pinanta

/*
Reference: https://github.com/PatrickAlphaC/dungeons-and-dragons-nft/blob/master/scripts/create-metadata.js
*/


task('get-uri', "logs the uri of all existing heroes in the contract")
  .addParam('contract', 'The address of the SaberNFT contract that you want to call')
  .setAction(async taskArgs => {
    const contractAddress = taskArgs.contract

    const SaberNFT = await ethers.getContractFactory('SaberNFT')

    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const contractInstance = new ethers.Contract(contractAddress, SaberNFT.interface, signer)

    //gets total number of heroes for index
    const total = await contractInstance.getNumberOfHeroes()
      .then((BN) => BN.toNumber())

    //loops total as an index to create metadata
    for (var index = 0; index < total; index++) {
      //gets name of hero
      const uri = await contractInstance.getURI(index)
      console.log(uri)
    }
  })
