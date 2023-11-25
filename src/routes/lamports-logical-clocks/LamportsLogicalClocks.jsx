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


const LamportsLogicalClocks = () => {
    const [processorAmount, setProcessorAmount] = useState(3);
    const [rowAmount, setRowAmount] = useState(9);
    const [activeEditMode, setActiveEditMode] = useState(true);
    // const [messages, setMessages] = useState({'': ''});
    // const [processorSelection, setProcessorSelection] = useState('');
    // const [processorSequence, setProcessorSequence] = useState({'': ''});

    const resetFormValues = () => {
        setProcessorAmount(3);
        setRowAmount(9);
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
                        <InputButtons resetForm={resetFormValues} activeEditMode={activeEditMode}
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
                                                activeEditMode={activeEditMode}/>
            </Field>
        </FieldGrid>
    );
};

export default LamportsLogicalClocks;
