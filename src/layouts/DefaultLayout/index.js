import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap/esm';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useValueContext } from '~/hooks';
import { useNavigate } from 'react-router-dom';
import { devices } from '~/responsive/responsive';
const DivStyledWithMain = styled(Container)`
  width: 100%;
  max-width: 100%;
  min-height: 1000px;
  background-color: #f4f4f4;
`;

const DivStyledWithColContainer = styled(Col)``;

const FooterStyled = styled.footer``;

function DefaultLayout({ children }) {
  const contextValue = useValueContext();
  const { loginStatus, setLoginStatus } = contextValue.login;
  const { isSideBar, setIsSideBar } = contextValue.sideBar;

  const { isAddTask, setIsAddTask } = contextValue.addTask;

  const DivStyledWithColSidebar = styled(Col)`
    @media ${devices.mobileL} {
      display: ${isSideBar};

      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 2;
    }
  `;

  const DivSideBarStyles = styled.div`
    @media ${devices.mobileL} {
      position: fixed;
      width: 50%;
      top: 0;
      bottom: 0;
      left: 0;
      -webkit-backface-visibility: hidden;
    }
  `;
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
      <DivStyledWithMain
        onClick={() => {
          setIsAddTask('none');
        }}
      >
        <Row>
          <DivStyledWithColSidebar
            lg={2}
            md={3}
            onClick={() => {
              setIsSideBar('none');
            }}
          >
            <DivSideBarStyles
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <Sidebar />
            </DivSideBarStyles>
          </DivStyledWithColSidebar>

          <DivStyledWithColContainer lg={10} md={9}>
            {children}
          </DivStyledWithColContainer>
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
