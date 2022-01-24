import reducer, {
  decrementByAmount,
  incrementByAmount,
} from './accountBalanceSlice'

test('account balance movements', () => {
  const previousState = {
    value: 0,
  }

  expect(
    reducer(previousState, incrementByAmount(100)).value
  ).toBeGreaterThanOrEqual(previousState.value)

  expect(
    reducer(previousState, decrementByAmount(0)).value
  ).toBeLessThanOrEqual(previousState.value)
})
