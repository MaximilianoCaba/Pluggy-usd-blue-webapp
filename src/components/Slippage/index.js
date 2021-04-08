import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

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

export function Slippage(props) {
  const { inverse, value } = props;

  const DrawSlippage = (value, inverse) => {
    const { priceVariation } = value;
    const priceToFix = +parseFloat(priceVariation).toFixed(2);
    if (Math.sign(priceVariation) === -1) {
      return inverse ? <PricePositive>{priceToFix} %</PricePositive> : <PriceNegative>{priceToFix} %</PriceNegative>;
    }
    if (Math.sign(priceVariation) === 0) {
      return <PriceNeutral>{priceToFix} %</PriceNeutral>;
    }
    if (Math.sign(priceVariation) === 1) {
      return inverse ? <PriceNegative>{priceToFix} %</PriceNegative> : <PricePositive>{priceToFix} %</PricePositive>;
    }
  };

  return (
    <Fragment>
      <DrawSlippage priceVariation={value} inverse={inverse} />
    </Fragment>
  );
}

Slippage.propTypes = {
  inverse: PropTypes.bool,
  value: PropTypes.number,
};

export default Slippage;
