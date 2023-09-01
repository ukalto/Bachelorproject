import React from 'react';
import styled from "styled-components";
import {FieldGrid, Field, getScenario} from '../../components/body/MainComponents';
import {Scenario} from "../../components/body/Scenario";

const Berkeley = () => {
  return (
      <FieldGrid>
        <Field>Field 1</Field>
          <Scenario scenario = {getScenario("Berkeley", "scenario")}/>
          <Field>Field 3</Field>
        <Field>Field 4</Field>
      </FieldGrid>
  );
};

export default Berkeley;
