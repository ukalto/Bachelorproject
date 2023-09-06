import {Field, FieldText, Headline} from "./MainComponents";

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
