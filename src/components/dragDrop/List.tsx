// https://react-spectrum.adobe.com/react-aria/useGridList.html#example

import React from "react";
import {
  mergeProps,
  useFocusRing,
  useGridList,
  useGridListItem,
} from "react-aria";
import { useListState, type ListProps, type ListState } from "react-stately";
import type { Node } from "@react-types/shared";
import ListCheckbox from "./ListCheckbox";

interface ListItemProps<T> {
  item: Node<T>;
  state: ListState<T>;
}

function List<T extends object>(props: ListProps<T>) {
  const state = useListState(props);
  const ref = React.useRef<HTMLUListElement | null>(null);
  const { gridProps } = useGridList(props, state, ref);

  return (
    <ul {...gridProps} ref={ref} className="list">
      {[...state.collection].map((item) => (
        <ListItem key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

function ListItem<T>({ item, state }: ListItemProps<T>) {
  const ref = React.useRef<HTMLLIElement>(null);
  const { rowProps, gridCellProps, isPressed } = useGridListItem(
    { node: item },
    state,
    ref
  );

  const { isFocusVisible, focusProps } = useFocusRing();
  const showCheckbox =
    state.selectionManager.selectionMode !== "none" &&
    state.selectionManager.selectionBehavior === "toggle";

  return (
    <li
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
      className={`${isPressed ? "pressed" : ""} ${
        isFocusVisible ? "focus-visible" : ""
      }`}
    >
      <div {...gridCellProps}>
        {showCheckbox && <ListCheckbox item={item} state={state} />}
        {item.rendered}
      </div>
    </li>
  );
}

export default List;
