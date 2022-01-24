import React from 'react'
import Flex from '../common/Flex'
import FlexItem from '../common/FlexItem'
import StockMovementCard from './StockMovementCard.js'
import formatAmount from '../../utils/formatAmount'
import { useNavigate } from 'react-router-dom'

const StockMovements = () => {
  const navigate = useNavigate()
  //the data below is fixed to avoid calling the API too many times
  //free account is only 250 calls per day and can only retrieve one company at a time
  //in a production environment the data should be fetched from the API
  const historicalPrices = [
    {
      company: 'AAPL',
      changePercent: -1.28,
      closePrice: 162.41,
    },
    {
      company: 'FB',
      changePercent: -4.23,
      closePrice: 303.17,
    },
    {
      company: 'AMZN',
      changePercent: -5.95,
      closePrice: 2852.86,
    },
    {
      company: 'GOOG',
      changePercent: 2.3,
      closePrice: 2601.84,
    },
    {
      company: 'MSFT',
      changePercent: 0,
      closePrice: 296.03,
    },
    {
      company: 'NVDA',
      changePercent: 0.5,
      closePrice: 233.74,
    },
  ]

  return (
    <div>
      <h2>Stock Movements</h2>
      <hr></hr>
      <Flex flexWrap='wrap' flexGap={10}>
        {historicalPrices.map((item) => (
          <FlexItem key={item.company} style={{ width: '100%' }} flex='1 1 0'>
            <div onClick={() => navigate(`/buy?company=${item.company}`)}>
              <StockMovementCard
                company={item.company}
                priceMovement={item.changePercent}
                price={formatAmount(item.closePrice)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </FlexItem>
        ))}
      </Flex>
    </div>
  )
}

export default StockMovements
