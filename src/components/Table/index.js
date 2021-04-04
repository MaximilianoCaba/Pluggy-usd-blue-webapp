import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

import Spiner from 'components/Spiner';

const Table = styled('div')`
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

const Thead = styled('div')`
  background-color: #009879;
  color: #ffffff;
  text-align: left;
`;

const Th = styled('div')`
  padding: 12px 15px;
`;

const Tr = styled('div')`
  border-bottom: 1px solid #dddddd;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const ImgSrc = styled('img')`
  width: 60%;
`;

export function TableQuote(props) {
  const { isLoading, items } = props;

  if (isLoading) {
    return <Spiner />;
  }

  const Row = item => {
    const value = item.item;
    const image = `/static/images/${value.name}.png`;
    return (
      <Tr key={value.name}>
        <Th>
          <ImgSrc src={image} />
        </Th>
        <Th>{value.buy_price}</Th>
        <Th>{value.sell_price}</Th>
        <Th>{value.buy_price_slippage}</Th>
        <Th>{value.sell_price_slippage}</Th>
      </Tr>
    );
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th />
          <Th>Buy</Th>
          <Th>Sell</Th>TableQuote
          <Th>Buy slippage</Th>
          <Th>Sell slippage</Th>
        </Tr>
      </Thead>
      {!items ? <Spiner /> : items.map(item => <Row item={item} key={item.name} />)}
    </Table>
  );
}

TableQuote.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
};

export default TableQuote;
