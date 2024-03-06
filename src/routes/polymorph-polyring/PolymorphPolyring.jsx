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
import LineTo from "react-lineto";
import data from "../../assets/data.json";

class Node {
    constructor(identifier) {
        this.identifier = identifier;
        this.parent = null;
        this.children = [];
    }
}

const PolymorphPolyring = () => {
    const [depth, setDepth] = useState(3);
    const [nodesAmount, setNodesAmount] = useState(3);
    const maxDepth = 3;
    const maxNodesAmount = 4;
    const [nodesCount, setNodesCount] = useState(0);
    const [nodeArr, setNodeArr] = useState([]);
    const [lines, setLines] = useState(null);
    const [pathNodes, setPathNodes] = useState([]);
    const [nextIndexToReplace, setNextIndexToReplace] = useState(0);
    const [example] = useState(() => {
        const exampleData = data.data.find(item => item.name === 'PolymorphPolyring');
        const {
            depth,
            nodesAmount,
            pathNodes
        } = exampleData.details.find(item => item.type === 'example');
        return {
            depth, nodesAmount, pathNodes
        };
    });

    useEffect(() => {
        const graph = constructGraph(depth, nodesAmount);

        const newNodeArr = [];
        let newNodesCount = 0;

        for (let i = 0; i < depth; i++) {
            const newLayer = findNodesByLayer(graph, i);
            newNodeArr.push(newLayer);
            newNodesCount += newLayer.length;
        }

        setNodeArr(newNodeArr);
        setNodesCount(newNodesCount);
    }, [depth, nodesAmount]);

    useEffect(() => {
        if (nodeArr.length > 0) {
            const newLines = createLinesBetweenNodes(nodeArr, nodesAmount);
            setLines(newLines);
        }
    }, [nodeArr, nodesAmount]);


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

    const nodeClick = (nodeId) => {
        setPathNodes((prevPathNodes) => {
            const updatedPathNodes = [...prevPathNodes];
            updatedPathNodes[nextIndexToReplace] = nodeId;
            return updatedPathNodes;
        });

        setNextIndexToReplace((prevIndex) => (prevIndex + 1) % 2);
    };


    const setExampleData = () => {
        setDepth(example.depth);
        setNodesAmount(example.nodesAmount);
        setPathNodes(example.pathNodes);
    };

    const resetFormValues = () => {
        setDepth(3);
        setNodesAmount(3);
        setPathNodes([])
        setNextIndexToReplace(0);
    };

    const handleSolveAlgorithm = async () => {

    };

    const createLineTo = (outer, arr, uniqueLines, components) => {
        arr.forEach(inner => {
            if (outer !== inner) {
                const ids = [inner.identifier, outer.identifier].sort();
                const key = `P${ids[0]}-${ids[1]}`;

                if (!uniqueLines.has(key)) {
                    uniqueLines.add(key);
                    components.push(
                        <LineTo
                            key={key}
                            from={`N${ids[0]}`}
                            to={`N${ids[1]}`}
                            borderColor={'gray'}
                            borderWidth={3}
                            borderStyle={'solid'}
                            className={'my-custom-line-class'}
                        />
                    );
                }
            }
        });
    }

    const createLinesBetweenNodes = (nodeArr, nodesAmount) => {
        let components = [];
        let uniqueLines = new Set();

        if (nodeArr) {
            nodeArr.forEach((arr, index) => {
                if (index === 0) {
                    arr.forEach(outer => {
                        createLineTo(outer, arr, uniqueLines, components);
                    });
                } else {
                    let start = 0, end = nodesAmount;
                    for (let i = 0; i < Math.pow(nodesAmount, index); i++) {
                        const tempArr = arr.slice(start, end);
                        tempArr.forEach(outer => {
                            createLineTo(outer, tempArr, uniqueLines, components);

                            components.push(
                                <LineTo
                                    key={`P${outer.parent.identifier}-${outer.identifier}`}
                                    from={`N${outer.parent.identifier}`}
                                    to={`N${outer.identifier}`}
                                    borderColor={'gray'}
                                    borderWidth={3}
                                    borderStyle={'solid'}
                                />
                            );
                        });
                        start = end;
                        end += nodesAmount;
                    }
                }
            });
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
                                    <RangeSlider text={"Depth"} min={2} max={maxDepth} value={depth}
                                                 onChange={setDepth}/>
                                </RangeBox>
                            </MDBCol>
                            <MDBCol md="8">
                                <RangeBox>
                                    <RangeSlider text={"Nodes Amount/Depth"} min={2} max={maxNodesAmount}
                                                 value={nodesAmount}
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
                <NodeWrapper nodesCount={nodesCount}>
                    {nodeArr.map((subArray, subIndex) => (
                        <SubgraphContainer key={subIndex}>
                            {subArray.map((node, index) => (
                                <NodeStyle
                                    className={`N${node.identifier}`}
                                    key={index}
                                    index={index}
                                    depth={1.15 * (maxNodesAmount / nodesAmount)}
                                    nodesAmount={subArray.length}
                                    radiusDecrease={subIndex !== 1 ? 1.3 : 1}
                                    inPath={pathNodes.includes(node.identifier)}
                                    onClick={() => nodeClick(node.identifier)}>
                                    {node.identifier}
                                </NodeStyle>
                            ))}
                        </SubgraphContainer>
                    ))}
                </NodeWrapper>
                {lines}
            </Field>
        </FieldGrid>
    );
};

export default PolymorphPolyring;

const NodeWrapper = styled.div`
    position: relative;
    height: ${props => 350 + 10 * props.nodesCount}px;
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
        const radius = 10 * props.nodesAmount * props.depth / props.radiusDecrease;
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

    background-color: ${props => props.inPath ? 'var(---secondary)' : 'var(---primary)'};
    border-color: var(---tertiary);
    color: ${props => props.inPath ? 'var(---primary)' : 'var(---tertiary)'};
`;
