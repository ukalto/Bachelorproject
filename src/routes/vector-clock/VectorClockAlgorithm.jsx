import React, {useEffect, useState} from 'react';
import VectorBlock from "./VectorBlock";
import styled from "styled-components";
import Arrow from "../../components/Arrow.jsx";

const VectorClockAlgorithm = ({timeSteps, vectorsAmount, vectors, activeEditMode}) => {
    const marginPercentage = 20 / timeSteps;

    const [vectorColumn, setVectorColumn] = useState(Array.from({length: vectors[0].length}, () => []));

    useEffect(() => {
        let newVectorColumn = Array.from({length: vectors[0].length}, () => []);
        for (let i = 0; i < vectors[0].length; i++) {
            for (let j = 0; j < vectors.length; j++) {
                try {
                    newVectorColumn[i].push(vectors[j][i]);
                } catch (e) {
                }
            }
        }
        setVectorColumn(newVectorColumn);
    }, [vectors]);


    return (
        <BlockContainer>
            <VectorBlockContainer>
                {vectorColumn.map((vector, index) => (
                    <MarginWrapper key={index} marginPercentage={marginPercentage}>
                        <VectorBlock
                            disabledCheck={index !== 0}
                            vectorsAmount={vectorsAmount}
                            vector={vector}
                            activeEditMode={activeEditMode}
                        />
                        <TextWrapper>t{index}</TextWrapper>
                    </MarginWrapper>
                ))}
            </VectorBlockContainer>
            <Timeline>
                <Arrow isRight={true} width={90}/>
                <CenteredText>Zeit/Time</CenteredText>
            </Timeline>
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

const CenteredText = styled.div`
    font-weight: bold;
    text-align: center;
`;

const Timeline = styled.div`
  padding-top: 30px;
  width: 100%;
`;
