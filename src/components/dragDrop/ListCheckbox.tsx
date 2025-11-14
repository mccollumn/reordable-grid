import { useGridListSelectionCheckbox } from "react-aria";
import Checkbox from "../Checkbox";
import type { Node } from "@react-types/shared";
import type { ListState } from "react-stately";

interface ListCheckboxProps<T> {
  item: Node<T>;
  state: ListState<T>;
}

function ListCheckbox<T>({ item, state }: ListCheckboxProps<T>) {
  const { checkboxProps } = useGridListSelectionCheckbox(
    { key: item.key },
    state
  );
  return <Checkbox {...checkboxProps} />;
}

export default ListCheckbox;
