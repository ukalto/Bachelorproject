import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline, InputField, marginsInput, InfoBox, GridItem,
} from '../../components/MainComponentsCSS';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {
    MDBInput,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import {getScenario} from "../../components/Helper.jsx";


const ChordSystem = () => {
    const initialFormValues = {
        key: '',
        bitidentifier: '',
        nodesamount: '',
        startnode: '',
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
                        <MDBCol md="6">
                            <MDBInput
                                value={formValue.startnode}
                                name='startnode'
                                onChange={onChange}
                                required
                                label='Start Node'
                                type={"number"}
                            />
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBInput
                                value={formValue.bitidentifier}
                                name='bitidentifier'
                                onChange={onChange}
                                required
                                label='Bit Identifier'
                                type={"number"}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow tag="form" className='g-3' style={marginsInput}>
                        <MDBCol md="6">
                            <MDBInput
                                value={formValue.key}
                                name='key'
                                onChange={onChange}
                                required
                                label='Key'
                                type={"number"}
                            />
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBInput
                                value={formValue.nodesamount}
                                name='nodesamount'
                                onChange={onChange}
                                required
                                label='Amount of Nodes'
                                type={"number"}
                            />
                        </MDBCol>
                    </MDBRow>
                    <InputButtons resetForm={resetFormValues}/>
                </InputField>
            </GridItem>
            <GridItem switchRows>
                <Scenario scenario={getScenario("ChordSystem", "scenario")}/>
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

export default ChordSystem;
