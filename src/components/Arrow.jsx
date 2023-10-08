import React from 'react';
import styled from 'styled-components';

const Arrow = ({isRight, width}) => {
    return (
        <LineContainer>
            {isRight ? (
                <>
                    <Line width={width}/>
                    <ArrowComponent isRight={isRight}/>
                </>
            ) : (
                <>
                    <ArrowComponent isRight={isRight}/>
                    <Line width={width}/>
                </>
            )}
        </LineContainer>
    );
};

export default Arrow;

const LineContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Line = styled.div`
  width: ${({width}) => width}%;
  border-bottom: 1px solid #000;
`;

const ArrowComponent = styled.div`
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #000;
  margin-right: ${({isRight}) => isRight ? '5px' : '-5px'};

  transform: ${({isRight}) => isRight ? 'rotate(0deg) translateY(5px)' : 'rotate(180deg) translateY(-5px)'};
`;
