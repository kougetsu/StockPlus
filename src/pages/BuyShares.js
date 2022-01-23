import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Flex from '../components/common/Flex'
import FlexItem from '../components/common/FlexItem'
import Card from '../components/common/Card'
import Select from 'react-select'
import AccountBalance from '../components/AccountBalance'
import Button from '../components/common/Button'
import { FaExchangeAlt } from 'react-icons/fa'
import { useViewport } from '../hooks/useViewport'
import { breakpoints } from '../app/breakpoints'
import { useDispatch } from 'react-redux'
import Cart from '../components/cart/Cart'
import { addToCart } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'
import moment from 'moment'
import Api from '../services/Api'
import formatAmount from '../utils/formatAmount'

const PageContainer = styled.div`
  padding: 20px;
`

const AccountBalanceWrapper = styled.div`
  margin-bottom: 12px;
`

const AmountInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 80%);
  min-height: 38px;
  outline: 0 !important;
  padding: 2px 8px;
  font-size: 1.05rem;
  margin-top: 10px;
`

const BuyShares = () => {
  const { width } = useViewport()
  const dispatch = useDispatch()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [closingPrice, setClosingPrice] = useState(null)
  const [stockAmount, setStockAmount] = useState('')

  //check if Tokyo Market Exchange is open
  const isMarketOpen = () => {
    //first let's set the current date in UTC (clients may belong to different timezones)
    const currentUtcDate = moment.utc()

    //now check if current day is not a weekday
    const dayOfWeek = currentUtcDate.day()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return false
    }

    //if we are in a day of the week now we can check the time of the day to see if market is open.
    //all dates are converted in UTC
    //Tokyo Market Exhange Open Time: 09:00 - 11:30 / 12:30 - 15:00 GMT+9

    //set the valid times
    const dateFormat = 'hh:mm:ss'
    const openTime1 = [
      moment.utc('00:00:00', dateFormat),
      moment.utc('02:30:00', dateFormat),
    ]
    const openTime2 = [
      moment.utc('03:30:00', dateFormat),
      moment.utc('06:00:00', dateFormat),
    ]

    //perform the time check
    if (
      currentUtcDate.isBetween(openTime1[0], openTime1[1]) ||
      currentUtcDate.isBetween(openTime2[0], openTime2[1])
    ) {
      return true
    }

    return false
  }

  //set the default market state based on current time
  //the UI also includes a switch to change the market state dynamically for testing purposes
  const [marketOpen, setMarketOpen] = useState(isMarketOpen)

  const companies = [
    {
      label: 'Apple',
      value: 'AAPL',
    },
    {
      label: 'Google',
      value: 'GOOG',
    },
    {
      label: 'Facebook',
      value: 'FB',
    },
    {
      label: 'Amazon',
      value: 'AMZN',
    },
    {
      label: 'Microsoft',
      value: 'MSFT',
    },
    {
      label: 'Nvidia',
      value: 'NVDA',
    },
  ]

  //calculate the transaction amount for one single cart item
  const calculateTransactionAmount = () => {
    return parseFloat((stockAmount * closingPrice).toFixed(2))
  }

  //on stock amount input value change perform a few validations.
  //also converts the value from string to float.
  //unwanted characters like e, +, - are also prevented before the function is called
  const onStockAmountChange = (e) => {
    const val = e.target.value

    if (val === '') {
      setStockAmount(val)
    } else if (val > 1000) {
      //stock amount validation: do not allow more than 1000 units
      setStockAmount(1000)
    } else {
      setStockAmount(parseFloat(val))
    }
  }

  //perform validation and add item to the redux store
  const addItemToCart = () => {
    //validate if last closing price is currently unset or is loading from api
    if (!closingPrice) return
    //validate stock amount is not over 1000
    if (stockAmount > 1000) {
      toast.error('Cannot purchase more than 1000 stock at a time.', {
        hideProgressBar: true,
        autoClose: 2000,
      })
      return
    }

    dispatch(
      addToCart({
        stock: selectedCompany.value,
        amount: stockAmount,
        value: calculateTransactionAmount(),
      })
    )
  }

  //call api to fetch latest close price for a company
  useEffect(() => {
    if (!selectedCompany) return

    const fetchLatestClosingPrice = async (company) => {
      try {
        const { data } = await Api.get(`/v3/historical-price-full/${company}`, {
          params: {
            serietype: 'line',
          },
        })

        setClosingPrice(data.historical[0].close)
      } catch (err) {
        console.error(err)
        toast.error('Failed retrieving data from API.', {
          hideProgressBar: true,
          autoClose: 2000,
        })
      }
    }

    //reset closing price so that user will not be able to purchase while calling the api
    setClosingPrice(null)
    //then fetch new price
    fetchLatestClosingPrice(selectedCompany.value)
  }, [selectedCompany])

  return (
    <PageContainer>
      <Flex justifyContent='center'>
        <FlexItem flexBasis={width > breakpoints.md ? '50%' : '100%'}>
          <Flex justifyContent='space-between' alignItems='center'>
            <FlexItem>
              <h3>Buy Shares</h3>
            </FlexItem>
            <FlexItem>
              <Flex flexGap={8} alignItems='center'>
                <FlexItem flexGrow={1}>
                  {marketOpen ? (
                    <b style={{ color: 'green' }}>MARKET IS OPEN</b>
                  ) : (
                    <b style={{ color: 'red' }}>MARKET IS CLOSED</b>
                  )}
                </FlexItem>
                <FlexItem>
                  <Button
                    icon={<FaExchangeAlt></FaExchangeAlt>}
                    onClick={() => setMarketOpen(!marketOpen)}
                  ></Button>
                </FlexItem>
              </Flex>
            </FlexItem>
          </Flex>
          <hr></hr>
          <Card padding>
            <AccountBalanceWrapper>
              <AccountBalance />
            </AccountBalanceWrapper>
            <Select
              options={companies}
              value={selectedCompany}
              onChange={(company) => setSelectedCompany(company)}
            ></Select>
            <AmountInput
              type='number'
              step='0.1'
              min='0'
              max='1000'
              placeholder='Insert Amount... (Max: 1000)'
              value={stockAmount}
              onChange={onStockAmountChange}
              onKeyDown={
                (e) =>
                  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault() //prevent using non numeric values in input
              }
            ></AmountInput>

            <div style={{ marginTop: 15 }}>
              <Flex justifyContent='space-between' flexGap={8}>
                <FlexItem>
                  <div style={{ marginBottom: 6 }}>
                    <b>Latest Closing Price:</b>
                  </div>
                  {formatAmount(closingPrice)}
                </FlexItem>
                <FlexItem style={{ textAlign: 'end' }}>
                  <div style={{ marginBottom: 6 }}>
                    <b>Transaction Amount:</b>
                  </div>
                  {formatAmount(calculateTransactionAmount())}
                </FlexItem>
              </Flex>

              <Flex alignItems='center' flexGap={10} style={{ marginTop: 15 }}>
                <Button
                  color={marketOpen ? null : 'darkred'}
                  text={marketOpen ? 'Add To Cart' : 'Market Closed'}
                  uppercase
                  disabled={
                    !marketOpen ||
                    !selectedCompany ||
                    !stockAmount ||
                    !closingPrice
                  }
                  onClick={addItemToCart}
                />
              </Flex>
            </div>
          </Card>

          <section style={{ marginTop: 20 }}>
            <Cart disablePurchase={!marketOpen} />
          </section>
        </FlexItem>
      </Flex>
    </PageContainer>
  )
}

export default BuyShares
