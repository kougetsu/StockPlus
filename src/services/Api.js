import axios from 'axios'

const Api = axios.create({
  baseURL: `https://financialmodelingprep.com/api/`,
  params: {
    apikey: '05453aa5416c0617a356443dec29d03d',
  },
})

export default Api
