import React, {useState} from 'react';
import {
    Field,
    FieldGrid, FieldGridFirst,
    GridItem,
    Headline,
    InputField,
    marginsInput,
    RangeBox,
} from '../../components/GlobalComponents.jsx';
import {Scenario} from '../../components/Scenario';
import InputButtons from '../../components/InputButtons';
import {MDBCol, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import {createToastError, getScenario} from '../../components/GlobalFunctions.jsx';
import styled from 'styled-components';
import RangeSlider from '../../components/RangeSlider.jsx';
import data from '../../assets/data.json';
import {ChordSystemSolver} from './ChordSystemSolver.js';
import {ToastContainer} from 'react-toastify';
import Xarrow from 'react-xarrows';
import LineTo from "react-lineto";

const ChordSystem = () => {
    const [nodesAmount, setNodesAmount] = useState(25);
    const [startNode, setStartNode] = useState('');
    const [bitIdentifier, setBitIdentifier] = useState(4);
    const [key, setKey] = useState('');
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [resultPath, setResultPath] = useState([]);
    const [fingerTables, setFingerTables] = useState({});
    const [selectedFingerTableEntries, setSelectedFingerTableEntries] = useState({});
    const [showResult, setShowResult] = useState(false);

    const resetFormValues = () => {
        setNodesAmount(25);
        setBitIdentifier(4);
        setStartNode('');
        setKey('');
        setSelectedNodes([]);
        reset();
    };

    const activateNode = (index) => {
        if (!selectedNodes.includes(index)) {
            const newSelectedNodes = [...selectedNodes, index];
            const sortedSelectedNodes = newSelectedNodes.sort((a, b) => a - b);
            setSelectedNodes(sortedSelectedNodes);
        } else {
            const newSelectedNodes = [...selectedNodes].filter((node) => node !== index);
            setSelectedNodes(newSelectedNodes);
        }
        reset();
    };

    const setExampleData = async () => {
        const exampleData = data.data.find((item) => item.name === 'ChordSystem');
        const {
            selectedNodes,
            key,
            nodesAmount,
            bitIdentifier,
            startNode,
        } = exampleData.details.find((item) => item.type === 'example');

        await new Promise((resolve) => {
            setSelectedNodes([...selectedNodes]);
            resolve();
        });
        setNodesAmount(nodesAmount);
        setBitIdentifier(bitIdentifier);
        setKey(key);
        handleStartNodeSelect(startNode);
        reset();
    };

    const handleNodesAmountChange = (newNodesAmount) => {
        selectedNodes.forEach((node) => {
            if (node > newNodesAmount - 1) {
                selectedNodes.pop();
            }
        });
        setNodesAmount(newNodesAmount);
        if (newNodesAmount < startNode) {
            setStartNode('');
        }
        reset();
    };

    const reset = () => {
        setResultPath([]);
        setSelectedFingerTableEntries({});
        setShowResult(false);
    };

    const validateForm = () => {
        if (key === '') return false;
        if (bitIdentifier < 2 || bitIdentifier > 6) return false;
        if (startNode === '') return false;
        return !(nodesAmount < 12 || nodesAmount > 32);
    };

    const handleSolveAlgorithm = () => {
        if (validateForm()) {
            const solver = new ChordSystemSolver(
                nodesAmount,
                bitIdentifier,
                parseInt(startNode),
                parseInt(key),
                selectedNodes
            );
            const solveResult = solver.solve();
            setResultPath(solveResult.path);
            setFingerTables(solveResult.tables);
            setSelectedFingerTableEntries(solveResult.selectedFingerTableEntries);
            setShowResult(true);
        } else {
            createToastError('Every field has to be filled in!');
        }
    };

    const handleStartNodeSelect = (value) => {
        setStartNode(value);
        reset();
    };

    const handleKeyChange = (value) => {
        setKey(value);
        reset();
    };

    return (
        <FieldGrid>
            <FieldGridFirst>
                <GridItem>
                    <InputField>
                        <Headline>Inputs</Headline>
                        <MDBRow className="g-3" style={marginsInput}>
                            <MDBCol md="4">
                                <DropdownContainer>
                                    Start Node:
                                    <SelectContainer
                                        onChange={(e) => handleStartNodeSelect(e.target.value)}
                                        value={startNode}
                                    >
                                        <option value="" disabled defaultValue hidden>
                                            Node i
                                        </option>
                                        {selectedNodes.map((value, index) => (
                                            <option key={index} value={value}>
                                                Node {value}
                                            </option>
                                        ))}
                                    </SelectContainer>
                                </DropdownContainer>
                            </MDBCol>
                            <MDBCol md="8">
                                <RangeBox>
                                    <RangeSlider
                                        text={'Bit-Identifier'}
                                        name="bitIdentifier"
                                        min={2}
                                        max={5}
                                        value={bitIdentifier}
                                        onChange={setBitIdentifier}
                                    />
                                </RangeBox>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow className="g-3" style={marginsInput}>
                            <MDBCol md="2">
                                <MDBInput
                                    style={{height: '50px'}}
                                    value={key}
                                    name="key"
                                    onChange={(e) => handleKeyChange(e.target.value)}
                                    required
                                    label="Key"
                                    type="number"
                                />
                            </MDBCol>
                            <MDBCol md="10">
                                <RangeBox>
                                    <RangeSlider
                                        text={'Nodes'}
                                        name="nodesAmount"
                                        min={12}
                                        max={32}
                                        value={nodesAmount}
                                        onChange={handleNodesAmountChange}
                                    />
                                </RangeBox>
                            </MDBCol>
                        </MDBRow>
                        <InputButtons
                            resetForm={resetFormValues}
                            setExampleData={setExampleData}
                            solveAlgorithm={handleSolveAlgorithm}
                        />
                    </InputField>
                </GridItem>
                <GridItem switchRows>
                    <Scenario scenario={getScenario('ChordSystem', 'scenario')}/>
                </GridItem>
            </FieldGridFirst>
            <Field>
                <Headline>Algorithm</Headline>
                <NodeWrapper serverAmount={nodesAmount} showResult={showResult} resultPath={resultPath.length}>
                    {Array.from({length: nodesAmount}).map((_, index) => (
                        <React.Fragment key={index}>
                            {index in fingerTables && showResult ? (
                                <React.Fragment>
                                    <Node
                                        index={index}
                                        selectedNodes={selectedNodes}
                                        nodesAmount={nodesAmount}
                                        onClick={() => activateNode(index)}
                                        resultPath={resultPath}
                                        id={`Node${index}`}
                                        className={`Node${index}`}
                                    >
                                        {index}
                                    </Node>
                                    <FingerTable index={index} nodesAmount={nodesAmount} id={`FingerTable${index}`}
                                                 className={`FingerTable${index}`}>
                                        {Object.entries(fingerTables[index]).map(
                                            ([key, value], fingerIndex) => (
                                                <React.Fragment>
                                                    {selectedFingerTableEntries[index] === fingerIndex ? (
                                                        <FingerTableRow key={fingerIndex} check={true}>
                                                            <FingerTableEntry>{fingerIndex + 1}</FingerTableEntry>
                                                            <FingerTableEntry>{value}</FingerTableEntry>
                                                        </FingerTableRow>
                                                    ) : (
                                                        <FingerTableRow>
                                                            <FingerTableEntry>{fingerIndex + 1}</FingerTableEntry>
                                                            <FingerTableEntry>{value}</FingerTableEntry>
                                                        </FingerTableRow>
                                                    )}
                                                </React.Fragment>
                                            )
                                        )}
                                    </FingerTable>
                                    <LineTo from={`Node${index}`} to={`FingerTable${index}`} zIndex={1}
                                            borderColor={"var(---tertiary)"} borderWidth={2} delay={0}/>
                                </React.Fragment>
                            ) : (
                                <Node
                                    index={index}
                                    selectedNodes={selectedNodes}
                                    nodesAmount={nodesAmount}
                                    onClick={() => activateNode(index)}
                                    resultPath={resultPath}
                                >
                                    {index}
                                </Node>
                            )}
                        </React.Fragment>
                    ))}
                    <svg height="100%" width="100%">
                        <Circle cx="50%" cy="50%" r={105 + 5 * nodesAmount}/>
                    </svg>
                    {showResult && resultPath.length > 1 && (
                        <React.Fragment>
                            {resultPath.map((nodeIndex, index) => (
                                index < resultPath.length - 1 && (
                                    <Xarrow
                                        key={index}
                                        lineColor={"var(---error)"}
                                        tailColor={"var(---error)"}
                                        headSize={5}
                                        showTail={true}
                                        showHead={false}
                                        curveness={0}
                                        dashness={true}
                                        end={`Node${nodeIndex}`}
                                        start={`Node${resultPath[index + 1]}`}
                                    />
                                )
                            ))}
                        </React.Fragment>
                    )}
                </NodeWrapper>
            </Field>
            <ToastContainer/>
        </FieldGrid>
    );
};

export default ChordSystem;

const NodeWrapper = styled.div`
    position: relative;
    height: ${props => props.showResult ? 350 + 30 * props.serverAmount : 120 + 20 * props.serverAmount}px;
    margin: 0 auto;
    width: 100%;
`;

const Circle = styled.circle`
    stroke: black;
    fill: none;
    stroke-width: 2;
`;

const Node = styled.button`
    display: block;
    position: absolute;
    width: 30px;
    z-index: 2;
    height: 30px;
    border-radius: 50%;
    border: 2px solid var(---tertiary);
    text-align: center;
    top: 50%;
    left: 50%;
    margin: -15px 0 0 -15px;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;

    &:hover {
        background-color: ${props => props.selectedNodes.includes(props.index) ? 'var(---primary)' : 'var(---secondary)'};
        border-color: var(---tertiary);
        color: ${props => props.selectedNodes.includes(props.index) ? 'var(---tertiary)' : 'var(---primary)'};
    }

    background-color: ${props => props.resultPath.includes(props.index) ? 'var(---fifth)'
            : props.selectedNodes.includes(props.index) ? 'var(---secondary)' : 'var(---primary)'};
    border-color: var(---tertiary);
    color: ${props => props.selectedNodes.includes(props.index) ? 'var(---primary)' : 'var(---tertiary)'};

    transform: ${props => {
        const radius = 105 + 5 * props.nodesAmount;
        const angle = (2 * Math.PI * props.index) / props.nodesAmount;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return `translate(${y}px, ${-x}px)`;
    }};
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

const FingerTable = styled.div`
    display: grid;
    grid-template-rows: auto auto;
    position: absolute;
    z-index: 2;
    left: 47%;
    top: 45%;
    transform: ${props => {
        let radius = 0;
        if (props.index % 2 === 0) {
            radius = 340 + 5 * props.nodesAmount;
        } else {
            radius = 220 + 5 * props.nodesAmount;
        }
        const angle = (2 * Math.PI * props.index) / props.nodesAmount;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return `translate(${y}px, ${-x}px)`;
    }};
    cursor: default;
`;


const FingerTableEntry = styled.p`
    border: 1px solid black;
    margin: 0;
    text-align: center;
    width: 28px;
    color: var(---tertiary);
`;

const FingerTableRow = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${(props) => props.check ? 'var(---fifth)' : 'var(---primary)'};

    p {
        font-weight: ${(props) => props.check ? 'bold' : 'default'};
        color: ${(props) => props.check ? 'var(---primary)' : 'var(---tertiary)'};
    }
`;
