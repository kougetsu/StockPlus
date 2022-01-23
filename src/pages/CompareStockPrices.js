import React from 'react'
import styled from 'styled-components'
import companies from '../utils/companies'
import CompanyGraphComparison from '../components/CompanyGraphComparison'

const PageContainer = styled.div`
  padding: 20px;
  height: 100%;
`

const CompareStockPrices = () => {
  return (
    <PageContainer>
      <CompanyGraphComparison companies={companies} />
    </PageContainer>
  )
}

export default CompareStockPrices
