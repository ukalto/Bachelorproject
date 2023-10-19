import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField, marginsInput, InfoBox, StyledStickManAndArrowContainer, StickManContainer, ArrowContainer, GridItem
} from '../../components/GlobalComponents.jsx';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBInput, MDBRow} from "mdb-react-ui-kit";
import StickMan from "../../components/StickMan";
import Arrow from "../../components/Arrow.jsx";
import {getScenario} from "../../components/Helper.jsx";

const CryptoSystem = () => {
    const initialFormValues = {
        public_key_a: '',
        private_key_a: '',
        modules_a: '',
        public_key_b: '',
        private_key_b: '',
        modules_b: '',
        message: '',
        hash_function: '',
    };

    const [formValue, setFormValue] = useState(initialFormValues);

    const onChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };

    const resetFormValues = () => {
        setFormValue(initialFormValues);
    };

    return (
        <FieldGrid>
            <GridItem>
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
                                type={"number"}
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput
                                value={formValue.private_key_a}
                                name='private_key_a'
                                onChange={onChange}
                                id='validationCustom04'
                                required
                                label='Private Key A'
                                type={"number"}
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBInput
                                value={formValue.modules_a}
                                name='modules_a'
                                onChange={onChange}
                                id='validationCustom04'
                                required
                                label='Modules A'
                                type={"number"}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow tag="form" className='g-3' style={marginsInput}>
                        <MDBCol md="4">
                            <MDBInput
                                value={formValue.public_key_b}
                                name='public_key_b'
                                onChange={onChange}
                                id='validationCustom01'
                                required
                                label='Public Key B'
                                type={"number"}
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
                                type={"number"}
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
                                type={"number"}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow tag="form" className='g-3' style={marginsInput}>
                        <MDBCol md="6">
                            <MDBInput
                                value={formValue.message}
                                name='message'
                                onChange={onChange}
                                id='validationCustom01'
                                required
                                label='Message'
                                type={"number"}
                            />
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBInput
                                value={formValue.hash_function}
                                name='hash_function'
                                onChange={onChange}
                                id='validationCustom01'
                                required
                                label='Hash Function'
                                type={"number"}
                            />
                        </MDBCol>
                    </MDBRow>
                    <InputButtons resetForm={resetFormValues}/>
                </InputField>
            </GridItem>
            <GridItem switchRows>
                <Scenario scenario={getScenario("CryptoSystem", "scenario")}/>
            </GridItem>
            <Field>
                <Headline>Algorithm</Headline>
                <StyledStickManAndArrowContainer>
                    <StickManContainer>
                        <StickMan character={'A'}/>
                    </StickManContainer>
                    <ArrowContainer>
                        <Arrow isRight={true} width={100}/>
                        <div style={{margin: '40px 0'}}/>
                        <Arrow isRight={false} width={100}/>
                    </ArrowContainer>
                    <StickManContainer>
                        <StickMan character={'B'}/>
                    </StickManContainer>
                </StyledStickManAndArrowContainer>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
                <InfoBox>Coming Soon</InfoBox>
            </Field>
        </FieldGrid>
    );
};

export default CryptoSystem;
