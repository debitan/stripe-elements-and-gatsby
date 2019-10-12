import React from 'react'
import styled from 'styled-components'

const CartItemWrapper = styled('div')`
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  text-align: left;
`

const CartItemDetails = styled('div')`
    display: flex;
    width: 180px;
`

const CartItemQuantity = styled('div')`
    padding: 0 1rem;
    flex: 1 1 50%;
`

const CartItemCost = styled('div')`
    flex: 1 1 50%;
`

function CartItem ({ title, cost, quantity }) {
    return (
        <CartItemWrapper>
            <div>{title}</div>
            <CartItemDetails>
                <CartItemQuantity>Qty: {quantity}</CartItemQuantity>
                <CartItemCost>${cost.toFixed(2)}</CartItemCost>
            </CartItemDetails>
        </CartItemWrapper>
    )
}

export default CartItem
