import React from 'react';
import styled from 'styled-components';

const ProcessorBlock = ({column, columnIdx, activeEditMode, handleInputChange}) => {

    return (
        <BlockContainer>
            {column.map((value, index) => (
                <InputWrapper key={index} isLast={index === column.length - 1}>
                    <StyledInput
                        type="text"
                        activeEditMode={activeEditMode}
                        value={value}
                        index={index}
                        min={0}
                        isLast={index === column.length - 1}
                        onChange={(e) => handleInputChange(columnIdx, index, e.target.value)}
                        disabled={!activeEditMode || index !== 1}
                    />
                </InputWrapper>
            ))}
        </BlockContainer>
    );
};
export default ProcessorBlock;

const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: ${({isLast}) => (isLast ? '10px' : '0')};
`;

const StyledInput = styled.input`
  width: 30px;
  height: 30px;
  border: 0;
  border-top: 1px solid var(---tertiary);
  border-left: 1px solid var(---tertiary);
  border-right: 1px solid var(---tertiary);
  border-bottom: ${({isLast}) => (isLast ? '1px' : '0')} solid var(---tertiary);
  text-align: center;

  background: ${({
                   activeEditMode,
                   index
                 }) => (!activeEditMode || index !== 1 ? 'var(---fourth)' : 'var(---primary)')};;

  &:focus {
    outline: none;
  }

  cursor: ${({
               activeEditMode,
               index
             }) => {
    if (index === 1 && activeEditMode) {
      return 'text';
    } else if (!activeEditMode) {
      return 'pointer';
    } else {
      return 'default';
    }
  }};

  &:hover {
    background: ${({activeEditMode}) => (activeEditMode ? "default" : "var(---secondary)")};
  }
`;
