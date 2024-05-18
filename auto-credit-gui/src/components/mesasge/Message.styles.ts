import { styled } from "styled-components";
import { ReactComponent as Bot } from "assets/image/betina.svg";

export const BotImage = styled(Bot)`
  width: 5rem;
`;

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryLightest};
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
`;

export const Content = styled.p`
  color: ${(props) => props.theme.colors.neutralDark};
  font-size: 1rem;
  font-weight: 400;
`;
