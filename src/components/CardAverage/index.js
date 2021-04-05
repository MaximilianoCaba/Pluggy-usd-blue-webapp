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
  justify-content: space-between;
`;

const Title = styled('h3')`
  width: 100%;
`;

const Price = styled('h1')`
  width: 100%;
  color: #009879;
`;

const ItemCol = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export function CardAverage(props) {
  const { isLoading, item } = props;

  const getDate = () => {
    const d = new Date();
    return [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':');
  };

  if (isLoading && !item) {
    return <Spiner />;
  }

  if (item) {
    return (
      <CardItem>
        <h1>AVERAGE</h1>
        <ItemCol>
          <div>
            <h2>BUY</h2>
            <Price>$ {parseFloat(item.average_buy_price).toFixed(2)}</Price>
          </div>
          <div>
            <h2>SELL</h2>
            <Price>$ {parseFloat(item.average_sell_price).toFixed(2)}</Price>
          </div>
        </ItemCol>
        <Title>Last Update: {getDate()}</Title>
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
