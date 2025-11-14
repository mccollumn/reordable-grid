import React, { type JSX } from "react";
import { useDropIndicator, type DropIndicatorProps } from "react-aria";
import { type DroppableCollectionState } from "react-stately";

interface ExtendedDropIndicatorProps extends DropIndicatorProps {
  dropState: DroppableCollectionState;
}

function DropIndicator(props: ExtendedDropIndicatorProps): JSX.Element | null {
  const ref = React.useRef<HTMLLIElement>(null);
  const { dropIndicatorProps, isHidden, isDropTarget } = useDropIndicator(
    props,
    props.dropState,
    ref
  );
  if (isHidden) {
    return null;
  }

  return (
    <li
      {...dropIndicatorProps}
      role="option"
      ref={ref}
      className={`drop-indicator ${isDropTarget ? "drop-target" : ""}`}
    />
  );
}

export default DropIndicator;
