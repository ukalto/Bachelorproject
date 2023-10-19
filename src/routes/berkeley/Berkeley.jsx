import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField, marginsInput, InfoBox, RangeBox, GridItem
} from '../../components/MainComponentsCSS';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBRow} from "mdb-react-ui-kit";
import {getScenario} from "../../components/Helper.jsx";
import RangeSlider from "../../components/RangeSlider.jsx";


const Berkeley = () => {
    const [serverAmount, setServerAmount] = useState(3);

    const resetFormValues = () => {
        setServerAmount(3);
    };

    return (
        <FieldGrid>
            <GridItem>
                <InputField>
                    <Headline>Inputs</Headline>
                    <MDBRow tag="form" className='g-3' style={marginsInput}>
                        <RangeBox>
                            <RangeSlider text={"Servers"} min={2} max={5} value={serverAmount}
                                         onChange={setServerAmount}/>
                        </RangeBox>
                    </MDBRow>
                    <InputButtons resetForm={resetFormValues}/>
                </InputField>
            </GridItem>
            <GridItem switchRows>
                <Scenario scenario={getScenario("Berkeley", "scenario")}/>
            </GridItem>
            <Field>
                <Headline>Algorithm</Headline>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
                <InfoBox>Coming Soon</InfoBox>
            </Field>
        </FieldGrid>
    );
};

export default Berkeley;
