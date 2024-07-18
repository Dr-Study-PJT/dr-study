import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  isValidElement,
} from 'react';
import { Heading, Span } from '@/components/atoms';
import { Button } from '@mui/material';

interface stepsLine {
  steps: number;
  currentStep: number;
}

const StepProgress = ({ steps, currentStep }: stepsLine) => {
  return (
    <div className="relative flex items-center justify-between w-full">
      {/* 선 */}
      <div className="absolute top-1/2 w-full h-1 bg-gray-300 -translate-y-1/2"></div>
      {/* 점 */}
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`relative z-10 w-6 h-6 rounded-full bg-blue-500 ${
            currentStep === index + 1 ? 'border-4 border-black' : ''
          }`}
        ></div>
      ))}
    </div>
  );
};

export interface StepsBoxProps {
  title: string;
  subTitle: string;
  steps: number;
  currentStep: number;
  // setCurrentStep: Dispatch<SetStateAction<number>>;
  children: ReactNode;
}

export const StepsBox = ({
  steps,
  currentStep,
  title,
  subTitle,
  children,
}: StepsBoxProps) => {
  return (
    <div>
      <Heading variant="h2">{title}</Heading>
      <Span variant="b1">{subTitle}</Span>
      <StepProgress steps={steps} currentStep={currentStep} />
      {children}
    </div>
  );
};
