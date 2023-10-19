import {Field, FieldText, Headline} from "./GlobalComponents.jsx";

export const Scenario = ({scenario}) => {
    return (
        <Field>
            <Headline>Scenario</Headline>
            <FieldText>
                {scenario}
            </FieldText>
        </Field>
    );
};
