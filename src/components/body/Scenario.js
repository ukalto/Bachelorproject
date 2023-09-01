import styled from "styled-components";

export const Scenario = ({scenario}) => {
    return (
        <FieldContainer>
            <h6>Scenario</h6>
            <FieldText>
                {scenario}
            </FieldText>
        </FieldContainer>
    );
};

const FieldContainer = styled.div`
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

const FieldText = styled.div`
  font-size: 20px;
  margin: 0;
  text-align: justify;
`;
