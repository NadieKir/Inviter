import { useNavigate } from 'react-router';
import {
  Form as FormikForm,
  Formik,
  FormikHelpers,
  FormikProps,
  FormikValues,
} from 'formik';
import * as Yup from 'yup';

import { Button, ButtonVariant, ButtonWidth } from 'components';

import styles from './Form.module.scss';

interface FormProps<T extends FormikValues> {
  initialValues: T;
  handleSubmit: (values: T, actions: FormikHelpers<T>) => Promise<void> | void;
  handleGoBack?: () => void;
  validateSchema?: Yup.AnySchema;
  fields: () => JSX.Element;
  submitButton: (props: FormikProps<T>) => JSX.Element;
  onFormikPropsChange?: (props: FormikProps<T>) => void;
}

export function Form<T extends FormikValues>({
  handleSubmit,
  handleGoBack,
  initialValues,
  validateSchema,
  fields,
  submitButton,
  onFormikPropsChange,
}: FormProps<T>) {
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
          <div className={styles.formInputs}>{fields()}</div>
          <div className={styles.formActions}>
            <Button
              type="button"
              variant={ButtonVariant.Secondary}
              width={ButtonWidth.Small}
              onClick={handleGoBack || (() => handleReset(props.handleReset))}
            >
              Назад
            </Button>

            {submitButton(props)}
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}
