import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    getScenario,
    Headline,
    InputField, marginsInput
} from '../../components/MainComponents';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBInput, MDBRow} from "mdb-react-ui-kit";

const DiffieHellman = () => {
    const [formValue, setFormValue] = useState({
        modulo: '',
        base_value: '',
        person_a: '',
        person_b: '',
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
                            value={formValue.modulo}
                            name='modulo'
                            onChange={onChange}
                            id='validationCustom04'
                            required
                            label='Modulo'
                        />
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            value={formValue.person_a}
                            name='person_a'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Person A'
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol md="6">
                        <MDBInput
                            value={formValue.base_value}
                            name='base_value'
                            onChange={onChange}
                            id='validationCustom02'
                            required
                            label='Base Value'
                        />
                    </MDBCol>

                    <MDBCol md="6">
                        <MDBInput
                            value={formValue.person_b}
                            name='person_b'
                            onChange={onChange}
                            id='validationCustom03'
                            required
                            label='Person B'
                        />
                    </MDBCol>
                </MDBRow>
                <InputButtons/>
            </InputField>
            <Scenario scenario={getScenario("DiffieHellman", "scenario")}/>
            <Field>
                <Headline>Algorithm</Headline>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
            </Field>
        </FieldGrid>
    );
};

export default DiffieHellman;
