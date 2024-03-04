import React, {useEffect, useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField,
    marginsInput,
    GridItem,
    FieldGridFirst,
    RangeBox,
} from '../../components/GlobalComponents.jsx';
import {Scenario} from "../../components/Scenario";
import InputButtons from "../../components/InputButtons";
import {MDBCol, MDBRow} from "mdb-react-ui-kit";
import {getScenario} from "../../components/GlobalFunctions.jsx";
import RangeSlider from "../../components/RangeSlider.jsx";
import styled from "styled-components";
import Xarrow from "react-xarrows";

class Node {
    constructor(identifier) {
        this.identifier = identifier;
        this.parent = null;
        this.children = [];
    }
}

const PolymorphPolyring = () => {
        const [depth, setDepth] = useState(3);
        const [nodesAmount, setNodesAmount] = useState(4);
        const [graph, setGraph] = useState([]);
        const [nodeArr, setNodeArr] = useState([]);
        const [startNode, setStartNode] = useState(null);
        const [finalNode, setFinalNode] = useState(null);

        useEffect(() => {
            const newGraph = constructGraph(depth, nodesAmount);
            setGraph(newGraph);
            const newNodeArr = [];
            for (let i = 0; i < depth; i++) {
                newNodeArr.push(findNodesByLayer(newGraph, i))
            }
            setNodeArr(newNodeArr);
        }, [depth, nodesAmount]);

        const constructGraph = (depth, nodeAmount) => {
            let graph = [];

            for (let i = 0; i < nodeAmount; i++) {
                graph.push(new Node(String(i)));
            }

            for (let d = 1; d < depth; d++) {
                const nextLayer = [];
                for (const node of graph) {
                    for (let i = 0; i < nodeAmount; i++) {
                        const childIdentifier = node.identifier + '.' + i;
                        const child = new Node(childIdentifier);
                        child.parent = node;
                        node.children.push(child);
                        nextLayer.push(child);
                    }
                }
                graph = nextLayer;
            }

            return graph;
        };

        const findNodesByLayer = (graph, layer) => {
            const nodesAtLayer = new Map();

            const countDepth = (identifier) => (identifier.match(/\./g) || []).length;

            const traverseAndCollect = (node) => {
                const nodeDepth = countDepth(node.identifier);
                if (nodeDepth === layer) {
                    nodesAtLayer.set(node.identifier, node);
                }
                if (node.parent) {
                    traverseAndCollect(node.parent);
                }
            };

            graph.forEach(node => {
                traverseAndCollect(node);
            });

            return Array.from(nodesAtLayer.values());
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
            console.log(graph);
            console.log("------------------------------")
            console.log(findNodesByLayer(graph, 0))
            console.log(findNodesByLayer(graph, 1))
            console.log(findNodesByLayer(graph, 2))
        };

        const createArrowsBetweenNodes = (nodeArr, nodesAmount) => {
            let components = [];

            if (nodeArr) {
                nodeArr.forEach((arr, index) => {
                    if (index === 0) {
                        arr.forEach(outer => {
                            arr.forEach(inner => {
                                if (outer !== inner) {
                                    components.push(
                                        <Xarrow
                                            key={`P${outer.identifier}-${inner.identifier}`}
                                            lineColor={'gray'}
                                            showTail={false}
                                            showHead={false}
                                            curveness={0}
                                            start={`N${outer.identifier}`}
                                            end={`N${inner.identifier}`}
                                            startAnchor={"middle"}
                                            endAnchor={"middle"}
                                        />
                                    );
                                }
                            })
                        })
                    } else {
                        let start = 0;
                        let end = nodesAmount;
                        for (let i = 0; i < Math.pow(nodesAmount, index); i++) {
                            const tempArr = arr.slice(start, end);
                            tempArr.forEach(outer => {
                                tempArr.forEach(inner => {
                                    if (outer !== inner) {
                                        components.push(
                                            <Xarrow
                                                key={`C${outer.identifier}-${inner.identifier}`}
                                                lineColor={'gray'}
                                                showTail={false}
                                                showHead={false}
                                                curveness={0}
                                                start={`N${outer.identifier}`}
                                                end={`N${inner.identifier}`}
                                                startAnchor={"middle"}
                                                endAnchor={"middle"}
                                            />
                                        );
                                    }
                                })
                                components.push(
                                    <Xarrow
                                        key={`P${outer.parent.identifier}-${outer.identifier}`}
                                        lineColor={'gray'}
                                        showTail={false}
                                        showHead={false}
                                        curveness={0}
                                        start={`N${outer.identifier}`}
                                        end={`N${outer.parent.identifier}`}
                                        startAnchor={"middle"}
                                        endAnchor={"middle"}
                                    />
                                );
                            })
                            start = end;
                            end += nodesAmount;
                        }
                    }
                })
            }
            return components;
        };


        return (
            <FieldGrid>
                <FieldGridFirst>
                    <GridItem>
                        <InputField>
                            <Headline>Inputs</Headline>
                            <MDBRow tag="form" className='g-3' style={marginsInput}>
                                <MDBCol md="4">
                                    <RangeBox>
                                        <RangeSlider text={"Depth"} min={2} max={3} value={depth}
                                                     onChange={setDepth}/>
                                    </RangeBox>
                                </MDBCol>
                                <MDBCol md="8">
                                    <RangeBox>
                                        <RangeSlider text={"Nodes Amount/Depth"} min={2} max={4} value={nodesAmount}
                                                     onChange={setNodesAmount}/>
                                    </RangeBox>
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
                    <NodeWrapper depth={depth}>
                        <SubgraphContainer>
                            {nodeArr.length > 0 && nodeArr[0].map((node, index) => (
                                <NodeStyle
                                    id={`N${node.identifier}`}
                                    key={index}
                                    index={index}
                                    nodesAmount={nodeArr[0].length}
                                    radius={1}>
                                    {node.identifier}
                                </NodeStyle>
                            ))}
                        </SubgraphContainer>
                        <SubgraphContainer>
                            {nodeArr.length > 1 && nodeArr[1].map((node, index) => (
                                <NodeStyle
                                    id={`N${node.identifier}`}
                                    key={index}
                                    index={index}
                                    nodesAmount={nodeArr[1].length}
                                    radius={1}>
                                    {node.identifier}
                                </NodeStyle>
                            ))}
                        </SubgraphContainer>
                        <SubgraphContainer>
                            {nodeArr.length > 2 && nodeArr[2].map((node, index) => (
                                <NodeStyle
                                    id={`N${node.identifier}`}
                                    key={index}
                                    index={index}
                                    nodesAmount={nodeArr[2].length}
                                    radius={2}>
                                    {node.identifier}
                                </NodeStyle>
                            ))}
                        </SubgraphContainer>
                    </NodeWrapper>
                    {createArrowsBetweenNodes(nodeArr, nodesAmount)}
                </Field>
            </FieldGrid>
        );
    }
;

export default PolymorphPolyring;

const NodeWrapper = styled.div`
    position: relative;
    height: ${props => 350 + 220 * props.depth}px;
    margin: 0 auto;
    width: 100%;
`;

const SubgraphContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
`;

const NodeStyle = styled.button`
    display: block;
    position: absolute;
    font-size: 12px;
    font-weight: bold;
    width: 35px;
    z-index: 2;
    height: 35px;
    border-radius: 50%;
    border: 2px solid var(---tertiary);
    text-align: center;
    transform: ${props => {
        const radius = 15 * props.nodesAmount / props.radius;
        const angle = (2 * Math.PI * props.index) / props.nodesAmount;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return `translate(${y}px, ${-x}px)`;
    }};
    margin: -15px 0 0 -15px;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;

    &:hover {
        background-color: var(---secondary);
        border-color: var(---tertiary);
        color: var(---primary);
    }

    background-color: var(---primary);
    border-color: var(---tertiary);
    color: var(---tertiary);
`;
