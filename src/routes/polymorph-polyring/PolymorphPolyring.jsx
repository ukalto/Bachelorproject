import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField, marginsInput, GridItem, FieldGridFirst, RangeBox,
} from '../../components/GlobalComponents.jsx';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBRow} from "mdb-react-ui-kit";
import {getScenario} from "../../components/GlobalFunctions.jsx";
import RangeSlider from "../../components/RangeSlider.jsx";


const PolymorphPolyring = () => {
    const [nodeDepth, setNodeDepth] = useState(4);
    const [nodeArr, setNodeArr] = useState([]);
    const [startNode, setStartNode] = useState(null);
    const [finalNode, setFinalNode] = useState(null);

    const handleClickStartNode = (node) => {
        if (node === startNode) {
            node = null;
        }
        setStartNode(node);
    };

    const handleSelectFinalNode = (node) => {
        setFinalNode(node);
    };

    const setExampleData = () => {

    };

    const resetFormValues = () => {

    };

    const handleSolveAlgorithm = async () => {

    };

    return (
        <FieldGrid>
            <FieldGridFirst>
                <GridItem>
                    <InputField>
                        <Headline>Inputs</Headline>
                        <MDBRow tag="form" className='g-3' style={marginsInput}>
                            <MDBCol md="8">
                                <RangeBox>
                                    <RangeSlider text={"Tree Depth"} min={3} max={5} value={nodeDepth}
                                                 onChange={setNodeDepth}/>
                                </RangeBox>
                            </MDBCol>
                            <MDBCol md="4">

                            </MDBCol>
                        </MDBRow>
                        <InputButtons
                            resetForm={resetFormValues}
                            setExampleData={setExampleData}
                            solveAlgorithm={handleSolveAlgorithm}/>
                    </InputField>
                </GridItem>
                <GridItem switchRows>
                    <Scenario scenario={getScenario("PolymorphPolyring", "scenario")}/>
                </GridItem>
            </FieldGridFirst>
            <Field>
                <Headline>Algorithm</Headline>

            </Field>
        </FieldGrid>
    );
};


export default PolymorphPolyring;
