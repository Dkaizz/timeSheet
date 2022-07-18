import styled from 'styled-components';

function HeaderWrapper({ children }) {
  const HeaderStyled = styled.header`
    height: 120px;
    width: 76%;
    position: fixed;
    right: 0;
    top: 0;
    background-color: #fff;
    border: 4px solid #333;
    padding: 0 25px;
  `;
  return <HeaderStyled className="d-flex justify-content-between align-items-center">{children}</HeaderStyled>;
}

export default HeaderWrapper;
