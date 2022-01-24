import reducer, { addTransaction } from './transactionsSlice'

test('no transactions when initialized', () => {
  expect(reducer(undefined, {}).value).toEqual([])
})

test('can add transaction', () => {
  const previousState = {
    value: [],
  }

  expect(
    reducer(
      previousState,
      addTransaction({
        totalAmount: 500,
        createdAt: new Date().toISOString(),
        items: [
          {
            id: 'test-id',
            stock: 'AAPL',
            amount: 1,
            value: 150,
          },
        ],
      })
    ).value
  ).toHaveLength(1)
})
