import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import { useValueContext } from '~/hooks';
import { devices } from '~/responsive/responsive';
const HeaderStyled = styled.header`
  border-bottom: 1px solid #ccc;

  @media ${devices.mobileL} {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #f4f4f4;
    padding: 0 10px;
    z-index: 1;
  }
`;

const HeaderMobileStyled = styled.div`
  display: none;
  padding: 12px 16px;
  @media ${devices.mobileL} {
    display: flex;
    justify-content: space-between;
  }
`;

const ButtonActions = styled.button`
  font-size: 24px;
`;

function HeaderWrapper({ children, type = 'timer' }) {
  const contextValue = useValueContext();
  const { setIsSideBar } = contextValue.sideBar;
  const { isAddTask, setIsAddTask } = contextValue.addTask;

  const HeaderChildren = styled.div`
    height: 120px;

    @media ${devices.mobileL} {
      display: ${isAddTask}!important;
      flex-direction: column;
    }
  `;
  return (
    <HeaderStyled
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <HeaderMobileStyled>
        <ButtonActions
          onClick={() => {
            setIsSideBar('block');
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </ButtonActions>
        {type !== 'report' && (
          <ButtonActions
            onClick={() => {
              isAddTask === 'none' ? setIsAddTask('flex') : setIsAddTask('none');
            }}
          >
            <FontAwesomeIcon icon={faPlusSquare} />
          </ButtonActions>
        )}
      </HeaderMobileStyled>
      <HeaderChildren className="d-flex justify-content-between align-items-center">{children}</HeaderChildren>
    </HeaderStyled>
  );
}

export default HeaderWrapper;
