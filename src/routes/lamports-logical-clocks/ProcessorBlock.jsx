import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const ProcessorBlock = ({rowAmount}) => {
    const [blockArray, setBlockArray] = useState([]);

    useEffect(() => {
        // Update the number of rows while preserving the value in the second field
        const newBlockArray = [];
        if (blockArray.length === 0) {
            // Initialize the array when it's empty
            newBlockArray.push(0); // First entry
            newBlockArray.push(1); // Second entry (preserving its value)
            for (let i = 2; i < rowAmount; i++) {
                // Calculate the subsequent values based on the second number (newBlockArray[1])
                newBlockArray.push(newBlockArray[1] * i);
            }
        } else {
            // Preserve the value in the second field and update the number of rows
            newBlockArray.push(blockArray[0]); // Preserve the first entry
            newBlockArray.push(blockArray[1]); // Preserve the second entry
            for (let i = 2; i < rowAmount; i++) {
                // Calculate the subsequent values based on the second number (newBlockArray[1])
                newBlockArray.push(newBlockArray[1] * i);
            }
        }
        setBlockArray(newBlockArray);
    }, [blockArray, rowAmount]);

    const handleInputChange = (index, newValue) => {
        if (newValue === '') {
            const newBlockArray = [...blockArray];
            newBlockArray[index] = '';
            setBlockArray(newBlockArray);
        } else {
            const parsedValue = parseInt(newValue, 10);

            if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
                const newBlockArray = [...blockArray];
                newBlockArray[index] = parsedValue;

                for (let i = 2; i < newBlockArray.length; i++) {
                    newBlockArray[i] = newBlockArray[1] * i;
                }
                setBlockArray(newBlockArray);
            }
        }
    };

    return (
        <BlockContainer>
            {blockArray.map((value, index) => (
                <InputWrapper key={index} isLast={index === rowAmount - 1}>
                    <StyledInput
                        type="text"
                        value={value}
                        min={0}
                        isLast={index === rowAmount - 1}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        disabled={index !== 1}
                        style={{
                            background: index !== 1 ? 'var(---fourth)' : 'var(---primary)',
                        }}
                    />
                </InputWrapper>
            ))}
        </BlockContainer>
    );
};

export default ProcessorBlock;

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
