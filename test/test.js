require('chai')
  .use(require('chai-as-promised'))
  .should()

const Token = artifacts.require('Token')

contract('Token', ([owner, minter, pauser, holder1, holder2]) => {
  let token
  const _name = "Token"
  const _symbol = "TKN"

  beforeEach(async () => {
    token = await Token.new()
  })

  describe('token attributes', async () => {
    it('has an address', async () => {
      assert.notEqual(token.address, undefined)
      assert.notEqual(token.address, null)
      assert.notEqual(token.address, 0x0)
    })

    it('has the correct name', async () => {
      const name = await token.name()
      name.should.equal(_name)
    })

    it('has the correct symbol', async () => {
      const symbol = await token.symbol()
      symbol.should.equal(_symbol)
    })
  })

  describe('token distribution', async () => {
    it('mints tokens', async () => {
      await token.mint(holder1, 'https://www.token-uri.com/nft')
      // It should increase the total supply
      result = await token.totalSupply()
      assert.equal(result.toString(), '1', 'total supply is correct')
      // It increments owner balance
      result = await token.balanceOf(holder1)
      assert.equal(result.toString(), '1', 'balanceOf is correct')
      // Token should belong to owner
      result = await token.ownerOf('1')
      assert.equal(result.toString(), holder1.toString(), 'ownerOf is correct')
      result = await token.tokenOfOwnerByIndex(holder1, 0)
      // Owner can see all tokens
      let balanceOf = await token.balanceOf(holder1)
      let tokenIds = []
      for (i = 0; i < balanceOf; i++) {
        id = await token.tokenOfOwnerByIndex(holder1, i)
        tokenIds.push(id.toString())
      }
      expected = ['1']
      assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds are correct')
      // Owner can renounce ownership
      // Note: ERC-721 does not have a "transfer()" function
      await token.transferFrom(holder1, holder2, '1', { from: holder1 })
      result = await token.ownerOf('1')
      assert.equal(result.toString(), holder2.toString(), 'holder 2 now owns token #1')
      // Check balances
      result = await token.balanceOf(holder1)
      assert.equal(result.toString(), '0', 'holder1 no longer owns tokens')
      result = await token.balanceOf(holder2)
      assert.equal(result.toString(), '1', 'holder 2 now owns the token')
    })
  })

  describe('roles', async () => {
    it('only minter role can mint tokens', async () => {
      await token.mint(holder1, 'https://www.token-uri.com/nft', { from: owner }).should.be.fulfilled
      await token.mint(holder1, 'https://www.token-uri.com/nft', { from: pauser }).should.be.rejected
    })
  })
})