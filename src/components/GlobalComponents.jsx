import styled from "styled-components";

export const FieldGridFirst = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`;

export const FieldGrid = styled.div`
  display: grid;
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`;

export const GridItem = styled.div`
  @media (max-width: 768px) {
    grid-row: ${({switchRows}) => (switchRows ? 1 : 0)};
  }
`;

export const Headline = styled.h6`
    font-size: 40px;
    display: flex;
`;

export const Field = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: var(---primary);
  border-radius: 10px;
  border: solid 2px var(---secondary);
  color: var(---tertiary);
  box-shadow: -10px -10px 15px -3px rgba(46, 41, 51, 0.08),
    10px -10px 15px -3px rgba(46, 41, 51, 0.08),
  -10px 10px 15px -3px rgba(46, 41, 51, 0.08),
  10px 10px 15px -3px rgba(46, 41, 51, 0.08),
  0 10px 15px -3px rgba(46, 41, 51, 0.08),
  0 4px 6px -2px rgba(71, 63, 79, 0.16);
`;

export const FieldText = styled.div`
  font-size: 16px;
  margin: 0;
  height: 100%;
  text-align: justify;
`;

export const InputField = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: var(---primary);
  border-radius: 10px;
  border: solid 2px var(---secondary);
  color: var(---tertiary);
  box-shadow: -10px -10px 15px -3px rgba(46, 41, 51, 0.08),
    10px -10px 15px -3px rgba(46, 41, 51, 0.08),
  -10px 10px 15px -3px rgba(46, 41, 51, 0.08),
  10px 10px 15px -3px rgba(46, 41, 51, 0.08),
  0 10px 15px -3px rgba(46, 41, 51, 0.08),
  0 4px 6px -2px rgba(71, 63, 79, 0.16);
`;

export const RangeBox = styled.div`
  border-radius: 10px;
  border: solid 2px lightgray;
  color: var(---tertiary);
  padding: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ResultBox = styled.div`
  width: 50%;
  align-self: center;
  background-color: var(---fourth);
  border: 2px solid var(---fifth);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const ResultHeadline = styled.a`
  font-size: 18px;
  font-weight: bold;
  color: var(---tertiary);
  &:hover{
    color: var(---tertiary);
    cursor: default;
  }
`;

export const ResultText = styled.a`
  font-size: 16px;
  font-weight: normal;
  color: #555;

  &:hover {
    color: #555;
    cursor: default;
  }
`;


export const marginsInput = {
    marginBottom: '10px',
};

export const InfoBox = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: var(---error);
  border: 3px solid var(---error);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-top: 20%;
  position: relative;
  @media (max-width: 1512px) {
    font-size: 28px;
  }
`;

export const StyledStickManAndArrowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
`;

export const StickManContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownContainer = styled.div`
    display: flex;
    border-radius: 10px;
    border: solid 2px lightgray;
    color: var(---tertiary);
    padding: 10px;
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
    align-self: center;
`;

export const SelectContainer = styled.select`
    border: solid 2px lightgray;
    border-radius: 5px;
    width: 30%;
`;
