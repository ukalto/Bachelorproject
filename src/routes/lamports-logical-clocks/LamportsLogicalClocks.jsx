import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    getScenario,
    Headline,
    InputField
} from '../../components/MainComponents';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBInput, MDBRow} from "mdb-react-ui-kit";

const LamportsLogicalClocks = () => {
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
                <MDBRow tag="form" className='g-3'>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.key}
                            name='key'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Key'
                        />
                    </MDBCol>
                    <MDBCol/>
                    <MDBCol md="4">
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
                <MDBRow>
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
                </MDBRow>
                {/*<MDBInput label='Key' id='form1' type='number'/>*/}
                {/*<MDBInput label='Bit Identifier' id='form1' type='number'/>*/}
                {/*<MDBInput label='Nodes Amount' id='form1' type='number'/>*/}
                {/*<MDBInput label='Start Node' id='form1' type='number'/>*/}
                <InputButtons/>
            </InputField>
            <Scenario scenario={getScenario("LamportsLogicalClocks", "scenario")}/>
            <Field>
                <Headline>Algorithm</Headline>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
            </Field>
        </FieldGrid>
    );
};

export default LamportsLogicalClocks;
