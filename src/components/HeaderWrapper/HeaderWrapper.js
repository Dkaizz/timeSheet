import styled from 'styled-components';
const HeaderStyled = styled.header`
  height: 120px;
  border-bottom: 1px solid #ccc;
`;
function HeaderWrapper({ children }) {
  return <HeaderStyled className="d-flex justify-content-between align-items-center">{children}</HeaderStyled>;
}

export default HeaderWrapper;
