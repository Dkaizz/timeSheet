import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap/esm';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useValueContext } from '~/hooks';
function DefaultLayout({ children }) {
  const DivStyledWithMain = styled(Container)`
    width: 100%;
    max-width: 100%;
  `;

  const DivStyledWithColContainer = styled(Col)`
    margin-top: 120px;
    border-right: 4px solid #333;
    border-bottom: 4px solid #333;
  `;

  const DivStyledWithColSidebar = styled(Col)`
    padding: 0;
    min-height: 100vh;
  `;
  const FooterStyled = styled.footer``;

  const contextValue = useValueContext();
  const { loginStatus, setLoginStatus } = contextValue.login;

  useEffect(() => {
    if (!loginStatus) {
      console.log('chuyển trang');
      window.location = '/login';
    }

    return () => {
      // cleanup
    };
  }, [loginStatus]);
  return (
    <>
      <DivStyledWithMain>
        <Row>
          <DivStyledWithColSidebar lg={3}>
            <Sidebar />
          </DivStyledWithColSidebar>
          <DivStyledWithColContainer lg={9}>{children}</DivStyledWithColContainer>
        </Row>
      </DivStyledWithMain>
      <FooterStyled></FooterStyled>
    </>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
