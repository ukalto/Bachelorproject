import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField,
    marginsInput,
    InfoBox, StyledStickManAndArrowContainer, StickManContainer, ArrowContainer, GridItem,
} from '../../components/GlobalComponents.jsx';
import {Scenario} from '../../components/Scenario';
import InputButtons from '../../components/InputButtons';
import {MDBCol, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import StickMan from '../../components/StickMan';
import Arrow from '../../components/Arrow.jsx';
import {getScenario} from "../../components/Helper.jsx";

const DiffieHellman = () => {
    const initialFormValues = {
        modulo: '',
        base_value: '',
        person_a: '',
        person_b: '',
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
                    <MDBRow tag="form" className="g-3" style={marginsInput}>
                        <MDBCol md="6">
                            <MDBInput
                                value={formValue.person_a}
                                name="person_a"
                                onChange={onChange}
                                required
                                label="Person A"
                                type={"number"}
                            />
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBInput
                                value={formValue.person_b}
                                name="person_b"
                                onChange={onChange}
                                required
                                label="Person B"
                                type={"number"}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow tag="form" className="g-3" style={marginsInput}>
                        <MDBCol md="6">
                            <MDBInput
                                value={formValue.base_value}
                                name="base_value"
                                onChange={onChange}
                                required
                                label="Base Value"
                                type={"number"}
                            />
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBInput
                                value={formValue.modulo}
                                name="modulo"
                                onChange={onChange}
                                required
                                label="Modulo"
                                type={"number"}
                            />
                        </MDBCol>
                    </MDBRow>
                    <InputButtons resetForm={resetFormValues}/>
                </InputField>
            </GridItem>
            <GridItem switchRows>
                <Scenario scenario={getScenario('DiffieHellman', 'scenario')}/>
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

export default DiffieHellman;

