import React from 'react';
import styled from 'styled-components';
import ProcessorBlock from './ProcessorBlock';

const LamportsLogicalClocksAlgorithm = ({ processorAmount, rowAmount, startValues, activeEditMode }) => {
    const marginPercentage = 20 / processorAmount;

    return (
        <BlockContainer>
            {Array.from({ length: processorAmount }, (_, index) => (
                <MarginWrapper key={index} marginPercentage={marginPercentage}>
                    <TextWrapper>P{index + 1}</TextWrapper>
                    <ProcessorBlock rowAmount={rowAmount} activeEditMode={activeEditMode} />
                </MarginWrapper>
            ))}
        </BlockContainer>
    );
};

export default LamportsLogicalClocksAlgorithm;

const BlockContainer = styled.div`
  display: flex;
  margin: 40px 40px 0 0;
  width: 100%;
  position: relative;
`;

const MarginWrapper = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-left: ${({ marginPercentage }) => marginPercentage}%;
  margin-right: ${({ marginPercentage }) => marginPercentage}%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  margin-top: -30px;
`;
