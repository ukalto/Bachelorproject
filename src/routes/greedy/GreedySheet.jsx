import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const GreedySheet = ({ rowsAmount, columnsAmount }) => {
    const [sheet, setSheet] = useState([]);

    useEffect(() => {
        // Create a 2D array for the sheet with all elements initialized to 0
        const newSheet = Array.from({ length: rowsAmount }, () =>
            Array(columnsAmount).fill(0)
        );
        setSheet(newSheet);
    }, [rowsAmount, columnsAmount]);

    const handleInputChange = (rowIndex, columnIndex, value) => {
        const newSheet = [...sheet];
        newSheet[rowIndex][columnIndex] = parseInt(value, 10);
        setSheet(newSheet);
    };

    return (
        <SheetContainer>
            {sheet.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {rowIndex === 0 ? (
                        <First>
                            <StyledInputMain
                                value="Latency for a client to reach a Location"
                                disabled
                                rows={2}
                            />
                            <StyledInput
                                value={`Client ${rowIndex + 1}`}
                                disabled
                            />
                        </First>
                    ) : (
                        <StyledInput
                            value={`Client ${rowIndex + 1}`}
                            disabled
                        />
                    )}
                    {row.map((cell, columnIndex) => (
                        <div key={columnIndex}>
                            {rowIndex === 0 ? (
                                <StyledInput
                                    value={`L ${columnIndex + 1}`}
                                    disabled
                                />
                            ) : null}
                            <StyledInput
                                isLastColumn={columnIndex === columnsAmount}
                                isLastRow={rowIndex === rowsAmount}
                                type="number"
                                max={1000}
                                value={cell}
                                onChange={(e) =>
                                    handleInputChange(rowIndex, columnIndex, e.target.value)
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
`;

const First = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const StyledInputMain = styled.textarea`
  width: 120px;
  height: 50px;
  border: 1px solid var(---tertiary);
  text-align: center;
  font-size: 12px;
  resize: none;
  margin: 1px;
`;
