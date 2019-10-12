import React, { useState } from "react"
import styled, { keyframes } from 'styled-components'
import { Elements, StripeProvider } from 'react-stripe-elements'

import items from '../api'
// import SEO from "../components/SEO"
import Product from "../components/Product"
import Cart from '../components/Cart/Cart'
import CheckoutForm from '../components/CheckoutForm'
import logo from '../images/logo.svg'

const AppHeader = styled('header')`
  background-color: #282c34;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const AppLogo = styled('img')`
  animation: ${AppLogoSpin} infinite 20s linear;
  height: 32px;
`
const AppHeaderText = styled('h1')`
  font-size: 16px;
`

const AppShop = styled('main')`
  padding: 1rem 1rem 3rem;
`

const AppProducts = styled('div')`
  margin: 3rem auto 3.5rem;
  max-width: 800px;
  text-align: center;

  @media (min-width: 800px) {
    display: flex;
    justify-content: center;
  }
`

function IndexPage() {
  const [itemsInCart, setItemsInCart] = useState([]);

  const handleAddToCartClick = id => {
    setItemsInCart(itemsInCart => {
      const itemInCart = itemsInCart.find(item => item.id === id);

      // if item is already in cart, update the quantity
      if (itemInCart) {
        return itemsInCart.map(item => {
          if (item.id !== id) return item;
          return { ...itemInCart, quantity: item.quantity + 1 };
        });
      }

      // otherwise, add new item to cart
      const item = items.find(item => item.id === id);
      return [...itemsInCart, { ...item, quantity: 1 }];
    });
  };

  const totalCost = itemsInCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
  <div>
    {/* <SEO title="Home" /> */}
    <AppHeader>
      <AppLogo src={logo} alt="logo"/>
      <AppHeaderText>Dreamcast Shop</AppHeaderText>
    </AppHeader>
    <AppShop>
      <AppProducts>
        {items.map(item => (
          <Product
            key={item.title}
            title={item.title}
            price={item.price}
            onAddToCartClick={() => handleAddToCartClick(item.id)}
          />
        ))}
      </AppProducts>
      <Cart itemsInCart={itemsInCart} totalCost={totalCost} />
      {itemsInCart.length > 0 && (
        <StripeProvider apiKey="pk_test_hJ3fbHvbQZFxyrbtjNnBrU4k00A6Mx6jvD">
          <Elements>
            <CheckoutForm totalCost={totalCost} />
          </Elements>
        </StripeProvider>
      )}
    </AppShop>
  </div>
  )
}

export default IndexPage
