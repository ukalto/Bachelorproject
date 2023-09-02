import React from 'react';
import {
    FieldGrid,
    Field,
    getScenario,
    Headline, InputField,
} from '../../components/body/MainComponents';
import {Scenario} from "../../components/body/Scenario";
import InputButtons from "../../components/body/InputButtons";

const ChordSystem = () => {
    return (
        <FieldGrid>
            <InputField>
                <Headline>Inputs</Headline>
                <InputButtons/>
            </InputField>
            <Scenario scenario={getScenario("ChordSystem", "scenario")}/>
            <Field>
                <Headline>Algorithm</Headline>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
            </Field>
        </FieldGrid>
    );
};

export default ChordSystem;

