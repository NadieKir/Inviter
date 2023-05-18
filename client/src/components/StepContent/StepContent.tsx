import { useContext, useEffect, useState } from 'react';
import { FormikHelpers, FormikProps, FormikValues } from 'formik';
import { useNavigate } from 'react-router-dom';

import {
  StepperContext,
  StepperContextType,
  Button,
  ButtonVariant,
  IStep,
  ButtonWidth,
} from 'components';
import { StepperForm } from 'forms';

interface StepContentProps {
  step: number;
  currentStep: number;
  isLast: boolean;
  isFirst: boolean;
  stepDescriptor: IStep;
  formHeading?: string;
  formClassName?: string;
  setConfirmed: (flag: boolean) => void;
}

export const StepContent = ({
  isFirst,
  isLast,
  stepDescriptor,
  step,
  currentStep,
  formHeading,
  formClassName,
  setConfirmed,
}: StepContentProps) => {
  const [isStepConfirmed, setIsStepConfirmed] = useState<boolean>(false);

  const {
    formData,
    setFormData,
    finishButtonContent,
    handleFinish,
    handleNextStep,
    handlePreviousStep,
    //  TODO what to do with that next
    extraButtonContent,
    onExtraBtnClick,
  } = useContext(StepperContext) as StepperContextType<any>;

  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    setConfirmed(isStepConfirmed);
  }, [isStepConfirmed]);

  const onFormikPropsChange = (props?: FormikProps<FormikValues>) => {
    if (!props) {
      return;
    }

    const isValid = props.isValid && Object.keys(props.touched).length > 0;
    const isDirty = props.dirty;

    const shouldConfirm = stepDescriptor.noVerify
      ? isValid
      : isValid && isDirty;

    setIsStepConfirmed(shouldConfirm);
  };

  const renderGoNextStepButton = (props: FormikProps<FormikValues>) => {
    return (
      <Button
        type="submit"
        variant={ButtonVariant.Primary}
        width={ButtonWidth.Small}
        disabled={
          stepDescriptor.noVerify
            ? !props.isValid || props.isSubmitting
            : !props.isValid || !props.dirty || props.isSubmitting
        }
      >
        Далее
      </Button>
    );
  };

  const renderSubmitFormButton = (props: FormikProps<FormikValues>) => {
    return (
      <Button
        type="submit"
        variant={ButtonVariant.Primary}
        width={ButtonWidth.Small}
        disabled={
          stepDescriptor.noVerify
            ? !props.isValid
            : !props.isValid || !props.dirty
        }
      >
        {finishButtonContent}
      </Button>
    );
  };

  const handleSubmit = (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>,
  ) => {
    if (isLast) {
      handleFinish({ ...formData, ...values }, actions);
      return;
    }

    setFormData({ ...formData, ...values });
    handleNextStep();
  };

  return (
    <StepperForm
      handleSubmit={handleSubmit}
      handleGoBack={isFirst ? handleGoBack : handlePreviousStep}
      initialValues={stepDescriptor.initialValues}
      validateSchema={stepDescriptor.validateSchema}
      fields={stepDescriptor.fields}
      submitButton={isLast ? renderSubmitFormButton : renderGoNextStepButton}
      onFormikPropsChange={onFormikPropsChange}
      formHeading={formHeading}
      isFirstStep={isFirst}
      fieldsClassName={formClassName}
      formConfig={stepDescriptor.formConfig}
      isCurrentStepActive={step === currentStep}
    />
  );
};
