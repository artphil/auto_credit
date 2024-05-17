import styled from "styled-components";

export const Main = styled.main`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
