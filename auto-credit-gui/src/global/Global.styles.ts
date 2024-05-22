import styled from "styled-components";

export const Main = styled.main`
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 33rem;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: ${(props) => props.theme.devices.mobile}) {
    width: 100%;
  }
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primaryDark};
  border: none;
  height: 3rem;
  width: 12rem;
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.neutralLight};

  &.outlined {
    background-color: ${(props) => props.theme.colors.neutralLight};
    border: 1px solid ${(props) => props.theme.colors.primaryDark};
    color: ${(props) => props.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.neutralLight};
    color: ${(props) => props.theme.colors.neutralMedium};
    border: none;
  }
`;

export const ButtonStyled = styled.button`
  background-color: ${(props) => props.theme.colors.neutral};
  border: none;
  border-left: 10px solid ${(props) => props.theme.colors.secondary};
  height: 4rem;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.neutralMedium};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);

  span {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 600;
  }

  &.active {
    background-color: ${(props) => props.theme.colors.secondaryLight};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.neutralMedium};
    color: ${(props) => props.theme.colors.neutralDark};
    border-color: ${(props) => props.theme.colors.neutralDark};

    span {
      color: ${(props) => props.theme.colors.neutralDark};
    }
  }
`;
