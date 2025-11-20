// https://react-spectrum.adobe.com/react-aria/useGridList.html#example
// https://react-spectrum.adobe.com/react-aria/useDraggableCollection.html#example

import React from "react";
import {
  mergeProps,
  useDraggableCollection,
  useDraggableItem,
  useFocusRing,
  useGridList,
  useGridListItem,
} from "react-aria";
import {
  useDraggableCollectionState,
  useListState,
  type DraggableCollectionState,
  type ListProps,
  type ListState,
} from "react-stately";
import type { Node } from "@react-types/shared";
import ListCheckbox from "./ListCheckbox";

interface ListItemProps<T> {
  item: Node<T>;
  state: ListState<T>;
  dragState: DraggableCollectionState;
}

function List<T extends object>(props: ListProps<T>) {
  const state = useListState(props);
  const ref = React.useRef<HTMLUListElement | null>(null);
  const { gridProps } = useGridList(
    {
      ...props,
      // Prevent dragging from changing selection.
      shouldSelectOnPressUp: true,
    },
    state,
    ref
  );

  // Setup drag state for the collection.
  const dragState = useDraggableCollectionState({
    // Pass through events from props.
    ...props,

    // Collection and selection manager come from list state.
    collection: state.collection,
    selectionManager: state.selectionManager,

    // Provide data for each dragged item. This function could
    // also be provided by the user of the component.
    getItems: (keys) => {
      return [...keys].map((key) => {
        const item = state.collection.getItem(key);

        return {
          "text/plain": item?.textValue ?? "",
        };
      });
    },
  });

  useDraggableCollection(props, dragState, ref);

  return (
    <ul {...gridProps} ref={ref} className="list">
      {[...state.collection].map((item) => (
        <ListItem
          key={item.key}
          item={item}
          state={state}
          dragState={dragState}
        />
      ))}
    </ul>
  );
}

function ListItem<T>({ item, state, dragState }: ListItemProps<T>) {
  const ref = React.useRef<HTMLLIElement>(null);
  const { rowProps, gridCellProps, isPressed } = useGridListItem(
    { node: item },
    state,
    ref
  );

  // Register the item as a drag source.
  const { dragProps } = useDraggableItem(
    {
      key: item.key,
    },
    dragState
  );

  const { isFocusVisible, focusProps } = useFocusRing();
  const showCheckbox =
    state.selectionManager.selectionMode !== "none" &&
    state.selectionManager.selectionBehavior === "toggle";

  return (
    <li
      {...mergeProps(rowProps, dragProps, focusProps)}
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
