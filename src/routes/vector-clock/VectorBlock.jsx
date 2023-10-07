import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const VectorBlock = ({vectorsAmount, disabled}) => {
    const [blockArray, setBlockArray] = useState(
        new Array(vectorsAmount).fill('').map(() => new Array(vectorsAmount).fill(0))
    );

    useEffect(() => {
        const newBlockArray = new Array(vectorsAmount)
            .fill('')
            .map((_, rowIndex) => {
                const row = blockArray[rowIndex] || [];
                if (row.length < vectorsAmount) {
                    return [...row, ...new Array(vectorsAmount - row.length).fill(0)];
                }
                return row.slice(0, vectorsAmount);
            });

        setBlockArray(newBlockArray);
    }, [blockArray, vectorsAmount]);

    const handleInputChange = (rowIndex, colIndex, newValue) => {
        if (!disabled && (newValue === '' || (parseInt(newValue) >= 0 && parseInt(newValue) <= 94))) {
            const newBlockArray = [...blockArray];
            newBlockArray[rowIndex][colIndex] = newValue === '' ? 0 : parseInt(newValue);
            setBlockArray(newBlockArray);
        }
    };

    return (
        <BlockContainer>
            {blockArray.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((_, colIndex) => (
                        <InputWrapper key={colIndex} isLast={colIndex === vectorsAmount - 1}>
                            <StyledInput
                                type="text"
                                value={blockArray[rowIndex][colIndex]}
                                min={0}
                                max={94}
                                disabled={disabled} // Pass the disabled prop
                                isLast={colIndex === vectorsAmount - 1}
                                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                            />
                        </InputWrapper>
                    ))}
                </div>
            ))}
        </BlockContainer>
    );
};

export default VectorBlock;

const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: ${({isLast}) => (isLast ? '10px' : '0')};
`;

const StyledInput = styled.input`
  width: 30px;
  height: 30px;
  border: 0;
  border-top: 1px solid var(---tertiary);
  border-left: 1px solid var(---tertiary);
  border-right: 1px solid var(---tertiary);
  border-bottom: ${({isLast}) => (isLast ? '1px' : '0')} solid var(---tertiary);
  text-align: center;

  &:focus {
    outline: none;
  }
`;
