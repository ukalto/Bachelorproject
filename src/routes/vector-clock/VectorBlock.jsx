import React from 'react';
import styled from 'styled-components';

const VectorBlock = ({disabledCheck, vectorsAmount, vector, vectorIndex, activeEditMode, handleInputChange}) => {

    return (
        <BlockContainer>
            {vector.map((cell, cellIdx) => (
                <InputWrapper key={cellIdx} isLast={cellIdx === vectorsAmount - 1}>
                    <StyledInput
                        type="text"
                        value={cell}
                        min={0}
                        max={94}
                        disabled={disabledCheck || !activeEditMode}
                        activeEditMode={activeEditMode}
                        disabledCheck={disabledCheck}
                        isLast={cellIdx === vectorsAmount - 1}
                        onChange={(e) => handleInputChange(vectorIndex, cellIdx, e.target.value)}
                    />
                </InputWrapper>
            ))}
        </BlockContainer>
    );
};

export default VectorBlock;

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
                       disabledCheck,
                   }) => (!activeEditMode || disabledCheck ? 'var(---fourth)' : 'var(---primary)')};;

    &:focus {
        outline: none;
    }

    cursor: ${({
                   activeEditMode,
                   disabledCheck
               }) => {
        if (!disabledCheck && activeEditMode) {
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
