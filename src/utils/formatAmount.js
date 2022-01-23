const formatAmount = (amount, currency = 'USD', format = 'en-US') => {
  return new Intl.NumberFormat(format, {
    style: 'currency',
    currency,
  }).format(amount)
}

export default formatAmount
