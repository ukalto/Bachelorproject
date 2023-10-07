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

const Berkeley = () => {
    const [formValue, setFormValue] = useState({
        server_amount: '',
        time_deamon: '',
        servers_time: {'': ''},
    });

    const onChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    };

    return (
        <FieldGrid>
            <InputField>
                <Headline>Inputs</Headline>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol>
                        <MDBInput
                            value={formValue.server_amount}
                            name='server_amount'
                            onChange={onChange}
                            id='validationCustom01'
                            required
                            label='Server Amount'
                        />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput
                            value={formValue.time_deamon}
                            name='time_deamon'
                            onChange={onChange}
                            id='validationCustom02'
                            required
                            label='Time Daemon'
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow tag="form" className='g-3' style={marginsInput}>
                    <MDBCol>
                        <MDBInput
                            value={formValue.servers_time[""]}
                            name='servers_time'
                            onChange={onChange}
                            id='validationCustom03'
                            required
                            label='Sever Time'
                        />
                    </MDBCol>
                </MDBRow>
                <InputButtons/>
            </InputField>
            <Scenario scenario={getScenario("Berkeley", "scenario")}/>
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

export default Berkeley;
