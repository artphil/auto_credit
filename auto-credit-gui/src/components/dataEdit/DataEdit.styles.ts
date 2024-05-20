import styled from "styled-components";

export const DataContainer = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
`;

export const DataTitle = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 700;
`;

export const DataField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.3rem 0;
`;

export const DataLabel = styled.label`
  color: ${(props) => props.theme.colors.primaryDark};
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0.2rem;
`;

export const DataInput = styled.input`
  background-color: ${(props) => props.theme.colors.neutralLight};
  border: 1px solid ${(props) => props.theme.colors.primaryDark};
  height: 2rem;
  border-radius: 1rem;
  padding: 0 1rem;
  font-size: 1rem;
  font-family: inherit;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const CoverContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const CoverContent = styled.p`
  max-width: 80%;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.secondary};
  border-radius: 1rem;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  border: 2px dashed ${(props) => props.theme.colors.secondary};
`;
