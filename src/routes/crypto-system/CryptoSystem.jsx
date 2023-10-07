import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    getScenario,
    Headline,
    InputField, marginsInput, InfoBox
} from '../../components/MainComponentsCSS';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBInput, MDBRow} from "mdb-react-ui-kit";
import StickMan from "../../components/StickMan";

const CryptoSystem = () => {
    const [formValue, setFormValue] = useState({
        public_key_a: '',
        private_key_a: '',
        modules_a: '',
        public_key_b: '',
        private_key_b: '',
        modules_b: '',
        message: '',
        hash_function: '',
    });

    const onChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };

    return (
        <FieldGrid>
            <InputField>
                <Headline>Inputs</Headline>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.public_key_a}
                            name='public_key_a'
                            onChange={onChange}
                            id='validationCustom04'
                            required
                            label='Public Key A'
                        />
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.public_key_b}
                            name='public_key_b'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Public Key B'
                        />
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.message}
                            name='message'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Message'
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.private_key_a}
                            name='private_key_a'
                            onChange={onChange}
                            id='validationCustom04'
                            required
                            label='Private Key A'
                        />
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.private_key_b}
                            name='private_key_b'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Private Key B'
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.modules_a}
                            name='modules_a'
                            onChange={onChange}
                            id='validationCustom04'
                            required
                            label='Modules A'
                        />
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.modules_b}
                            name='modules_b'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Modules B'
                        />
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.hash_function}
                            name='hash_function'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Hash Function'
                        />
                    </MDBCol>
                </MDBRow>
                <InputButtons/>
            </InputField>
            <Scenario scenario={getScenario("CryptoSystem", "scenario")}/>
            <Field>
                <Headline>Algorithm</Headline>
                <StickMan character={'A'}/>
                <StickMan character={'B'}/>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
                <InfoBox>Coming Soon</InfoBox>
            </Field>
        </FieldGrid>
    );
};

export default CryptoSystem;
