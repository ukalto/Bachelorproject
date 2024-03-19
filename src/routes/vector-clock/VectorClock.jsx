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
import {VectorClockSolver} from "./VectorClockSolver.js";
import InfoFieldModal from "../../components/InfoField.jsx";

const VectorClock = () => {
    const [vectorsAmount, setVectorsAmount] = useState(3);
    const [timeSteps, setTimeSteps] = useState(4);
    const [vectors, setVectors] = useState(Array.from({length: vectorsAmount}, () => Array.from({length: timeSteps}, () => Array(vectorsAmount).fill(0))));
    const [example] = useState(() => {
        const exampleData = data.data.find(item => item.name === 'VectorClock');
        const {
            arrows,
            increments,
            vectorsAmount,
            timeSteps
        } = exampleData.details.find(item => item.type === 'example');
        return {
            arrows, increments, vectorsAmount, timeSteps
        };
    });
    const [arrows, setArrows] = useState([]);
    const [arrowInCreation, setArrowInCreation] = useState([]);
    const [increments, setIncrements] = useState(new Map());
    // lastInputClicked
    // [null, 0] intialstand
    // [id, 1] increment
    // [id, 2] arrow setzen
    const [lastInputClicked, setLastInputClicked] = useState([null, 0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setVectors(Array.from({length: vectorsAmount}, () => Array.from({length: timeSteps}, () => Array(vectorsAmount).fill(0))));
        setArrows(example.arrows);
        setIncrements(new Map(Object.entries(example.increments)));
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
            }
        } else {
            const updatedVectors = [...vectors];
            updatedVectors[vectorIndex][0][cellIndex] = '';
            setVectors(updatedVectors);
        }
    };

    const handleInputFieldClick = (id, vectorIndex, timeIndex) => {
        if ((lastInputClicked[0] === id && lastInputClicked[1] === 1) || increments.has(id)) {
            // Arrow start create click
            setLastInputClicked([id, 2]);

            const updatedIncrements = new Map([...increments]);
            updatedIncrements.delete(id);
            setIncrements(sortIncrementsMap(updatedIncrements));

            setArrowInCreation([id, vectorIndex, timeIndex])
        } else if (lastInputClicked[0] === null || (lastInputClicked[0] !== id && lastInputClicked[1] !== 2)) {
            // Increment first click
            if (!arrows.some(arrow => !arrow.includes(null) && arrow.some(points => points[1] === vectorIndex && points[2] === timeIndex))) {
                setLastInputClicked([id, 1]);
                setIncrements(prevIncrements => {
                    const newIncrements = new Map([...prevIncrements, [id, [vectorIndex, timeIndex]]]);
                    return sortIncrementsMap(newIncrements);
                });
            } else {
                createToastError('You must first delete the corresponding arrow to create an increment at this vector!');
            }
        } else if (lastInputClicked[0] === id && lastInputClicked[1] === 2) {
            // Arrow in creation gets deleted and everything is back at the start
            setLastInputClicked([null, 0]);
            setArrowInCreation([]);
        } else if (lastInputClicked[0] !== id && lastInputClicked[1] === 2) {
            // Arrow will be created if possible
            if (arrowInCreation[2] !== timeIndex) {
                createToastError('You can\'t create an arrow between two fields in different time indexes!');
            } else if (arrowInCreation[1] === vectorIndex) {
                createToastError('You can\'t create an arrow in the same vector!');
            } else if (increments.has(id)) {
                createToastError('You can\'t create an arrow where a increment is, first you have to delete the increment!');
            } else if (arrows.length > 0 && arrows.some(arrow => arrow.some(points => points[0] === id))) {
                createToastError('You can\'t create an arrow where an arrow is already placed, first you have to delete the other arrow!');
            } else {
                const updatedArrows = [...arrows];
                updatedArrows.push([arrowInCreation, [id, vectorIndex, timeIndex]])
                setArrows(sortArrowsArray(updatedArrows));
                setLastInputClicked([null, 0]);
            }
        }
    }

    const handleSolveAlgorithm = () => {
        if (vectors.some(vector => vector.some(timeSteps => timeSteps.includes('')))) {
            createToastError('You must fill out every input field!');
        } else {
            const copiedVectors = Array.from({length: vectorsAmount}, () => Array.from({length: timeSteps}, () => Array(vectorsAmount).fill(0)));
            const solver = new VectorClockSolver(copiedVectors, arrows, increments, timeSteps);
            const solveResult = solver.solve();
            setVectors([...solveResult]);
        }
    }

    const sortIncrementsMap = (map) => {
        const sortedEntries = [...map.entries()].sort((a, b) => {
            if (a === null || b === null) {
                return true;
            }
            const [via, tia, cia] = a[1];
            const [vib, tib, cib] = b[1];

            if (tia !== tib) return tia - tib;
            if (via !== vib) return via - vib;
            return cia - cib;
        });

        return new Map(sortedEntries);
    };

    const sortArrowsArray = (arrows) => {
        return [...arrows].sort((a, b) => {

            const [, vectorIndexA, timeIndexA, cellIndexA] = a[0];
            const [, vectorIndexB, timeIndexB, cellIndexB] = b[0];

            if (timeIndexA !== timeIndexB) return timeIndexA - timeIndexB;

            if (vectorIndexA !== vectorIndexB) return vectorIndexA - vectorIndexB;

            return cellIndexA - cellIndexB;
        });
    };

    const deleteXArrow = (firstId, secondId) => {
        const updatedArrows = arrows.filter(arrowGroup => {
            return !(
                arrowGroup &&
                arrowGroup[0] &&
                arrowGroup[0][0] === firstId &&
                arrowGroup[1] &&
                arrowGroup[1][0] === secondId
            );
        });
        setArrows(updatedArrows);
    };

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

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
                <Headline>
                    Algorithm
                    <InfoIcon className="fas fa-info-circle" onClick={openModal}/>
                </Headline>
                {vectors.map((vectorRow, vectorIndex) => (
                    <VectorClockAlgorithm
                        key={vectorIndex}
                        timeSteps={timeSteps}
                        vectorsAmount={vectorsAmount}
                        vectorRow={vectorRow}
                        vectorIndex={vectorIndex}
                        increments={increments}
                        arrows={arrows}
                        handleInputChange={handleInputChange}
                        handleInputFieldClick={handleInputFieldClick}
                        deleteXArrow={deleteXArrow}
                    />
                ))};
                <Timeline>
                    <Arrow isRight={true} width={90}/>
                    <CenteredText>Zeit/Time</CenteredText>
                </Timeline>
            </Field>
            {isModalOpen && (
                <InfoFieldModal
                    modalTitle={"How to use?"}
                    infos={[
                        ["1 Click", ": Create an Increment"],
                        ["2 Click", ": Create an Arrow"],
                        ["3 Click", ": Stop Creating an Arrow (Initial state)"]
                    ]}
                    closeModal={closeModal}
                ></InfoFieldModal>
            )}
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

const InfoIcon = styled.i`
    cursor: pointer;
    align-self: flex-start;
`;
