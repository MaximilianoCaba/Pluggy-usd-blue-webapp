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

export function CardAverage(props) {
  const { isLoading, item } = props;

  if (isLoading) {
    return <Spiner />;
  }

  if (item) {
    return (
      <CardItem>
        <Title>BUY</Title>

        <Title>{item.average_buy_price}</Title>

        <Title>SELL</Title>

        <Title>{item.average_sell_price}</Title>
      </CardItem>
    );
  }

  return <Spiner />;
}

CardAverage.propTypes = {
  isLoading: PropTypes.bool,
  item: PropTypes.object,
};

export default CardAverage;
