import axios from 'axios'

const Api = axios.create({
  baseURL: `https://financialmodelingprep.com/api/`,
  params: {
    apikey: process.env.REACT_APP_API_KEY,
  },
})

export default Api
