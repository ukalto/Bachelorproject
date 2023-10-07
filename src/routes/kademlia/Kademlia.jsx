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

const Kademlia = () => {
    const [formValue, setFormValue] = useState({
        key: '',
        bitidentifier: '',
        nodesamount: '16',
        startnode: '',
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
                            value={formValue.startnode}
                            name='startnode'
                            onChange={onChange}
                            id='validationCustom04'
                            required
                            label='Start Node'
                        />
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            value={formValue.bitidentifier}
                            name='bitidentifier'
                            onChange={onChange}
                            id='validationCustom02'
                            required
                            label='Bit Identifier'
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol md="6">
                        <MDBInput
                            value={formValue.key}
                            name='key'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Key'
                        />
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            value={formValue.nodesamount}
                            name='nodesamount'
                            onChange={onChange}
                            id='validationCustom03'
                            required
                            label='Amount of Nodes'
                        />
                    </MDBCol>
                </MDBRow>
                <InputButtons/>
            </InputField>
            <Scenario scenario={getScenario("Kademlia", "scenario")}/>
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

export default Kademlia;

