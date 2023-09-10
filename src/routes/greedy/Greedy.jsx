import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    getScenario,
    Headline,
    InputField, marginsInput
} from '../../components/MainComponentsCSS';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBInput, MDBRow} from "mdb-react-ui-kit";

const Greedy = () => {
    const [formValue, setFormValue] = useState({
        rows_amount: '',
        columns_amount: '',
    });

    const onChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };

    return (
        <FieldGrid>
            <InputField>
                <Headline>Inputs</Headline>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol md="6">
                        <MDBInput
                            value={formValue.rows_amount}
                            name='rows_amount'
                            onChange={onChange}
                            id='validationCustom04'
                            required
                            label='Amount of Rows'
                        />
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            value={formValue.columns_amount}
                            name='columns_amount'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Amount of Columns'
                        />
                    </MDBCol>
                </MDBRow>
                <InputButtons/>
            </InputField>
            <Scenario scenario={getScenario("Greedy", "scenario")}/>
            <Field>
                <Headline>Algorithm</Headline>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
            </Field>
        </FieldGrid>
    );
};

export default Greedy;
