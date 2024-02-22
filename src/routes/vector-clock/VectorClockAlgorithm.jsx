import React from 'react';
import styled from "styled-components";
import VectorBlock from "./VectorBlock.jsx";

const VectorClockAlgorithm = ({
                                  timeSteps,
                                  vectorsAmount,
                                  vectorRow,
                                  vectorIndex,
                                  handleInputChange,
                                  handleInputFieldClick
                              }) => {
    const marginPercentage = 20 / timeSteps;

    return (
        <BlockContainer>
            <VectorBlockContainer>
                {vectorRow.map((vector, index) => (
                    <MarginWrapper key={index} marginPercentage={marginPercentage}>
                        <VectorBlock
                            readOnlyCheck={index !== 0}
                            vectorsAmount={vectorsAmount}
                            vector={vector}
                            vectorIndex={vectorIndex}
                            timeIndex={index}
                            handleInputChange={handleInputChange}
                            handleInputFieldClick={handleInputFieldClick}
                        />
                        {vectorIndex === vectorsAmount - 1 && (
                            <TextWrapper>t{index}</TextWrapper>
                        )}
                    </MarginWrapper>
                ))}
            </VectorBlockContainer>
        </BlockContainer>
    );
};
export default VectorClockAlgorithm;

const BlockContainer = styled.div`
    margin: 30px 30px 0 0;
    width: 100%;
    position: relative;
`;

const VectorBlockContainer = styled.div`
    display: flex;
`;

const MarginWrapper = styled.div`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-left: ${({marginPercentage}) => marginPercentage}%;
    margin-right: ${({marginPercentage}) => marginPercentage}%;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const TextWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
`;
