// src/components/atoms/Label.tsx
import React from "react";
import { LabelProps } from "./Label.types";

export const Label = ({ htmlFor = "", children }: LabelProps) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};
