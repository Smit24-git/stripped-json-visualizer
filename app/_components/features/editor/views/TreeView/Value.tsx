import React from "react";
import { TextRenderer } from "../GraphView/CustomNode/TextRenderer";
import { darkTheme } from "../../../../../_constants/theme";

type TextColorFn = {
  $value?: string | unknown;
};

function getValueColor({ $value }: TextColorFn) {
  if ($value && !Number.isNaN(+$value)) return darkTheme.NODE_COLORS.INTEGER;
  if ($value === "true") return darkTheme.NODE_COLORS.BOOL.TRUE;
  if ($value === "false") return darkTheme.NODE_COLORS.BOOL.FALSE;
  if ($value === "null") return darkTheme.NODE_COLORS.NULL;

  // default
  return darkTheme.NODE_COLORS.NODE_VALUE;
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
