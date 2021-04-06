import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Layout from 'components/Layout';
import { getQuote } from '../../redux/quote/actions';
import { selectQuote } from '../../redux/quote/selectors';
import { getSlippage } from '../../redux/slippage/actions';
import { selectSlippage } from '../../redux/slippage/selectors';
import { getAverage } from '../../redux/average/actions';
import { selectAverage } from '../../redux/average/selectors';
import styled from '@emotion/styled';
import CardAverage from '../../components/CardAverage';
import CardBest from '../../components/CardBest';
import Spiner from '../../components/Spiner';
import TableQuote from '../../components/Table';
import { useInjectSaga } from '../../utils/inject-saga';
import sagaQuote from '../../redux/quote/saga';
import { useInjectReducer } from '../../utils/inject-reducer';
import reducerQuote from '../../redux/quote/reducer';
import sagaSlippage from '../../redux/slippage/saga';
import reducerSlippage from '../../redux/slippage/reducer';
import sagaAverage from '../../redux/average/saga';
import reducerAverage from '../../redux/average/reducer';

const CardRow = styled('div')`
  margin-top: 40px;
  margin-left: 100px;
  margin-right: 100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 70px;
  grid-auto-rows: minmax(0, 400px);

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media only screen and (max-width: 425px) {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const TableRow = styled('div')`
  margin-top: 40px;
  margin-left: 100px;
  margin-right: 100px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 70px;

  @media only screen and (max-width: 425px) {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const ContainerCard = styled('div')`
  margin-top: 70px;
  height: 70%;
  display: grid;
`;

export function Home({ getQuotes, quoteData, getSlippages, slippageData, getAverage, averageData }) {
  useInjectSaga({ key: 'quotes', saga: sagaQuote });
  useInjectReducer({ key: 'quotes', reducer: reducerQuote });
  useInjectSaga({ key: 'slippages', saga: sagaSlippage });
  useInjectReducer({ key: 'slippages', reducer: reducerSlippage });
  useInjectSaga({ key: 'average', saga: sagaAverage });
  useInjectReducer({ key: 'average', reducer: reducerAverage });

  const getState = () => {
    getQuotes();
    getSlippages();
    getAverage();
  };
  useEffect(() => {
    getState();
    const interval = setInterval(() => getState(), 60000);
    return () => clearInterval(interval);
  }, []);

  const { loading: loadingQuotes, quotes } = quoteData;
  const { loading: loadingSlippage, slippages } = slippageData;
  const { loading: loadingAverage, average } = averageData;

  if (average && quotes) {
    const bestBuy = quotes.length
      ? quotes.reduce((prev, current) => (prev.buy_price > current.buy_price ? prev : current))
      : {};
    const bestSell = quotes.length
      ? quotes.reduce((prev, current) => (prev.bestSell < current.bestSell ? prev : current))
      : {};

    return (
      <Layout>
        <CardRow>
          <ContainerCard>
            <CardBest isLoading={loadingQuotes} item={bestBuy} type="BUY" />
          </ContainerCard>
          <CardAverage isLoading={loadingAverage} item={average} />
          <ContainerCard>
            <CardBest isLoading={loadingQuotes} item={bestSell} type="SELL" />
          </ContainerCard>
        </CardRow>
        <TableRow>
          <TableQuote isLoading={loadingSlippage} items={slippages} />
        </TableRow>
      </Layout>
    );
  }
  return <Spiner />;
}

const mapStateToProps = createStructuredSelector({
  quoteData: selectQuote(),
  slippageData: selectSlippage(),
  averageData: selectAverage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getQuotes: () => dispatch(getQuote()),
    getSlippages: () => dispatch(getSlippage()),
    getAverage: () => dispatch(getAverage()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

Home.propTypes = {
  slippageData: PropTypes.object,
  getSlippages: PropTypes.func,
  quoteData: PropTypes.object,
  getQuotes: PropTypes.func,
  averageData: PropTypes.object,
  getAverage: PropTypes.func,
};

export default compose(withConnect, memo)(Home);
