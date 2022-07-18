import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { requestUser } from '~/apiServices/userServices';
import { useValueContext } from '~/hooks';
import { storage } from '~/utils/storage';

function Sidebar() {
  const Ref = useRef();
  const AsideStyled = styled.aside`
    background-color: #f4f4f4;
    width: 100%;
    height: 100%;
    border: 4px solid #333;
    display: flex;
    flex-direction: column;
  `;
  const DivStyledWithAcction = styled.div``;

  const ImageStyledAvatar = styled(Image)`
    width: 60px;
    border: 4px solid #333;
    border-radius: 50%;
  `;
  const SpanStyledWithTimer = styled.span`
    border-bottom: ${document.URL === 'http://localhost:3000/' ? '2px solid #333' : 'none'};
  `;
  const SpanStyledWithReport = styled.span`
    border-bottom: ${document.URL === 'http://localhost:3000/report' ? '2px solid #333' : 'none'};
  `;
  const ButtonStyledLogout = styled.button`
    outline: none;
    background-color: transparent;
    text-align: left;
  `;

  const IconStyled = styled(FontAwesomeIcon)`
    margin-right: 10px;
  `;
  const [user, setUser] = useState();

  useEffect(() => {
    // effect
    console.log();
    const fetchApi = async () => {
      const resultUser = await requestUser();

      setUser(resultUser);
    };
    fetchApi();

    return () => {
      // cleanup
    };
  }, []);

  const contextValue = useValueContext();

  const { setLoginStatus } = contextValue.login;

  function handleLogOut() {
    storage.set({ status: false });
    setLoginStatus(false);
  }

  return (
    <AsideStyled className="p-3" ref={Ref}>
      <div className="d-flex  align-items-center">
        <ImageStyledAvatar src={user && user[0].avatar} />
        <h6 className="p-3">{user && user[0].username}</h6>
      </div>
      <div className="d-flex flex-column mt-3">
        <Link to="/" className="py-2">
          <IconStyled icon={faClock} />
          <SpanStyledWithTimer>Timer</SpanStyledWithTimer>
        </Link>
        <Link to="/report" className="py-2">
          <IconStyled icon={faChartBar} />
          <SpanStyledWithReport>Report</SpanStyledWithReport>
        </Link>
        <ButtonStyledLogout onClick={handleLogOut} className="py-2">
          <IconStyled icon={faSignOutAlt} />
          Logout
        </ButtonStyledLogout>
      </div>
    </AsideStyled>
  );
}

export default Sidebar;
