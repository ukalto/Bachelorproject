import React, {useEffect, useState} from 'react';
import {
    Field,
    FieldGrid,
    FieldGridFirst,
    GridItem,
    Headline,
    InputField,
    marginsInput,
    RangeBox
} from '../../components/GlobalComponents.jsx';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBRow} from "mdb-react-ui-kit";
import RangeSlider from "../../components/RangeSlider";
import LamportsLogicalClocksAlgorithm from "./LamportsLogicalClocksAlgorithm";
import {getScenario} from "../../components/GlobalFunctions.jsx";
import data from "../../assets/data.json";
import {toast, ToastContainer} from "react-toastify";


const LamportsLogicalClocks = () => {
        const [processorAmount, setProcessorAmount] = useState(3);
        const [rowAmount, setRowAmount] = useState(9);
        const [activeEditMode, setActiveEditMode] = useState(true);
        const [processors, setProcessors] = useState(Array.from({length: processorAmount}, () => Array.from({length: rowAmount}, (_, i) => i)));
        const [example] = useState(() => {
            const exampleData = data.data.find(item => item.name === 'LamportsLogicalClocks');
            const {processors, rows, values} = exampleData.details.find(item => item.type === 'example');
            return {processors, rows, values};
        });
        const [clickedInput, setClickedInput] = useState(0);
        const [arrows, setArrows] = useState([[['0+1', 0, 1], ['1+2', 1, 2]], [['1+5', 1, 5], ['2+6', 2, 6]]]);
        const numArrows = arrows.length - 1;

        useEffect(() => {
            setProcessors(prevColumns => {
                return Array.from({length: processorAmount}, (_, i) => {
                    const existingColumn = prevColumns[i];
                    const newNumber = existingColumn?.[1] || 1;
                    return Array.from({length: rowAmount}, (_, j) => (existingColumn && existingColumn[j] !== undefined ? existingColumn[j] : j * newNumber));
                });
            });
        }, [processorAmount, rowAmount]);

        const setExampleData = () => {
            setProcessorAmount(example.processors);
            setRowAmount(example.rows);
            example.values.forEach((value, index) => {
                handleInputChange(index, 1, value);
            });
            setArrows([]);
        };

        const resetFormValues = () => {
            setProcessorAmount(3);
            setRowAmount(9);
            example.values.forEach((value, index) => {
                handleInputChange(index, 1, 1);
            });
            setArrows([]);
        };

        const handleInputChange = (columnIndex, index, newValue) => {
            if (newValue === '') {
                const newColumns = [...processors];
                newColumns[columnIndex][index] = '';
                setProcessors(newColumns);
            } else {
                const parsedValue = parseInt(newValue, 10);

                if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
                    const newColumns = [...processors];
                    newColumns[columnIndex][index] = parsedValue;

                    for (let i = 2; i < newColumns[columnIndex].length; i++) {
                        newColumns[columnIndex][i] = newColumns[columnIndex][1] * i;
                    }
                    setProcessors(newColumns);
                }
            }
        };

        const handleInputFieldClick = async (id, processorIdx, blockIdx) => {
            if (!activeEditMode) {
                if (arrows.some(arrow => arrow[0][0] === id)) {
                    toast.error('You can\'t select a Block twice!', {
                        position: toast.POSITION.BOTTOM_CENTER,
                        closeOnClick: true,
                        autoClose: 4000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else if (arrows.some(arrow => arrow[1] && arrow[1][0] === id)) {
                    toast.error('You can\'t select a Block twice, select another!', {
                        position: toast.POSITION.BOTTOM_CENTER,
                        closeOnClick: true,
                        autoClose: 4000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                } else {
                    if (clickedInput % 2 === 0) {
                        setClickedInput(clickedInput + 1);
                        setArrows([...arrows, [[id, processorIdx, blockIdx], null]]);
                    } else {
                        let lastArrow = arrows[numArrows][0];
                        if (Math.abs(lastArrow[1] - processorIdx) !== 1) {
                            toast.error('You can only select a direct neighbor. Please select again.', {
                                position: toast.POSITION.BOTTOM_CENTER,
                                closeOnClick: true,
                                autoClose: 4000,
                                hideProgressBar: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'colored',
                            });
                        } else if (lastArrow[2] === blockIdx) {
                            toast.error('You can only select a higher or lower field. Please select again.', {
                                position: toast.POSITION.BOTTOM_CENTER,
                                closeOnClick: true,
                                autoClose: 4000,
                                hideProgressBar: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: 'colored',
                            });
                        } else {
                            let updatedArrow = [lastArrow, [id, processorIdx, blockIdx]];
                            if (arrows[numArrows][0][2] > blockIdx) {
                                updatedArrow = [[id, processorIdx, blockIdx], lastArrow];
                            }
                            setClickedInput(clickedInput + 1);
                            setArrows([...arrows.slice(0, numArrows), updatedArrow]);
                        }
                    }
                }
            }
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
                                        <RangeSlider
                                            text={"Processors"}
                                            min={2}
                                            max={5}
                                            value={processorAmount}
                                            onChange={setProcessorAmount}/>
                                    </RangeBox>
                                </MDBCol>
                                <MDBCol md="6">
                                    <RangeBox>
                                        <RangeSlider
                                            text={"Rows"}
                                            min={6}
                                            max={12}
                                            value={rowAmount}
                                            onChange={setRowAmount}/>
                                    </RangeBox>
                                </MDBCol>
                            </MDBRow>
                            <InputButtons
                                resetForm={resetFormValues}
                                setExampleData={setExampleData}
                                activeEditMode={activeEditMode}
                                setActiveEditMode={setActiveEditMode}/>
                        </InputField>
                    </GridItem>
                    <GridItem switchRows>
                        <Scenario scenario={getScenario("LamportsLogicalClocks", "scenario")}/>
                    </GridItem>
                </FieldGridFirst>
                <Field>
                    <Headline>Algorithm</Headline>
                    <LamportsLogicalClocksAlgorithm
                        processors={processors}
                        activeEditMode={activeEditMode}
                        handleInputChange={handleInputChange}
                        arrows={arrows}
                        handleInputFieldClick={handleInputFieldClick}
                    />
                </Field>
                <ToastContainer/>
            </FieldGrid>
        );
    }
;

export default LamportsLogicalClocks;
