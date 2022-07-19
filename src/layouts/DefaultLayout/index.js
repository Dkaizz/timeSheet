import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap/esm';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useValueContext } from '~/hooks';
import { useNavigate } from 'react-router-dom';
const DivStyledWithMain = styled(Container)`
  width: 100%;
  max-width: 100%;
  background-color: #f4f4f4;
`;

const DivStyledWithColContainer = styled(Col)`
  border-right: 4px solid #333;
  border-bottom: 4px solid #333;
`;

const DivStyledWithColSidebar = styled(Col)`
  min-height: 100vh;
`;
const FooterStyled = styled.footer``;

function DefaultLayout({ children }) {
  const contextValue = useValueContext();
  const { loginStatus, setLoginStatus } = contextValue.login;

  const navigate = useNavigate();

  useEffect(() => {
    console.log('login:', loginStatus);
    if (!loginStatus) {
      console.log('chuyển trang');
      navigate('/login');
    }

    return () => {
      // cleanup
    };
  }, [loginStatus]);
  return (
    <>
      <DivStyledWithMain>
        <Row>
          <DivStyledWithColSidebar lg={2}>
            <Sidebar />
          </DivStyledWithColSidebar>
          <DivStyledWithColContainer lg={10}>{children}</DivStyledWithColContainer>
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
