import { IconField } from "components/IconField/IconField";
import { InputField, InputFieldExternalProps, InputRenderProps } from "components/InputField/InputField";

import styles from './YesNoPicker.module.scss';
import yes from './assets/yes.svg';
import no from './assets/no.svg';

type YesNoPickerProps = InputFieldExternalProps & {
    className?: string;
}

export const YesNoPicker = ({
    className,
    ...inputFieldProps
}: YesNoPickerProps) => {
    return (
        <InputField containerAttributes={{ className: className }} {...inputFieldProps}>
            {({ field, className }: InputRenderProps): JSX.Element => (
                <div className={styles.wrapper}>
                    <IconField icon={yes} name={inputFieldProps.name} value='true' type='radio' />
                    <IconField icon={no} name={inputFieldProps.name} value='false' type='radio' />
                </div>
            )}
        </InputField>
    );
};