import styled from "styled-components";
import { ReactComponent as MainLogo } from "assets/brand/brand.svg";

export const Logo = styled(MainLogo)`
  background-color: ${(props) => props.theme.colors.primary};
  width: 20rem;
  height: 4rem;
  padding: 0.5rem;
  border-radius: 1rem 1rem 0 0;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primaryDark};
`;

export const ErrorMessage = styled.p`
  height: 1.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.secondary};
`;

export const Input = styled.input`
  background-color: ${(props) => props.theme.colors.neutralLight};
  color: ${(props) => props.theme.colors.neutralDark};
  border: 1px solid ${(props) => props.theme.colors.primaryDark};
  border-radius: 2rem;
  width: 20rem;
  height: 3rem;
  padding: 1rem;
  font-family: inherit;
  font-size: 1.3rem;

  &::placeholder {
    background-color: ${(props) => props.theme.colors.neutralLight};
    color: ${(props) => props.theme.colors.neutralDark};
    font-weight: 700;
    text-align: center;
  }
`;
