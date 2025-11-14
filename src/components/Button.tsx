import React from "react";
import { useButton } from "react-aria";
import type { AriaButtonProps } from "react-aria";

function Button(props: AriaButtonProps) {
  const ref = React.useRef(null);
  const { buttonProps } = useButton(props, ref);
  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}

export default Button;
