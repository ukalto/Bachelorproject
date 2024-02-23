import React from 'react';
import styled from 'styled-components';

const VectorBlock = ({
                         readOnlyCheck,
                         vectorsAmount,
                         vector,
                         vectorIndex,
                         timeIndex,
                         increments,
                         handleInputChange,
                         handleInputFieldClick
                     }) => {

    const getIndexOfMapEntry = (vectorIndex, timeIndex, cellIndex) => {
        let index = 1;
        for (const [, [vi, ti, ci]] of increments) {
            if (vi === vectorIndex && ti === timeIndex && ci === cellIndex) {
                return index;
            }
            index++;
        }
        return -1;
    };

    return (
        <BlockContainer>
            {vector.map((cell, cellIndex) => (
                <InputWrapper key={cellIndex} isLast={cellIndex === vectorsAmount - 1}>
                    <StyledInput
                        type="number"
                        id={`${vectorIndex}-${timeIndex}-${cellIndex}`}
                        value={cell}
                        readOnly={readOnlyCheck}
                        isLast={cellIndex === vectorsAmount - 1}
                        isInIncrement={increments.has(`${vectorIndex}-${timeIndex}-${cellIndex}`)}
                        onChange={!readOnlyCheck ? (e) => handleInputChange(vectorIndex, cellIndex, e.target.value) : null}
                        onClick={readOnlyCheck ? () => handleInputFieldClick(`${vectorIndex}-${timeIndex}-${cellIndex}`, vectorIndex, timeIndex, cellIndex) : null}
                    />
                    {getIndexOfMapEntry(vectorIndex, timeIndex, cellIndex) !== -1 && (
                        <IncrementSpan>e{getIndexOfMapEntry(vectorIndex, timeIndex, cellIndex)}</IncrementSpan>
                    )}
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
    display: flex;
    flex-direction: row;
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
                       isInIncrement
                   }) => (isInIncrement ? 'var(---secondary)' : (readOnly ? 'var(---fourth)' : 'var(---primary)'))};

    &:focus {
        outline: none;
    }

    cursor: ${({readOnly}) => (readOnly ? 'pointer' : 'text')};

    &:hover {
        background: ${({readOnly}) => (!readOnly ? 'default' : 'var(---secondary)')};
    }
`;

const IncrementSpan = styled.span`
    position: absolute;
    right: 30%;
`;
