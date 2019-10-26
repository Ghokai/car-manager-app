import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { EnumDisplayType } from "../models/EnumDisplayType";

type KeyValueOption = { key: number | string; value: string };

export const convertEnumDisplayType2KeyValueOption = (
  enumDisplayType: EnumDisplayType
): KeyValueOption[] => {
  return Object.keys(enumDisplayType).map((key: string) => ({
    key,
    value: enumDisplayType[key]
  }));
};

export const convertStringList2KeyValueOption = (
  list: string[]
): KeyValueOption[] => {
  return list.map((item: string) => ({
    key: item,
    value: item
  }));
};

type DropdownMenuProps = {
  options: KeyValueOption[];
  selectedValue: number | string;
  onChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  label: string;
  name: string;
};
const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  selectedValue,
  onChange,
  label,
  name
}: DropdownMenuProps): React.ReactElement => {
  return (
    <FormControl className="select-control">
      <InputLabel htmlFor={`select-${name}`}>{label}</InputLabel>
      <Select
        inputProps={{
          name,
          id: `select-${name}`
        }}
        value={selectedValue}
        onChange={onChange}
      >
        <MenuItem value="">&nbsp;</MenuItem>
        {options.map((item: KeyValueOption) => (
          <MenuItem key={item.key} value={item.key}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownMenu;
