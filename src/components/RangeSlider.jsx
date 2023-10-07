import React from 'react';
import {MDBRow, MDBContainer} from 'mdbreact';
import {MDBCol, MDBRange} from "mdb-react-ui-kit";

const RangeSlider = ({text, value, min, max, onChange}) => {
    const handleSliderChange = (e) => {
        onChange(parseFloat(e.target.value));
    };

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol sm={5}>
                    {text}: {value.toString()}
                </MDBCol>
                <MDBCol>
                    <MDBRange
                        type="range"
                        min={min}
                        max={max}
                        value={value}
                        onChange={handleSliderChange}
                    />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default RangeSlider;
