import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { utils } from 'ethers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { TokenLockerManagerV1ContractContext } from '../contracts/TokenLockerManagerV1'
import Lock from './Lock'
import NotConnected from '../NotConnected'
import Header from './Header'
import { Outer, MidSection, SectionInner, Grid as Locks, Loading as LocksLoading } from '../Layout'

const { isAddress, getAddress } = utils

const Locker: React.FC = () => {
  const { account: accountToCheck, chainId: chainIdToUse, id: idToUse } = useParams()
  const { account, chainId } = useWeb3React()
  const { contract, getTokenLockersForAddress, tokenLockerCount } = useContext(TokenLockerManagerV1ContractContext)
  const [filterInputValue, setFilterInputValue] = useState<string>()
  const [lockIds, setLockIds] = useState<number[]>([])

  const setupLocks = useCallback(() => {
    if (!contract || !account || !tokenLockerCount || !getTokenLockersForAddress) {
      return
    }

    if (idToUse) {
      setLockIds([parseInt(idToUse)])
    } else if (accountToCheck) {
      setLockIds([])
      getTokenLockersForAddress(getAddress(accountToCheck))
        .then(setLockIds)
        .catch((err: Error) => {
          console.error(err)
          setLockIds([])
        })
    } else if (filterInputValue) {
      setLockIds([])
      if (isAddress(filterInputValue)) {
        getTokenLockersForAddress(getAddress(filterInputValue))
          .then(setLockIds)
          .catch((err: Error) => {
            console.error(err)
            setLockIds([])
          })
      }
    } else {
      setLockIds(new Array(tokenLockerCount).fill(null).map((val, index) => index))
    }
  }, [contract, idToUse, account, accountToCheck, getTokenLockersForAddress, tokenLockerCount, filterInputValue])

  useEffect(setupLocks, [setupLocks])

  return (
    <Outer>
      <Header filterEnabled={idToUse || accountToCheck ? false : true} onFilterInput={setFilterInputValue} />

      <MidSection>
        <SectionInner>
          {account ? (
            <div className="flex flex-col justify-center w-full items-center gap-4">
              {typeof idToUse !== 'undefined' && lockIds[0] && parseInt(idToUse) === lockIds[0] ? (
                <div className="w-full md:max-w-md">
                  {chainId && chainIdToUse && chainId !== parseInt(chainIdToUse) ? (
                    <div className="text-center">Connected to the wrong network to view this lock.</div>
                  ) : (
                    <Lock key={lockIds[0]} lockId={lockIds[0]} />
                  )}
                </div>
              ) : lockIds.length === 0 ? (
                <LocksLoading>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <FontAwesomeIcon icon={faCircleNotch} fixedWidth spin className="opacity-50" size="5x" />
                  </motion.div>
                </LocksLoading>
              ) : (
                <Locks>
                  {/* copy and reverse ids to get descending order */}
                  {lockIds
                    .map(id => id)
                    .reverse()
                    .map(lockId => {
                      // const lockId = tokenLockerCount - index - 1
                      return <Lock key={lockId} lockId={lockId} />
                    })}
                </Locks>
              )}
            </div>
          ) : (
            <NotConnected text="Connect your wallet to view locks." />
          )}
        </SectionInner>
      </MidSection>
    </Outer>
  )
}

export default Locker
