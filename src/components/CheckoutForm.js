import React, { useState} from 'react'
import styled from 'styled-components'
import { CardElement, injectStripe } from 'react-stripe-elements'

const CheckoutFormComplete = styled('div')`
  color: #7fdc45;
  font-weight: 700;
  text-align: center;
`

const CheckoutFormWrapper = styled('form')`
  border-top: 1px solid #eee;
  margin: 0 auto;
  max-width: 800px;
  padding-top: 2rem;
  text-align: center;
`

const CheckoutFormButtom = styled('button')`
  display: inline-block;
  margin: 0 0 1rem 0;
  padding: 0.85em 1em;
  border: 0;
  outline: 0;
  border-radius: 100em;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  background-color: #7fdc45;
  color: #fff;
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 0.25s;
  transition-timing-function: ease-out;
  -webkit-appearance: none;

  :hover, :focus {
    background-color: #68b637;
  }
`

const CheckoutFormError = styled('div')`
  color: #dc4545;
`

const StyledCardElemet = styled(CardElement)`
  display: block;
  margin: 0.5rem auto 1.5rem;
  max-width: 500px;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #eee;
  border-radius: 3px;
  outline: 0;
  background: white;
`

function CheckoutForm({ stripe, totalCost }) {
    const [ status, setStatus ] = useState('default')

    const submit = async e => {
        e.preventDefault()

        setStatus('submitting')

        try {
            let { token } = await stripe.createToken({ name: 'Name' })

            let response = await fetch('/.netlify/functions/charge', {
                method: 'POST',
                body: JSON.stringify({
                    amount: totalCost * 100,
                    token: token.id,
                }),
            })

            if (response.ok) {
                setStatus('complete')
            } else {
                throw new Error('Network response was not ok')
            }
        } catch (err) {
            setStatus('error')
        }
    }

    if (status === 'complete') {
        return <CheckoutFormComplete>Payment successful</CheckoutFormComplete>
    }

    return (
        <CheckoutFormWrapper onSubmit={submit}>
            <h4>Would you like to complete the purchase?</h4>
            <StyledCardElemet />
            <CheckoutFormButtom
                type="submit"
                disabled={status === 'submitting'}
            >
                {status === 'submitting' ? 'Submitting' : 'Submit Order'}
            </CheckoutFormButtom>
            {status === 'error' && (
                <CheckoutFormError>Something went wrong</CheckoutFormError>
            )}
        </CheckoutFormWrapper>
    )
}

export default injectStripe(CheckoutForm)
