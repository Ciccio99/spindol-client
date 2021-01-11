import { useState } from 'react';

const getIndexById = (arr, matchId) => arr.findIndex(({ id }) => id === matchId);

const useStep = ({
  initialStep = 0,
  steps: stepsProp,
}) => {
  const steps = typeof stepsProp === 'number'
    ? new Array(stepsProp.fill({}))
    : stepsProp;

  const initialStepIndex = typeof initialStep === 'number'
    ? initialStep
    : stepsProp;

  const [index, setStep] = useState(initialStepIndex);
  const step = steps[index];

  const deltaSetStep = (delta = 1) => {
    setStep((index + steps.length + delta) % steps.length);
  };

  const navigation = {
    next: () => deltaSetStep(1),
    previous: () => deltaSetStep(-1),
    go: (newStep) => {
      if (typeof newStep === 'number') {
        setStep(newStep);
      } else {
        const newStepId = getIndexById(steps, newStep);
        setStep(newStepId);
      }
    },
  };

  return {
    index,
    step,
    navigation,
  };
};

export default useStep;
