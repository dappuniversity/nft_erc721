pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/access/roles/MinterRole.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Token is Ownable, MinterRole, ERC721Full {
  using SafeMath for uint;

  constructor() ERC721Full("Token", "TKN") public {
  }

  function mint(address _to, string memory _tokenURI) public onlyMinter returns (bool) {
    _mintWithTokenURI(_to, _tokenURI);
    return true;
  }

  function _mintWithTokenURI(address _to, string memory _tokenURI) internal {
    uint _tokenId = totalSupply().add(1);
    _mint(_to, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
  }
}