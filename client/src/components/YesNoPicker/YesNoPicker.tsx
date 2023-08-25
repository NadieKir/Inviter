import { IconField } from "components/IconField/IconField";
import { InputField, InputFieldExternalProps, InputRenderProps } from "components/InputField/InputField";

import styles from './YesNoPicker.module.scss';
import check from 'assets/images/check.svg';
import cross from 'assets/images/cross.svg';

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
                    <IconField icon={check} name={inputFieldProps.name} value='true' type='radio' />
                    <IconField icon={cross} name={inputFieldProps.name} value='false' type='radio' />
                </div>
            )}
        </InputField>
    );
};