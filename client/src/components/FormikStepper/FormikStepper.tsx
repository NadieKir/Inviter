import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import * as Yup from 'yup';
import { FormikHelpers, FormikProps, FormikValues } from 'formik';

import { StepperProgress, StepContent } from 'components';

import styles from './FormikStepper.module.scss';

export enum StepVariant {
  Active = 'active',
  Available = 'available',
  Confirmed = 'confirmed',
  Disabled = 'disabled',
}

export interface StepElementProps {
  setConfirmed: (index: number, state: boolean) => void;
  index: number;
}

export interface IStep {
  title: string;
  initialValues: FormikValues;
  validateSchema: Yup.AnySchema;
  formClassName?: string;
  fields: (formikProps: FormikProps<FormikValues>) => JSX.Element;
  noVerify?: boolean;
}

export interface StepDescriptor extends IStep {
  variant: StepVariant;
  confirmed: boolean;
  visited: boolean;
}

export const StepperContext = createContext<StepperContextType<any> | null>(
  null,
);

export type StepperContextType<T> = {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
  stepsDescriptor: StepDescriptor[];
  finishButtonContent: JSX.Element | string | undefined;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleFinish: (values: T, actions: FormikHelpers<T>) => Promise<void>;
};

interface FormikStepperProps<T extends FormikValues> {
  steps: IStep[];
  onFinish: (values: T, actions: FormikHelpers<T>) => Promise<void>;
  finishButtonContent?: JSX.Element | string;
  formHeading?: string;
}

export function FormikStepper<T extends FormikValues>({
  steps,
  onFinish,
  finishButtonContent = 'Создать',
  formHeading = '',
}: FormikStepperProps<T>) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormikValues>({});

  const [stepsDescriptor, setStepsDescriptor] = useState(
    steps.map((step) =>
      Object.assign({}, step, {
        variant: StepVariant.Disabled,
        confirmed: false,
        visited: false,
      }),
    ),
  );

  const moveStepperContent = () => {
    document.documentElement.style.setProperty(
      '--currentStep',
      `-${currentStep}`,
    );
  };

  const changeCurrentStepVariantBeforeLeave = (
    step: StepDescriptor,
    index: number,
  ): StepDescriptor => {
    if (index === currentStep) {
      return {
        ...step,
        variant: step.confirmed ? StepVariant.Confirmed : StepVariant.Available,
      };
    }

    return step;
  };

  const setConfirmed = useCallback(
    (index: number, state: boolean) => {
      setStepsDescriptor(
        stepsDescriptor.map((step, i) => {
          if (i === index) {
            step.confirmed = state;

            /* Set appropriate variant to next steps (if they exist) if current step is confirmed */
            if (stepsDescriptor[i + 1] && state) {
              for (
                let nextStepIndex = i + 1;
                nextStepIndex < stepsDescriptor.length;
                nextStepIndex++
              ) {
                stepsDescriptor[nextStepIndex].variant = stepsDescriptor[
                  nextStepIndex
                ].confirmed
                  ? StepVariant.Confirmed
                  : stepsDescriptor[nextStepIndex].visited ||
                    nextStepIndex === i + 1
                    ? StepVariant.Available
                    : StepVariant.Disabled;
              }
            }

            /* Set disabled variant to next steps (if they exist) if current step is not confirmed */
            if (stepsDescriptor[i + 1] && !state) {
              for (
                let nextStepIndex = i + 1;
                nextStepIndex < stepsDescriptor.length;
                nextStepIndex++
              ) {
                stepsDescriptor[nextStepIndex].variant = StepVariant.Disabled;
              }
            }
          }

          return step;
        }),
      );
    },
    [stepsDescriptor],
  );

  useEffect(() => {
    if (stepsDescriptor[currentStep]?.noVerify) {
      setConfirmed(currentStep, true);
    }

    setStepsDescriptor(
      stepsDescriptor.map((step, i) =>
        i === currentStep
          ? { ...step, variant: StepVariant.Active, visited: true }
          : step,
      ),
    );

    moveStepperContent();
  }, [currentStep]);

  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= steps.length) {
      setStepsDescriptor(
        stepsDescriptor.map(changeCurrentStepVariantBeforeLeave),
      );

      setCurrentStep(nextStep);
    }
  };

  const handlePreviousStep = () => {
    const previousStep = currentStep - 1;
    if (previousStep >= 0) {
      setStepsDescriptor(
        stepsDescriptor.map(changeCurrentStepVariantBeforeLeave),
      );

      setCurrentStep(previousStep);
    }
  };

  const handleFinish = onFinish;

  return (
    <StepperContext.Provider
      value={{
        formData,
        setFormData,
        stepsDescriptor,
        finishButtonContent,
        handleNextStep,
        handlePreviousStep,
        handleFinish,
      }}
    >
      <div className={styles.stepper}>
        <StepperProgress currentStep={currentStep} />
        <div
          className={styles.stepperBody}
          style={
            {
              '--numOfSteps': steps.length,
            } as React.CSSProperties
          }
        >
          {steps.map(
            (step: IStep, index: number): JSX.Element => (
              <StepContent
                stepDescriptor={step}
                key={step.title}
                step={index}
                currentStep={currentStep}
                isFirst={index === 0}
                isLast={index === steps.length - 1}
                formHeading={formHeading}
                formClassName={step.formClassName}
                setConfirmed={(isConfirmed: boolean) =>
                  setConfirmed(index, isConfirmed)
                }
              />
            ),
          )}
        </div>
      </div>
    </StepperContext.Provider>
  );
}
