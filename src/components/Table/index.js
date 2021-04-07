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

const Text = styled('span')`
  font-family: 'Inter';
  font-size: large;
`;

const TextCol = styled('span')`
  font-size: large;
`;

const PricePositive = styled('span')`
  font-family: 'Inter';
  font-size: large;
  color: #02cb1b;
`;

const PriceNeutral = styled('span')`
  font-family: 'Inter';
  font-size: large;
  color: #0289cb;
`;

const PriceNegative = styled('span')`
  font-family: 'Inter';
  font-size: large;
  color: #e80e0e;
`;

export function TableQuote(props) {
  const { isLoading, items } = props;

  if (isLoading && !items) {
    return <Spiner />;
  }

  const DrawSlippage = (value, inverse) => {
    const { price } = value;
    const priceToFix = +parseFloat(price).toFixed(2);
    if (Math.sign(price) === -1) {
      return inverse ? <PricePositive>{priceToFix} %</PricePositive> : <PriceNegative>{priceToFix} %</PriceNegative>;
    }
    if (Math.sign(price) === 0) {
      return <PriceNeutral>{priceToFix} %</PriceNeutral>;
    }
    if (Math.sign(price) === 1) {
      return inverse ? <PriceNegative>{priceToFix} %</PriceNegative> : <PricePositive>{priceToFix} %</PricePositive>;
    }
  };

  const Row = item => {
    const value = item.item;
    const image = `/static/images/${value.name}.png`;
    return (
      <Tr key={value.name}>
        <Th>
          <a href={value.source} target="noopener noreferrer">
            <ImgSrc src={image} />
          </a>
        </Th>
        <Th>
          <Text>$ {parseFloat(value.buy_price).toFixed(2)}</Text>
        </Th>
        <Th>
          <Text>$ {parseFloat(value.sell_price).toFixed(2)}</Text>
        </Th>
        <Th>
          <DrawSlippage price={value.buy_price_slippage} inverse={true} />
        </Th>
        <Th>
          <DrawSlippage price={value.sell_price_slippage} inverse={false} />
        </Th>
      </Tr>
    );
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>
            <TextCol>PLATFORM</TextCol>
          </Th>
          <Th>
            <TextCol>BUY</TextCol>
          </Th>
          <Th>
            <TextCol>SELL</TextCol>
          </Th>
          <Th>
            <TextCol>BUY SLIPPAGE</TextCol>
          </Th>
          <Th>
            <TextCol>SELL SLIPPAGE</TextCol>
          </Th>
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
