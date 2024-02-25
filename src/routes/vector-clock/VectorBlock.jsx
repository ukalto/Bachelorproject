import React from 'react';
import styled from 'styled-components';
import Xarrow from "react-xarrows";

const VectorBlock = ({
                         readOnlyCheck,
                         vectorsAmount,
                         vector,
                         vectorIndex,
                         timeIndex,
                         increments,
                         arrows,
                         handleInputChange,
                         handleInputFieldClickIncrement,
                         handleInputFieldClickArrow,
                         deleteXArrow
                     }) => {

    const getIndexOfMapEntry = (vectorIndex, timeIndex) => {
        let index = 1;
        for (const [, [vi, ti, ]] of increments) {
            if (vi === vectorIndex && ti === timeIndex) {
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
                    {getIndexOfMapEntry(vectorIndex, timeIndex) !== -1 && vectorIndex === cellIndex && (
                        <IncrementSpan>e{getIndexOfMapEntry(vectorIndex, timeIndex, cellIndex)}</IncrementSpan>
                    )}
                    <StyledInput
                        type="number"
                        id={`${vectorIndex}-${timeIndex}-${cellIndex}`}
                        value={cell}
                        readOnly={readOnlyCheck}
                        isLast={cellIndex === vectorsAmount - 1}
                        isInIncrement={increments.has(`${vectorIndex}-${timeIndex}-${cellIndex}`)}
                        onChange={!readOnlyCheck ? (e) => handleInputChange(vectorIndex, cellIndex, e.target.value) : null}
                        onClick={readOnlyCheck ? () => handleInputFieldClickArrow(`${vectorIndex}-${timeIndex}-${vectorIndex}`, vectorIndex, timeIndex) : null}
                    />
                    {arrows.map((value, index) => (
                        !value.includes(null) && value[1][1] === vectorIndex && value[1][2] === timeIndex && (
                            <Xarrow
                                divContainerStyle={{
                                    color: 'var(---tertiary)',
                                    fontWeight: 'bold',
                                    cursor: 'not-allowed',
                                }}
                                divContainerProps={{onClick: () => deleteXArrow(value[0][0], value[1][0])}}
                                animateDrawing={1}
                                key={index}
                                zIndex={1}
                                headSize={4}
                                color={'darkgray'}
                                path={"grid"}
                                showHead={true}
                                showTail={false}
                                startAnchor={["right", {position: "right", offset: {x: 30}}]}
                                endAnchor={["right", {position: "right", offset: {x: 30}}]}
                                _cpx1Offset={20}
                                _cpx2Offset={20}
                                start={`${value[0][0]}`}
                                end={`${value[1][0]}`}
                                labels={`m${index + 1}`}
                            />
                        )
                    ))}
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
    left: 30%;
`;
