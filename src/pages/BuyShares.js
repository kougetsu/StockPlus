import React from 'react'
import styled from 'styled-components'
import companies from '../utils/companies'
import BuySharesForm from '../components/BuySharesForm'
import Cart from '../components/cart/Cart'

const PageContainer = styled.div`
  padding: 20px;
`

const FormWrapper = styled.div`
  max-width: 650px;
  margin: 0 auto;
`

const BuyShares = () => {
  return (
    <PageContainer>
      <FormWrapper>
        <BuySharesForm companies={companies} />

        <section style={{ marginTop: 20 }}>
          <Cart />
        </section>
      </FormWrapper>
    </PageContainer>
  )
}

export default BuyShares
