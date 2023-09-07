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

const LamportsLogicalClocks = () => {
    const [formValue, setFormValue] = useState({
        processor_amount: '',
        row_amount: '',
        messages: {'': ''},
        processor_selection: '',
        processor_sequence: {'': ''},
    });

    const onChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };

    return (
        <FieldGrid>
            <InputField>
                <Headline>Inputs</Headline>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol md="3">
                        <MDBInput
                            value={formValue.processor_amount}
                            name='processor_amount'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Processors Amount'
                        />
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.processor_selection}
                            name='processor_selection'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Select Processor'
                        />
                    </MDBCol>
                    <MDBCol md="5">
                        <MDBInput
                            value={formValue.messages[""]}
                            name='messages'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Current Message'
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol md="3">
                        <MDBInput
                            value={formValue.row_amount}
                            name='row_amount'
                            onChange={onChange}
                            id='validationCustom02'
                            required
                            label='Rows Amount'
                        />
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBInput
                            value={formValue.processor_sequence[""]}
                            name='processor_sequence'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Processors n Sequence'
                        />
                    </MDBCol>
                    <MDBCol md="5">
                        <MDBInput
                            value={formValue.messages[""]}
                            name='messages'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Message List'
                        />
                    </MDBCol>
                </MDBRow>
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
