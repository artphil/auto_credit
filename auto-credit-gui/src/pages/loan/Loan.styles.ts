import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "assets/icon/arrow_left_dark.svg";

export const ArrowLeftIcon = styled(ArrowLeft)`
  margin: 1rem;
`;

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const PageHeader = styled.div`
  display: flex;
  margin: 1rem 0;
`;
export const PageHeaderPath = styled.div`
  color: ${(props) => props.theme.colors.neutralDark};
  font-size: 0.8rem;
`;

export const PageHeaderTilte = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 500;
`;

export const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
  margin: 1rem 0;
`;

export const Amount = styled.div`
  background-color: ${(props) => props.theme.colors.neutral};
  color: ${(props) => props.theme.colors.primaryDark};
  width: 50%;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 2rem;
  margin: 2rem auto;
  padding: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  margin: 1rem 0;
  gap: 1rem;
`;

export const InstallmentGroup = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 1rem 0;
  gap: 1rem;
`;

export const SummaryFieldGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem 1rem;
  gap: 1rem;
`;

export const SummaryField = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-right: auto;
  font-weight: 400;
  gap: 1rem;
  color: ${(props) => props.theme.colors.neutralDark};

  span {
    font-weight: 600;
  }
`;
