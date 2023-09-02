import React from 'react';
import styled from "styled-components";

const InputButtons = () => {
    return (
        <ButtonContainer>
            <Button borderColor="var(---error)">Reset</Button>
            <Button borderColor="var(---secondary)">Example</Button>
            <Button borderColor="var(---fifth)">Create</Button>
        </ButtonContainer>
    );
};

export default InputButtons;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: var(---primary);
  border-radius: 5px;
  border: 2px solid ${({ borderColor }) => borderColor || 'var(---secondary)'};
  color: var(---tertiary);
  cursor: pointer;
  font-weight: bold;
  
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: var(---secondary);
    border-color: var(---tertiary);
    color: var(---primary);
  }
`;
