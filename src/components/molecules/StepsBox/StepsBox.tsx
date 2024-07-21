import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  isValidElement,
} from 'react';
import { Heading, Span } from '@/components/atoms';
import { Button } from '@mui/material';
import { Box } from '@/components/atoms/Box/Box';

interface stepsLine {
  steps: number;
  currentStep: number;
}

const StepProgress = ({ steps, currentStep }: stepsLine) => {
  return (
    <div className="relative flex items-center justify-between w-full py-[30px]">
      <div className="absolute top-1/2 w-full h-1 bg-[#5E658B] -translate-y-1/2"></div>
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`relative z-10 w-6 h-6 rounded-full bg-blue-500 ${
            currentStep === index + 1 ? 'border-4 border-[#D4D4D4]' : ''
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
    <Box>
      <Heading variant="h2" color="white">
        {title}
      </Heading>
      <Heading variant="h4" color="primary" className="p-[10px]">
        {subTitle}
      </Heading>
      <StepProgress steps={steps} currentStep={currentStep} />
      {children}
    </Box>
  );
};
