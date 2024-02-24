import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField,
    marginsInput,
    StyledStickManAndArrowContainer,
    StickManContainer,
    GridItem,
    ResultBox,
    ResultHeadline,
    ResultText,
    FieldGridFirst,
} from '../../components/GlobalComponents.jsx';
import {Scenario} from '../../components/Scenario';
import InputButtons from '../../components/InputButtons';
import {MDBCol, MDBInput, MDBRow, MDBValidation} from 'mdb-react-ui-kit';
import StickMan from '../../components/StickMan';
import {createToastError, getScenario} from "../../components/GlobalFunctions.jsx";
import data from "../../assets/data.json";
import {ToastContainer} from "react-toastify";
import {DiffieHellmanSolver} from "./DiffieHellmanSolver.js";
import {TransferAnimation} from "../../components/TransferAnimation.jsx";

const DiffieHellman = () => {
    const initialFormValues = {
        modulo: '',
        base_value: '',
        person_a: '',
        person_b: '',
    };

    const [formValue, setFormValue] = useState(initialFormValues);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(null);

    const onChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
        setShowResult(false);
    };

    const resetFormValues = () => {
        setFormValue(initialFormValues);
        setShowResult(false);
    };

    const setExampleData = () => {
        const exampleData = data.data.find((item) => item.name === 'DiffieHellman');
        const {values} = exampleData.details.find((item) => item.type === 'example');

        setFormValue({...formValue, ...values});
        setShowResult(false);
    };

    const handleSolveAlgorithm = () => {
        if (validateSheet()) {
            const solver = new DiffieHellmanSolver(
                formValue.modulo,
                formValue.base_value,
                formValue.person_a,
                formValue.person_b,
            );
            const solveResult = solver.solve();
            setResult(solveResult);
            setShowResult(true);
        } else {
            createToastError('Every field has to be filled in!');
        }
    };

    const validateSheet = () => {
        let isValid = true;

        const positiveIntegerRegex = /^[0-9]\d*$/;

        const updatedFormValue = {...formValue};

        for (const key in updatedFormValue) {
            if (updatedFormValue.hasOwnProperty(key)) {
                if (!positiveIntegerRegex.test(updatedFormValue[key])) {
                    isValid = false;
                }
            }
        }

        return isValid;
    };

    return (
        <FieldGrid>
            <FieldGridFirst>
                <GridItem>
                    <InputField>
                        <Headline>Inputs</Headline>
                        <MDBValidation>
                            <MDBRow tag="form" className="g-3" style={marginsInput}>
                                <MDBCol md="6">
                                    <MDBInput
                                        value={formValue.person_a}
                                        name="person_a"
                                        onChange={onChange}
                                        required
                                        label="Person A"
                                        type={"number"}
                                    />
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBInput
                                        value={formValue.person_b}
                                        name="person_b"
                                        onChange={onChange}
                                        required
                                        label="Person B"
                                        type={"number"}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow tag="form" className="g-3" style={marginsInput}>
                                <MDBCol md="6">
                                    <MDBInput
                                        value={formValue.base_value}
                                        name="base_value"
                                        onChange={onChange}
                                        required
                                        label="Base Value"
                                        type={"number"}
                                    />
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBInput
                                        value={formValue.modulo}
                                        name="modulo"
                                        onChange={onChange}
                                        required
                                        label="Modulo"
                                        type={"number"}
                                    />
                                </MDBCol>
                            </MDBRow>
                            <InputButtons resetForm={resetFormValues} setExampleData={setExampleData}
                                          solveAlgorithm={handleSolveAlgorithm}/>
                        </MDBValidation>
                    </InputField>
                </GridItem>
                <GridItem switchRows>
                    <Scenario scenario={getScenario('DiffieHellman', 'scenario')}/>
                </GridItem>
            </FieldGridFirst>
            <Field>
                <Headline>Algorithm</Headline>
                {showResult && (
                    <ResultBox>
                        <ResultHeadline>Result</ResultHeadline>
                        <ResultText>
                            Secret Key : <b>{result}</b>
                        </ResultText>
                    </ResultBox>
                )}
                <StyledStickManAndArrowContainer>
                    <StickManContainer>
                        <StickMan character={'A'}/>
                    </StickManContainer>
                    <TransferAnimation/>
                    <StickManContainer>
                        <StickMan character={'B'}/>
                    </StickManContainer>
                </StyledStickManAndArrowContainer>
            </Field>
            <ToastContainer/>
        </FieldGrid>
    );
};

export default DiffieHellman;

