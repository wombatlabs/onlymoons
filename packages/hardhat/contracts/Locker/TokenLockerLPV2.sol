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

import { ITokenLockerLPV2 } from "./ITokenLockerLPV2.sol";
import { ITokenLockerManagerV1 } from "../ITokenLockerManagerV1.sol";
import { ITokenLockerManagerV2 } from "./ITokenLockerManagerV2.sol";
import { TokenLockerManagerV2 } from "./TokenLockerManagerV2.sol";
import { TokenLockerBaseV2 } from "./TokenLockerBaseV2.sol";
import { IERC20 } from "../library/IERC20.sol";


abstract contract TokenLockerLPV2 is ITokenLockerLPV2, TokenLockerManagerV2, TokenLockerBaseV2 {
  function _startUnlockCountdown(uint40 id_) internal virtual override {
    require(_locks[id_].useUnlockCountdown, "NOT_INFINITE_LOCK");

    _locks[id_].unlockTime = uint40(block.timestamp) + _countdownDuration;

    emit TokenLockerCountdownStarted(
      id_,
      _locks[id_].unlockTime
    );
  }
  
  function _isLockOwner(uint40 id_) internal virtual override view returns (bool) {
    return _locks[id_].owner == _msgSender();
  }

  function _transferLockOwnership(
    uint40 id_,
    address newOwner_
  ) internal virtual override {
    address oldOwner = _locks[id_].owner;
    _locks[id_].owner = newOwner_;

    // we don't actually need to remove old owners from the search index. who cares.
    // but we do need to add the new owner. only add id if they didn't already have it.
    if (!_tokenLockersForAddressLookup[newOwner_][id_]) {
      _tokenLockersForAddress[newOwner_].push(id_);
      _tokenLockersForAddressLookup[newOwner_][id_] = true;
    }

    emit LockOwnershipTransfered(
      id_,
      oldOwner,
      newOwner_
    );
  }

  function getTokenLockData(
    uint40 id_
  ) external virtual override(ITokenLockerManagerV1, TokenLockerManagerV2) view returns (
    bool isLpToken,
    uint40 id,
    address contractAddress,
    address lockOwner,
    address token,
    address createdBy,
    uint40 createdAt,
    uint40 unlockTime,
    uint256 balance,
    uint256 totalSupply
  ){
    isLpToken = id_ < _count;
    id = id_;
    contractAddress = address(this);
    lockOwner = _locks[id_].owner;
    token = _locks[id_].tokenAddress;
    createdBy = _locks[id_].createdBy;
    createdAt = _locks[id_].createdAt;
    unlockTime = _locks[id_].unlockTime;
    balance = _locks[id_].amountOrTokenId;
    totalSupply = IERC20(token).totalSupply();
  }

  /** @dev required to maintain compatibility with v1 interfaces. use `withdrawById` instead */
  function withdraw() external virtual override {
    revert("NOT_IMPLEMENTED");
  }

  /** @dev required to maintain compatibility with v1 interfaces */
  function notifyLockerOwnerChange(
    uint40 /* id_ */,
    address /* newOwner_ */,
    address /* previousOwner_ */,
    address /* createdBy_ */
  ) external virtual override(
    ITokenLockerManagerV1,
    TokenLockerManagerV2
  ){
    revert("NOT_IMPLEMENTED");
  }
}