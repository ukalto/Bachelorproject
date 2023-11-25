import React from 'react';
import styled from "styled-components";

const InputButtons = ({ resetForm = () => { }, setExampleData = () => { }, solveAlgorithm = null, activeEditMode = null, setActiveEditMode = null}) => {

  const handleResetClick = () => {
    resetForm();
  };

  const handleExampleClick = () => {
    setExampleData();
  };

  const handleSolveClick = () => {
    solveAlgorithm && solveAlgorithm();
  };

  const activateEditModeClick = () => {
    setActiveEditMode(!activeEditMode);
  }

  return (
    <ButtonContainer>
      <ButtonContainer>
        <Button borderColor="var(---error)" onClick={handleResetClick}>Reset</Button>
        <Button borderColor="var(---secondary)" onClick={handleExampleClick}>Example</Button>
        {solveAlgorithm && <Button borderColor="var(---fifth)" onClick={handleSolveClick}>Solve</Button>}
        {setActiveEditMode && <Button borderColor="var(---fifth)" onClick={activateEditModeClick}>{activeEditMode ? 'Edit: On' : 'Edit: Off'}</Button>}
      </ButtonContainer>
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

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 16px;
  }
`;
