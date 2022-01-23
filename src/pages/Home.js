import React from 'react'
import AccountBalance from '../components/AccountBalance'
import styled from 'styled-components'
import Flex from '../components/common/Flex'
import FlexItem from '../components/common/FlexItem'
import Card from '../components/common/Card'
import { breakpoints } from '../app/breakpoints'
import { useViewport } from '../hooks/useViewport'
import StockMovement from '../components/StockMovement'
import { useSelector } from 'react-redux'
import TransactionItem from '../components/TransactionItem'
import formatAmount from '../utils/formatAmount'

const PageContainer = styled.div`
  padding: 20px;
`

const InvestedAmountCard = styled(Card)`
  display: flex;
  height: 100%;
  align-items: center;

  @media screen and (max-width: ${breakpoints.md}px) {
    justify-content: center;
  }
`

const Separator = styled.hr`
  border-top: 1px solid #eee;
  ${(props) => props.margin && `margin: ${props.margin}`}
`

const Home = () => {
  const { width } = useViewport()
  const transactions = useSelector((state) => state.transactions.value)

  //show only the latest 5 transactions in order of purchase to the client
  const recentTransactions = transactions.slice(0, 5).reverse()

  //calculate the total amount for any transactions placed
  const calculateTotalAmountInvested = () => {
    if (transactions.length === 0) return 0

    return transactions
      .map((transaction) => transaction.totalAmount)
      .reduce((a, b) => a + b)
  }

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
      <PageContainer>
        <Flex
          flexGap={15}
          flexDirection={width > breakpoints.sm ? 'row' : 'column'}
        >
          <FlexItem flex={width > breakpoints.md ? '1 1 0px' : '2 1 0px'}>
            <Card padding>
              <AccountBalance color='white' />
            </Card>
          </FlexItem>
          <FlexItem flex='1 1 0px'>
            <InvestedAmountCard>
              <FlexItem style={{ padding: '20px' }}>
                <b>Amount Invested</b>
                <div>{formatAmount(calculateTotalAmountInvested())}</div>
              </FlexItem>
            </InvestedAmountCard>
          </FlexItem>
        </Flex>

        <Flex
          flexGap={25}
          flexWrap='wrap'
          flexDirection={width > breakpoints.md ? 'row' : 'column'}
        >
          <FlexItem flex='1 1 0'>
            <section style={{ marginTop: '30px' }}>
              <h2>Stock Movements</h2>
              <Separator margin='0 0 20px 0'></Separator>
              <Flex flexWrap='wrap' flexGap={10}>
                {historicalPrices.map((item) => (
                  <FlexItem
                    key={item.company}
                    style={{ width: '100%' }}
                    flex='1 1 0'
                  >
                    <StockMovement
                      company={item.company}
                      priceMovement={item.changePercent}
                      price={formatAmount(item.closePrice)}
                      style={{ cursor: 'pointer' }}
                    />
                  </FlexItem>
                ))}
              </Flex>
            </section>
          </FlexItem>
          <FlexItem flex='1 1 0'>
            <section style={{ marginTop: '30px' }}>
              <h2>Latest Transactions</h2>
              <Separator margin='0 0 20px 0'></Separator>
            </section>

            {transactions.length === 0 && <span>No Recent Activity</span>}

            <Flex flexDirection='column' flexGap={10}>
              {recentTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </Flex>
          </FlexItem>
        </Flex>
      </PageContainer>
    </div>
  )
}

export default Home
