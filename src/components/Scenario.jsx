import {Field, FieldText, Headline} from "./MainComponentsCSS";

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
