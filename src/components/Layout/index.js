import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';

function Layout({ children }) {
  return (
    <>
      <Header />

      <main>{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
