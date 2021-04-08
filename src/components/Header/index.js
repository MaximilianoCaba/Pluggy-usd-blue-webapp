import React from 'react';

import styled from '@emotion/styled';

const HeaderRoot = styled(`header`)`
  left: 0;
  width: 100%;
  height: 64px;
  position: relative;
  top: 0px;
  z-index: 1000;
`;

const HeaderContainer = styled('div')`
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);
  background-color: #009879;
`;

const NavRoot = styled('nav')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 16px;
  height: 64px;
  max-width: 1024px;
`;

const Space = styled('div')`
  flex: 1 1 auto;
`;

const ImgSrc = styled('img')`
  width: 22%;
`;

export function Header() {
  return (
    <HeaderRoot>
      <HeaderContainer>
        <NavRoot>
          <ImgSrc src="/static/images/LOGO.png" />
          <Space />
        </NavRoot>
      </HeaderContainer>
    </HeaderRoot>
  );
}

export default Header;
