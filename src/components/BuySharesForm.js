import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Flex from '../components/common/Flex'
import FlexItem from '../components/common/FlexItem'
import Card from '../components/common/Card'
import Select from 'react-select'
import AccountBalance from '../components/AccountBalance'
import Button from '../components/common/Button'
import { FaExchangeAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, toggleMarketStatus } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'
import Api from '../services/Api'
import formatAmount from '../utils/formatAmount'

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

const BuySharesForm = ({ companies }) => {
  const paymentProcessing = useSelector((state) => state.cart.paymentProcessing)
  const dispatch = useDispatch()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [closingPrice, setClosingPrice] = useState(null)
  const [stockAmount, setStockAmount] = useState('')

  //get the default market state from redux store based on current time and day
  //the UI also includes a switch to change the market state dynamically for testing purposes
  const marketOpen = useSelector((state) => state.cart.isMarketOpen)

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
    //also cannot add items if payment is processing
    if (!closingPrice || paymentProcessing) return
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
    <div>
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
                onClick={() => dispatch(toggleMarketStatus())}
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
            (e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault() //prevent using non numeric values in input
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
                !closingPrice ||
                paymentProcessing
              }
              onClick={addItemToCart}
            />
          </Flex>
        </div>
      </Card>
    </div>
  )
}

export default BuySharesForm
