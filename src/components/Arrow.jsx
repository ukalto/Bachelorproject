import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {BsFillEnvelopeFill, BsFillEnvelopeOpenFill} from 'react-icons/bs';

const Arrow = ({
                   isRight,
                   width,
                   isAnimatingToLeft,
                   isAnimatingToRight,
                   showRightEnvelopeOpen,
                   showLeftEnvelopeOpen
               }) => {
    const arrowContainerRef = useRef();
    const [arrowContainerWidth, setArrowContainerWidth] = useState(0);

    useEffect(() => {
        if (arrowContainerRef.current) {
            const width = arrowContainerRef.current.offsetWidth;
            setArrowContainerWidth(width);
        }
    }, []);

    return (
        <LineContainer>
            <AnimationContainer>
                {!isRight ? (
                    <EnvelopeOpenFillContainer>
                        {showLeftEnvelopeOpen && <BsFillEnvelopeOpenFill/>}
                    </EnvelopeOpenFillContainer>
                ) : (
                    <EnvelopeFillContainer>
                        {isAnimatingToRight && (
                            <MovingEnvelopeFill isRight={isRight} arrowContainerWidth={arrowContainerWidth}>
                                <BsFillEnvelopeFill/>
                            </MovingEnvelopeFill>
                        )}
                    </EnvelopeFillContainer>
                )}
                <ArrowContainer ref={arrowContainerRef}>
                    {!isRight && <ArrowComponent isRight={isRight}/>}
                    <Line width={width}/>
                    {isRight && <ArrowComponent isRight={isRight}/>}
                </ArrowContainer>
                {isRight ? (
                    <EnvelopeOpenFillContainer>
                        {showRightEnvelopeOpen && <BsFillEnvelopeOpenFill/>}
                    </EnvelopeOpenFillContainer>
                ) : (
                    <EnvelopeFillContainer>
                        {isAnimatingToLeft && (
                            <MovingEnvelopeFill isRight={isRight} arrowContainerWidth={arrowContainerWidth}>
                                <BsFillEnvelopeFill/>
                            </MovingEnvelopeFill>
                        )}
                    </EnvelopeFillContainer>
                )}
            </AnimationContainer>
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

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const AnimationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr 1fr;
  align-items: center;
  width: 100%;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 2fr 7fr 2fr;
  }
`;

const ArrowComponent = styled.div`
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #000;
  margin-right: ${({isRight}) => (isRight ? '5px' : '-5px')};
  margin-left: ${({isRight}) => (isRight ? '-5px' : '5px')};
  transform: ${({isRight}) =>
          isRight ? 'rotate(0deg) translateX(5px)' : 'rotate(180deg) translateX(5px)'};
`;

const EnvelopeFillContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
`;

const EnvelopeOpenFillContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(---fifth);
  margin-right: 5px;
  margin-left: 5px;
`;

const MovingEnvelopeFill = styled.div`
  display: flex;
  align-items: center;
  animation-name: ${({isRight}) => (isRight ? 'right-slide-left' : 'right-slide-right')};
  animation-iteration-count: infinite;
  position: relative;
  animation-duration: 3s;

  @keyframes right-slide-right {
    0% {
      top: 0;
      right: 0;
    }
    100% {
      top: 0;
      right: ${({arrowContainerWidth}) => arrowContainerWidth + 10}px;
    }
  }

  @keyframes right-slide-left {
    0% {
      top: 0;
      left: 0;
    }
    100% {
      top: 0;
      left: ${({arrowContainerWidth}) => arrowContainerWidth + 10}px;
    }
  };
`;
