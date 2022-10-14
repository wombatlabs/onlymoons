import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'tailwind-styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { BigNumber, Contract, utils, providers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { Primary as PrimaryButton } from '../Button'
import Input from '../Input'
import { TokenData, LPLockData } from '../../typings'
import { useTokenLockerManagerContract } from '../contracts/TokenLockerManager'
import { useUtilContract } from '../contracts/Util'
import { NonfungiblePositionManagerABI } from '../../contracts/external_contracts'
import { timestampToDateTimeLocal, getNetworkDataByChainId } from '../../util'
import Header from './Header'
import TokenInput from '../TokenInput'
import { Outer, MidSection, SectionInner } from '../Layout'
import { usePromise } from 'react-use'

const { Web3Provider } = providers
const { isAddress, formatUnits, getAddress } = utils

// const Outer = tw.div``

// const MidSection = tw.section`
//   bg-blue-500
//   dark:bg-blue-900
//   py-10
//   px-5
//   md:px-5
// `

// const SectionInner = tw.div`
//   container
//   m-auto
//   md:flex
//   justify-between
//   items-center
// `

const FormOuter = tw.div`
  bg-gray-100
  dark:bg-gray-800
  rounded
  p-4
  flex-grow
  max-w-lg
`

const AddressInputCSS = styled(Input)`
  padding: 1.25rem;
`

const AddressInput = tw(AddressInputCSS)`
  text-center
`

const Create: React.FC = () => {
  const mounted = usePromise()
  const navigate = useNavigate()
  const { account, chainId, connector } = useWeb3React()
  const { address: lockerManagerAddress, createTokenLocker } = useTokenLockerManagerContract()
  // const { getTokenData, isLpToken, getLpData } = useUtilContract()
  const [positionAddress, setPositionAddress] = useState<string>()
  const [tokenId, setTokenId] = useState<string>()
  const [loadingTokenData, setLoadingTokenData] = useState<boolean>(false)
  const [tokenData, setTokenData] = useState<TokenData>()
  const [loadingPositionData, setLoadingPositionData] = useState<boolean>(false)
  const [amount, setAmount] = useState<string>()
  // lock for 90 days by default
  // const [unlockTime, setUnlockTime] = useState<number>(Math.ceil((Date.now() + 1000 * 60 * 60 * 24 * 90) / 1000))
  const [unlockTime, setUnlockTime] = useState<number>()
  const [approved, setApproved] = useState<boolean>(false)
  const [contract, setContract] = useState<Contract>()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [canSubmit, setCanSubmit] = useState<boolean>(true)
  // const [lpToken, setLpToken] = useState<boolean>(false)
  // const [lpLockData, setLpLockData] = useState<LPLockData>()
  // const [lpToken0Data, setLpToken0Data] = useState<TokenData>()
  // const [lpToken1Data, setLpToken1Data] = useState<TokenData>()

  const isUnlockTimeValid = useCallback(() => {
    return unlockTime ? unlockTime * 1000 > Date.now() : false
  }, [unlockTime])

  const onInputAddress = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    //
    // setTokenData(undefined)
    // setLpToken(false)

    if (!e.currentTarget.value) {
      setLoadingTokenData(false)
      setPositionAddress(undefined)
      return
    }

    setLoadingTokenData(true)

    if (isAddress(e.currentTarget.value)) {
      const address = e.currentTarget.value

      console.log(`check address ${address}`)

      setPositionAddress(address)

      // mounted(isLpToken(address))
      //   .then((result) => setLpToken(result))
      //   .catch(() => setLpToken(false))

      // mounted(getTokenData(address))
      //   .then((result) => {
      //     setLoadingTokenData(false)
      //     setTokenData(result)
      //   })
      //   .catch(console.error)
    } else {
      setPositionAddress(undefined)
    }
  }, [])

  // useEffect(() => {
  //   if (!lpToken || !tokenData || !getLpData) {
  //     setLpLockData(undefined)
  //     return
  //   }

  //   mounted(getLpData<LPLockData>(tokenData.address))
  //     .then((lpData) => setLpLockData(lpData))
  //     .catch((err) => {
  //       console.error(err)
  //       setLpLockData(undefined)
  //     })
  // }, [mounted, lpToken, tokenData, getLpData])

  // useEffect(() => {
  //   if (!lpLockData || !getTokenData) {
  //     setLpToken0Data(undefined)
  //     setLpToken1Data(undefined)
  //     return
  //   }

  //   //
  //   mounted(Promise.all([getTokenData(lpLockData.token0), getTokenData(lpLockData.token1)]))
  //     .then(([token0Data, token1Data]) => {
  //       setLpToken0Data(token0Data)
  //       setLpToken1Data(token1Data)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //       setLpToken0Data(undefined)
  //       setLpToken1Data(undefined)
  //     })
  // }, [mounted, lpLockData, getTokenData])

  useEffect(() => {
    if (!positionAddress || !connector) {
      setContract(undefined)
      return
    }

    //
    mounted(connector.getProvider())
      .then((_provider) => {
        //
        if (!_provider) return Promise.reject(new Error('Invalid provider'))

        setContract(
          new Contract(positionAddress, NonfungiblePositionManagerABI, new Web3Provider(_provider, 'any').getSigner()),
        )
      })
      .catch((err) => {
        console.error(err)
        setContract(undefined)
      })
  }, [mounted, positionAddress, connector])

  useEffect(() => {
    if (!contract) {
      setTokenId(undefined)
      setLoadingTokenData(false)
      setTokenData(undefined)
      return
    }

    Promise.all([
      //
      contract.name() as string,
      contract.symbol() as string,
    ]).then(([name, symbol]) => {
      setLoadingTokenData(false)
      setTokenData({
        address: contract.address,
        name,
        symbol,
        decimals: 0,
        balance: BigNumber.from(0),
      })
    })
  }, [contract])

  useEffect(() => {
    if (!contract || !tokenId) {
      setLoadingPositionData(false)
      return
    }

    setLoadingPositionData(true)

    Promise.all([contract.positions(tokenId)]).then(([positions]) => {
      setLoadingPositionData(false)
      console.log(positions)
      console.log(formatUnits(positions.liquidity, 18))
    })
  }, [contract, tokenId])

  const checkApproval = useCallback(() => {
    //
    if (!account || !contract || !lockerManagerAddress || !tokenData || !tokenId) {
      setApproved(false)
      return
    }

    //
    mounted<string>(contract.getApproved(tokenId))
      .then((_approved: string) => setApproved(_approved === lockerManagerAddress))
      .catch((err: Error) => {
        console.error(err)
        setApproved(false)
      })
  }, [mounted, account, contract, lockerManagerAddress, tokenId, tokenData])

  useEffect(checkApproval, [checkApproval])

  const onClickSubmit = useCallback(() => {
    if (
      !account ||
      !contract ||
      !lockerManagerAddress ||
      !tokenId ||
      !tokenData ||
      !createTokenLocker ||
      !unlockTime ||
      !isUnlockTimeValid()
    ) {
      return console.log('not ready') // not ready
    }

    setIsSubmitting(true)
    setCanSubmit(false)

    if (approved) {
      // already approved. make the request
      mounted(createTokenLocker(tokenData.address, BigNumber.from(tokenId), unlockTime))
        .then((id: number) => {
          setCanSubmit(true)
          setIsSubmitting(false)
          navigate(`/locker/3/${getNetworkDataByChainId(chainId ?? 0)?.urlName || chainId}/${id}`)
        })
        .catch((err) => {
          console.error(err)
          setCanSubmit(true)
          setIsSubmitting(false)
        })
    } else {
      // not approved. send approval request first
      mounted(contract.approve(lockerManagerAddress, BigNumber.from(tokenId)))
        .then((result: any) => mounted(result.wait()))
        .then((tx: any) => {
          checkApproval()
          setCanSubmit(true)
          setIsSubmitting(false)
        })
        .catch((err: Error) => {
          console.error(err)
          setCanSubmit(true)
          setIsSubmitting(false)
        })
    }
  }, [
    mounted,
    account,
    approved,
    contract,
    tokenId,
    lockerManagerAddress,
    tokenData,
    checkApproval,
    unlockTime,
    chainId,
    createTokenLocker,
    navigate,
    isUnlockTimeValid,
  ])

  // useEffect(() => {
  //   setCanSubmit(BigNumber.from(amount || 0).gt(0))
  // }, [amount])

  const getSubmitText = (): React.ReactNode => {
    if (isSubmitting) {
      return <FontAwesomeIcon icon={faCircleNotch} fixedWidth spin />
    }

    if (!tokenId) {
      return 'Select a tokenId'
    }

    if (!unlockTime) {
      return 'Select an unlock time'
    }

    if (unlockTime * 1000 < Date.now()) {
      return 'Unlock time must be in the future'
    }

    return approved ? 'Create lock' : 'Approve'
  }

  return (
    <Outer className="text-gray-800 dark:text-gray-200">
      <Header lockType={3} filterEnabled={false} />

      <MidSection>
        <SectionInner>
          <div className="flex justify-center items-center w-full">
            <FormOuter>
              <div className="flex justify-between items-center">
                <AddressInput
                  className="flex-grow"
                  placeholder="Enter LP NFT address (NonFungiblePositionManager)"
                  onInput={onInputAddress}
                />
              </div>

              {loadingTokenData ? (
                <>
                  {/* <Divider /> */}

                  <div className="flex justify-center items-center mt-10">
                    <FontAwesomeIcon size="4x" icon={faCircleNotch} spin={true} className="text-blue-300" />
                  </div>
                </>
              ) : tokenData ? (
                <div className=" p-3 rounded mt-4">
                  {/* <Divider /> */}

                  <div className="flex flex-col gap-6 mt-3">
                    <div className="text-2xl font-extralight text-center">
                      <div>{tokenData.name}</div>
                      <div>({tokenData.symbol})</div>
                    </div>

                    <div>
                      <Input
                        type="text"
                        className="w-full"
                        name="tokenId"
                        placeholder="Token ID"
                        onInput={(e) => {
                          setTokenId(e.currentTarget.value || undefined)
                        }}
                      />
                    </div>

                    {tokenId && !loadingPositionData && (
                      <>
                        <div className="flex bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded items-center">
                          <div className="p-3 shrink-0">Unlock time</div>
                          <input
                            type="datetime-local"
                            className="flex-grow p-3 outline-none bg-white dark:bg-gray-700 rounded-r"
                            defaultValue={unlockTime ? timestampToDateTimeLocal(unlockTime) : undefined}
                            onInput={(e) => setUnlockTime(Math.ceil(new Date(e.currentTarget.value).getTime() / 1000))}
                          />
                        </div>

                        <PrimaryButton
                          className="py-4 text-gray-100"
                          disabled={!canSubmit || !tokenId || !isUnlockTimeValid()}
                          onClick={onClickSubmit}
                        >
                          {getSubmitText()}
                        </PrimaryButton>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <>{/*  */}</>
              )}
            </FormOuter>
          </div>
        </SectionInner>
      </MidSection>
    </Outer>
  )
}

export default Create