import styled from "styled-components";
import { ReactComponent as MainLogo } from "assets/brand/brand.svg";
import { ReactComponent as User } from "assets/icon/user.svg";
import { ReactComponent as ArrowDown } from "assets/icon/arrow_down_white.svg";
import { ReactComponent as ArrowUp } from "assets/icon/arrow_up_white.svg";
import { Link } from "react-router-dom";

export const Logo = styled(MainLogo)``;

export const UserIcon = styled(User)``;

export const ArrowDownIcon = styled(ArrowDown)``;

export const ArrowUpIcon = styled(ArrowUp)``;

export const Container = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 0 3rem;
`;

export const MenuButton = styled.button`
  min-width: 8rem;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.neutral};
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

export const Menu = styled.div``;

export const MenuList = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.neutral};
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 0 1rem;
`;

export const MenuItem = styled(Link)`
  min-height: 2rem;
  min-width: 10rem;
  padding: 1rem;
  border-radius: 1rem 0 0 1rems;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryMedium};
  }
`;

export const LoginButton = styled(Link)`
  min-width: 6rem;
  min-height: 2rem;
  color: ${(props) => props.theme.colors.neutral};
  border: 1px solid ${(props) => props.theme.colors.neutral};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
