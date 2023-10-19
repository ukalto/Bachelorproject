import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const GreedySheet = ({rowsAmount, columnsAmount, sheetData, updateSheetData, setShowResult}) => {
    const [sheet, setSheet] = useState(sheetData);

    useEffect(() => {
        setSheet(sheetData);
    }, [sheetData]);

    const handleChange = (rowIndex, columnIndex, value) => {
        if ((Number(value) >= 0 && Number(value) <= 99999)) {
            const newSheet = [...sheet];
            newSheet[rowIndex][columnIndex] = parseInt(value, 10);
            setSheet(newSheet);
            setShowResult(false);
        }
    };

    useEffect(() => {
        updateSheetData(rowsAmount, columnsAmount);
    }, [rowsAmount, columnsAmount]);

    return (
        <SheetContainer>
            {sheet.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {rowIndex === 0 ? (
                        <First>
                            <StyledInputMain disabled/>
                            <StyledInputText
                                value={`Latency ${rowIndex + 1}`}
                                disabled
                            />
                        </First>
                    ) : (
                        <StyledInputText value={`Latency ${rowIndex + 1}`} disabled/>
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
                                max={10000}  // Set the maximum value to 10000
                                value={cell}
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
  background-color: var(---fourth);

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
