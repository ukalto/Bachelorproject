import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField, marginsInput, InfoBox, RangeBox, GridItem
} from '../../components/GlobalComponents.jsx';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBRow} from "mdb-react-ui-kit";
import {getScenario} from "../../components/GlobalFunctions.jsx";
import RangeSlider from "../../components/RangeSlider.jsx";
import styled from "styled-components";

const Berkeley = () => {
    const [serverAmount, setServerAmount] = useState(4); // Change the serverAmount value as needed

    const resetFormValues = () => {
        setServerAmount(4); // Reset the serverAmount as needed
    };

    return (
        <FieldGrid>
            <GridItem>
                <InputField>
                    <Headline>Inputs</Headline>
                    <MDBRow tag="form" className='g-3' style={marginsInput}>
                        <RangeBox>
                            <RangeSlider text={"Servers"} min={2} max={5} value={serverAmount}
                                         onChange={setServerAmount}/>
                        </RangeBox>
                    </MDBRow>
                    <InputButtons resetForm={resetFormValues}/>
                </InputField>
            </GridItem>
            <GridItem switchRows>
                <Scenario scenario={getScenario("Berkeley", "scenario")}/>
            </GridItem>
            <StyledField>
                <Headline>Algorithm</Headline>
                    <TimeInputsWrapper serverAmount={serverAmount}>
                        {Array.from({length: serverAmount}).map((_, index) => (
                            <TimeInput key={index} type="time" required/>
                        ))}
                    </TimeInputsWrapper>
            </StyledField>
            <Field>
                <Headline>Benchmarks</Headline>
                <InfoBox>Coming Soon</InfoBox>
            </Field>
        </FieldGrid>
    );
};

export default Berkeley;


const StyledField = styled(Field)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  > * {
    position: absolute;
    width: 80px;
    font-size: 16px;
  }

  ${(props) => {
    const angles = [];
    for (let i = 0; i < props.serverAmount; i++) {
      const angle = (2 * Math.PI * i) / props.serverAmount;
      angles.push(angle);
    }

    return angles.map((angle, index) => {
      const top = `${Math.sin(angle) * 100}px`; // Adjust the radius as needed
      const left = `${Math.cos(angle) * 150}px`; // Adjust the radius as needed

      return `
        > :nth-child(${index + 1}) {
          top: ${top};
          left: ${left};
        }
      `;
    });
  }}
`;

const TimeInput = styled.input`
  position: absolute;
`;

