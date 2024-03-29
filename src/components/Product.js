import React from 'react';
import styled from 'styled-components'

const ProductWrapper = styled('div')`
    border: 1px solid #eee;
    margin: 1rem 0;
    padding: 1rem;

    @media (min-width: 800px) {
        margin: 0 1rem;
        width: 33.3333%;
    }
`

const ProductTitle = styled('h2')`
    font-size: 16px;
`

const ProductPrice = styled('div')`
    margin-bottom: 1rem;
`

const ProductBuyButton = styled('button')`
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
    background-color: #61dafb;
    color: #fff;
    cursor: pointer;
    transition-property: background-color, color;
    transition-duration: 0.25s;
    transition-timing-function: ease-out;
    -webkit-appearance: none;

    :hover, :focus {
        background-color: #47b8d7;
    }
`

function Product({ onAddToCartClick, price, title }) {
  return (
    <ProductWrapper>
      <ProductTitle>{title}</ProductTitle>
      <ProductPrice>${price}</ProductPrice>
      <ProductBuyButton onClick={onAddToCartClick}>
        Add to cart
      </ProductBuyButton>
    </ProductWrapper>
  );
}

export default Product
