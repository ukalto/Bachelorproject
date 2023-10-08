import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField, marginsInput, InfoBox, RangeBox
} from '../../components/MainComponentsCSS';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBRow} from "mdb-react-ui-kit";
import {getScenario} from "../../components/Helper.jsx";
import RangeSlider from "../../components/RangeSlider.jsx";

const Greedy = () => {
    const [rowsAmount, setRowsAmount] = useState(3);
    const [columnsAmount, setColumnsAmount] = useState(3);

    const resetFormValues = () => {
        setRowsAmount(3);
        setColumnsAmount(3);
    };

    return (
        <FieldGrid>
            <InputField>
                <Headline>Inputs</Headline>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol md="6">
                        <RangeBox>
                            <RangeSlider text={"Rows"} min={2} max={7} value={rowsAmount}
                                         onChange={setRowsAmount}/>
                        </RangeBox>
                    </MDBCol>
                    <MDBCol md="6">
                        <RangeBox>
                            <RangeSlider text={"Columns"} min={2} max={7} value={columnsAmount}
                                         onChange={setColumnsAmount}/>
                        </RangeBox>
                    </MDBCol>
                </MDBRow>
                <InputButtons resetForm={resetFormValues}/>
            </InputField>
            <Scenario scenario={getScenario("Greedy", "scenario")}/>
            <Field>
                <Headline>Algorithm</Headline>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
                <InfoBox>Not Available</InfoBox>
            </Field>
        </FieldGrid>
    );
};

export default Greedy;
