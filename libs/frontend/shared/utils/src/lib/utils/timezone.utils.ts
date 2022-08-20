import { getTimeZones, TimeZone } from '@vvo/tzdb';
import { SelectItem } from '@mantine/core';

export const formatTimezoneName = ({ name, abbreviation, currentTimeFormat }: TimeZone): string => {
  return `${name} (${abbreviation}) ${currentTimeFormat.slice(0, 6)}`;
};

export const getTimezoneSelectOptions = (): SelectItem[] => {
  const timezones = getTimeZones();
  return timezones.map((timezone) => {
    const { name: value, continentName: group } = timezone;
    return {
      label: formatTimezoneName(timezone),
      value,
      group,
    };
  });
};

export const getCurrentTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
