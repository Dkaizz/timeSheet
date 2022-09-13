import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { devices } from '~/responsive/responsive';

export const DivStyledWrapper = styled.div``;

export const DivStyledwrapperItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;
export const DivStyledwrapperTask = styled.div`
  padding: 10px;
  font-size: 0.75rem;
  flex: 1;
`;
export const DivStyledTask = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;

  margin-bottom: 5px;

  align-items: center;
  p {
    margin: 0;
    flex: 1;
    max-width: 100px;
    overflow-wrap: break-word;
  }
`;

export const PStyledTime = styled.p`
  margin: 0;
  font-weight: 600;
`;

export const DivStyledTaskItem = styled.div`
  padding: 0 10px;
`;

export const DivSTyledMenuBody = styled.div`
  display: none;
  background-color: #f6f6f6;

  position: absolute;
  top: 100%;
  right: 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  z-index: 5;

  &::after {
    content: '';
    width: 100%;
    height: 20px;
    position: absolute;
    // background-color: #000;
    top: -23%;
    left: 0;
  }
`;

export const DivStyledMenuWrapper = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  padding: 0 10px;
  &:hover ${DivSTyledMenuBody} {
    display: block;
  }
`;

export const ButtonStyledBtnTask = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  color: #000;
  border-radius: 0;
  outline: 0;
  padding: 2px 20px;
  font-size: 1rem;
  &:hover {
    background-color: transparent;
    color: #0065ca;
  }
`;

export const DivStyledNotification = styled.div.attrs(({ display }) => {
  console.log(`display: ${display}`);
  return { display };
})`
  display: ${props => props.display};
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 5px;

  p {
    padding-bottom: 10px;
    max-width: unset;
  }

  button {
    background-color: #f6f6f6;
    border: none;
    color: #000;
    border-radius: 5px;
    outline: 0;
    padding: 2px 20px;
    font-size: 1rem;
    margin: 0 5px;

    &:hover {
      color: red;
    }
  }
`;
