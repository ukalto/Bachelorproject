import styled from "styled-components";
import data from '../assets/data.json'

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr 1fr 1fr;
  }
`;

export const Headline = styled.h6`
    font-size: 40px;
`;

export const Field = styled.div`
  width: 100%;
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
  text-align: justify;
`;

export const InputField = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
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


export function getScenario(details, type) {
    const systemDetails = data.data.find(item => item.name === details);
    if (systemDetails) {
        const scenarioItem = systemDetails.details.find(item => item.type === type);
        if (scenarioItem) {
            return scenarioItem.content;
        }
    }
    return "";
}

export const marginsInput = {
    marginBottom: '10px',
};
