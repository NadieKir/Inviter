import { useNavigate } from 'react-router';
import {
  Form as FormikForm,
  Formik,
  FormikHelpers,
  FormikProps,
  FormikValues,
} from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

import { Button, ButtonVariant, ButtonWidth } from 'components';

import styles from './StepperForm.module.scss';

interface StepperFormProps<T extends FormikValues> {
  initialValues: T;
  handleSubmit: (values: T, actions: FormikHelpers<T>) => Promise<void> | void;
  handleGoBack?: () => void;
  validateSchema?: Yup.AnySchema;
  fields: (formikProps: FormikProps<T>) => JSX.Element;
  submitButton: (props: FormikProps<T>) => JSX.Element;
  onFormikPropsChange?: (props: FormikProps<T>) => void;
  formHeading?: string;
  isFirstStep?: boolean;
  isCurrentStepActive: boolean;
}

export function StepperForm<T extends FormikValues>({
  handleSubmit,
  handleGoBack,
  initialValues,
  validateSchema,
  fields,
  submitButton,
  onFormikPropsChange,
  formHeading,
  isCurrentStepActive,
  isFirstStep = false,
}: StepperFormProps<T>) {
  const navigate = useNavigate();

  const handleReset = (nativeHandleResetFn: () => void) => {
    nativeHandleResetFn();
    navigate(-1);
  };

  return (
    <Formik
      innerRef={onFormikPropsChange}
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(props) => (
        <FormikForm className={styles.form}>
          {formHeading && <h1 className={styles.heading}>{formHeading}</h1>}
          <div className={classNames(styles.formInputs, {
            [styles.hide]: !isCurrentStepActive
          })}>
            {fields(props)}
          </div>
          <div className={styles.formActions}>
            {!isFirstStep && (
              <Button
                type="button"
                variant={ButtonVariant.Secondary}
                width={ButtonWidth.Small}
                onClick={handleGoBack || (() => handleReset(props.handleReset))}
              >
                Назад
              </Button>
            )}

            {submitButton(props)}
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}
