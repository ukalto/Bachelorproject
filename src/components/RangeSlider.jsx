import React from 'react';
import {MDBRange} from "mdb-react-ui-kit";
import styled from "styled-components";

const RangeSlider = ({text, value, min, max, onChange}) => {
    const handleSliderChange = (e) => {
        onChange(parseInt(e.target.value));
    };

    return (
        <RangeContainer>
            <Label>{text}: {value.toString()}</Label>
            <StyledRange
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleSliderChange}
                className="align-content-center"
            />
        </RangeContainer>
    );
};

export default RangeSlider;

const RangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  width: 100%;
  margin: 0 10px;
`;

const Label = styled.span`
  width: 100%;
`;

const StyledRange = styled(MDBRange)`
  height: 100%;
  width: 100%;
`;
