import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField, marginsInput, RangeBox, GridItem, FieldGridFirst
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
    const [startValues, setStartValues] = useState([1, 1, 1]);
    const [columns, setColumns] = useState([[0, 1, 2, 3, 4, 5, 6, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8]]);
    const [example] = useState(() => {
        const exampleData = data.data.find(item => item.name === 'LamportsLogicalClocks');
        const {processors, rows, values} = exampleData.details.find(item => item.type === 'example');
        return {processors, rows, values};
    });

    const resetFormValues = () => {
        setProcessorAmount(3);
        setRowAmount(9);
    };

    const setExampleData = async () => {
        setRowAmount(example.rows);
        setProcessorAmount(example.processors);
        setStartValues(example.values);
        example.values.forEach((value, index) => {
            columns[index][1] = value;
        })
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
                                                 onChange={setProcessorAmount}/>
                                </RangeBox>
                            </MDBCol>
                            <MDBCol md="6">
                                <RangeBox>
                                    <RangeSlider text={"Rows"} min={6} max={12} value={rowAmount}
                                                 onChange={setRowAmount}/>
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
                <LamportsLogicalClocksAlgorithm processorAmount={processorAmount} rowAmount={rowAmount}
                                                startValues={startValues}
                                                activeEditMode={activeEditMode}/>
            </Field>
        </FieldGrid>
    );
};

export default LamportsLogicalClocks;
