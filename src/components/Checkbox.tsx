import React from "react";
import { useToggleState } from "react-stately";
import { useCheckbox } from "react-aria";
import type { AriaCheckboxProps } from "react-aria";

function Checkbox(props: AriaCheckboxProps) {
  const inputRef = React.useRef(null);
  const { inputProps } = useCheckbox(props, useToggleState(props), inputRef);
  return <input {...inputProps} ref={inputRef} />;
}

export default Checkbox;
