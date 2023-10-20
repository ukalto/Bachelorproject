import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const GreedySheet = ({
                         rowsAmount,
                         columnsAmount,
                         sheetData,
                         updateSheetData,
                         setShowResult,
                         checkedState,
                         resetCheckedState,
                         result
                     }) => {
    const [sheet, setSheet] = useState(sheetData);

    useEffect(() => {
        setSheet(sheetData);
    }, [sheetData]);

    useEffect(() => {
        updateSheetData(rowsAmount, columnsAmount);
    }, [rowsAmount, columnsAmount]);

    const handleChange = (rowIndex, columnIndex, value) => {
        if (Number(value) >= 0 && Number(value) <= 99999) {
            const newSheet = sheet.map((row, rIndex) =>
                row.map((cell, cIndex) => {
                    if (rIndex === rowIndex && cIndex === columnIndex) {
                        return parseInt(value, 10);
                    }
                    return cell;
                })
            );
            setSheet(newSheet);
            setShowResult(false);
            resetCheckedState();
        }
    };

    const handleStyledInputTextStyle = (rowIndex) => {
        if (checkedState[0][0] && result.First_Server === `Latency ${rowIndex + 1}`) {
            return {
                backgroundColor: checkedState[0][1],
                color: 'var(---primary)',
            };
        } else if (checkedState[1][0] && result.Second_Server === `Latency ${rowIndex + 1}`) {
            return {
                backgroundColor: checkedState[1][1],
                color: 'var(---primary)',
            };
        } else {
            return {
                backgroundColor: 'var(---fourth)',
                color: 'var(---tertiary)',
            };
        }
    };

    const handleStyledInputStyle = (rowIndex, colIndex) => {
        if (checkedState[2][0] && smallestIndices.some(([row, col]) => row === rowIndex && col === colIndex)) {
            return {
                backgroundColor: checkedState[2][1],
                color: 'var(---primary)',
            };
        } else {
            return {
                backgroundColor: 'var(---primary)',
                color: 'var(---tertiary)',
            };
        }
        ;
    };

    const findSmallestIndices = (array) => {
        if (checkedState[2][0]) {
            const resultArray = [];

            for (let i = 0; i < array[0].length; i++) {
                let min = array[0][i];
                let minIndex = 0;

                for (let j = 1; j < array.length; j++) {
                    if (array[j][i] < min) {
                        min = array[j][i];
                        minIndex = j;
                    }
                }

                resultArray.push([minIndex, i]);
            }

            return resultArray;
        }
        return undefined;
    };

    const smallestIndices = findSmallestIndices(sheet);

    return (
        <SheetContainer>
            {sheet.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {rowIndex === 0 ? (
                        <First>
                            <StyledInputMain
                                disabled
                            />
                            <StyledInputText
                                style={handleStyledInputTextStyle(rowIndex)}
                                value={`Latency ${rowIndex + 1}`}
                                disabled
                            />
                        </First>
                    ) : (
                        <StyledInputText
                            style={handleStyledInputTextStyle(rowIndex)}
                            value={`Latency ${rowIndex + 1}`}
                            disabled
                        />
                    )}
                    {row.map((cell, columnIndex) => (
                        <div key={columnIndex}>
                            {rowIndex === 0 ? (
                                <StyledInputText
                                    value={`Client ${columnIndex + 1}`}
                                    disabled
                                />
                            ) : null}
                            <StyledInput
                                isLastColumn={columnIndex === columnsAmount}
                                isLastRow={rowIndex === rowsAmount}
                                type="number"
                                max={99999}
                                value={cell}
                                style={handleStyledInputStyle(rowIndex, columnIndex)}
                                onChange={(e) =>
                                    handleChange(rowIndex, columnIndex, e.target.value)
                                }
                            />
                        </div>
                    ))}
                </div>
            ))}
        </SheetContainer>
    );
};

export default GreedySheet;

const SheetContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`;

const StyledInput = styled.input`
  width: 120px;
  height: 50px;
  border: 1px solid var(---tertiary);
  margin: 1px;
  background-color: var(---primary);
  text-align: center;

  &:focus {
    outline: 1px solid var(---tertiary);
  }

  @media (max-width: 1350px) {
    width: 70px;
  }
`;

const First = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const StyledInputText = styled.input`
  width: 120px;
  height: 50px;
  border: 1px solid var(---tertiary);
  margin: 1px;
  text-align: center;

  @media (max-width: 1350px) {
    width: 70px;
  }
`;

const StyledInputMain = styled.input`
  width: 120px;
  height: 50px;
  margin: 1px;
  border: none;
  background-color: var(---primary);
  @media (max-width: 1350px) {
    width: 70px;
  }
`;
