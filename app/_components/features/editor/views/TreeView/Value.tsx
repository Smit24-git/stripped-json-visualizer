import React from "react";
import { TextRenderer } from "../GraphView/CustomNode/TextRenderer";

type TextColorFn = {
  $value?: string | unknown;
};
function getValueColor({ $value }: TextColorFn) {
  if ($value && !Number.isNaN(+$value)) return `var(--node-integer-color)`;
  if ($value === "true") return `var(--node-true-color)`;
  if ($value === "false") return `var(--node-false-color)`;
  if ($value === "null") return `var(--node-null-color)`; 
  // default
  return `var(--node-value-color)`;
}

interface ValueProps {
  valueAsString: unknown;
  value: unknown;
}

export const Value = (props: ValueProps) => {
  const { valueAsString, value } = props;

  return (
    <span
      style={{
        color: getValueColor({
          $value: valueAsString,
        }),
      }}
    >
      <TextRenderer>{JSON.stringify(value)}</TextRenderer>
    </span>
  );
};
