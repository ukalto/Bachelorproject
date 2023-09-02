import React from 'react';
import {
    FieldGrid,
    Field,
    getScenario,
    Headline,
    InputField
} from '../../components/body/MainComponents';
import {Scenario} from "../../components/body/Scenario";
import InputButtons from "../../components/body/InputButtons";

const Greedy = () => {
    return (
        <FieldGrid>
            <InputField>
                <Headline>Inputs</Headline>
                    <InputButtons/>
            </InputField>
            <Scenario scenario={getScenario("Greedy", "scenario")}/>
            <Field>
                <Headline>Algorithm</Headline>
            </Field>
            <Field>
                <Headline>Benchmarks</Headline>
            </Field>
        </FieldGrid>
    );
};

export default Greedy;
