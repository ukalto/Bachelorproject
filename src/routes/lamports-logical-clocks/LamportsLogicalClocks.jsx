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


const LamportsLogicalClocks = () => {
    const [processorAmount, setProcessorAmount] = useState(3);
    const [rowAmount, setRowAmount] = useState(9);
    const [activeEditMode, setActiveEditMode] = useState(true);
    const [columns, setColumns] = useState(Array.from({length: 3}, () => Array.from({length: 9}, (_, i) => i)));
    const [example] = useState(() => {
        const exampleData = data.data.find(item => item.name === 'LamportsLogicalClocks');
        const {processors, rows, values} = exampleData.details.find(item => item.type === 'example');
        return {processors, rows, values};
    });

    useEffect(() => {
        setColumns(prevColumns => {
            return Array.from({length: processorAmount}, (_, i) => {
                const existingColumn = prevColumns[i];
                return Array.from({length: rowAmount}, (_, j) => (existingColumn && existingColumn[j] !== undefined ? existingColumn[j] : j));
            });
        });
    }, [processorAmount, rowAmount]);

    const setRowAmountAndAdjustColumns = (newRowAmount) => {
        setRowAmount(newRowAmount);
    };

    const setProcessorAmountAndAdjustColumns = (newProcessorAmount) => {
        setProcessorAmount(newProcessorAmount);
    };

    const setExampleData = () => {
        setProcessorAmountAndAdjustColumns(example.processors);
        setRowAmountAndAdjustColumns(example.rows);
        example.values.forEach((value, index) => {
            handleInputChange(index, 1, value);
        });
    };

    const resetFormValues = () => {
        setProcessorAmountAndAdjustColumns(3);
        setRowAmountAndAdjustColumns(9);
        example.values.forEach((value, index) => {
            handleInputChange(index, 1, 1);
        });
    };

    const handleInputChange = (columnIndex, index, newValue) => {
        if (newValue === '') {
            const newColumns = [...columns];
            newColumns[columnIndex][index] = '';
            setColumns(newColumns);
        } else {
            const parsedValue = parseInt(newValue, 10);

            if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
                const newColumns = [...columns];
                newColumns[columnIndex][index] = parsedValue;

                for (let i = 2; i < newColumns[columnIndex].length; i++) {
                    newColumns[columnIndex][i] = newColumns[columnIndex][1] * i;
                }
                setColumns(newColumns);
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
                                    <RangeSlider text={"Processors"} min={2} max={5} value={processorAmount}
                                                 onChange={setProcessorAmountAndAdjustColumns}/>
                                </RangeBox>
                            </MDBCol>
                            <MDBCol md="6">
                                <RangeBox>
                                    <RangeSlider text={"Rows"} min={6} max={12} value={rowAmount}
                                                 onChange={setRowAmountAndAdjustColumns}/>
                                </RangeBox>
                            </MDBCol>
                        </MDBRow>
                        <InputButtons resetForm={resetFormValues} setExampleData={setExampleData}
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
                    processorAmount={processorAmount}
                    rowAmount={rowAmount}
                    columns={columns}
                    activeEditMode={activeEditMode}
                    handleInputChange={handleInputChange}
                />
            </Field>
        </FieldGrid>
    );
};

export default LamportsLogicalClocks;
