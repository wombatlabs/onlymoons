import React, { useContext, useState, useEffect, useCallback, CSSProperties } from 'react'
import { useWeb3React } from '@web3-react/core'
import { NetworkConnector } from '@web3-react/network-connector'
import { Light as LightButton } from './Button'
import { getNetworkDataByChainId } from '../util'
import { NetworkData } from '../typings'
import { ModalControllerContext } from './ModalController'
import DetailsCard from './DetailsCard'
import contracts from '../contracts/production_contracts.json'
import { PriceTrackerContext } from './contracts/PriceTracker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'

const allNetworkData: Array<NetworkData> = Object.keys(contracts)
  .map((key) => getNetworkDataByChainId(parseInt(key)) as NetworkData)
  // sort network data array by name
  .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))

interface ErrorInterface {
  code: number
  message: string
}

export interface NetworkSelectProps {
  className?: string
  style?: CSSProperties
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({ className = '', style = {} }) => {
  const { nativeCoinPrice } = useContext(PriceTrackerContext) || {}
  const { setCurrentModal, closeModal } = useContext(ModalControllerContext)
  const { chainId, connector } = useWeb3React()
  const [networkData, setNetworkData] = useState<NetworkData>()
  const [provider, setProvider] = useState<any>()

  useEffect(() => {
    if (!connector) {
      setProvider(undefined)
      return
    }

    connector.getProvider().then(setProvider).catch(console.error)
  }, [connector])

  useEffect(() => {
    if (!chainId) {
      setNetworkData(undefined)
      return
    }

    setNetworkData(getNetworkDataByChainId(chainId))
  }, [chainId])

  const switchNetwork = useCallback(
    async (targetChainId: number) => {
      try {
        if (connector instanceof NetworkConnector) {
          connector.changeChainId(targetChainId)
        } else {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${targetChainId.toString(16)}` }],
          })
        }
      } catch (error) {
        if ((error as ErrorInterface).code === 4902) {
          try {
            const targetNetworkData = getNetworkDataByChainId(targetChainId)

            if (!targetNetworkData) {
              //
              return
            }

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${targetChainId.toString(16)}`,
                  chainName: targetNetworkData.name,
                  rpcUrls: [targetNetworkData.rpcURL],
                  nativeCurrency: {
                    name: targetNetworkData.nativeCurrency.name,
                    symbol: targetNetworkData.nativeCurrency.symbol,
                    decimals: targetNetworkData.nativeCurrency.decimals,
                  },
                  blockExplorerUrls: [targetNetworkData.explorerURL],
                },
              ],
            })
          } catch (error) {
            console.error(error)
          }
        }
      }

      closeModal()
    },
    [provider, closeModal, connector],
  )

  return !chainId ? (
    <></>
  ) : (
    <>
      <LightButton
        className={`flex gap-2 items-center ${className}`}
        style={style}
        onClick={() => {
          //
          setCurrentModal(
            <DetailsCard
              // className="max-h-128"
              // innerClassName="max-h-128"
              style={{ maxHeight: '80vh' }}
              headerContent={<div className="text-xl">Select network</div>}
              mainContent={
                <div>
                  {/** @todo sort this alphabetically by network name */}
                  {allNetworkData.map((_networkData) => {
                    return !_networkData ? (
                      <></>
                    ) : (
                      <div
                        key={_networkData.chainId}
                        className="flex gap-3 items-center p-4 cursor-pointer hover:bg-gray-500 hover:bg-opacity-10"
                        onClick={() => switchNetwork(_networkData.chainId)}
                      >
                        {_networkData.icon && (
                          <img
                            alt={_networkData.name}
                            width={28}
                            height={28}
                            src={`/network-icons${_networkData.icon}`}
                          />
                        )}
                        <span>{_networkData.name}</span>
                      </div>
                    )
                  })}
                </div>
              }
            />,
          )
        }}
      >
        {networkData?.icon && (
          <img alt={networkData?.name || ''} width={20} height={20} src={`/network-icons${networkData.icon}`} />
        )}
        {networkData?.isTestNet && (
          <FontAwesomeIcon
            className="text-red-300 bg-gray-800 rounded-full p-1 transform-gpu scale-125"
            icon={faWrench}
          />
        )}
        <span>{networkData?.nativeCurrency.symbol || '???'}</span>
        {nativeCoinPrice ? (
          <span className="ml-1 opacity-60">
            $
            {(nativeCoinPrice || 0).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        ) : (
          <></>
        )}
      </LightButton>
    </>
  )
}

export default NetworkSelect