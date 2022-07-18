import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { requestUser } from '~/apiServices/userServices';
import { storage } from '~/utils/storage';

function Login() {
  const DivStyledWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const DivStyledLogin = styled.div`
    max-width: 40%;
  `;

  const [user, setUser] = useState();
  const [textError, setTextError] = useState();

  const inputUserNameRef = useRef();
  const inputPasswordRef = useRef();

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
          storage.set({ status: true });
          window.location = '/';
        }
      }
    }
  }
  return (
    <DivStyledWrapper>
      <DivStyledLogin>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Uesr name</Form.Label>
          <Form.Control ref={inputUserNameRef} type="text" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={inputPasswordRef} type="password" placeholder="Enter email" />
        </Form.Group>
        <p>{textError}</p>
        <Button variant="primary" onClick={handleSubmit} type="button">
          Submit
        </Button>
      </DivStyledLogin>
    </DivStyledWrapper>
  );
}

export default Login;
