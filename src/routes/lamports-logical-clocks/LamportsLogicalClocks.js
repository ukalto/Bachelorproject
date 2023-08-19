import React from 'react';
import styled from "styled-components";

const LamportsLogicalClocks = () => {
    return (
        <FieldGrid>
            <Field>Field 1</Field>
            <Field>Field 2</Field>
            <Field>Field 3</Field>
            <Field>Field 4</Field>
        </FieldGrid>
    );
};

export default LamportsLogicalClocks;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
`;

const Field = styled.button`
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
