import { faUser, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { requestUser } from '~/apiServices/userServices';
import { useValueContext } from '~/hooks';
import { storage } from '~/utils/storage';

function Login() {
  const DivStyledWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(180deg, #425a98, #cf888b);
  `;
  const DivStyledLogin = styled.div`
    min-width: 350px;
    position: relative;

    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    padding: 80px 20px 10px;
    z-index: 2;
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.3);
  `;

  const DivStyledLoginLogo = styled.div`
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #01264e;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    top: -20%;
    color: #fff;
    font-size: 3.3rem;
  `;

  const FormLabelStyled = styled.div`
    margin: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00274c;
    color: rgba(255, 255, 255, 0.9);
    border-bottom-left-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
  `;

  const FormControlStyled = styled.input`
    border-radius: 0;
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    padding: 8px;
    flex: 1;
    background-color: #385272;
    color: #fff;
  `;
  const ButtonStyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.6);
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
  `;
  const ButtonStyled = styled.button`
    background-color: transparent;
    color: #ffffff;
    font-weight: 600;

    &:hover {
      color: #01264e;
    }
  `;

  const [user, setUser] = useState();
  const [textError, setTextError] = useState();

  const inputUserNameRef = useRef();
  const inputPasswordRef = useRef();

  const contextValue = useValueContext();
  const currentUser = contextValue.userCurrent;
  const navigate = useNavigate();
  const { loginStatus, setLoginStatus } = contextValue.login;

  useEffect(() => {
    // effect
    const fetchApi = async () => {
      const resultUser = await requestUser();
      setUser(resultUser);
    };
    fetchApi();

    return () => {
      // cleanup
    };
  }, []);

  function handleSubmit() {
    if (inputUserNameRef.current.value.trim().length === 0) {
      setTextError('Tài khoản không thể để trống');
    } else {
      if (inputPasswordRef.current.value.trim().length === 0) {
        setTextError('Mật khẩu không thể để trống');
      } else {
        if (inputUserNameRef.current.value !== user[0].username || inputPasswordRef.current.value !== user[0].password) {
          setTextError('Tài khoản hoặc mật khẩu không đúng');
        } else {
          currentUser.current = user[0];
          console.log('llllgshhhh: ' + currentUser.current.name);
          setLoginStatus(true);
          storage.set({ status: true });
          navigate('/');
        }
      }
    }
  }
  return (
    <DivStyledWrapper>
      <DivStyledLogin>
        <DivStyledLoginLogo>
          <FontAwesomeIcon icon={faUser} />
        </DivStyledLoginLogo>
        <div className="mb-3 d-flex align-items-center">
          <FormLabelStyled>
            <FontAwesomeIcon icon={faUserCircle} />
          </FormLabelStyled>
          <FormControlStyled ref={inputUserNameRef} type="text" placeholder="Enter email" />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <FormLabelStyled>
            <FontAwesomeIcon icon={faLock} />
          </FormLabelStyled>
          <FormControlStyled ref={inputPasswordRef} type="password" placeholder="Enter email" />
        </div>
        <p>{textError}</p>
      </DivStyledLogin>
      <ButtonStyledWrapper>
        <ButtonStyled onClick={handleSubmit} type="button">
          LOGIN
        </ButtonStyled>
      </ButtonStyledWrapper>
    </DivStyledWrapper>
  );
}

export default Login;
