import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

import Spiner from 'components/Spiner';

const CardItem = styled('div')`
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px 0px, rgba(0, 0, 0, 0.02) 0px 0px 0px 1px;
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  height: auto;
  color: #757575;
`;

const Title = styled('h3')`
  width: 100%;
`;

export function CardBest(props) {
  const { isLoading, item, type } = props;

  if (isLoading) {
    return <Spiner />;
  }

  if (item) {
    const price = type === 'BUY' ? item.buy_price : item.sell_price;
    return (
      <CardItem>
        <Title>{item.name}</Title>
        <Title>{type}</Title>
        <Title>{price}</Title>
      </CardItem>
    );
  }
  return <Spiner />;
}

CardBest.propTypes = {
  isLoading: PropTypes.bool,
  item: PropTypes.object,
  type: PropTypes.string,
};

export default CardBest;
