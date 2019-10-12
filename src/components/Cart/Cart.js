import React from 'react'
import styled from 'styled-components'

import CartItem from './CartItem'

const CartWrapper = styled('div')`
  border-top: 1px solid #eee;
  margin: 0 auto;
  max-width: 800px;
  padding-top: 2rem;
  text-align: center;
`

const CartTotalCost = styled('div')`
  font-weight: 700;
  padding: 2rem;
`

function Cart({ itemsInCart, totalCost }) {
    return(
        <CartWrapper>
            <h2>Your shopping cart</h2>
            {itemsInCart.length > 0 ? (
                <div>
                    {itemsInCart.map(item => (
                        <CartItem
                            key={item.id}
                            title={item.title}
                            cost={item.price * item.quantity}
                            quantity={item.quantity}
                        />
                    ))}
                    <CartTotalCost>
                        Total cost: ${totalCost.toFixed(2)}
                    </CartTotalCost>
                </div>
            ) : (
                <div>Your cart is empty</div>
            )}
        </CartWrapper>
    )
}

export default Cart
