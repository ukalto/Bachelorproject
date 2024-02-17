import React from 'react';
import styled from 'styled-components';
import Xarrow from "react-xarrows";


const ProcessorBlock = ({
                            processor,
                            processorIdx,
                            activeEditMode,
                            handleInputChange,
                            arrows,
                            handleInputFieldClick
                        }) => {

    return (
        <BlockContainer>
            {processor.map((value, index) => (
                <InputWrapper key={index} isLast={index === processor.length - 1}>
                    <StyledInput
                        id={`${processorIdx}+${index}`}
                        type="text"
                        activeEditMode={activeEditMode}
                        value={value}
                        index={index}
                        min={0}
                        isLast={index === processor.length - 1}
                        onClick={() => handleInputFieldClick(`${processorIdx}+${index}`, processorIdx, index)}
                        onChange={(e) => handleInputChange(processorIdx, index, e.target.value)}
                        // disabled={!activeEditMode || index !== 1}
                    />
                </InputWrapper>
            ))}
            {!activeEditMode && arrows.map((value, index) => (
                !value.includes(null) && (
                    <Xarrow
                        divContainerStyle={{
                            color: 'var(---tertiary)',
                            fontWeight: 'bold',
                        }}
                        gridBreak={"50%"}
                        animateDrawing={true}
                        curveness={0}
                        key={index}
                        headSize={4}
                        color={'darkgray'}
                        showHead={true}
                        start={`${value[0][0]}`}
                        end={`${value[1][0]}`}
                        labels={`e${index + 1}`}
                        click
                    />
                )
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
