import styled from "styled-components";
import { ReactComponent as MainLogo } from "assets/brand/brand.svg";
import { ReactComponent as User } from "assets/icon/user.svg";
import { ReactComponent as ArrowDown } from "assets/icon/arrow_down_white.svg";
import { ReactComponent as ArrowUp } from "assets/icon/arrow_up_white.svg";

export const Logo = styled(MainLogo)``;

export const UserIcon = styled(User)``;

export const ArrowDownIcon = styled(ArrowDown)``;

export const ArrowUpIcon = styled(ArrowUp)``;

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 0 3rem;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.neutral};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
