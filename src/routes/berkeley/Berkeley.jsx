import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField,
    marginsInput,
    InfoBox,
    RangeBox,
    GridItem,
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
import Xarrow from 'react-xarrows';

const Berkeley = () => {
    const [serverAmount, setServerAmount] = useState(4);
    const [serverTimes, setServerTimes] = useState(Array(serverAmount).fill(null));
    const [selectedTimeDaemon, setSelectedTimeDaemon] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [resultText, setResultText] = useState(null);
    const [currentResult, setCurrentResult] = useState(1);
    const [finalTimes, setFinalTimes] = useState(null);

    const onChange = (e, index) => {
        const newServerTimes = [...serverTimes];
        newServerTimes[index] = e.target.value;
        setServerTimes(newServerTimes);
        reset()
    }

    const resetFormValues = () => {
        setServerAmount(4);
        setSelectedTimeDaemon(0);
        setServerTimes(Array(4).fill(null));
        reset()
    };

    const setExampleData = () => {
        const exampleData = data.data.find((item) => item.name === 'Berkeley');
        const {exampleServerAmount, values} = exampleData.details.find(item => item.type === 'example');

        setServerTimes([...values]);
        setSelectedTimeDaemon(0);
        setServerAmount(exampleServerAmount);
        reset()
    };

    const handleServerAmountChange = (newServerAmount) => {
        if (newServerAmount > serverAmount) {
            setServerTimes([...serverTimes, ...Array(newServerAmount - serverAmount).fill(null)]);
        } else if (newServerAmount < serverAmount) {
            setServerTimes(serverTimes.slice(0, newServerAmount));
        }

        if (selectedTimeDaemon >= newServerAmount) {
            setSelectedTimeDaemon(0);
        }

        setServerAmount(newServerAmount);
        reset()
    };

    const handleTimeDaemonSelect = (index) => {
        setSelectedTimeDaemon(index);
        reset()
    };

    const reset = () => {
        setCurrentResult(1);
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
                roundOne.push([solveResult[0][i].from, solveResult[0][i].to, solveResult[0][i].time_sent]);
            }
            const roundTwo = [];
            for (let i = 0; i < serverAmount; i++) {
                roundTwo.push([solveResult[1][i].from, solveResult[1][i].to, solveResult[1][i].time_adjust]);
            }
            const roundThree = [];
            const tempFinalTimes = [];
            for (let i = 0; i < serverAmount; i++) {
                roundThree.push([solveResult[2][i].from, solveResult[2][i].to, solveResult[2][i].time_adjust]);
                tempFinalTimes.push(solveResult[2][i].time_sent);
            }
            textLines.push(roundOne);
            textLines.push(roundTwo);
            textLines.push(roundThree);
            setFinalTimes(tempFinalTimes);
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

    const arrowLeft = (number) => {
        switch (serverAmount) {
            case 2:
                return number === 0;
            case 4:
                return number === 1;
            case 5:
                return number === 1 || number === 2;
            case 6:
                return number === 1 || number === 2 || number === 3;
            case 3:
            default:
                return false;
        }
    }

    const showCertainResult = (index) => {
        setCurrentResult(parseInt(index));
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
                <TimeInputsContainer serverAmount={serverAmount}>
                    {serverTimes.map((time, index) => (
                        <TimeInputContainer
                            key={index}
                            index={index + 1}
                            serverAmount={serverTimes.length}
                            id={`Time${index}`}>
                            <TimeInput isSelected={parseInt(selectedTimeDaemon) === index} showResult={showResult}
                                       currentResult={currentResult}>
                                {index + 1}
                                {showResult && currentResult === 3 ? (
                                    <input
                                        type="time"
                                        value={finalTimes[index]}
                                        onChange={(e) => onChange(e, index)}
                                    />
                                ) : (
                                    <input
                                        key={index}
                                        type="time"
                                        value={time || ''}
                                        onChange={(e) => onChange(e, index)}
                                    />
                                )}
                            </TimeInput>
                        </TimeInputContainer>
                    ))}
                    {showResult && (currentResult === 1 || currentResult === 2 || currentResult === 3) && (
                        <React.Fragment>
                            {resultText.map((round, roundIndex) => (
                                <React.Fragment key={roundIndex}>
                                    {round.map((result, index) => (
                                        <React.Fragment key={index}>
                                            {index !== parseInt(selectedTimeDaemon) ? (
                                                <Xarrow
                                                    divContainerStyle={{
                                                        color: 'var(---tertiary)',
                                                        fontWeight: 'bold',
                                                    }}
                                                    key={index}
                                                    headSize={5}
                                                    color={'darkgray'}
                                                    showHead={true}
                                                    start={`Time${resultText[currentResult - 1][index][0]}`}
                                                    end={`Time${resultText[currentResult - 1][index][1]}`}
                                                    labels={resultText[currentResult - 1][index][2]}
                                                />
                                            ) : (
                                                !arrowLeft(index) ? (
                                                    <Xarrow
                                                        divContainerStyle={{
                                                            color: 'var(---tertiary)',
                                                            fontWeight: 'bold',
                                                        }}
                                                        key={`timedaemon-${index}`}
                                                        headSize={6}
                                                        showHead={true}
                                                        path={"grid"}
                                                        color={'darkgray'}
                                                        startAnchor={"right"}
                                                        endAnchor={"right"}
                                                        _cpx1Offset={120}
                                                        _cpx2Offset={40}
                                                        start={`Time${selectedTimeDaemon}`}
                                                        end={`Time${selectedTimeDaemon}`}
                                                        labels={resultText[currentResult - 1][0][2]}
                                                    />
                                                ) : (
                                                    <Xarrow
                                                        divContainerStyle={{
                                                            color: 'var(---tertiary)',
                                                            fontWeight: 'bold',
                                                        }}
                                                        key={`timedaemon-${index}`}
                                                        headSize={6}
                                                        showHead={false}
                                                        showTail={true}
                                                        path={"grid"}
                                                        color={'darkgray'}
                                                        startAnchor={"left"}
                                                        endAnchor={"left"}
                                                        _cpx1Offset={-120}
                                                        _cpx2Offset={-40}
                                                        start={`Time${selectedTimeDaemon}`}
                                                        end={`Time${selectedTimeDaemon}`}
                                                        labels={resultText[currentResult - 1][0][2]}
                                                    />
                                                )
                                            )}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    )}
                </TimeInputsContainer>
                {showResult && (
                    <ResultOptionsContainer>
                        {[0, 1, 2, 3].map((index) => (
                            <ResultButton
                                key={index}
                                index={index}
                                currentResult={currentResult}
                                onClick={() => showCertainResult(index)}
                            >
                                {index}
                            </ResultButton>
                        ))}
                    </ResultOptionsContainer>
                )}
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
                <InfoBox>Coming Soon</InfoBox>
            </Field>
            <ToastContainer/>
        </FieldGrid>
    )
        ;
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
            const radius = 30 + 35 * props.serverAmount;
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
    pointer-events: ${(props) => ((props.showResult && props.currentResult >= 1) ? 'none' : 'pointer')};
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

const ResultOptionsContainer = styled.div`
  align-self: center;
  margin-top: 30px;
`;
