import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField,
    marginsInput,
    InfoBox,
    RangeBox,
    GridItem, ResultBox, ResultHeadline, ResultText,
} from '../../components/GlobalComponents.jsx';
import {Scenario} from '../../components/Scenario';
import InputButtons from '../../components/InputButtons';
import {MDBCol, MDBRow} from 'mdb-react-ui-kit';
import {getScenario} from '../../components/GlobalFunctions.jsx';
import RangeSlider from '../../components/RangeSlider.jsx';
import data from "../../assets/data.json";
import styled from "styled-components";
import {toast, ToastContainer} from "react-toastify";
import {BerkeleySolver} from "./BerkeleySolver.js";

const Berkeley = () => {
    const [serverAmount, setServerAmount] = useState(4);
    const [serverTimes, setServerTimes] = useState(Array(serverAmount).fill(null));
    const [selectedTimeDaemon, setSelectedTimeDaemon] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [resultText, setResultText] = useState(null);
    const [currentResult, setCurrentResult] = useState(1);

    const onChange = (e, index) => {
        const newServerTimes = [...serverTimes];
        newServerTimes[index] = e.target.value;
        setServerTimes(newServerTimes);
        setShowResult(false);
    }

    const resetFormValues = () => {
        setServerAmount(4);
        setSelectedTimeDaemon(0);
        setServerTimes(Array(4).fill(null));
        setShowResult(false);
    };

    const setExampleData = () => {
        const exampleData = data.data.find((item) => item.name === 'Berkeley');
        const {exampleServerAmount, values} = exampleData.details.find(item => item.type === 'example');

        setServerTimes([...values]);
        setSelectedTimeDaemon(0);
        setServerAmount(exampleServerAmount);
        setShowResult(false);
    };

    const handleServerAmountChange = (newServerAmount) => {
        if (newServerAmount > serverAmount) {
            setServerTimes([...serverTimes, ...Array(newServerAmount - serverAmount).fill(null)]);
        } else if (newServerAmount < serverAmount) {
            setServerTimes(serverTimes.slice(0, newServerAmount));
        }

        setServerAmount(newServerAmount);
        setShowResult(false);
    };

    const handleTimeDaemonSelect = (index) => {
        setSelectedTimeDaemon(index);
        setShowResult(false);
    };

    const handleSolveAlgorithm = () => {
        if (!serverTimes.some(entry => entry === null)) {
            const solver = new BerkeleySolver(serverTimes, selectedTimeDaemon);
            const solveResult = solver.solve();
            setShowResult(true);
            const textLines = [];
            const roundOne = [];
            for (let i = 0; i < serverAmount; i++) {
                roundOne.push(`From: ${solveResult[0][i].from} To: ${solveResult[0][i].to} | Time-sent: ${solveResult[0][i].time_sent}`);
            }
            const roundTwo = [];

            for (let i = 0; i < serverAmount; i++) {
                roundTwo.push(`From: ${solveResult[1][i].from} To: ${solveResult[1][i].to} | Time-difference: ${solveResult[1][i].time_adjust}`);
            }
            const roundThree = [];
            roundThree.push(`General Time: ${solveResult[2][0].time_sent}`);
            for (let i = 0; i < serverAmount; i++) {
                roundThree.push(`From: ${solveResult[2][i].from} To: ${solveResult[2][i].to} | Time-adjustment: ${solveResult[2][i].time_adjust}`);
            }
            textLines.push(roundOne);
            textLines.push(roundTwo);
            textLines.push(roundThree);
            setResultText(textLines);
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

    const showCertainResult = (index) => {
        setCurrentResult(index);
    };

    return (
        <FieldGrid>
            <GridItem>
                <InputField>
                    <Headline>Inputs</Headline>
                    <MDBRow tag="form" className="g-3" style={marginsInput}>
                        <MDBCol md={8}>
                            <RangeBox>
                                <RangeSlider
                                    text={'Servers'}
                                    min={2}
                                    max={6}
                                    value={serverAmount}
                                    onChange={handleServerAmountChange}
                                />
                            </RangeBox>
                        </MDBCol>
                        <MDBCol md={4}>
                            <DropdownContainer>
                                Time Daemon:
                                <SelectContainer onChange={(e) => handleTimeDaemonSelect(e.target.value)}
                                                 value={selectedTimeDaemon}>
                                    {serverTimes.map((value, index) => (
                                        <option key={index} value={index}>
                                            {index + 1} - {value}
                                        </option>
                                    ))}
                                </SelectContainer>
                            </DropdownContainer>
                        </MDBCol>
                    </MDBRow>
                    <InputButtons resetForm={resetFormValues} setExampleData={setExampleData}
                                  solveAlgorithm={handleSolveAlgorithm}/>
                </InputField>
            </GridItem>
            <GridItem switchRows>
                <Scenario scenario={getScenario('Berkeley', 'scenario')}/>
            </GridItem>
            <Field>
                <Headline>Algorithm</Headline>
                {showResult && (
                    <ResultBox>
                        <ResultHeadline>Result</ResultHeadline>
                        <ResultText>
                            {resultText[currentResult - 1].map((line, index) => (
                                <p>{line}</p>
                            ))}
                        </ResultText>
                        <div>
                            {[1, 2, 3].map((index) => (
                                <ResultButton
                                    key={index}
                                    index={index}
                                    currentResult={currentResult}
                                    onClick={() => showCertainResult(index)}
                                >
                                    {index}
                                </ResultButton>
                            ))}
                        </div>
                    </ResultBox>
                )}
                <TimeInputsContainer serverAmount={serverAmount}>
                    {serverTimes.map((time, index) => (
                        <TimeInputContainer
                            key={index}
                            index={index + 1}
                            serverAmount={serverTimes.length}>
                            <TimeInput isSelected={selectedTimeDaemon == index}> {index + 1} <input
                                key={index}
                                type="time"
                                value={time || ''}
                                onChange={(e) => onChange(e, index)}
                            />
                            </TimeInput>
                        </TimeInputContainer>
                    ))}
                </TimeInputsContainer>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
                <InfoBox>Coming Soon</InfoBox>
            </Field>
            <ToastContainer/>
        </FieldGrid>
    );
};

export default Berkeley;

const TimeInputsContainer = styled.div`
  position: relative;
  height: ${props => 120 + 60 * props.serverAmount}px;
  margin: 0 auto;
`;

const TimeInputContainer = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  transform: ${
          props => {
            const radius = 120;
            const angle = (2 * Math.PI * props.index) / props.serverAmount;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return `translate(${x}px, ${y}px)`;
          }
  };
`;

const TimeInput = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid ${(props) => (props.isSelected ? 'red' : 'var(---secondary)')};
  border-radius: 5px;
  padding: 5px;
  align-items: center;
  font-weight: bold;

  input {
    margin-left: 5px;
  }
`;


const DropdownContainer = styled.div`
  display: flex;
  border-radius: 10px;
  border: solid 2px lightgray;
  color: var(---tertiary);
  padding: 10px;
  font-weight: bold;
  justify-content: space-between;
  align-items: center;
  align-self: center;
`;

const SelectContainer = styled.select`
  border: solid 2px lightgray;
  border-radius: 5px;
  width: 30%;
`;

const ResultButton = styled.button`
  padding: 0 4px;
  width: 30px;
  margin: 4px;
  border: 2px solid ${props => (props.index === props.currentResult ? 'var(---tertiary)' : 'var(---fifth)')};
  border-radius: 10px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  background-color: ${props => (props.index === props.currentResult ? 'var(---secondary)' : 'none')};
  color: ${props => (props.index === props.currentResult ? 'var(---primary)' : 'none')};

  &:hover {
    background-color: var(---secondary);
    border-color: var(---tertiary);
    color: var(---primary);
  }
`;
