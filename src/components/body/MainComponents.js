import styled from "styled-components";
import data from '../../assets/data.json'

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
`;

export const Field = styled.button`
  width: 100%;
  padding: 20px;
  font-size: 100px;
  background-color: var(---primary); /* Make sure to define these variables in your CSS */
  border-radius: 10px;
  border: solid 2px var(---secondary);
  color: var(---tertiary);
  box-shadow: -10px -10px 15px -3px rgba(46, 41, 51, 0.08),
    10px -10px 15px -3px rgba(46, 41, 51, 0.08),
  -10px 10px 15px -3px rgba(46, 41, 51, 0.08),
  10px 10px 15px -3px rgba(46, 41, 51, 0.08),
  0 10px 15px -3px rgba(46, 41, 51, 0.08),
  0 4px 6px -2px rgba(71, 63, 79, 0.16);
  cursor: pointer;
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

