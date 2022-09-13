// SPDX-License-Identifier: GPL-3.0+

/**
  /$$$$$$            /$$           /$$      /$$                                        
 /$$__  $$          | $$          | $$$    /$$$                                        
| $$  \ $$ /$$$$$$$ | $$ /$$   /$$| $$$$  /$$$$  /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$$
| $$  | $$| $$__  $$| $$| $$  | $$| $$ $$/$$ $$ /$$__  $$ /$$__  $$| $$__  $$ /$$_____/
| $$  | $$| $$  \ $$| $$| $$  | $$| $$  $$$| $$| $$  \ $$| $$  \ $$| $$  \ $$|  $$$$$$ 
| $$  | $$| $$  | $$| $$| $$  | $$| $$\  $ | $$| $$  | $$| $$  | $$| $$  | $$ \____  $$
|  $$$$$$/| $$  | $$| $$|  $$$$$$$| $$ \/  | $$|  $$$$$$/|  $$$$$$/| $$  | $$ /$$$$$$$/
 \______/ |__/  |__/|__/ \____  $$|__/     |__/ \______/  \______/ |__/  |__/|_______/ 
                         /$$  | $$                                                     
                        |  $$$$$$/                                                     
                         \______/                                                      

  https://onlymoons.io/
*/

pragma solidity ^0.8.0;

import { ITokenLockerUniV3 } from "./ITokenLockerUniV3.sol";
import { TokenLockerManagerV2, LockData } from "./TokenLockerManagerV2.sol";
import { TokenLockerLPV2 } from "./TokenLockerLPV2.sol";
import { TokenLockerERC721V2 } from "./TokenLockerERC721V2.sol";
import { IERC20 } from "../library/IERC20.sol";
import { IERC721 } from "../library/IERC721.sol";
import { SafeERC20 } from "../library/SafeERC20.sol";
import { INonfungiblePositionManager } from "../library/uniswap-v3/INonfungiblePositionManager.sol";
import { UtilV2 } from "../UtilV2.sol";

contract TokenLockerUniV3 is ITokenLockerUniV3, TokenLockerLPV2, TokenLockerERC721V2 {
  using SafeERC20 for IERC20;

  /** @dev initialize TokenLockerManagerV2 without a valid factory, because we don't need one */
  constructor() TokenLockerManagerV2(address(0)) {}

  function _createTokenLocker(
    address tokenAddress_,
    uint256 tokenId_,
    uint40 unlockTime_
  ) internal virtual override returns (
    uint40 id
  ) {
    // check if this is a uniswap v3 lp token
    require(UtilV2.isUniV3Lp(tokenAddress_), "INVALID_TOKEN");

    INonfungiblePositionManager positionManager = INonfungiblePositionManager(
      tokenAddress_
    );

    (,,address token0,address token1,,,,,,,,) = positionManager.positions(
      tokenId_
    );

    id = uint40(_next());

    // write to state before transfer
    _locks[id].tokenAddress = tokenAddress_;
    _locks[id].createdAt = uint40(block.timestamp);
    _locks[id].createdBy = _msgSender();
    _locks[id].owner = _msgSender();
    _locks[id].amountOrTokenId = tokenId_;

    // duration creation, if unlockTime is 0,
    // we use unlock countdown instead of unlock time.
    // this value cannot be updated after creation.
    if (unlockTime_ == 0) {
      _locks[id].useUnlockCountdown = true;
    }

    // make the deposit - this also sets unlock time
    _deposit(id, tokenId_, unlockTime_);

    // build search index
    _tokenLockersForAddress[_msgSender()].push(id);
    _tokenLockersForAddress[tokenAddress_].push(id);
    _tokenLockersForAddress[token0].push(id);
    _tokenLockersForAddress[token1].push(id);

    emit TokenLockerCreated(
      id,
      tokenAddress_,
      token0,
      token1,
      _msgSender(),
      tokenId_,
      unlockTime_
    );
  }

  function _deposit(
    uint40 id_,
    uint256 tokenId_,
    uint40 newUnlockTime_
  ) internal virtual override {
    require(
      _locks[id_].amountOrTokenId == tokenId_,
      "INVALID_TOKEN_ID"
    );

    if (_locks[id_].useUnlockCountdown) {
      _locks[id_].unlockTime = UNLOCK_MAX;
    } else {
      require(
        newUnlockTime_ >= _locks[id_].unlockTime && newUnlockTime_ > uint40(block.timestamp),
        "TOO_SOON"
      );

      _locks[id_].unlockTime = newUnlockTime_;
    }
    
    _locks[id_].extendedAt = uint40(block.timestamp);

    IERC721 nft = IERC721(_locks[id_].tokenAddress);

    // transfer the nft if we need to. if we're extending the lock
    // this will get skipped because the locker already owns the nft
    if (nft.ownerOf(tokenId_) != address(this)) {
      nft.safeTransferFrom(
        // only transfer from the sender.
        // if the sender doesn't own the nft,
        // this should error.
        _msgSender(),
        address(this),
        tokenId_
      );
    }
  }

  function withdrawById(
    uint40 id_
  ) external virtual override onlyLockOwner(id_) nonReentrant {
    require(uint40(block.timestamp) >= _locks[id_].unlockTime, "LOCKED");

    IERC721(_locks[id_].tokenAddress).safeTransferFrom(
      address(this),
      _locks[id_].owner,
      _locks[id_].amountOrTokenId
    );
  }

  function getLpData(
    uint40 id_
  ) external virtual override view returns (
    bool hasLpData,
    uint40 id,
    address token0,
    address token1,
    uint256 balance0,
    uint256 balance1,
    uint256 price0,
    uint256 price1
  ) {
    hasLpData = true;
    // pass-through, don't like this, but w/e
    id = id_;

    (
      token0,
      token1,,
      balance0,
      balance1,,
    ) = UtilV2.getUniV3LpData(
      _locks[id_].tokenAddress,
      _locks[id_].amountOrTokenId
    );

    // deprecated, but here to maintain interface compatibility
    price0 = 0;
    price1 = 0;
  }

  function getUniV3LpData(uint40 id_) external virtual override view returns (
    address token0,
    address token1,
    uint24 fee,
    uint256 balance0,
    uint256 balance1,
    uint128 liquidity,
    address pool
  ) {
    return UtilV2.getUniV3LpData(
      _locks[id_].tokenAddress,
      _locks[id_].amountOrTokenId
    );
  }

  function _collect(uint40 id_) internal virtual returns (uint256 amount0, uint256 amount1) {
    return INonfungiblePositionManager(
      _locks[id_].tokenAddress
    ).collect(
      INonfungiblePositionManager.CollectParams({
        // uint256 tokenId;
        tokenId: _locks[id_].amountOrTokenId,
        // address recipient;
        recipient: _locks[id_].owner,
        // uint128 amount0Max;
        amount0Max: type(uint128).max,
        // uint128 amount1Max;
        amount1Max: type(uint128).max
      })
    );
  }

  function collect(uint40 id_) external virtual override onlyLockOwner(id_) returns (
    uint256 /* amount0 */,
    uint256 /* amount1 */
  ){
    return _collect(id_);
  }

  /**
   * @dev did not find a way to implement uniswap v3 migration.
   * running into stack too deep errors, could not find solution.
   * migrate MUST finish in 1 transaction, and it seems it just can't do it.
   * oh well, we just won't support v3 migration :'(
   */
  function migrate(
    uint40 /* id_ */,
    address /* oldRouterAddress_ */,
    address /* newRouterAddress_ */
  ) external virtual override {
    revert("NOT_IMPLEMENTED");
  }
}
