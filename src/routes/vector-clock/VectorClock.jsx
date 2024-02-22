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
import {getScenario} from "../../components/GlobalFunctions.jsx";
import data from "../../assets/data.json";
import Arrow from "../../components/Arrow.jsx";
import styled from "styled-components";
import VectorClockAlgorithm from "./VectorClockAlgorithm.jsx";
import {toast, ToastContainer} from "react-toastify";

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

    const handleInputFieldClick = async (id, vectorIndex, timeIndex, cellIdx) => {

    };

    const handleSolveAlgorithm = () => {
        console.log(vectors)
        if (vectors.some(vector => vector.some(timeSteps => timeSteps.includes('')))) {
            toast.error('You must fill out every input field!', {
                position: toast.POSITION.BOTTOM_CENTER,
                closeOnClick: true,
                autoClose: 4000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    }

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
                        handleInputChange={handleInputChange}
                        handleInputFieldClick={handleInputFieldClick}/>
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

