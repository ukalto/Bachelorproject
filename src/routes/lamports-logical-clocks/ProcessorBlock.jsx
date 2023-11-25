import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const ProcessorBlock = ({rowAmount, activeEditMode}) => {
    const [blockArray, setBlockArray] = useState([]);

    useEffect(() => {
        const newBlockArray = [];
        if (blockArray.length === 0) {
            newBlockArray.push(0);
            newBlockArray.push(1);
            for (let i = 2; i < rowAmount; i++) {
                newBlockArray.push(newBlockArray[1] * i);
            }
        } else {
            newBlockArray.push(blockArray[0]);
            newBlockArray.push(blockArray[1]);
            for (let i = 2; i < rowAmount; i++) {
                newBlockArray.push(newBlockArray[1] * i);
            }
        }
        setBlockArray(newBlockArray);
    }, [rowAmount]);

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
                        activeEditMode={activeEditMode}
                        value={value}
                        index={index}
                        min={0}
                        isLast={index === rowAmount - 1}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        disabled={!activeEditMode || index !== 1}
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

  background: ${({
                   activeEditMode,
                   index
                 }) => (!activeEditMode || index !== 1 ? 'var(---fourth)' : 'var(---primary)')};;

  &:focus {
    outline: none;
  }

  cursor: ${({
               activeEditMode,
               index
             }) => {
    if (index === 1 && activeEditMode) {
      return 'text';
    } else if (!activeEditMode) {
      return 'pointer';
    } else {
      return 'default';
    }
  }};

  &:hover {
    background: ${({activeEditMode}) => (activeEditMode ? "default" : "var(---secondary)")};
  }
`;
