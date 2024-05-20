import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "assets/icon/arrow_left_dark.svg";
import { ReactComponent as ArrowDown } from "assets/icon/arrow_down_dark.svg";
import { ReactComponent as ArrowUp } from "assets/icon/arrow_up_dark.svg";
import { ReactComponent as Checked } from "assets/icon/checked.svg";
import { ReactComponent as Awaiting } from "assets/icon/awaiting.svg";
import { ReactComponent as Eye } from "assets/icon/eye.svg";
import { Link } from "react-router-dom";

export const ArrowLeftIcon = styled(ArrowLeft)`
  margin: 1rem;
`;

export const ArrowDownIcon = styled(ArrowDown)`
  width: 1rem;
  margin: 1rem;
`;

export const ArrowUpIcon = styled(ArrowUp)`
  width: 1rem;
  margin: 1rem;
`;

export const AwaitIcon = styled(Awaiting)`
  margin: 0.5rem;
`;

export const CheckIcon = styled(Checked)`
  margin: 0.5rem;
`;

export const EyeIcon = styled(Eye)``;

export const Container = styled.div`
  position: relative;
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
  background-color: ${(props) => props.theme.colors.neutralLight};
  color: ${(props) => props.theme.colors.primaryDark};
  width: 50%;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 2rem;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  align-items: center;

  input[type="number"] {
    -moz-appearance: textfield;
    background: none;
    margin: 0;
    width: 100%;
    border: none;
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    text-align: end;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  margin: 1rem 0;
  gap: 1rem;
`;

export const InstallmentGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 1rem 0;
  gap: 1rem;
`;

export const SummaryFieldGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2rem 1rem;
`;

export const SummaryColunm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SummaryField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  font-weight: 400;
  gap: 1rem;
  color: ${(props) => props.theme.colors.neutralDark};

  span {
    font-weight: 600;
  }
`;

export const CoverContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const CoverContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.secondary};
  max-width: 60%;
  border-radius: 1rem;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  border: 2px dashed ${(props) => props.theme.colors.secondary};
`;

export const CoverButton = styled(Link)`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  padding: 1rem;
  border-radius: 1rem;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const ItemContainer = styled.div`
  background-color: ${(props) => props.theme.colors.neutral};
  color: ${(props) => props.theme.colors.neutralDark};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ItemTitle = styled.p`
  text-transform: uppercase;
  font-weight: 700;
`;

export const ItemContent = styled.div`
  border-top: 2px solid ${(props) => props.theme.colors.neutralLight};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ItemStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.secondaryLightest};
  color: ${(props) => props.theme.colors.secondary};
  font-weight: 700;
  padding-right: 0.5rem;
  margin: 0.5rem 0;
`;

export const ItemHide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
`;
