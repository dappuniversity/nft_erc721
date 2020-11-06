const Token = artifacts.require("./Token.sol");

module.exports = async (callback) => {
  try {
    const contract = await Token.deployed()
    const tokenURI = "https://ipfs.io/ipfs/IPFS_File_Hash"

    // Token Holder accounts
    const accounts = [
      "Public_KEY_1",
      "Public_KEY_2"
    ]

    for (const account of accounts) {
      try {
        console.log("=================================================")
        console.log("MINTING TOKEN:\n")
        console.log(account)
        console.log(tokenURI)
        console.log("\n")

        const result = await contract.mint(
          account,
          tokenURI
        )

        console.log(`SUCCESS:\n`)
        console.log(`https://ropsten.etherscan.io/tx/${result.tx}`)
        console.log("\n\n")
      }
      catch(error) {
        console.log(error)
      }
    }
  }
  catch(error) {
    console.log(error)
  }

  callback()
}