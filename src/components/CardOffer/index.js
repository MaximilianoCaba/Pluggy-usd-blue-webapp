import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

import Spiner from 'components/Spiner';
import Slippage from '../Slippage';

const CardItem = styled('div')`
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px 0px, rgba(0, 0, 0, 0.02) 0px 0px 0px 1px;
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  height: auto;
  color: #757575;
  align-items: center;
  margin-top: 10px;
`;

const ImgSrc = styled('img')`
  padding: 20px;
`;

const Price = styled('h3')`
  width: 100%;
  color: #009879;
`;

const ItemCol = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  width: 100%;
`;

export function CardOffer(props) {
  const { isLoading, item } = props;

  if (isLoading && !item) {
    return <Spiner />;
  }

  if (item) {
    const image = `/static/images/${item.name}.png`;
    return (
      <CardItem>
        <a href={item.source} target="noopener noreferrer">
          <ImgSrc src={image} />
        </a>
        <ItemCol>
          <h4> BUY</h4>
          <Price>$ {parseFloat(item.buy_price).toFixed(2)}</Price>
        </ItemCol>
        <ItemCol>
          <h4> SELL</h4>
          <Price>$ {parseFloat(item.sell_price).toFixed(2)}</Price>
        </ItemCol>
        <ItemCol>
          <h4> BUY SLIPPAGE</h4>
          <Slippage value={item.buy_price_slippage} inverse={true} />
        </ItemCol>
        <ItemCol>
          <h4> SELL SLIPPAGE</h4>
          <Slippage value={item.sell_price_slippage} inverse={false} />
        </ItemCol>
      </CardItem>
    );
  }
  return <Spiner />;
}

CardOffer.propTypes = {
  isLoading: PropTypes.bool,
  item: PropTypes.object,
};

export default CardOffer;
