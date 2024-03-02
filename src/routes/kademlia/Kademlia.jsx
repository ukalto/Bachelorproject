import React, {useEffect, useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField, marginsInput, GridItem, FieldGridFirst, RangeBox, SelectContainer, DropdownContainer
} from '../../components/GlobalComponents.jsx';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBRow} from "mdb-react-ui-kit";
import {getScenario} from "../../components/GlobalFunctions.jsx";
import RangeSlider from "../../components/RangeSlider.jsx";
import styled from "styled-components";
import Xarrow from "react-xarrows";


const Kademlia = () => {
    const [nodeDepth, setNodeDepth] = useState(3);
    const [nodeArr, setNodeArr] = useState([]);
    const [startNode, setStartNode] = useState(null);
    const [finalNode, setFinalNode] = useState(null);

    useEffect(() => {
        createNodeArray(nodeDepth);
    }, [nodeDepth]);

    const createNodeArray = (depth) => {
        const array = [['Root']];

        for (let i = 1; i < depth; i++) {
            const layer = [];
            const layerSize = Math.pow(2, i);
            for (let j = 0; j < layerSize; j++) {
                layer.push(j.toString(2).padStart(i, '0'));
            }
            array.push(layer);
        }

        setNodeArr(array);
    };

    const renderTreeOptions = (nodes) => {
        const options = [];

        const traverseTree = (node) => {
            if (!node) {
                return;
            }
            if (node !== 'Root') {
                options.push(
                    <option key={node} value={node}>
                        {node}
                    </option>
                );
            } else {
                options.push(
                    <option value="" hidden defaultValue key={node}>
                        {node}
                    </option>
                );
            }
            traverseTree(node.left);
            traverseTree(node.right);
        };

        nodes.forEach(layer => layer.forEach(node => traverseTree(node)));

        return options;
    };

    const handleClickStartNode = (node) => {
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
                                <DropdownContainer>
                                    Final Node:
                                    <SelectContainer
                                        onChange={(e) => handleSelectFinalNode(e.target.value)}
                                        value={finalNode}>
                                        {renderTreeOptions(nodeArr)}
                                    </SelectContainer>
                                </DropdownContainer>
                            </MDBCol>
                        </MDBRow>
                        <InputButtons
                            resetForm={resetFormValues}
                            setExampleData={setExampleData}
                            solveAlgorithm={handleSolveAlgorithm}/>
                    </InputField>
                </GridItem>
                <GridItem switchRows>
                    <Scenario scenario={getScenario("Kademlia", "scenario")}/>
                </GridItem>
            </FieldGridFirst>
            <Field>
                <Headline>Algorithm</Headline>
                <Tree>
                    {nodeArr.map((nodes, layerIndex) => (
                        <Layer key={`L${layerIndex}`} layerIndex={layerIndex} nodeArr={nodeArr}>
                            {nodes.map((node, nodeIndex) => (
                                <CircleContainer key={`C${nodeIndex}`} onClick={() => handleClickStartNode(node)}>
                                    <Circle id={`N${node}`} node={node} startNode={startNode}
                                            finalNode={finalNode}>
                                        {node}
                                    </Circle>
                                </CircleContainer>
                            ))}
                        </Layer>
                    ))}
                    {nodeArr.map((nodes, layerIndex) => (
                        <React.Fragment>
                            {nodes.map((node, nodeIndex) => (layerIndex !== nodeArr.length - 1 &&
                                <React.Fragment>
                                    <Xarrow
                                        divContainerStyle={{
                                            color: 'var(---tertiary)',
                                            fontWeight: 'bold',
                                        }}
                                        start={`N${node}`}
                                        end={`N${nodeArr[layerIndex + 1][nodeIndex * 2]}`}
                                        showHead={false}
                                        showTail={false}
                                        endAnchor={"top"}
                                        _cpy2Offset={-20}
                                        labels={'0'}
                                        color={'darkgray'}
                                        curveness={0}
                                    />
                                    <Xarrow
                                        divContainerStyle={{
                                            color: 'var(---tertiary)',
                                            fontWeight: 'bold',
                                        }}
                                        start={`N${node}`}
                                        end={`N${nodeArr[layerIndex + 1][(nodeIndex * 2) + 1]}`}
                                        showHead={false}
                                        showTail={false}
                                        endAnchor={"top"}
                                        _cpy2Offset={-20}
                                        labels={'1'}
                                        color={'darkgray'}
                                        curveness={0}
                                    />
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </Tree>
            </Field>
        </FieldGrid>
    );
};

const Tree = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
`;

const Layer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin-bottom: ${props => props.layerIndex === props.nodeArr.length - 1 ? 0 : 40 * props.layerIndex}px;
`;

const CircleContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
`;

const Circle = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid black;
    justify-content: center;
    align-items: center;
    margin: 5px;
    z-index: 1;
    background-color: ${props => {
        if (props.node === props.startNode) {
            return 'var(---secondary)';
        } else if (props.node === props.finalNode) {
            return 'var(---fifth)';
        } else {
            return 'white';
        }
    }};

    &:hover {
        background-color: var(---secondary);
    }
`;


export default Kademlia;
