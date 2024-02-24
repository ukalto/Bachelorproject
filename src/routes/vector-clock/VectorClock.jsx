import React, {useEffect, useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField,
    marginsInput, RangeBox, GridItem, FieldGridFirst
} from '../../components/GlobalComponents.jsx';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBRow} from "mdb-react-ui-kit";
import RangeSlider from "../../components/RangeSlider";
import {createToastError, getScenario} from "../../components/GlobalFunctions.jsx";
import data from "../../assets/data.json";
import Arrow from "../../components/Arrow.jsx";
import styled from "styled-components";
import VectorClockAlgorithm from "./VectorClockAlgorithm.jsx";
import {ToastContainer} from "react-toastify";

const VectorClock = () => {
    const [vectorsAmount, setVectorsAmount] = useState(3);
    const [timeSteps, setTimeSteps] = useState(4);
    const [vectors, setVectors] = useState(Array.from({length: vectorsAmount}, () => Array.from({length: timeSteps}, () => Array(vectorsAmount).fill(0))));
    const [example] = useState(() => {
        const exampleData = data.data.find(item => item.name === 'VectorClock');
        const {vectors, vectorsAmount, timeSteps} = exampleData.details.find(item => item.type === 'example');
        return {vectors, vectorsAmount, timeSteps};
    });
    const [arrows, setArrows] = useState([]);
    const numArrows = arrows.length - 1;
    const [clickedInput, setClickedInput] = useState(0);
    const [increments, setIncrements] = useState(new Map());

    useEffect(() => {
        setVectors(prevVectors => {
            return Array.from({length: vectorsAmount}, (_, i) => {
                const existingVector = prevVectors[i];
                return Array.from({length: timeSteps}, (_, j) => {
                    if (existingVector && existingVector[j] !== undefined) {
                        if (existingVector[j].length > vectorsAmount) {
                            return existingVector[j].slice(0, vectorsAmount);
                        } else {
                            return existingVector[j].concat(Array(vectorsAmount - existingVector[j].length).fill(0));
                        }
                    } else {
                        return Array(vectorsAmount).fill(0);
                    }
                });
            });
        });
    }, [timeSteps, vectorsAmount]);

    const setExampleData = () => {
        setVectorsAmount(example.vectorsAmount);
        setTimeSteps(example.timeSteps);
    };

    const resetFormValues = () => {
        setVectorsAmount(3);
        setTimeSteps(4);
        setVectors(Array.from({length: vectorsAmount}, () => Array.from({length: timeSteps}, () => Array(vectorsAmount).fill(0))));
        setArrows([]);
        setIncrements(new Map());
    };

    const handleInputChange = (vectorIndex, cellIndex, newValue) => {
        if (newValue !== '') {
            const parsedValue = parseInt(newValue, 10);

            if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 99) {
                setVectors(prevVectors =>
                    prevVectors.map((vector, idx) =>
                        idx === vectorIndex
                            ? vector.map(time => time.map((cell, idx) => idx === cellIndex ? parsedValue : cell))
                            : vector
                    )
                );
                setArrows([]);
            }
        } else {
            const updatedVectors = [...vectors];
            updatedVectors[vectorIndex][0][cellIndex] = '';
            setVectors(updatedVectors);
        }
    };

    const handleInputFieldClickIncrement = async (id, vectorIndex, timeIndex, cellIdx) => {
        if (!increments.has(id)) {
            setIncrements(prevIncrements => {
                const newIncrements = new Map([...prevIncrements, [id, [vectorIndex, timeIndex, cellIdx]]]);
                return sortMap(newIncrements);
            });
        } else {
            const updatedIncrements = new Map([...increments]);
            updatedIncrements.delete(id);
            setIncrements(sortMap(updatedIncrements));
        }
    };

    const handleInputFieldClickArrow = async (id, vectorIndex, timeIndex, cellIdx) => {
        if (clickedInput % 2 === 0) {
            setArrows([...arrows, [[id, vectorIndex, timeIndex, cellIdx], null]]);
            setClickedInput(clickedInput + 1);
        } else {
            let lastArrow = arrows[numArrows][0];
            if (lastArrow[2] !== timeIndex) {
                createToastError('You can\'t create an arrow between to fields in different time indexes!');
            } else if (lastArrow[0] === id) {
                createToastError('You can\'t select the same field to create an arrow twice!');
            } else if(lastArrow[1] === vectorIndex){
                createToastError('You can\'t create an arrow in the same vector!');
            } else{
                let updatedArrow = [lastArrow, [id, vectorIndex, timeIndex, cellIdx]];
                setArrows([...arrows.slice(0, numArrows), updatedArrow]);
                setClickedInput(clickedInput + 1);
            }
        }
        console.log(arrows)
    };

    const handleSolveAlgorithm = () => {
        if (vectors.some(vector => vector.some(timeSteps => timeSteps.includes('')))) {
            createToastError('You must fill out every input field!');
        }
    }

    const sortMap = (map) => {
        const sortedEntries = [...map.entries()].sort((a, b) => {
            const [via, tia, cia] = a[1];
            const [vib, tib, cib] = b[1];

            if (tia !== tib) return tia - tib;
            if (via !== vib) return via - vib;
            return cia - cib;
        });

        return new Map(sortedEntries);
    };

    return (
        <FieldGrid>
            <FieldGridFirst>
                <GridItem>
                    <InputField>
                        <Headline>Inputs</Headline>
                        <MDBRow tag="form" className='g-3' style={marginsInput}>
                            <MDBCol md="6">
                                <RangeBox>
                                    <RangeSlider text={"Vectors"} min={2} max={4} value={vectorsAmount}
                                                 onChange={setVectorsAmount}/>
                                </RangeBox>
                            </MDBCol>
                            <MDBCol md="6">
                                <RangeBox>
                                    <RangeSlider text={"Time Steps"} min={3} max={7} value={timeSteps}
                                                 onChange={setTimeSteps}/>
                                </RangeBox>
                            </MDBCol>
                        </MDBRow>
                        <InputButtons
                            resetForm={resetFormValues}
                            setExampleData={setExampleData}
                            solveAlgorithm={handleSolveAlgorithm}/>
                    </InputField>
                </GridItem>
                <GridItem switchRows>
                    <Scenario scenario={getScenario("VectorClock", "scenario")}/>
                </GridItem>
            </FieldGridFirst>
            <Field>
                <Headline>Algorithm</Headline>
                {vectors.map((vectorRow, vectorIndex) => (
                    <VectorClockAlgorithm
                        key={vectorIndex}
                        timeSteps={timeSteps}
                        vectorsAmount={vectorsAmount}
                        vectorRow={vectorRow}
                        vectorIndex={vectorIndex}
                        increments={increments}
                        handleInputChange={handleInputChange}
                        handleInputFieldClickIncrement={handleInputFieldClickIncrement}
                        handleInputFieldClickArrow={handleInputFieldClickArrow}/>
                ))};
                <Timeline>
                    <Arrow isRight={true} width={90}/>
                    <CenteredText>Zeit/Time</CenteredText>
                </Timeline>
            </Field>
            <ToastContainer/>
        </FieldGrid>
    );
};

export default VectorClock;

const CenteredText = styled.div`
    font-weight: bold;
    text-align: center;
`;

const Timeline = styled.div`
    padding-top: 30px;
    width: 100%;
`;

