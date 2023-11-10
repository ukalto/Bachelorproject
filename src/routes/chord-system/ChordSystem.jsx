import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline, InputField, marginsInput, InfoBox, GridItem, RangeBox,
} from '../../components/GlobalComponents.jsx';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {
    MDBInput,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import {getScenario} from "../../components/GlobalFunctions.jsx";
import styled from "styled-components";
import RangeSlider from "../../components/RangeSlider.jsx";


const ChordSystem = () => {
    const initialFormValues = {
        key: '',
        bit_identifier: '',
        nodes_amount: 25,
        start_node: '',
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
                            <RangeBox>
                                <RangeSlider
                                    text={'Nodes'}
                                    min={12}
                                    max={30}
                                    value={formValue.nodes_amount}
                                    onChange={onChange}
                                />
                            </RangeBox>
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
                <NodeWrapper serverAmount={formValue.nodes_amount}>
                    {Array.from({length: formValue.nodes_amount}).map((_, index) => (
                        <Nodes
                            key={index}
                            value={index + 1}
                            disabled
                            index={index}
                            nodesAmount={formValue.nodes_amount}
                        />
                    ))}
                </NodeWrapper>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
                <InfoBox>Coming Soon</InfoBox>
            </Field>
        </FieldGrid>
    );
};

export default ChordSystem;

const NodeWrapper = styled.div`
  position: relative;
  height: ${props => 120 + 10 * props.serverAmount}px;
  margin: 0 auto;
`;

const Nodes = styled.input`
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(---tertiary);
  text-align: center;
  top: 50%;
  left: 50%;
  margin: -15px 0 0 -15px;
  transform: ${props => {
    const radius = 150;
    const angle = (2 * Math.PI * props.index) / props.nodesAmount;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return `translate(${x}px, ${y}px)`;
  }};
`;


