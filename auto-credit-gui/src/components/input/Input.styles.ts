import styled from "styled-components";

const height = "1rem";
const thumbHeight = "1.5rem";

export const Range = styled.input`
  display: block;
  appearance: none;
  width: 100%;
  height: ${height};
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${height};
    background: ${(props) => props.theme.colors.primaryMedium};
    border-radius: 1rem;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    position: relative;
    top: -25%;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${(props) => props.theme.colors.primaryDark};
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.colors.neutral};
  }

  &::-moz-range-track,
  &::-moz-range-progress {
    width: 100%;
    height: ${height};
    background: ${(props) => props.theme.colors.neutralLight};
    border-radius: 1rem;
  }

  &::-moz-range-progress {
    background: ${(props) => props.theme.colors.primaryMedium};
  }

  &::-moz-range-thumb {
    appearance: none;
    height: ${thumbHeight};
    width: ${thumbHeight};
    background: ${(props) => props.theme.colors.primary};
    border-radius: 100%;
    border: 1px solid ${(props) => props.theme.colors.neutral};
  }
`;
