import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField,
    InfoBox,
    StyledStickManAndArrowContainer,
    StickManContainer,
    GridItem,
    marginsInput, ResultBox, ResultHeadline, ResultText,
} from '../../components/GlobalComponents.jsx';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBInput, MDBValidation} from "mdb-react-ui-kit";
import StickMan from "../../components/StickMan";
import {getScenario} from "../../components/GlobalFunctions.jsx";
import data from "../../assets/data.json";
import {toast, ToastContainer} from "react-toastify";
import {TransferAnimation} from "../../components/TransferAnimation.jsx";
import {CryptoSystemSolver} from "./CryptoSystemSolver.js";

const CryptoSystem = () => {
    const initialFormValues = {
        public_key_a: '',
        private_key_a: '',
        modules_a: '',
        public_key_b: '',
        private_key_b: '',
        modules_b: '',
        message: '',
        hash_function: '',
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
        const exampleData = data.data.find((item) => item.name === 'CryptoSystem');
        const { values } = exampleData.details.find((item) => item.type === 'example');

        setFormValue({ ...formValue, ...values });
        setShowResult(false);
    };

    const handleSolveAlgorithm = () => {
        if (validateSheet()) {
            const solver = new CryptoSystemSolver(
                formValue.public_key_a,
                formValue.private_key_a,
                formValue.modules_a,
                formValue.public_key_b,
                formValue.private_key_b,
                formValue.modules_b,
                formValue.message,
                formValue.hash_function
            );
            const solveResult = solver.solve();
            setResult(solveResult);
            setShowResult(true);
        } else {
            toast.error('Every field has to be filled in!', {
                position: toast.POSITION.BOTTOM_CENTER,
                closeOnClick: true,
                autoClose: 4000,
                hideProgressBar: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
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
            <GridItem>
                <InputField>
                    <Headline>Inputs</Headline>
                    <MDBValidation className='row g-3' style={marginsInput}>
                        <MDBCol md={4}>
                            <MDBInput
                                value={formValue.public_key_a}
                                name='public_key_a'
                                onChange={onChange}
                                required
                                type="number"
                                label='Public Key A'
                            />
                        </MDBCol>
                        <MDBCol md={4}>
                            <MDBInput
                                value={formValue.private_key_a}
                                name='private_key_a'
                                onChange={onChange}
                                required
                                label='Private Key A'
                                type="number"
                            />
                        </MDBCol>
                        <MDBCol md={4}>
                            <MDBInput
                                value={formValue.modules_a}
                                name='modules_a'
                                onChange={onChange}
                                required
                                label='Modules A'
                                type="number"
                            />
                        </MDBCol>
                        <MDBCol md={4}>
                            <MDBInput
                                value={formValue.public_key_b}
                                name='public_key_b'
                                onChange={onChange}
                                required
                                label='Public Key B'
                                type="number"
                            />
                        </MDBCol>
                        <MDBCol md={4}>
                            <MDBInput
                                value={formValue.private_key_b}
                                name='private_key_b'
                                onChange={onChange}
                                required
                                label='Private Key B'
                                type="number"
                            />
                        </MDBCol>
                        <MDBCol md={4}>
                            <MDBInput
                                value={formValue.modules_b}
                                name='modules_b'
                                onChange={onChange}
                                required
                                label='Modules B'
                                type="number"
                            />
                        </MDBCol>
                        <MDBCol md={6}>
                            <MDBInput
                                value={formValue.message}
                                name='message'
                                onChange={onChange}
                                required
                                label='Message'
                                type="number"
                            />
                        </MDBCol>
                        <MDBCol md={6}>
                            <MDBInput
                                value={formValue.hash_function}
                                name='hash_function'
                                onChange={onChange}
                                required
                                label='Hash Function'
                                type="number"
                            />
                        </MDBCol>
                        <InputButtons resetForm={resetFormValues} setExampleData={setExampleData}
                                      solveAlgorithm={handleSolveAlgorithm}/>
                    </MDBValidation>
                </InputField>
            </GridItem>
            <GridItem switchRows>
                <Scenario scenario={getScenario("CryptoSystem", "scenario")}/>
            </GridItem>
            <Field>
                <Headline>Algorithm</Headline>
                {showResult && (
                    <ResultBox>
                        <ResultHeadline>Result</ResultHeadline>
                        <ResultText>
                            Confidentiality : <b>{result.confidentiality}</b>
                        </ResultText>
                        <ResultText>
                            Authenticity & Integrity : <b>{result.authenticityIntegrity}</b>
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
            <Field>
                <Headline>Benchmarks</Headline>
                <InfoBox>Coming Soon</InfoBox>
            </Field>
            <ToastContainer/>
        </FieldGrid>
    );
};

export default CryptoSystem;
