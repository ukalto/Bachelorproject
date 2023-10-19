import React, {useState} from 'react';
import {
    FieldGrid,
    Field,
    Headline,
    InputField,
    marginsInput,
    InfoBox,
    RangeBox, ResultBox, GridItem, ResultText, ResultHeadline,
} from '../../components/GlobalComponents.jsx';
import {Scenario} from '../../components/Scenario';
import InputButtons from '../../components/InputButtons';
import {MDBCol, MDBRow} from 'mdb-react-ui-kit';
import {getScenario} from '../../components/Helper.jsx';
import RangeSlider from '../../components/RangeSlider.jsx';
import GreedySheet from './GreedySheet.jsx';
import data from '../../assets/data.json';
import {GreedySolver} from "./GreedySolver.js";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Greedy = () => {
    const [rowsAmount, setRowsAmount] = useState(3);
    const [columnsAmount, setColumnsAmount] = useState(3);
    const [sheetData, setSheetData] = useState(
        Array.from({length: rowsAmount}, () =>
            Array(columnsAmount).fill(0)
        )
    );
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState(null);
    const [example] = useState(() => {
        const exampleData = data.data.find(item => item.name === 'Greedy');
        const {rows, columns, values} = exampleData.details.find(item => item.type === 'example');
        return {rows, columns, values};
    });


    const resetFormValues = () => {
        const newSheet = Array.from({length: 3}, () => Array(3).fill(0));
        setSheetData(newSheet);
        setRowsAmount(3);
        setColumnsAmount(3);
        setShowResult(false);
    };

    const updateSheetData = (newRowsAmount, newColumnsAmount) => {
        const newSheet = Array.from({length: newColumnsAmount}, () =>
            Array(newRowsAmount).fill(0)
        );

        for (let i = 0; i < Math.min(columnsAmount, newColumnsAmount); i++) {
            for (let j = 0; j < Math.min(rowsAmount, newRowsAmount); j++) {
                newSheet[i][j] = sheetData[i][j];
            }
        }

        setSheetData(newSheet);
        setRowsAmount(newRowsAmount);
        setColumnsAmount(newColumnsAmount);
        setShowResult(false);
    };

    const setExampleData = () => {
        const newSheet = Array.from({length: example.columns}, () =>
            Array(example.rows).fill(0)
        );

        example.values.slice(0, example.columns).forEach((row, i) => {
            newSheet[i] = row.slice(0, example.rows);
        });

        setRowsAmount(example.rows);
        setColumnsAmount(example.columns);
        setSheetData(newSheet);
        setShowResult(false);
    };


    const handleSolveAlgorithm = () => {
        if (validateSheet()) {
            const solver = new GreedySolver(sheetData);
            const solveResult = solver.solveSheetData();
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
        for (let i = 0; i < sheetData.length; i++) {
            for (let j = 0; j < sheetData[i].length; j++) {
                if (isNaN(sheetData[i][j])) {
                    return false;
                }
            }
        }
        return true;
    };

    return (
        <FieldGrid>
            <GridItem>
                <InputField>
                    <Headline>Inputs</Headline>
                    <MDBRow tag="form" className="g-3" style={marginsInput}>
                        <MDBCol md="6">
                            <RangeBox>
                                <RangeSlider
                                    text={'Rows'}
                                    min={2}
                                    max={7}
                                    value={rowsAmount}
                                    onChange={(newRowsAmount) =>
                                        updateSheetData(newRowsAmount, columnsAmount)
                                    }
                                />
                            </RangeBox>
                        </MDBCol>
                        <MDBCol md="6">
                            <RangeBox>
                                <RangeSlider
                                    text={'Columns'}
                                    min={2}
                                    max={7}
                                    value={columnsAmount}
                                    onChange={(newColumnsAmount) =>
                                        updateSheetData(rowsAmount, newColumnsAmount)
                                    }
                                />
                            </RangeBox>
                        </MDBCol>
                    </MDBRow>
                    <InputButtons resetForm={resetFormValues} setExampleData={setExampleData}
                                  solveAlgorithm={handleSolveAlgorithm}/>
                </InputField>
            </GridItem>
            <GridItem switchRows>
                <Scenario scenario={getScenario('Greedy', 'scenario')}/>
            </GridItem>
            <Field>
                <Headline>Algorithm</Headline>
                {showResult && (
                    <ResultBox>
                        <ResultHeadline>Result</ResultHeadline>
                        {Object.keys(result).map((key) => (
                            <ResultText key={key}>
                                {key.replace("_", " ")} : <b>{result[key]}</b>
                            </ResultText>
                        ))}
                    </ResultBox>
                )}
                <GreedySheet
                    rowsAmount={rowsAmount}
                    columnsAmount={columnsAmount}
                    sheetData={sheetData}
                    updateSheetData={updateSheetData}
                    setShowResult={setShowResult}
                />
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
                <InfoBox>Not Available</InfoBox>
            </Field>
            <ToastContainer/>
        </FieldGrid>
    );
};

export default Greedy;
