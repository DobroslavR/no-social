import { getTimezoneSelectOptions } from '@frontend/shared/utils';
import { Select, SelectItem, SelectProps } from '@mantine/core';

export function TimezoneSelect(props: Partial<SelectProps>) {
  const selectOptions: SelectItem[] = getTimezoneSelectOptions();

  return (
    <Select
      className="w-full"
      placeholder="Pick timezone"
      searchable
      limit={selectOptions.length}
      nothingFound="No timezone found"
      clearable
      autoComplete="off"
      {...props}
      data={selectOptions}
    />
  );
}

export default TimezoneSelect;
