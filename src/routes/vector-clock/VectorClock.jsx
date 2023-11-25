import React, {useState} from 'react';
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
import VectorClockAlgorithm from "./VectorClockAlgorithm";
import {getScenario} from "../../components/GlobalFunctions.jsx";

const VectorClock = () => {
    const [vectorsAmount, setVectorsAmount] = useState(3);
    const [timeSteps, setTimeSteps] = useState(4);
    const [activeEditMode, setActiveEditMode] = useState(true);
    // const [messages, setMessages] = useState({'': ''});
    // const [vectorSelection, setVectorSelection] = useState('');
    // const [vectorStartValues, setVectorStartValues] = useState({'': [0, 0, 0]});

    const resetFormValues = () => {
        setVectorsAmount(3);
        setTimeSteps(4);
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
                        <InputButtons resetForm={resetFormValues} activeEditMode={activeEditMode}
                                      setActiveEditMode={setActiveEditMode}/>
                    </InputField>
                </GridItem>
                <GridItem switchRows>
                    <Scenario scenario={getScenario("VectorClock", "scenario")}/>
                </GridItem>
            </FieldGridFirst>
            <Field>
                <Headline>Algorithm</Headline>
                <VectorClockAlgorithm timeSteps={timeSteps} vectorsAmount={vectorsAmount}
                                      activeEditMode={activeEditMode}/>
            </Field>
        </FieldGrid>
    );
};

export default VectorClock;

