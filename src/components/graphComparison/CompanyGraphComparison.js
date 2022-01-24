import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import { breakpoints } from '../../app/breakpoints'
import { useViewport } from '../../hooks/useViewport'
import Api from '../../services/Api'
import Flex from '../common/Flex'
import FlexItem from '../common/FlexItem'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import Card from '../common/Card'

const StyledDatePicker = styled(DateRangePicker)`
  margin-top: 10px;
  background-color: #fff;

  @media screen and (max-width: ${breakpoints.sm}px) {
    width: 100%;
  }
`

const CompanyGraphComparison = ({ companies }) => {
  const { width } = useViewport()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companyToCompare, setCompanyToCompare] = useState(null)
  const [graphDataHashmap, setGraphDataHashmap] = useState([])
  const [graphData, setGraphData] = useState([])
  const [apiResponseCache, setApiResponseCache] = useState({})

  //set default date
  const getFilterInitialDates = () => {
    let startDate = new Date()
    let endDate = new Date()
    startDate.setFullYear(endDate.getFullYear() - 1)
    return [startDate, endDate]
  }
  const [dateFilter, setDateFilter] = useState(getFilterInitialDates())

  //handle new selection
  //and reset company to compare when the main one selected is changed
  const onSelectedCompanyChange = (company) => {
    setCompanyToCompare(null)
    setSelectedCompany(company)
  }

  //handles date filter selection changes.
  //reset api data cache and company to compare
  const onDateChange = (dateRange) => {
    setApiResponseCache({})
    setCompanyToCompare(null)
    setDateFilter(dateRange)
  }

  //get api response data from cached values first if available
  //else fetches close prices from external api
  const fetchCompanyData = async (company) => {
    let responseData
    if (apiResponseCache[company]) {
      return apiResponseCache[company]
    }

    try {
      const { data } = await Api.get(`/v3/historical-price-full/${company}`, {
        params: {
          serietype: 'line',
          from: dateFilter[0].toLocaleDateString('en-CA'),
          to: dateFilter[1].toLocaleDateString('en-CA'),
        },
      })

      responseData = data.historical.reverse()
      //set value to the cache for performance
      setApiResponseCache({
        ...apiResponseCache,
        [company]: responseData,
      })
    } catch (err) {
      console.error(err)
      alert('Error retrieving data from API.')
      return
    }

    return responseData
  }

  useEffect(() => {
    if (!selectedCompany) return

    fetchCompanyData(selectedCompany.value).then((responseData) => {
      //create new object and pass it to the chart component
      let dataMap = []
      responseData.forEach((data) => {
        dataMap[data.date] = {
          date: data.date,
          [selectedCompany.value]: data.close,
        }
      })
      setGraphDataHashmap(dataMap)
      setGraphData(Object.values(dataMap))
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany, dateFilter])

  useEffect(() => {
    if (!companyToCompare) return

    fetchCompanyData(companyToCompare.value).then((responseData) => {
      //add company to compare to existing graph data
      let newGraphData = graphDataHashmap
      responseData.forEach((data) => {
        newGraphData[data.date] = {
          ...newGraphData[data.date],
          [companyToCompare.value]: data.close,
        }
      })
      setGraphData(Object.values(newGraphData))
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyToCompare])
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <b>Select a company:</b>
      </div>
      <Flex
        flexGap={10}
        flexWrap='wrap'
        flexDirection={width > breakpoints.sm ? 'row' : 'column'}
      >
        <FlexItem flex='1 1 0'>
          <Select
            options={companies}
            onChange={onSelectedCompanyChange}
            value={selectedCompany}
          ></Select>
        </FlexItem>
        <FlexItem flex='1 1 0'>
          <Select
            options={
              !selectedCompany
                ? companies
                : companies.filter((c) => c.value !== selectedCompany.value)
            }
            isDisabled={!selectedCompany}
            onChange={(company) => setCompanyToCompare(company)}
            value={companyToCompare}
            isClearable
          ></Select>
        </FlexItem>
      </Flex>

      <div style={{ marginTop: 10 }}>
        <div>
          <b>Filter by Date:</b>
        </div>
        <StyledDatePicker onChange={onDateChange} value={dateFilter} />
      </div>

      <div style={{ marginTop: '20px', height: '500px' }}>
        {selectedCompany && (
          <Card style={{ height: '100%', padding: '25px 25px 15px 0' }}>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                width={500}
                height={300}
                data={graphData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' tickLine={false} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type='monotone'
                  dataKey={selectedCompany.value}
                  stroke='#8884d8'
                  dot={false}
                  activeDot={{ r: 8 }}
                />
                {companyToCompare && (
                  <Line
                    type='monotone'
                    dataKey={companyToCompare.value}
                    stroke='#82ca9d'
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
    </>
  )
}

export default CompanyGraphComparison
