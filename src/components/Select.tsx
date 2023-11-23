import type { SelectHTMLAttributes } from "react";

type Props = {
  options: { value: string; name: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ options, defaultValue, onChange }: Props) {
  return (
    <select defaultValue={defaultValue} onChange={onChange}>
      {options.map(({ value, name }) => (
        <option value={value}>{name}</option>
      ))}
    </select>
  );
}
