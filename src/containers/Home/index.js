import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';
import Layout from 'components/Layout';
import saga from './saga';
import reducer from './reducer';
import { getChange } from './actions';
import { selectChange } from './selectors';
import styled from '@emotion/styled';
import CardAverage from '../../components/CardAverage';
import CardBest from '../../components/CardBest';
import Spiner from '../../components/Spiner';
import TableQuote from '../../components/Table';

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

export function Home({ getChange, changeData }) {
  useInjectSaga({ key: 'change', saga });
  useInjectReducer({ key: 'change', reducer });

  useEffect(() => {
    getChange();
    const interval = setInterval(() => getChange(), 60000);
    return () => clearInterval(interval);
  }, []);

  const {
    loading,
    change: { average, quotes, slippages },
  } = changeData;

  if (average && quotes) {
    const bestBuy = quotes.reduce((prev, current) => (prev.buy_price > current.buy_price ? prev : current));

    const bestSell = quotes.reduce((prev, current) => (prev.bestSell < current.bestSell ? prev : current));

    return (
      <Layout>
        <CardRow>
          <ContainerCard>
            <CardBest isLoading={loading} item={bestBuy} type="BUY" />
          </ContainerCard>
          <CardAverage isLoading={loading} item={average} />
          <ContainerCard>
            <CardBest isLoading={loading} item={bestSell} type="SELL" />
          </ContainerCard>
        </CardRow>
        <TableRow>
          <TableQuote isLoading={loading} items={slippages} />
        </TableRow>
      </Layout>
    );
  }
  return <Spiner />;
}

const mapStateToProps = createStructuredSelector({
  changeData: selectChange(),
});

export function mapDispatchToProps(dispatch) {
  return { getChange: () => dispatch(getChange()) };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

Home.propTypes = {
  changeData: PropTypes.object,
  getChange: PropTypes.func,
};

export default compose(withConnect, memo)(Home);
