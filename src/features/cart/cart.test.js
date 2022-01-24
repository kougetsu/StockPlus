import reducer, { addToCart, clearCart, removeFromCart } from './cartSlice'

test('cart is empty when initialized', () => {
  expect(reducer(undefined, {}).value).toEqual([])
})

test('cart item has an id', () => {
  const previousState = {
    paymentProcessing: false,
    value: [],
  }

  const addedItem = reducer(
    previousState,
    addToCart({
      stock: 'AAPL',
      amount: 1,
      value: 150,
    })
  )

  expect(addedItem.value).toEqual([
    {
      stock: 'AAPL',
      amount: 1,
      value: 150,
      id: expect.any(String),
    },
  ])
})
test('can add item to cart', () => {
  const previousState = {
    paymentProcessing: false,
    value: [],
  }

  expect(
    reducer(
      previousState,
      addToCart({
        stock: 'AAPL',
        amount: 1,
        value: 150,
      })
    ).value
  ).toHaveLength(1)
})

//this test asserts that if the same company is added to the cart,
//the amounts must be summed instead of adding to the array
test('same company cart items must not exist', () => {
  const previousState = {
    value: [
      {
        stock: 'AAPL',
        amount: 1,
        value: 150,
      },
    ],
  }

  const addedItem = reducer(
    previousState,
    addToCart({
      stock: 'AAPL',
      amount: 1,
      value: 150,
    })
  )

  expect(addedItem.value).toHaveLength(1)
})

test('items cannot be added/removed/cleared when payment is processing', () => {
  const previousState = {
    paymentProcessing: true,
    value: [
      {
        stock: 'AAPL',
        amount: 1,
        value: 150,
        id: 'test-id',
      },
    ],
  }

  expect(reducer(previousState, removeFromCart('test-id')).value).toHaveLength(
    1
  )
  expect(
    reducer(previousState, addToCart({ stock: 'GOOG', amount: 2, value: 250 }))
      .value
  ).toHaveLength(1)

  expect(reducer(previousState, clearCart()).value).toHaveLength(1)
})
