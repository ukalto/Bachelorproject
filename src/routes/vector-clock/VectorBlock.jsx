import React from 'react';
import styled from 'styled-components';

const VectorBlock = ({readOnlyCheck, vectorsAmount, vector, vectorIndex, timeIndex, handleInputChange, handleInputFieldClick}) => {

    return (
        <BlockContainer>
            {vector.map((cell, cellIdx) => (
                <InputWrapper key={cellIdx} isLast={cellIdx === vectorsAmount - 1}>
                    <StyledInput
                        type="number"
                        id={`${vectorIndex}-${timeIndex}-${cellIdx}`}
                        value={cell}
                        min={0}
                        max={94}
                        readOnly={readOnlyCheck}
                        isLast={cellIdx === vectorsAmount - 1}
                        onChange={!readOnlyCheck ? (e) => handleInputChange(vectorIndex, cellIdx, e.target.value) : null}
                        onClick={readOnlyCheck ? () => handleInputFieldClick(`${vectorIndex}-${timeIndex}-${cellIdx}`, vectorIndex, timeIndex, cellIdx) : null}
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
                       readOnly,
                   }) => (readOnly ? 'var(---fourth)' : 'var(---primary)')};

    &:focus {
        outline: none;
    }

    cursor: ${({readOnly}) => {
        if (!readOnly) {
            return 'text';
        } else {
            return 'pointer';
        }
    }};

    &:hover {
        background: ${({readOnly}) => (!readOnly ? "default" : "var(---secondary)")};
    }
`;
