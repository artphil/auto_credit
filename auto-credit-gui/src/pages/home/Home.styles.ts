import styled from "styled-components";

export const Container = styled.div`
  width: 70%;
  display: flex;
  margin: 1rem auto;
  gap: 1rem;

  @media (max-width: ${(props) => props.theme.devices.mobile}) {
    width: 100%;
    flex-direction: column;
  }
`;

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
