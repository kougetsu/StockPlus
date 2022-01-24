import React from 'react'
import AccountBalance from '../components/AccountBalance'
import styled from 'styled-components'
import Flex from '../components/common/Flex'
import FlexItem from '../components/common/FlexItem'
import Card from '../components/common/Card'
import { breakpoints } from '../app/breakpoints'
import { useViewport } from '../hooks/useViewport'
import Transactions from '../components/transactions/Transactions'
import StockMovements from '../components/stockMovements/StockMovements'
import AmountInvested from '../components/AmountInvested'

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

const Home = () => {
  const { width } = useViewport()

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
                <AmountInvested />
              </FlexItem>
            </InvestedAmountCard>
          </FlexItem>
        </Flex>

        <Flex
          flexGap={25}
          flexWrap='wrap'
          flexDirection={width > breakpoints.md ? 'row' : 'column'}
          style={{ marginTop: 20 }}
        >
          <FlexItem flex='1 1 0'>
            <StockMovements />
          </FlexItem>
          <FlexItem flex='1 1 0'>
            <Transactions limit={5} />
          </FlexItem>
        </Flex>
      </PageContainer>
    </div>
  )
}

export default Home
