import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { requestUser } from '~/apiServices/userServices';
import { useValueContext } from '~/hooks';
import { devices } from '~/responsive/responsive';
import { storage } from '~/utils/storage';

const breatheAnimation = keyframes`
 to{
    transform:translateX(0%);
    opacity:1;
 }
 from{
    opacity:0;
    transform:translateX(-100%);
 }
`;
const AsideStyled = styled.aside`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  animation: ${breatheAnimation} ease-in 0.4s;
  @media ${devices.mobileL} {
    padding: 0px !important;
    height: 100%;
  }
`;

const SidebarStyled = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
  color: #fff;
  border-radius: 0.75rem;
  padding: 10px;
  @media ${devices.mobileL} {
    border-radius: 0;
  }
`;

const ImageStyledAvatar = styled(Image)`
  width: 60px;
  height: 60px;
  border: 2px solid #f4f4f4;
  border-radius: 50%;
`;

const LinkStyled = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  margin: 0.09375rem 0;
  border-radius: 0.375rem;
  cursor: pointer;
  width: 100%;
  font-size: 0.75rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
`;
const ButtonStyledLogout = styled.button`
  width: 100%;
  font-size: 0.75rem;

  color: #fff;
  margin: 0.09375rem 0;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: none;
  background-color: transparent;
  text-align: left;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const IconStyled = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;
function Sidebar() {
  const BtnStyledWithTimer = styled(LinkStyled)`
    ${document.URL === 'http://localhost:3000/' ? 'background: linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232));' : ''};
  `;
  const BtnStyledWithReport = styled(LinkStyled)`
    ${document.URL === 'http://localhost:3000/report' ? 'background: linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232));' : ''};
  `;
  const Ref = useRef();

  const contextValue = useValueContext();

  const { setLoginStatus } = contextValue.login;
  const { isSideBar, setIsSideBar } = contextValue.sideBar;

  function handleLogOut() {
    setIsSideBar('none');

    storage.set({ status: false, avatar: '', userName: '' });
    setLoginStatus(false);
  }

  return (
    <AsideStyled className="py-2" ref={Ref}>
      <SidebarStyled>
        <div className="d-flex  align-items-center">
          <ImageStyledAvatar src={storage.get().avatar} />
          <h6 className="p-3">{storage.get().userName}</h6>
        </div>
        <hr />
        <div className="d-flex flex-column mt-3">
          <BtnStyledWithTimer
            to="/"
            className="p-2"
            onClick={() => {
              setIsSideBar('none');
            }}
          >
            <IconStyled icon={faClock} />
            <span>Timer</span>
          </BtnStyledWithTimer>
          <BtnStyledWithReport
            to="/report"
            className="p-2"
            onClick={() => {
              setIsSideBar('none');
            }}
          >
            <IconStyled icon={faChartBar} />
            <span>Report</span>
          </BtnStyledWithReport>
          <ButtonStyledLogout onClick={handleLogOut} className="p-2">
            <IconStyled icon={faSignOutAlt} />
            Logout
          </ButtonStyledLogout>
        </div>
      </SidebarStyled>
    </AsideStyled>
  );
}

export default Sidebar;
