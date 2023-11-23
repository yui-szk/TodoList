import type { Filter } from "./App";

type Props = {
  handleSort: (filter: Filter) => void;
};

export function FilterSelect({ handleSort }: Props) {
  return (
    <select
      defaultValue="all"
      onChange={(e) => handleSort(e.target.value as Filter)}
    >
      <option value="all">All Tasks</option>
      <option value="checked">Completed Tasks</option>
      <option value="unchecked">Current Tasks</option>
      <option value="removed">Dustbin</option>
    </select>
  );
}
