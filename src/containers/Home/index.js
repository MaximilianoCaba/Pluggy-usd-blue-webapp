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

export function Home({ getChange, changeData }) {
  useInjectSaga({ key: 'change', saga });
  useInjectReducer({ key: 'change', reducer });

  useEffect(() => {
    getChange();
    const interval = setInterval(() => getChange(), 60000);
    return () => clearInterval(interval);
  }, []);

  console.log(changeData);

  return (
    <Layout>
      <div>Component</div>
    </Layout>
  );
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
