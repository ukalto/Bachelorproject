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
import data from "../../assets/data.json";
import {ChordSystemSolver} from "./ChordSystemSolver.js";


const ChordSystem = () => {

    const [nodesAmount, setNodesAmount] = useState(25);
    const [startNode, setStartNode] = useState(null);
    const [bitIdentifier, setBitIdentifier] = useState(4);
    const [key, setKey] = useState('');
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [resultPath, setResultPath] = useState([]);

    const resetFormValues = () => {
        setNodesAmount(25);
        setBitIdentifier(4);
        setStartNode(null);
        setKey('');
        setSelectedNodes([]);
        reset();
    };

    const activateNode = (index) => {
        const newSelectedNodes = [...selectedNodes, index];
        const sortedSelectedNodes = newSelectedNodes.sort((a, b) => a - b);
        setSelectedNodes(sortedSelectedNodes);
        reset();
    };

    const setExampleData = () => {
        const exampleData = data.data.find((item) => item.name === 'ChordSystem');
        const {
            selectedNodes,
            key,
            nodesAmount,
            bitIdentifier,
            startNode
        } = exampleData.details.find(item => item.type === 'example');

        setSelectedNodes([...selectedNodes]);
        setNodesAmount(nodesAmount);
        setBitIdentifier(bitIdentifier);
        setKey(key);
        setStartNode(startNode);
        reset();
    };

    const handleNodesAmountChange = (newNodesAmount) => {
        selectedNodes.forEach((node) => {
            if (node > newNodesAmount - 1) {
                selectedNodes.pop();
            }
        })
        setNodesAmount(newNodesAmount);
        reset();
    };

    const reset = () => {
        setResultPath([]);
    };

    const handleSolveAlgorithm = () => {
        const solver = new ChordSystemSolver(
            nodesAmount,
            bitIdentifier,
            startNode,
            key,
            selectedNodes);
        const solveResult = solver.solve();
        setResultPath(solveResult.path);
    };

    const handleStartNodeSelect = (value) => {
        setStartNode(value);
        reset()
    };

    const handleKeyChange = (value) => {
        setKey(value);
        reset()
    };


    return (
        <FieldGrid>
            <GridItem>
                <InputField>
                    <Headline>Inputs</Headline>
                    <MDBRow className='g-3' style={marginsInput}>
                        <MDBCol md="4">
                            <DropdownContainer>
                                Start Node:
                                <SelectContainer onChange={(e) => handleStartNodeSelect(e.target.value)}>
                                    <option value="" disabled selected hidden>Node i</option>
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
                                    name='bitIdentifier'
                                    min={2}
                                    max={6}
                                    value={bitIdentifier}
                                    onChange={setBitIdentifier}
                                />
                            </RangeBox>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className='g-3' style={marginsInput}>
                        <MDBCol md="2">
                            <MDBInput
                                style={{height: "50px"}}
                                value={key}
                                name='key'
                                onChange={(e) => handleKeyChange(e.target.value)}
                                required
                                label='Key'
                                type="number"
                            />
                        </MDBCol>
                        <MDBCol md="10">
                            <RangeBox>
                                <RangeSlider
                                    text={'Nodes'}
                                    name='nodesAmount'
                                    min={12}
                                    max={32}
                                    value={nodesAmount}
                                    onChange={handleNodesAmountChange}
                                />
                            </RangeBox>
                        </MDBCol>
                    </MDBRow>
                    <InputButtons resetForm={resetFormValues} setExampleData={setExampleData}
                                  solveAlgorithm={handleSolveAlgorithm}/>
                </InputField>
            </GridItem>
            <GridItem switchRows>
                <Scenario scenario={getScenario("ChordSystem", "scenario")}/>
            </GridItem>
            <Field>
                <Headline>Algorithm</Headline>
                <NodeWrapper serverAmount={nodesAmount}>
                    {Array.from({length: nodesAmount}).map((_, index) => (
                        <Node
                            key={index}
                            index={index}
                            selectedNodes={selectedNodes}
                            nodesAmount={nodesAmount}
                            onClick={() => activateNode(index)}
                            resultPath={resultPath}
                        >{index}</Node>
                    ))}
                    <svg height="100%" width="100%">
                        <Circle cx="50%" cy="50%" r={105 + 5 * nodesAmount} />
                    </svg>
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
  height: ${props => 120 + 20 * props.serverAmount}px;
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
    background-color: var(---secondary);
    border-color: var(---tertiary);
    color: var(---primary);
  }

  background-color: ${props => {
    if (props.resultPath.includes(props.index)) {
      return 'var(---fifth)';
    } else if (props.selectedNodes.includes(props.index)) {
      return 'var(---secondary)';
    } else {
      return 'var(---primary)';
    }
  }};
  border-color: var(---tertiary);
  color: ${props => (props.selectedNodes.includes(props.index) ? 'var(---primary)' : 'var(---tertiary)')};


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
